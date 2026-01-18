// --- 1. CONFIGURATION ---
// These are your specific project keys
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

// Global variable to hold the GPS watcher ID
let watchId = null; 

// --- 3. MAIN LISTENER (Real-Time Updates) ---
// We listen for 'delivery' orders that are NOT completed yet.
db.collection("orders")
    .where("orderType", "==", "delivery")
    .where("status", "in", ["preparing", "ready", "out_for_delivery"]) 
    .orderBy("createdAt", "asc")
    .onSnapshot((snapshot) => {
        driverContainer.innerHTML = "";
        
        if (snapshot.empty) {
            driverContainer.innerHTML = `
                <div class="empty-state">
                    <span class="material-icons" style="font-size: 64px; opacity:0.3;">check_circle</span>
                    <p>No active deliveries.</p>
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
        if(error.message.includes("index")) {
            driverContainer.innerHTML = `<p style="color:red; text-align:center; padding:20px; border:1px solid red;">⚠️ SYSTEM ALERT: Index Missing.<br>Open Console (F12) & click the Firebase link to fix.</p>`;
        }
    });


// --- 4. RENDER CARD FUNCTION ---
function renderDriverCard(id, order, now) {
    // A. Address Setup
    const addr = order.deliveryAddress || {};
    const fullAddress = `${addr.street} ${addr.house}, ${addr.zip} Euskirchen`;
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
    
    // B. Generate the Unique Tracking Link
    const domain = window.location.origin; 
    const trackerUrl = `${domain}/tracker.html?id=${id}`;

    // C. Overdue Logic (Check if current time > delivery time)
    let isOverdue = false;
    const timeSlot = order.timeSlot || "";
    if (timeSlot.includes(':')) {
        const [hours, minutes] = timeSlot.split(':').map(Number);
        const deadline = new Date();
        deadline.setHours(hours, minutes, 0, 0);
        if (now > deadline) isOverdue = true;
    }

    // D. Status & Button States
    let statusClass = 'status-preparing';
    let isDisabled = true; // Buttons disabled by default (while cooking)

    // If Kitchen marked "Ready" OR Driver already started
    if (order.status === 'ready' || order.status === 'out_for_delivery') {
        statusClass = 'status-ready';
        isDisabled = false; // Enable buttons
    }
    if (isOverdue) statusClass = 'status-overdue';

    // E. Build HTML
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

        <div class="payment-info">💰 To Collect: ${order.total.toFixed(2)} €</div>

        <button onclick="completeDelivery('${id}')" class="complete-btn" ${isDisabled ? 'disabled style="opacity:0.5"' : ''}>
            DELIVERED
        </button>
    </div>
    `;
    
    driverContainer.innerHTML += html;
}


// --- 5. NAVIGATION & TRACKING LOGIC ---
window.startInAppNav = function(orderId, addressText) {
    const mapDiv = document.getElementById(`in-app-map-${orderId}`);
    
    // Accordion Logic: Close if open
    if (mapDiv.classList.contains('active')) {
        mapDiv.classList.remove('active');
        return; 
    }
    
    // Close other maps
    document.querySelectorAll('.in-app-map-container').forEach(el => el.classList.remove('active'));
    mapDiv.classList.add('active');

    if (!navigator.geolocation) return alert("GPS Error: Not supported");

    navigator.geolocation.getCurrentPosition((pos) => {
        const driverLat = pos.coords.latitude;
        const driverLng = pos.coords.longitude;

        // Initialize Leaflet Map
        const map = L.map(mapDiv).setView([driverLat, driverLng], 15);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

        // Geocode Customer Address
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressText)}`)
            .then(res => res.json())
            .then(data => {
                if(data && data.length > 0) {
                    const custLat = data[0].lat;
                    const custLon = data[0].lon;

                    // Draw Route
                    L.Routing.control({
                        waypoints: [
                            L.latLng(driverLat, driverLng),
                            L.latLng(custLat, custLon)
                        ],
                        createMarker: function() { return null; }, // Hide default markers
                        showAlternatives: false,
                        lineOptions: { styles: [{color: '#4285F4', opacity: 0.8, weight: 6}] }
                    }).addTo(map);
                    
                    // Custom Markers
                    L.marker([driverLat, driverLng]).addTo(map).bindPopup("You").openPopup();
                    L.marker([custLat, custLon]).addTo(map).bindPopup("Customer");

                    // 🚀 START BROADCASTING LOCATION
                    startLiveTracking(orderId);

                } else {
                    alert("Address not found on internal map. Use Google Maps button.");
                }
            });

    }, (err) => alert("GPS Error: " + err.message));
}

// Helper: Send Location to Firebase
function startLiveTracking(orderId) {
    if(watchId) return; // Already tracking

    // Update status to 'out_for_delivery'
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


// --- 6. NATIVE SHARE (For WhatsApp Business Landline) ---
window.nativeShare = function(phone, url) {
    
    // A. Use Native Share (Works on Mobile)
    // This allows the driver to pick "WhatsApp Business" from the list
    if (navigator.share) {
        navigator.share({
            title: 'Zafran Delivery',
            text: 'Your order is on the way! Track here:',
            url: url
        }).catch((err) => console.log('Share canceled', err));
    } 
    
    // B. Fallback for Desktop (Direct WhatsApp Link)
    else {
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        const text = `Hi! 🚗 Your Zafran delivery is on the way. Track live here: ${url}`;
        window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
    }
}


// --- 7. COMPLETE DELIVERY ---
window.completeDelivery = function(orderId) {
    if(navigator.vibrate) navigator.vibrate(50);

    if(!confirm("💰 Confirm: Food delivered & Money collected?")) return;

    db.collection("orders").doc(orderId).update({
        status: "completed",
        deliveredAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        // Stop tracking to save battery
        if(watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            watchId = null;
        }
    }).catch((error) => {
        alert("Error: " + error.message);
    });
}
