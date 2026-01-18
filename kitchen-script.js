// --- 1. CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyAVh2kVIuFcrt8Dg88emuEd9CQlqjJxDrA",
  authDomain: "zaffran-delight.firebaseapp.com",
  projectId: "zaffran-delight",
  storageBucket: "zaffran-delight.firebasestorage.app",
  messagingSenderId: "1022960860126",
  appId: "1:1022960860126:web:1e06693dea1d0247a0bb4f"
};

// --- MASTER MENU LIST (For Numbering) ---
const MENU_ITEMS = [
    { name: "Tomatensuppe", price: 5.00 }, { name: "Daal Linsensuppe", price: 5.00 }, { name: "Hähnchen Suppe", price: 6.00 }, { name: "Mulligatawny Suppe", price: 6.50 },
    { name: "Veg. Samosa", price: 5.00 }, { name: "Chicken Samosa", price: 5.50 }, { name: "Aloo Tiki", price: 5.00 }, { name: "Mix Pakora", price: 5.50 }, { name: "Paneer Pakora", price: 6.00 }, { name: "Aloo Pakora", price: 5.50 },
    { name: "Gobi Pakora", price: 5.50 }, { name: "Mashroom Pakora", price: 5.50 }, { name: "Chicken Pakora", price: 6.00 }, { name: "Prawn Pakora", price: 7.50 },
    { name: "Vegi Mix", price: 13.00 }, { name: "Palak Aallu", price: 13.00 }, { name: "Saag Aallu", price: 13.00 }, { name: "Tarka Daal", price: 12.50 }, { name: "Bhindi Masala", price: 13.00 }, { name: "Baingen Aallu", price: 13.00 },
    { name: "Mushroom Aallu", price: 13.00 }, { name: "Gobi Aallu", price: 13.00 }, { name: "Channa Masala", price: 12.50 },
    { name: "Veg. Korma", price: 13.50 }, { name: "Nauratan Korma", price: 14.00 }, { name: "Shahi Paneer", price: 14.00 }, { name: "Paneer Tikka Masala", price: 14.50 }, { name: "Paneer Jalfrezi", price: 14.00 }, { name: "Paneer Bhunna Masala", price: 14.00 }, { name: "Palak Paneer", price: 14.00 }, { name: "Paneer Muttar Aallu", price: 14.50 },
    { name: "Chicken Curry", price: 14.50 }, { name: "Chicken Tikka Masala", price: 15.50 }, { name: "Chicken Korma", price: 15.00 }, { name: "Butter Chicken", price: 15.50 }, { name: "Kashmiri Chicken", price: 15.50 }, { name: "Chicken Goan Curry", price: 15.50 }, { name: "Chicken Jalfrezi", price: 15.50 }, { name: "Chicken Kadai", price: 15.50 }, { name: "Chicken Bhuna", price: 15.50 }, { name: "Vegi Chicken", price: 15.00 }, { name: "Chicken Palak", price: 15.50 }, { name: "Chicken Dhansik", price: 15.50 }, { name: "Chicken Madras", price: 15.50 }, { name: "Chicken Vindalo", price: 15.50 },
    { name: "Lamb Curry", price: 17.00 }, { name: "Lamb Tikka Masala", price: 17.50 }, { name: "Lamb Korma", price: 17.00 }, { name: "Butter Lamb", price: 17.50 }, { name: "Kashmiri Lamb", price: 17.50 }, { name: "Lamb Goan Curry", price: 17.50 }, { name: "Lamb Jalfrezi", price: 17.50 }, { name: "Lamb Kadai", price: 17.50 }, { name: "Lamb Bhuna", price: 17.50 }, { name: "Vegi Lamb", price: 17.00 }, { name: "Lamb Palak", price: 17.50 }, { name: "Lamb Dhansik", price: 17.50 }, { name: "Lamb Madras", price: 17.50 }, { name: "Lamb Vindalo", price: 17.50 },
    { name: "Prawn Curry", price: 18.50 }, { name: "Prawn Korma", price: 18.50 }, { name: "Prawn Tikka Masala", price: 18.50 }, { name: "Fish Curry", price: 18.50 }, { name: "Fish Tikka Masala", price: 18.50 },
    { name: "Chicken Tikka", price: 17.50 }, { name: "Tandoori Chicken", price: 17.50 }, { name: "Malai Tikka", price: 17.50 }, { name: "Haryali Tikka", price: 17.50 }, { name: "Lamb Tikka", price: 18.50 }, { name: "Lamb Chops", price: 20.50 }, { name: "Seekh Kabab", price: 19.50 }, { name: "Prawn Tikka", price: 20.50 }, { name: "Paneer Tikka", price: 17.50 }, { name: "Fish Tawa Fry", price: 20.50 }, { name: "Zafrani Mix Grill", price: 24.00 },
    { name: "Vegi Biryani", price: 14.50 }, { name: "Chicken Bombay Biryani", price: 16.50 }, { name: "Lamb Karachi Biryani", price: 17.50 }, { name: "Prawn Zafran Biryani", price: 20.50 },
    { name: "Frisches Tandoori Brot", price: 3.50 }, { name: "Chapati Roti", price: 3.50 }, { name: "Naan", price: 3.00 }, { name: "Allo Naan", price: 4.50 }, { name: "Cheese Naan", price: 5.00 }, { name: "Butter Naan", price: 3.50 }, { name: "Garlic Naan", price: 4.50 }, { name: "Tandoori Parantha", price: 4.50 },
    { name: "Mint Sauce", price: 3.00 }, { name: "Natur Joghurt", price: 2.50 }, { name: "Raita", price: 4.00 }, { name: "Mango Chutney", price: 3.00 }, { name: "Imli (Tamarind) Chutney", price: 3.00 }, { name: "Laal Chutney (scharfe...)", price: 3.50 }, { name: "Green Chutney", price: 3.50 }, { name: "Pickles", price: 3.50 }, { name: "Soße nach Wahl", price: 5.00 },
    { name: "Gemüse-Frühlingsrollen", price: 5.00 }, { name: "Pommes frites", price: 3.50 }, { name: "Chicken Nuggets (6 Stk.)", price: 4.50 },
    { name: "Basmati - Reis", price: 3.50 }, { name: "Zeera - Reis", price: 4.00 }, { name: "Zafrani - Reis", price: 5.50 },
    { name: "Gemischter Salat", price: 6.00 }, { name: "Chicken Salat", price: 7.50 }, { name: "Zafrani Chicken Salat", price: 8.50 },
    { name: "Mango Kulfi", price: 5.50 }, { name: "Almond Kulfi", price: 5.50 }, { name: "Pista Kulfi", price: 5.50 }, { name: "Gulab Jamun", price: 5.50 }, { name: "Ras Malai", price: 5.50 },
    { name: "Lassi", price: 4.00 }, { name: "Mango Lassi", price: 4.50 }, { name: "Rosé Lassi", price: 4.50 }, { name: "Coca Cola", price: 3.50 }, { name: "Cola Zero", price: 3.50 }, { name: "Sprite", price: 3.50 }, { name: "Fanta", price: 3.50 }, { name: "Pinacolada", price: 5.50 }, { name: "Mint-Margarita", price: 5.50 }, { name: "Ipanema", price: 5.50 }
];

function getDishNumber(name) {
    const index = MENU_ITEMS.findIndex(item => item.name === name);
    return index !== -1 ? ` - ${index + 1}` : ""; 
}

// --- 2. INIT FIREBASE ---
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// --- 3. DOM ELEMENTS ---
const connectionIconEl = document.getElementById('connection-icon');
const loginOverlay = document.getElementById('kitchen-login-overlay');
const loginButton = document.getElementById('login-button');
const passwordInput = document.getElementById('kitchen-password');
const loginError = document.getElementById('login-error');
const kdsContentWrapper = document.getElementById('kds-content-wrapper');
const dineInGrid = document.getElementById('dine-in-grid');
const pickupGrid = document.getElementById('pickup-grid');

// Popups & Controls
const newOrderPopup = document.getElementById('new-order-popup-overlay');
const popupOrderDetails = document.getElementById('popup-order-details');
const acceptOrderBtn = document.getElementById('accept-order-btn');
const masterClearBtn = document.getElementById('master-clear-btn');
const rejectOrderBtn = document.getElementById('reject-order-btn');

// Waiter Call
const waiterCallOverlay = document.getElementById('waiter-call-overlay');
const waiterCallTableText = document.getElementById('waiter-call-table');
const dismissWaiterBtn = document.getElementById('dismiss-waiter-btn');
let currentWaiterCallId = null;

// Audio
const alertAudio = document.getElementById('alertSound');
const KITCHEN_PASSWORD = "zafran"; 
const TOTAL_DINE_IN_TABLES = 12;
let allOrders = {};

// --- NEW QUEUE VARIABLES ---
let newOrderQueue = []; 

// --- 4. SECURE LOGIN LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
    loginButton.addEventListener('click', () => {
        // 1. Check if staff typed "zafran"
        if (passwordInput.value === KITCHEN_PASSWORD) {
            
            // 2. Secretly Log in to Firebase
            const hiddenEmail = "webmaster@zafraneuskirchen.de";
            const hiddenPass  = "!Zafran2025";

            const originalText = loginButton.innerText;
            loginButton.innerText = "Verbinden...";
            loginButton.disabled = true;

            firebase.auth().signInWithEmailAndPassword(hiddenEmail, hiddenPass)
            .then(() => {
                // Success! Unlock screen
                loginOverlay.classList.add('hidden');
                kdsContentWrapper.style.opacity = '1';
                
                // Unlock Audio for Alerts
                alertAudio.play().then(() => {
                    alertAudio.pause();
                    alertAudio.currentTime = 0;
                }).catch(e => console.log("Audio Init:", e));

                // Start the App
                initializeKDS(); 
            })
            .catch((error) => {
                console.error("Login Error:", error);
                loginError.innerText = "Verbindungsfehler (Auth)";
                loginError.style.display = 'block';
                loginButton.innerText = originalText;
                loginButton.disabled = false;
            });

        } else {
            loginError.innerText = "Falsches Passwort";
            loginError.style.display = 'block';
        }
    });

    passwordInput.addEventListener('keyup', (e) => e.key === 'Enter' && loginButton.click());
});

// --- 5. INITIALIZE KDS ---
function initializeKDS() {
    createDineInTables();

    // Listen for Clear Buttons (Single Table)
    dineInGrid.querySelectorAll('.clear-table-btn').forEach(btn => {
        btn.addEventListener('click', () => handleClearOrder(btn.dataset.tableId, 'dine-in', btn));
    });

    // Listen for MASTER CLEAR Button
    if(masterClearBtn) {
        masterClearBtn.addEventListener('click', handleMasterClear);
    }

    // START LISTENER
    db.collection("orders")
      .where("status", "in", ["new", "seen", "ready", "cooked"]) 
      .onSnapshot((snapshot) => {
            if(connectionIconEl) connectionIconEl.textContent = '✅'; 
            
            dineInGrid.innerHTML = ''; // Re-render
            createDineInTables(); 
            pickupGrid.innerHTML = '';

            snapshot.docChanges().forEach((change) => {
                const orderData = change.doc.data();
                
                // Waiter Call
                if (orderData.orderType === 'assistance') {
                    if (change.type === "added") showWaiterCall(orderData.table, change.doc.id);
                    if (change.type === "removed" && currentWaiterCallId === change.doc.id) waiterCallOverlay.classList.add('hidden');
                    return;
                }

                // New Order -> Add to Queue
                if (change.type === "added" && orderData.status === "new") {
                    // Check if already in queue to prevent dupes
                    if (!newOrderQueue.find(o => o.id === orderData.id)) {
                        newOrderQueue.push(orderData);
                        // Sort by Time (Oldest First)
                        newOrderQueue.sort((a, b) => a.createdAt - b.createdAt);
                        processNewOrderQueue(); 
                    }
                }
            });

            // Process all docs for display
            const allDocs = [];
            snapshot.forEach(doc => allDocs.push({id: doc.id, ...doc.data()}));
            
            // Sort by Time
            allDocs.sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));

            // Populate global state
            allOrders = {};
            allDocs.forEach(d => allOrders[d.id] = d);

            // Render Grids
            const tablesWithOrders = new Set();
            allDocs.forEach(order => {
                if(order.orderType === 'assistance') return;
                
                if (order.orderType === 'pickup' || order.orderType === 'delivery') {
                    // handled by renderOnlineGrid
                } else {
                    tablesWithOrders.add(order.table);
                }
            });

            renderOnlineGrid();
            tablesWithOrders.forEach(t => renderDineInTable(t));

      }, (error) => {
          console.error("Firebase Error:", error);
          if(connectionIconEl) connectionIconEl.textContent = '❌'; 
      });
}

function createDineInTables() {
    dineInGrid.innerHTML = '';
    for (let i = 1; i <= TOTAL_DINE_IN_TABLES; i++) {
        const tableBox = document.createElement('div');
        tableBox.className = 'table-box';
        tableBox.id = `table-${i}`; 
        tableBox.innerHTML = `
            <div class="table-header"><h2>Table ${i}</h2></div>
            <ul class="order-list"></ul>
            <p class="order-list-empty">Waiting for order...</p>
            <button class="clear-table-btn" data-table-id="${i}">Clear Table ${i}</button>
        `;
        dineInGrid.appendChild(tableBox);
    }
}

// --- QUEUE & POPUP LOGIC ---
function processNewOrderQueue() {
    // If queue is empty, stop everything
    if (newOrderQueue.length === 0) {
        newOrderPopup.classList.add('hidden');
        alertAudio.loop = false;
        alertAudio.pause();
        alertAudio.currentTime = 0;
        return;
    }

    // Get the first order (Oldest)
    const currentOrder = newOrderQueue[0];
    
    // Play Sound Loop
    alertAudio.loop = true;
    alertAudio.play().catch(e => console.log(e));

    // Render Popup
    let title = "";
    if (currentOrder.orderType === 'pickup') title = `🛍️ Pickup: ${currentOrder.customerName}`;
    else if (currentOrder.orderType === 'delivery') title = `🚚 Delivery: ${currentOrder.customerName}`;
    else title = `🍽️ Table ${currentOrder.table}`;

    let itemsHtml = currentOrder.items.map(item => 
        `<li>${item.quantity}x ${item.name} <strong style="color:var(--gold);">${getDishNumber(item.name)}</strong></li>`
    ).join('');

    // --- THE VISIBILITY FIX ---
    // Black Text + Gold Background = High Visibility
    const pendingText = `
        <div style="font-size: 1.5rem; color: black; background: #D4AF37; padding: 10px; border-radius: 5px; margin-bottom: 20px; font-weight: bold; border: 2px solid white;">
            PENDING ORDERS: ${newOrderQueue.length}
        </div>`;

    popupOrderDetails.innerHTML = `
        ${pendingText}
        <h2>${title}</h2>
        <ul>${itemsHtml}</ul>
        ${currentOrder.notes ? `<p style="color:#ff8888;">⚠️ ${currentOrder.notes}</p>` : ''}
    `;
    // Only show Reject button for Delivery/Pickup
    if(rejectOrderBtn) {
        if (currentOrder.orderType === 'pickup' || currentOrder.orderType === 'delivery') {
            rejectOrderBtn.style.display = 'block';
        } else {
            rejectOrderBtn.style.display = 'none'; // Hide for Dine-In tables
        }
    }
    newOrderPopup.classList.remove('hidden');
}

// Accept Button Click Handler
acceptOrderBtn.onclick = () => {
    if (newOrderQueue.length > 0) {
        const orderToAccept = newOrderQueue.shift(); // Remove first from queue
        
        // Mark as 'seen' in DB so it doesn't pop up again
        db.collection("orders").doc(orderToAccept.id).update({ status: "seen" });
        
        // Process next one immediately
        processNewOrderQueue();
    }
};

// Reject Button Click Handler
if(rejectOrderBtn) {
    rejectOrderBtn.onclick = () => {
        if (newOrderQueue.length > 0) {
            // Confirm first to prevent accidents
            if(!confirm("⚠️ REJECT ORDER?\n\nThis will mark the order as CANCELLED and notify the customer.\n\nAre you sure?")) {
                return;
            }

            const orderToReject = newOrderQueue.shift(); // Remove from queue
            
            // Update status to 'cancelled'
            db.collection("orders").doc(orderToReject.id).update({ 
                status: "cancelled" 
            }).then(() => {
                console.log(`Order ${orderToReject.id} cancelled.`);
            }).catch(err => console.error(err));
            
            // Stop sound immediately
            alertAudio.loop = false;
            alertAudio.pause();
            alertAudio.currentTime = 0;

            // Process next order in queue
            processNewOrderQueue();
        }
    };
}

// --- RENDER DINE-IN ---
function renderDineInTable(tableId) {
    const tableBox = document.getElementById(`table-${tableId}`);
    if (!tableBox) return;
    const orderList = tableBox.querySelector('.order-list');
    const emptyMsg = tableBox.querySelector('.order-list-empty');
    const clearBtn = tableBox.querySelector('.clear-table-btn'); 

    const ordersForThisTable = Object.values(allOrders).filter(o => o.table == tableId && o.orderType !== 'pickup' && o.orderType !== 'delivery');
    orderList.innerHTML = ""; 

    if (ordersForThisTable.length === 0) {
        orderList.style.display = 'none';
        emptyMsg.style.display = 'block';
        clearBtn.disabled = true; 
        clearBtn.style.backgroundColor = "#555"; 
    } else {
        orderList.style.display = 'block';
        emptyMsg.style.display = 'none';
        clearBtn.disabled = false;
        clearBtn.style.backgroundColor = "#8B0000"; 

        ordersForThisTable.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);

        ordersForThisTable.forEach(order => {
            const time = order.createdAt.toDate().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
            
            let itemsHtml = order.items.map(item => 
                `<li>${item.quantity}x ${item.name} <strong style="color:var(--gold);">${getDishNumber(item.name)}</strong></li>`
            ).join('');
            
            const isCooked = order.status === 'cooked' || order.status === 'ready';
            const dimStyle = isCooked ? 'opacity:0.5;' : '';
            const badge = isCooked ? '<span style="float:right;">✅</span>' : '';

            orderList.innerHTML += `
                <div class="order-group" style="${dimStyle} border-top:1px solid #444; padding-top:10px;">
                    <h4>Order @ ${time} ${badge}</h4>
                    <ul>${itemsHtml}</ul>
                    ${order.notes ? `<p class="order-notes">⚠️ ${order.notes}</p>` : ''}
                    <button class="btn-serve" onclick="handleServe('${order.id}')">${isCooked ? 'Undo' : 'Mark Ready'}</button>
                </div>
            `;
        });
    }
}

// --- RENDER ONLINE ---
function renderOnlineGrid() {
    pickupGrid.innerHTML = '';
    const onlineOrders = Object.values(allOrders).filter(o => o.orderType === 'pickup' || o.orderType === 'delivery');
    onlineOrders.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);

    if (onlineOrders.length === 0) {
        pickupGrid.innerHTML = `<div class="pickup-box-empty"><p>Waiting for online orders...</p></div>`;
        return;
    }

    onlineOrders.forEach(order => {
        const time = order.createdAt.toDate().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
        const isReady = order.status === 'ready' || order.status === 'cooked';
        
        let typeBadge = order.orderType === 'delivery' ? "🚚 DELIVERY" : "🛍️ PICKUP";
        let typeColor = order.orderType === 'delivery' ? "#e67e22" : "#3498db"; 

        let itemsHtml = order.items.map(item => 
            `<li>${item.quantity}x ${item.name} <strong style="color:var(--gold);">${getDishNumber(item.name)}</strong></li>`
        ).join('');

        pickupGrid.innerHTML += `
            <div class="pickup-box" style="border-top: 3px solid ${typeColor}; ${isReady ? 'opacity:0.6;' : ''}">
                <div class="table-header">
                    <h2>${order.customerName}</h2> 
                    <span class="order-time">@ ${time}</span>
                </div>
                <div style="margin-bottom:8px;"><span style="background:${typeColor}; padding:2px 6px; border-radius:4px;">${typeBadge}</span></div>
                <div style="font-weight:bold; color:#D4AF37;">Target: ${order.timeSlot}</div>
                <ul>${itemsHtml}</ul>
                ${order.notes ? `<div style="color:#ff8888;">📝 "${order.notes}"</div>` : ''}
                <button class="clear-pickup-btn" onclick="handleServe('${order.id}')">${isReady ? 'Undo' : 'Mark Ready'}</button>
            </div>`;
    });
}

// --- ACTIONS ---
window.handleServe = function(orderId) {
    const order = allOrders[orderId];
    // Toggle status
    const newStatus = (order.status === 'ready' || order.status === 'cooked') ? 'seen' : 'ready';
    db.collection("orders").doc(orderId).update({ status: newStatus });
}

window.handleClearOrder = function(tableId) {
    if(!confirm(`Clear all orders for Table ${tableId}?`)) return;
    
    const tableOrders = Object.values(allOrders).filter(o => o.table == tableId && o.orderType !== 'pickup' && o.orderType !== 'delivery');
    const batch = db.batch();
    
    tableOrders.forEach(order => {
        // Archive
        const archiveRef = db.collection("archived_orders").doc(`archive-${order.id}`);
        batch.set(archiveRef, { ...order, closedAt: firebase.firestore.FieldValue.serverTimestamp() });
        // Delete
        const docRef = db.collection("orders").doc(order.id);
        batch.delete(docRef);
    });
    batch.commit();
}

// --- MASTER CLEAR FUNCTION ---
async function handleMasterClear() {
    if(!confirm("⚠️ WARNING: This will DELETE ALL active orders from the screen.\n\nUse this to 'Reset the Day' or clear stuck orders.\n\nAre you sure?")) {
        return;
    }

    const pwd = prompt("Please enter Kitchen Password to confirm deletion:");
    if (pwd !== KITCHEN_PASSWORD) {
        alert("Wrong password. Action cancelled.");
        return;
    }

    try {
        const snapshot = await db.collection("orders").get();
        if (snapshot.empty) {
            alert("Board is already empty.");
            return;
        }

        const batch = db.batch();
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });

        await batch.commit();
        alert("✅ Board Cleared! Ready for new day.");
        location.reload(); 

    } catch (error) {
        console.error("Error clearing board:", error);
        alert("Error clearing board. Check console.");
    }
}

function showWaiterCall(tableNum, docId) {
    currentWaiterCallId = docId;
    waiterCallTableText.innerText = `TABLE ${tableNum}`;
    waiterCallOverlay.classList.remove('hidden');
    alertAudio.loop = true;
    alertAudio.play().catch(e => console.log(e));
}

dismissWaiterBtn.addEventListener('click', () => {
    alertAudio.loop = false;
    alertAudio.pause();
    alertAudio.currentTime = 0;
    if(currentWaiterCallId) {
        db.collection("orders").doc(currentWaiterCallId).delete();
        waiterCallOverlay.classList.add('hidden');
    }
});
