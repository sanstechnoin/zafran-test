// --- 1. FIREBASE CONFIG ---
const firebaseConfig = {
  apiKey: "AIzaSyAVh2kVIuFcrt8Dg88emuEd9CQlqjJxDrA",
  authDomain: "zaffran-delight.firebaseapp.com",
  projectId: "zaffran-delight",
  storageBucket: "zaffran-delight.firebasestorage.app",
  messagingSenderId: "1022960860126",
  appId: "1:1022960860126:web:1e06693dea1d0247a0bb4f"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// --- 2. CONFIGURATION ---
const RESTAURANT_CAPACITY = 40; 
const AVERAGE_DURATION_MINUTES = 120; 

// Global Settings State
let businessHours = {
    weekly: {},
    holidays: [],
    pause: null
};

document.addEventListener("DOMContentLoaded", async () => {
    
    // Load Admin Settings First
    await loadSettings();

    // Set Min Date to Today
    const dateInput = document.getElementById('res-date');
    const timeInput = document.getElementById('res-time');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // --- REAL-TIME VALIDATION LISTENERS ---
    
    // 1. Validate Date (Holiday & Closed Days)
    dateInput.addEventListener('change', function() {
        const selectedDate = this.value;
        if(!selectedDate) return;

        const validation = checkDateValidity(selectedDate);
        if(!validation.valid) {
            alert(validation.msg);
            this.value = ""; // Reset date
        }
    });

    // 2. Validate Time (Opening Hours)
    timeInput.addEventListener('change', function() {
        const selectedDate = dateInput.value;
        const selectedTime = this.value;
        
        if(!selectedDate) return; // Wait for date first

        const validation = checkTimeValidity(selectedDate, selectedTime);
        if(!validation.valid) {
            alert(validation.msg);
            this.value = ""; // Reset time
        }
    });

    // --- FORM SUBMIT ---
    const form = document.getElementById('reservation-form');
    const submitBtn = document.getElementById('submit-btn');
    const modal = document.getElementById('success-modal');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('res-name').value;
        const phone = document.getElementById('res-phone').value;
        const email = document.getElementById('res-email').value;
        const date = document.getElementById('res-date').value;
        const time = document.getElementById('res-time').value;
        const guests = parseInt(document.getElementById('res-guests').value);
        const notes = document.getElementById('res-notes').value;

        // FINAL VALIDATION ON SUBMIT
        const dateCheck = checkDateValidity(date);
        if(!dateCheck.valid) return alert(dateCheck.msg);

        const timeCheck = checkTimeValidity(date, time);
        if(!timeCheck.valid) return alert(timeCheck.msg);

        // CHECK AVAILABILITY (Capacity)
        submitBtn.disabled = true;
        submitBtn.innerText = "Prüfe Verfügbarkeit...";

        const isAvailable = await checkAvailability(date, time, guests);

        if (!isAvailable) {
            alert(`Entschuldigung! Um ${time} Uhr sind wir leider voll belegt. Bitte wählen Sie eine andere Zeit.`);
            submitBtn.disabled = false;
            submitBtn.innerText = "Jetzt Reservieren";
            return;
        }

        // SAVE RESERVATION
        submitBtn.innerText = "Senden...";

        try {
            await db.collection("reservations").add({
                name: name,
                phone: phone,
                email: email,
                date: date,
                time: time,
                guests: guests,
                notes: notes,
                status: "confirmed", 
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            modal.style.display = 'flex';
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerText = "Jetzt Reservieren";

        } catch (error) {
            console.error("Error booking table:", error);
            alert("Ein Fehler ist aufgetreten. Bitte rufen Sie uns an.");
            submitBtn.disabled = false;
            submitBtn.innerText = "Jetzt Reservieren";
        }
    });
});

// ==========================================
// 3. LOGIC & RULES
// ==========================================

async function loadSettings() {
    try {
        const doc = await db.collection('settings').doc('hours').get();
        if(doc.exists) {
            businessHours = doc.data();
        } else {
            // Default Fallback
            businessHours = {
                weekly: {
                    monday: {open:false}, 
                    tuesday:{open:true, start:"12:00", end:"22:00"},
                    wednesday:{open:true, start:"12:00", end:"22:00"}, 
                    thursday:{open:true, start:"12:00", end:"22:00"},
                    friday:{open:true, start:"12:00", end:"22:00"}, 
                    saturday:{open:true, start:"12:00", end:"22:00"},
                    sunday:{open:true, start:"12:00", end:"22:00"}
                },
                holidays: [],
                pause: null
            };
        }
    } catch(e) { console.error("Could not load settings", e); }
}

function checkDateValidity(dateStr) {
    const selectedDate = new Date(dateStr);
    selectedDate.setHours(0,0,0,0); // normalize
    const today = new Date();
    today.setHours(0,0,0,0);
    
    // 1. Check Holidays (Scenario 3)
    if(businessHours.holidays && businessHours.holidays.length > 0) {
        for(let h of businessHours.holidays) {
            const start = new Date(h.start); start.setHours(0,0,0,0);
            const end = new Date(h.end); end.setHours(23,59,59,999);
            
            if(selectedDate >= start && selectedDate <= end) {
                return { valid: false, msg: `An diesem Datum haben wir geschlossen: ${h.reason || 'Betriebsurlaub'}.` };
            }
        }
    }

    // 2. Check Weekly Schedule (Scenario 1)
    const daysMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = daysMap[selectedDate.getDay()];
    const dayConfig = businessHours.weekly ? businessHours.weekly[dayName] : null;

    if(!dayConfig || !dayConfig.open) {
        return { valid: false, msg: `Am ${dayName} haben wir leider Ruhetag.` };
    }

    // 3. Check Emergency Pause (Scenario 4) - Only if booking for TODAY
    if(selectedDate.getTime() === today.getTime()) {
        if(businessHours.pause && businessHours.pause.active) {
            // If Pause is active AND (Type is All OR Type is Pickup/Reservations)
            // Note: Admin panel has "delivery", "pickup", "all". We treat "all" or specific logic.
            // Assuming Table Reservations are blocked if "all" is selected.
            if(businessHours.pause.type === 'all' && businessHours.pause.until > new Date().getTime()) {
                 const resume = new Date(businessHours.pause.until);
                 const timeStr = resume.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
                 return { valid: false, msg: `Momentan nehmen wir keine Reservierungen an. Bitte versuchen Sie es ab ${timeStr} Uhr wieder.` };
            }
        }
    }

    return { valid: true };
}

function checkTimeValidity(dateStr, timeStr) {
    const selectedDate = new Date(dateStr);
    const daysMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = daysMap[selectedDate.getDay()];
    const dayConfig = businessHours.weekly ? businessHours.weekly[dayName] : null;

    if (!dayConfig || !dayConfig.open) return { valid: false, msg: "Geschlossen." };

    // Use Restaurant Hours (start/end)
    const openTime = dayConfig.start; 
    const closeTime = dayConfig.end; 

    if (!openTime || !closeTime) return { valid: false, msg: "Keine Öffnungszeiten verfügbar." };

    if (timeStr < openTime || timeStr > closeTime) {
        return { valid: false, msg: `Reservierung nur zwischen ${openTime} und ${closeTime} Uhr möglich.` };
    }

    return { valid: true };
}

// ==========================================
// 4. CAPACITY CHECK (Existing Logic)
// ==========================================

async function checkAvailability(date, time, newGuests) {
    try {
        const snapshot = await db.collection("reservations")
                                 .where("date", "==", date)
                                 .where("status", "==", "confirmed") 
                                 .get();

        if (snapshot.empty) return true; 

        const newStart = timeToMinutes(time);
        const newEnd = newStart + AVERAGE_DURATION_MINUTES;
        let currentOccupancy = 0;

        snapshot.forEach(doc => {
            const booking = doc.data();
            const bookingStart = timeToMinutes(booking.time);
            const bookingEnd = bookingStart + AVERAGE_DURATION_MINUTES;

            if (newStart < bookingEnd && newEnd > bookingStart) {
                let g = parseInt(booking.guests);
                if (isNaN(g)) g = 2; 
                currentOccupancy += g;
            }
        });

        if ((currentOccupancy + newGuests) > RESTAURANT_CAPACITY) {
            return false;
        }
        return true;

    } catch (e) {
        console.error("Availability Check Failed:", e);
        return true; 
    }
}

function timeToMinutes(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    return (h * 60) + m;
}
