// --- 1. CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyAVh2kVIuFcrt8Dg88emuEd9CQlqjJxDrA",
  authDomain: "zaffran-delight.firebaseapp.com",
  projectId: "zaffran-delight",
  storageBucket: "zaffran-delight.firebasestorage.app",
  messagingSenderId: "1022960860126",
  appId: "1:1022960860126:web:1e06693dea1d0247a0bb4f"
};

// --- 2. INITIALIZE FIREBASE ---
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const driverContainer = document.getElementById('driver-orders');

let watchId = null; 

// --- 3. LOGIN & PIN LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
    
    // A. Start Silent Login immediately (Background)
    firebase.auth().signInAnonymously().catch(e => console.error("Background Auth Error:", e));

    // B. Check if already authorized from previous session
    // We wait for Auth to be ready before auto-showing the app
    firebase.auth().onAuthStateChanged((user) => {
        if (user && sessionStorage.getItem('driver_authorized') === 'true') {
            showDriverApp();
        }
    });

    // C. Handle PIN Submission
    document.getElementById('pin-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const inputPin = document.getElementById('driver-pin').value.trim();
        const btn = document.querySelector('#pin-form button');
        const err = document.getElementById('login-error');

        btn.innerText = "Checking...";
        btn.disabled = true;
        err.textContent = "";

        // 1. Verify PIN from Database (Public Read)
        db.collection('settings').doc('driver_auth').get()
            .then((doc) => {
                if (doc.exists && doc.data().pin === inputPin) {
                    // PIN IS CORRECT!
                    sessionStorage.setItem('driver_authorized', 'true');
                    btn.innerText = "Connecting...";

                    // 2. Ensure we are Logged In
                    if (firebase.auth().currentUser) {
                        showDriverApp();
                    } else {
                        // Force Login if background attempt failed/stalled
                        console.log("Auth missing, forcing login...");
                        return firebase.auth().signInAnonymously();
                    }
                } else {
                    throw new Error("Wrong PIN!");
                }
            })
            .then((userCredential) => {
                // If we had to force login, this runs after it succeeds
                if (userCredential) {
                    showDriverApp();
                }
            })
            .catch((error) => {
                console.error("Login/PIN Error:", error);
                
                // Show friendly error message
                if (error.message === "Wrong PIN!") {
                    err.textContent = "Falscher PIN!";
                } else {
                    err.textContent = "Fehler: " + error.message;
                }
                
                // Reset Button
                btn.innerText = "ENTER";
                btn.disabled = false;
                if(error.message === "Wrong PIN!") {
                    document.getElementById('driver-pin').value = "";
                }
            });
    });
});

function showDriverApp() {
    document.getElementById('login-overlay').style.display = 'none';
    document.getElementById('driver-app').style.display = 'block';
    initOrderListener(); // Start listening for orders
}

window.logout = function() {
    sessionStorage.removeItem('driver_authorized');
    location.reload();
};


// --- 4. MAIN LISTENER (Real-Time Updates) ---
function initOrderListener() {
    console.log("Starting Order Listener...");
    
    // Listen for orders: Preparing, Ready, Cooked (Waiter), or Out
    db.collection("orders")
        .where("orderType", "==", "delivery")
        .where("status", "in", ["preparing", "ready", "cooked", "out_for_delivery"]) 
        .orderBy("createdAt", "asc")
        .onSnapshot((snapshot) => {
            driverContainer.innerHTML = "";
            
            if (snapshot.empty) {
                driverContainer.innerHTML = `
                    <div class="empty-state">
                        <span class="material-icons" style="font-size: 64px; opacity:0.3;">check_circle</span>
                        <p>Keine offenen Lieferungen.</p>
                    </div>`;
                return;
            }

            const now = new Date();

            snapshot.forEach((doc) => {
                const order = doc.data();
                renderDriverCard(doc.id, order, now);
            });
        }, (error) => {
            console.error("Firebase Error:", error);
            
            if(error.code === 'permission-denied') {
                driverContainer.innerHTML = `<p style="color:red; text-align:center; padding:20px;">⛔ Zugriff verweigert.<br>Bitte Seite neu laden.</p>`;
            }
            
            if(error.message && error.message.includes("index")) {
                const link = error.message.match(/https:\/\/[^\s]+/)[0];
                driverContainer.innerHTML = `
                    <div style="background:rgba(255,0,0,0.2); padding:15px; border:1px solid red; text-align:center;">
                        <h3>⚠️ System Setup Required</h3>
                        <p>Klick diesen Link um die Datenbank zu reparieren:</p>
                        <a href="${link}" target="_blank" style="color:#4285F4; background:white; padding:10px; display:block; border-radius:5px; text-decoration:none; font-weight:bold;">FIX DATABASE</a>
                    </div>`;
            }
        });
}


// --- 5. RENDER CARD FUNCTION ---
function renderDriverCard(id, order, now) {
    const addr = order.deliveryAddress || {};
    const fullAddress = `${addr.street} ${addr.house}, ${addr.zip} Euskirchen`;
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
    
    // Tracking Link
    const domain = window.location.origin; 
    const trackerUrl = `${domain}/tracker.html?id=${id}`;

    // Overdue Logic
    let isOverdue = false;
    const timeSlot = order.timeSlot || "";
    if (timeSlot.includes(':')) {
        const [hours, minutes] = timeSlot.split(':').map(Number);
        const deadline = new Date();
        deadline.setHours(hours, minutes, 0, 0);
        if (now > deadline) isOverdue = true;
    }

    // Status Logic
    let statusClass = 'status-preparing';
    let isDisabled = true; 

    // Enable buttons if Ready, Cooked, or Out
    if (order.status === 'ready' || order.status === 'cooked' || order.status === 'out_for_delivery') {
        statusClass = 'status-ready';
        isDisabled = false; 
    }
    if (isOverdue) statusClass = 'status-overdue';

    const html = `
    <div class="order-card ${statusClass}" id="card-${id}">
        
        <div class="order-header">
            <div>
                <span class="order-id">#${id.slice(-4).toUpperCase()}</span>
                ${isOverdue ? `<span class="overdue-badge">⚠️ LATE</span>` : ''}
            </div>
            <span class="order-time" style="${isOverdue ? 'color:#D44437' : ''}">
                🕒 ${timeSlot || 'ASAP'}
            </span>
        </div>

        <div id="in-app-map-${id}" class="in-app-map-container"></div>

        <div style="background:#222; padding:15px; border-radius:8px; margin-bottom:15px; border:1px solid #333;">
            <button onclick="startInAppNav('${id}', '${fullAddress}')" class="btn-action" style="width:100%; background:#4285F4; margin-bottom:15px;">
                <span class="material-icons" style="margin-right:8px;">near_me</span> START GPS & TRACKING
            </button>
            
            <button onclick="nativeShare('${order.customerPhone}', '${trackerUrl}')" class="btn-action" style="width:100%; background:#25D366; color:white;" ${isDisabled ? 'disabled style="opacity:0.5"' : ''}>
                <span class="material-icons" style="margin-right:8px;">share</span> SHARE LINK (WHATSAPP)
            </button>
        </div>

        <div class="customer-section">
            <div class="customer-name">${order.customerName}</div>
            <div class="customer-address">
                <span class="material-icons" style="font-size:16px; color:#D4AF37;">place</span> 
                ${fullAddress}
            </div>
            
            <div class="action-grid">
                <a href="${mapsLink}" target="_blank" class="btn-action btn-google">
                    <span class="material-icons" style="margin-right:5px; font-size:16px;">map</span> Map
                </a>
                <a href="tel:${order.customerPhone}" class="btn-action btn-call">
                    <span class="material-icons" style="margin-right:5px;">call</span> Call
                </a>
            </div>
        </div>

        <div class="payment-info">💰 Zu Kassieren: ${order.total.toFixed(2)} €</div>

        <button onclick="completeDelivery('${id}')" class="complete-btn" ${isDisabled ? 'disabled style="opacity:0.5"' : ''}>
            DELIVERED / ABGESCHLOSSEN
        </button>
    </div>
    `;
    
    driverContainer.innerHTML += html;
}


// --- 6. NAVIGATION ---
window.startInAppNav = function(orderId, addressText) {
    const mapDiv = document.getElementById(`in-app-map-${orderId}`);
    
    if (mapDiv.classList.contains('active')) {
        mapDiv.classList.remove('active');
        return; 
    }
    
    document.querySelectorAll('.in-app-map-container').forEach(el => el.classList.remove('active'));
    mapDiv.classList.add('active');

    if (!navigator.geolocation) return alert("GPS Error: Not supported");

    navigator.geolocation.getCurrentPosition((pos) => {
        const driverLat = pos.coords.latitude;
        const driverLng = pos.coords.longitude;

        const map = L.map(mapDiv).setView([driverLat, driverLng], 15);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressText)}`)
            .then(res => res.json())
            .then(data => {
                if(data && data.length > 0) {
                    const custLat = data[0].lat;
                    const custLon = data[0].lon;

                    L.Routing.control({
                        waypoints: [
                            L.latLng(driverLat, driverLng),
                            L.latLng(custLat, custLon)
                        ],
                        createMarker: function() { return null; },
                        showAlternatives: false,
                        lineOptions: { styles: [{color: '#4285F4', opacity: 0.8, weight: 6}] }
                    }).addTo(map);
                    
                    L.marker([driverLat, driverLng]).addTo(map).bindPopup("You").openPopup();
                    L.marker([custLat, custLon]).addTo(map).bindPopup("Customer");

                    startLiveTracking(orderId);

                } else {
                    alert("Address not found on internal map. Use Google Maps.");
                }
            });

    }, (err) => alert("GPS Error: " + err.message));
}

function startLiveTracking(orderId) {
    if(watchId) return; 

    db.collection("orders").doc(orderId).update({ status: 'out_for_delivery' });

    alert("GPS Active! 🛰️\nLocation is being shared.");

    watchId = navigator.geolocation.watchPosition((pos) => {
        db.collection("orders").doc(orderId).update({
            driverLocation: { 
                lat: pos.coords.latitude, 
                lng: pos.coords.longitude 
            },
            lastLocationUpdate: firebase.firestore.FieldValue.serverTimestamp()
        });
    }, null, { enableHighAccuracy: true });
}


// --- 7. SHARE & COMPLETE ---
window.nativeShare = function(phone, url) {
    if (navigator.share) {
        navigator.share({
            title: 'Zafran Delivery',
            text: 'Ihre Bestellung ist unterwegs! Live Tracking:',
            url: url
        }).catch((err) => console.log('Share canceled', err));
    } 
    else {
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        const text = `Hi! 🚗 Ihre Zafran Bestellung ist unterwegs. Live Tracking: ${url}`;
        window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
    }
}

// --- 8. COMPLETE DELIVERY (Modified for Cash Control) ---
window.completeDelivery = function(orderId) {
    if(navigator.vibrate) navigator.vibrate(50);

    // 1. Ask Driver for confirmation
    if(!confirm("💰 Hast du das Geld erhalten und das Essen übergeben?")) return;

    // 2. Update Status to 'delivered' (NOT 'completed')
    // This tells the Waiter: "Driver is back, check the cash."
    db.collection("orders").doc(orderId).update({
        status: "delivered", 
        driverDeliveredAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        // 3. Stop GPS Tracking to save battery
        if(watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            watchId = null;
        }
        alert("Status: Geliefert! Bitte Abrechnung beim Kellner machen.");
    }).catch((error) => {
        alert("Error: " + error.message);
    });
}
