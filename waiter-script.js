// --- 1. ZAFFRAN FIREBASE CONFIG ---
const firebaseConfig = {
  apiKey: "AIzaSyAVh2kVIuFcrt8Dg88emuEd9CQlqjJxDrA",
  authDomain: "zaffran-delight.firebaseapp.com",
  projectId: "zaffran-delight",
  storageBucket: "zaffran-delight.firebasestorage.app",
  messagingSenderId: "1022960860126",
  appId: "1:1022960860126:web:1e06693dea1d0247a0bb4f"
};

// --- WAITER MENU LIST (MASTER KEY) ---
const MENU_ITEMS = [
    { name: "Tomatensuppe", price: 5.00 },        // 1
    { name: "Daal Linsensuppe", price: 5.00 },    // 2
    { name: "Hähnchen Suppe", price: 6.00 },      // 3
    { name: "Mulligatawny Suppe", price: 6.50 },
    { name: "Veg. Samosa", price: 5.00 },
    { name: "Chicken Samosa", price: 5.50 },
    { name: "Aloo Tiki", price: 5.00 },
    { name: "Mix Pakora", price: 5.50 },
    { name: "Paneer Pakora", price: 6.00 },
    { name: "Aloo Pakora", price: 5.50 },        // 10
    { name: "Gobi Pakora", price: 5.50 },
    { name: "Mashroom Pakora", price: 5.50 },
    { name: "Chicken Pakora", price: 6.00 },
    { name: "Prawn Pakora", price: 7.50 },
    { name: "Vegi Mix", price: 13.00 },
    { name: "Palak Aallu", price: 13.00 },
    { name: "Saag Aallu", price: 13.00 },
    { name: "Tarka Daal", price: 12.50 },
    { name: "Bhindi Masala", price: 13.00 },
    { name: "Baingen Aallu", price: 13.00 },      // 20
    { name: "Mushroom Aallu", price: 13.00 },
    { name: "Gobi Aallu", price: 13.00 },
    { name: "Channa Masala", price: 12.50 },
    { name: "Veg. Korma", price: 13.50 },
    { name: "Nauratan Korma", price: 14.00 },
    { name: "Shahi Paneer", price: 14.00 },
    { name: "Paneer Tikka Masala", price: 14.50 },
    { name: "Paneer Jalfrezi", price: 14.00 },
    { name: "Paneer Bhunna Masala", price: 14.00 },
    { name: "Palak Paneer", price: 14.00 },       // 30
    { name: "Paneer Muttar Aallu", price: 14.50 },
    { name: "Chicken Curry", price: 14.50 },
    { name: "Chicken Tikka Masala", price: 15.50 },
    { name: "Chicken Korma", price: 15.00 },
    { name: "Butter Chicken", price: 15.50 },
    { name: "Kashmiri Chicken", price: 15.50 },
    { name: "Chicken Goan Curry", price: 15.50 },
    { name: "Chicken Jalfrezi", price: 15.50 },
    { name: "Chicken Kadai", price: 15.50 },
    { name: "Chicken Bhuna", price: 15.50 },      // 40
    { name: "Vegi Chicken", price: 15.00 },
    { name: "Chicken Palak", price: 15.50 },
    { name: "Chicken Dhansik", price: 15.50 },
    { name: "Chicken Madras", price: 15.50 },
    { name: "Chicken Vindalo", price: 15.50 },
    { name: "Lamb Curry", price: 17.00 },
    { name: "Lamb Tikka Masala", price: 17.50 },
    { name: "Lamb Korma", price: 17.00 },
    { name: "Butter Lamb", price: 17.50 },
    { name: "Kashmiri Lamb", price: 17.50 },      // 50
    { name: "Lamb Goan Curry", price: 17.50 },
    { name: "Lamb Jalfrezi", price: 17.50 },
    { name: "Lamb Kadai", price: 17.50 },
    { name: "Lamb Bhuna", price: 17.50 },
    { name: "Vegi Lamb", price: 17.00 },
    { name: "Lamb Palak", price: 17.50 },
    { name: "Lamb Dhansik", price: 17.50 },
    { name: "Lamb Madras", price: 17.50 },
    { name: "Lamb Vindalo", price: 17.50 },
    { name: "Prawn Curry", price: 18.50 },        // 60
    { name: "Prawn Korma", price: 18.50 },
    { name: "Prawn Tikka Masala", price: 18.50 },
    { name: "Fish Curry", price: 18.50 },
    { name: "Fish Tikka Masala", price: 18.50 },
    { name: "Chicken Tikka", price: 17.50 },
    { name: "Tandoori Chicken", price: 17.50 },
    { name: "Malai Tikka", price: 17.50 },
    { name: "Haryali Tikka", price: 17.50 },
    { name: "Lamb Tikka", price: 18.50 },
    { name: "Lamb Chops", price: 20.50 },         // 70
    { name: "Seekh Kabab", price: 19.50 },
    { name: "Prawn Tikka", price: 20.50 },
    { name: "Paneer Tikka", price: 17.50 },
    { name: "Fish Tawa Fry", price: 20.50 },
    { name: "Zafrani Mix Grill", price: 24.00 },
    { name: "Vegi Biryani", price: 14.50 },
    { name: "Chicken Bombay Biryani", price: 16.50 },
    { name: "Lamb Karachi Biryani", price: 17.50 },
    { name: "Prawn Zafran Biryani", price: 20.50 },
    { name: "Frisches Tandoori Brot", price: 3.50 }, // 80
    { name: "Chapati Roti", price: 3.50 },
    { name: "Naan", price: 3.00 },
    { name: "Allo Naan", price: 4.50 },
    { name: "Cheese Naan", price: 5.00 },
    { name: "Butter Naan", price: 3.50 },
    { name: "Garlic Naan", price: 4.50 },
    { name: "Tandoori Parantha", price: 4.50 },
    { name: "Mint Sauce", price: 3.00 },
    { name: "Natur Joghurt", price: 2.50 },
    { name: "Raita", price: 4.00 },               // 90
    { name: "Mango Chutney", price: 3.00 },
    { name: "Imli (Tamarind) Chutney", price: 3.00 },
    { name: "Laal Chutney (scharfe...)", price: 3.50 },
    { name: "Green Chutney", price: 3.50 },
    { name: "Pickles", price: 3.50 },
    { name: "Soße nach Wahl", price: 5.00 },
    { name: "Gemüse-Frühlingsrollen", price: 5.00 },
    { name: "Pommes frites", price: 3.50 },
    { name: "Chicken Nuggets (6 Stk.)", price: 4.50 },
    { name: "Basmati - Reis", price: 3.50 },      // 100
    { name: "Zeera - Reis", price: 4.00 },
    { name: "Zafrani - Reis", price: 5.50 },
    { name: "Gemischter Salat", price: 6.00 },
    { name: "Chicken Salat", price: 7.50 },
    { name: "Zafrani Chicken Salat", price: 8.50 },
    { name: "Mango Kulfi", price: 5.50 },
    { name: "Almond Kulfi", price: 5.50 },
    { name: "Pista Kulfi", price: 5.50 },
    { name: "Gulab Jamun", price: 5.50 },
    { name: "Ras Malai", price: 5.50 },           // 110
    { name: "Lassi", price: 4.00 },
    { name: "Mango Lassi", price: 4.50 },
    { name: "Rosé Lassi", price: 4.50 },
    { name: "Coca Cola", price: 3.50 },
    { name: "Cola Zero", price: 3.50 },
    { name: "Sprite", price: 3.50 },
    { name: "Fanta", price: 3.50 },
    { name: "Pinacolada", price: 5.50 },
    { name: "Mint-Margarita", price: 5.50 },      // 119
    { name: "Ipanema", price: 5.50 }              // 120
];

// --- HELPER: GET DISH NUMBER ---
function getDishNumber(name) {
    const index = MENU_ITEMS.findIndex(item => item.name === name);
    return index !== -1 ? ` - ${index + 1}` : "";
}

// --- 2. Initialize Firebase ---
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// --- 3. MAIN SCRIPT LOGIC (Inside Event Listener) ---
document.addEventListener("DOMContentLoaded", () => {

    // --- DOM Elements ---
    const connectionIconEl = document.getElementById('connection-icon'); 
    const loginOverlay = document.getElementById('kitchen-login-overlay');
    const loginButton = document.getElementById('login-button');
    const passwordInput = document.getElementById('kitchen-password');
    const loginError = document.getElementById('login-error');
    const kdsContentWrapper = document.getElementById('kds-content-wrapper');
    const dineInGrid = document.getElementById('dine-in-grid');
    const pickupGrid = document.getElementById('pickup-grid');

    // Waiter Order Popup Elements
    const waiterModal = document.getElementById('waiter-order-modal');
    const closeModalX = document.getElementById('close-modal-x');
    const cancelModalBtn = document.getElementById('btn-cancel-modal');
    const submitModalBtn = document.getElementById('btn-submit-modal');
    const menuSearchInput = document.getElementById('menu-search');
    const menuListContainer = document.getElementById('menu-list');
    const currentOrderPreview = document.getElementById('new-order-items-list');
    const modalTableTitle = document.getElementById('modal-table-title');

    // Notification Elements
    const readyPopup = document.getElementById('ready-notification-popup');
    const readyPopupDetails = document.getElementById('ready-popup-details');
    const closeReadyPopupBtn = document.getElementById('close-ready-popup-btn');
    
    // Waiter Call Elements
    const waiterCallOverlay = document.getElementById('waiter-call-overlay');
    const waiterCallTableText = document.getElementById('waiter-call-table');
    const dismissWaiterBtn = document.getElementById('dismiss-waiter-btn');
    let currentWaiterCallId = null;

    // Payment Modal Elements (The New Integration)
    const paymentModal = document.getElementById('payment-modal');
    const paymentItemsList = document.getElementById('payment-items-list');
    const paymentTotalDisplay = document.getElementById('payment-total-display');
    const paymentTitle = document.getElementById('payment-title');
    let ordersToArchive = []; 

    // --- SOUND SETUP ---
    const serviceBell = new Audio('waiter-notification.mp3');
    serviceBell.loop = true; 
    serviceBell.preload = 'auto';
    let notificationAudio = new Audio('notification.mp3'); 

    // --- STATE VARIABLES ---
    let allOrders = {}; 
    let activeTableId = null; 
    let currentDraftOrder = []; 
    const KITCHEN_PASSWORD = "zafran"; 
    const TOTAL_DINE_IN_TABLES = 12;

   // --- 4. NEW SECURE LOGIN LOGIC ---
if (loginButton) {
    loginButton.addEventListener('click', () => {
        // 1. Check if the staff typed the correct PIN ("zafran")
        if (passwordInput.value === KITCHEN_PASSWORD) {

            // 2. If correct, secretly log them in with the real account
            const hiddenEmail = "webmaster@zafraneuskirchen.de";
            const hiddenPass  = "!Zafran2025";

            // Optional: Show loading state
            const originalBtnText = loginButton.innerText;
            loginButton.innerText = "Verbinden...";
            loginButton.disabled = true;

            firebase.auth().signInWithEmailAndPassword(hiddenEmail, hiddenPass)
            .then((userCredential) => {
                // Success!
                loginOverlay.classList.add('hidden');
                kdsContentWrapper.style.opacity = '1';

                // --- IMPORTANT: AUDIO UNLOCK (Preserved) ---
                // This allows sounds to play on mobile devices
                serviceBell.play().then(() => {
                    serviceBell.pause();
                    serviceBell.currentTime = 0;
                }).catch(e => console.log("Audio unlock failed:", e));

                initializeWaiterStation();
            })
            .catch((error) => {
                console.error("Login Error:", error);
                loginError.innerText = "Systemfehler: Login nicht möglich.";
                loginError.style.display = 'block';
                
                // Reset button so they can try again
                loginButton.innerText = originalBtnText;
                loginButton.disabled = false;
            });

        } else {
            // Wrong PIN entered
            loginError.innerText = "Falsches Passwort";
            loginError.style.display = 'block';
        }
    });

    passwordInput.addEventListener('keyup', (e) => e.key === 'Enter' && loginButton.click());

} else {
    // Fallback if no login button is present
    initializeWaiterStation();
}

    // --- 5. Main Waiter Station Functions ---

    function createDineInTables() {
        if(!dineInGrid) return; // Guard for Records Page
        dineInGrid.innerHTML = '';
        for (let i = 1; i <= TOTAL_DINE_IN_TABLES; i++) {
            const tableBox = document.createElement('div');
            tableBox.className = 'table-box';
            tableBox.id = `table-${i}`; 
            tableBox.innerHTML = `
                <div class="table-header">
                    <h2>Table ${i}</h2>
                    <button class="add-order-btn" data-table-id="${i}">➕ Order</button>
                </div>
                <ul class="order-list" data-table-id="${i}"></ul>
                <p class="order-list-empty" data-table-id="${i}">Waiting for order...</p>
                <button class="clear-table-btn" data-table-id="${i}">Clear Table ${i}</button>
            `;
            dineInGrid.appendChild(tableBox);
        }
    }

    function initializeWaiterStation() {
        createDineInTables();

        // Button Listeners (Only if elements exist)
        if(dineInGrid) {
            dineInGrid.querySelectorAll('.clear-table-btn').forEach(btn => {
                btn.addEventListener('click', () => handleClearOrder(btn.dataset.tableId, 'dine-in', btn));
            });

            dineInGrid.querySelectorAll('.add-order-btn').forEach(btn => {
                btn.addEventListener('click', () => openOrderModal(btn.dataset.tableId));
            });
        }

        // Firebase Listener - Handles Orders & Updates UI
        db.collection("orders")
          .where("status", "in", ["new", "seen", "ready", "cooked"]) 
          .onSnapshot(
            (snapshot) => {
                if(connectionIconEl) connectionIconEl.textContent = '✅'; 
                let changedTables = new Set(); 
                snapshot.docChanges().forEach((change) => {
                    const orderData = change.doc.data();
                    const isOnline = orderData.orderType === 'pickup' || orderData.orderType === 'delivery';

                    // Waiter Call
                    if (orderData.orderType === 'assistance') {
                        if (change.type === "added") showWaiterCall(orderData.table, change.doc.id);
                        if (change.type === "removed" && currentWaiterCallId === change.doc.id) stopWaiterSound();
                        return; 
                    }

                    if(!isOnline) changedTables.add(orderData.table); 
                    
                    if (change.type === "modified" && orderData.status === "ready") {
                        triggerReadyNotification(orderData);
                    }
                    if (change.type === "added" || change.type === "modified") {
                        allOrders[orderData.id] = orderData;
                    }
                    if (change.type === "removed") {
                        delete allOrders[orderData.id];
                        if(!isOnline) changedTables.add(orderData.table);
                    }
                });
                
                renderOnlineGrid(); 
                changedTables.forEach(tableIdentifier => {
                    if (!isNaN(parseInt(tableIdentifier))) renderDineInTable(tableIdentifier);
                });
                addDeleteItemListeners();
            },
            (error) => {
                console.error("Error connecting to Firestore: ", error);
                if(connectionIconEl) connectionIconEl.textContent = '❌'; 
            }
        );
    } 

    // --- WAITER CALL FUNCTIONS ---
    function showWaiterCall(tableNum, docId) {
        currentWaiterCallId = docId;
        waiterCallTableText.innerText = `TABLE ${tableNum}`;
        waiterCallOverlay.classList.remove('hidden');
        serviceBell.currentTime = 0;
        serviceBell.play().catch(e => console.log("Audio play blocked", e));
    }

    function stopWaiterSound() {
        serviceBell.pause();
        serviceBell.currentTime = 0;
        waiterCallOverlay.classList.add('hidden');
    }

    if(dismissWaiterBtn) {
        dismissWaiterBtn.addEventListener('click', () => {
            stopWaiterSound();
            if(currentWaiterCallId) {
                db.collection("orders").doc(currentWaiterCallId).delete()
                .then(() => { currentWaiterCallId = null; })
                .catch(err => console.error("Error deleting call:", err));
            }
        });
    }

    function triggerReadyNotification(order) {
        readyPopupDetails.innerHTML = `
            <h4 style="color:var(--gold);margin-top:0;">${order.table}</h4>
            <p>Order is ready!</p>
        `;
        readyPopup.classList.remove('hidden');
        notificationAudio.play().catch(e => console.log(e));
    }
    
    if (closeReadyPopupBtn) {
        closeReadyPopupBtn.addEventListener('click', () => readyPopup.classList.add('hidden'));
    }

    // --- PAYMENT SUMMARY LOGIC (Enhanced with Discount) ---
    function showPaymentSummary(ordersList, title) {
        ordersToArchive = ordersList; 
        
        if(paymentTitle) paymentTitle.innerText = title;
        if(paymentItemsList) {
            paymentItemsList.innerHTML = "";
            let subTotal = 0;
            let totalDiscount = 0;
            let couponName = null;

            ordersList.forEach(order => {
                // 1. Calculate Items Total
                order.items.forEach(item => {
                    let price = item.price;
                    if (!price) {
                        const menuItem = MENU_ITEMS.find(m => m.name === item.name);
                        price = menuItem ? menuItem.price : 0;
                    }
                    const itemTotal = price * item.quantity;
                    subTotal += itemTotal;

                    const row = document.createElement('div');
                    row.className = 'pay-item-row'; 
                    row.style.display = "flex";
                    row.style.justifyContent = "space-between";
                    row.style.borderBottom = "1px dashed #444";
                    row.style.padding = "8px 0";
                    row.style.color = "#ddd";
                    
                    row.innerHTML = `
                        <span>${item.quantity}x ${item.name} <strong style="color:var(--gold);">${getDishNumber(item.name)}</strong></span>
                        <span style="color:var(--gold); font-weight:bold;">${itemTotal.toFixed(2)} €</span>
                    `;
                    paymentItemsList.appendChild(row);
                });

                // 2. Extract Discount Info
                if (order.discount && !isNaN(order.discount)) {
                    totalDiscount += parseFloat(order.discount);
                }
                
                // Get Coupon Name
                if (order.coupon && order.coupon !== "None") {
                    couponName = order.coupon;
                } else if (order.couponCode) {
                    couponName = order.couponCode; // Legacy support
                }
            });

            // 3. Show Breakdown if Discount exists
            if (totalDiscount > 0) {
                // Subtotal Row
                const subRow = document.createElement('div');
                subRow.style.display = "flex";
                subRow.style.justifyContent = "space-between";
                subRow.style.padding = "10px 0 5px 0";
                subRow.style.color = "#aaa";
                subRow.innerHTML = `<span>Zwischensumme:</span><span>${subTotal.toFixed(2)} €</span>`;
                paymentItemsList.appendChild(subRow);

                // Discount Row
                const discountRow = document.createElement('div');
                discountRow.style.display = "flex";
                discountRow.style.justifyContent = "space-between";
                discountRow.style.padding = "0 0 10px 0";
                discountRow.style.color = "#ff4444"; // Red
                discountRow.style.fontWeight = "bold";
                
                // Show "SPAR10 (10%)" or fallback
                const discountText = couponName ? couponName : 'Discount';
                
                discountRow.innerHTML = `
                    <span>Rabatt (${discountText}):</span>
                    <span>- ${totalDiscount.toFixed(2)} €</span>
                `;
                paymentItemsList.appendChild(discountRow);
            }
            
            // 4. Final Total
            const finalTotal = Math.max(0, subTotal - totalDiscount);
            if(paymentTotalDisplay) paymentTotalDisplay.innerText = finalTotal.toFixed(2) + " €";
        }
        
        if(paymentModal) paymentModal.classList.remove('hidden');
    }

    window.closePaymentModal = function() {
        if(paymentModal) paymentModal.classList.add('hidden');
        ordersToArchive = [];
    }

    window.finalizePayment = async function() {
        if(ordersToArchive.length === 0) return;
        const btn = document.querySelector('#payment-modal .btn-submit-order');
        let originalText = "✅ Paid & Close";
        if(btn) {
             originalText = btn.innerText;
             btn.disabled = true;
             btn.innerText = "Processing...";
        }

        try {
            const batch = db.batch();
            for (const order of ordersToArchive) {
                // Get the final displayed amount
                const finalAmountStr = document.getElementById('payment-total-display').innerText.replace(' €','').replace(',','.');
                
                const archiveRef = db.collection("archived_orders").doc(`archive-${order.id}`);
                batch.set(archiveRef, {
                    ...order,
                    status: 'paid', 
                    paidAmount: parseFloat(finalAmountStr), // Save exact final total
                    closedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    day: new Date().toISOString().split('T')[0] 
                });
                
                // Delete from active 'orders'
                const docRef = db.collection("orders").doc(order.id);
                batch.delete(docRef);
            }
            await batch.commit();
            closePaymentModal();
        } catch (e) {
            console.error("Payment Error:", e);
            alert("Error closing order. Check console.");
        } finally {
            if(btn) {
                btn.disabled = false;
                btn.innerText = originalText;
            }
        }
    }

    // --- MAIN ACTION LOGIC ---
    window.handleSingleServe = function(orderId) { handleClearOrder(orderId, 'single-serve', null); }
    window.handleClearOrder = handleClearOrder; 

    async function handleClearOrder(identifier, type, buttonElement) {
        let ordersToProcess = [];
        let action = ""; 
        let title = "";

        if (type === 'dine-in') {
            const tableOrders = Object.values(allOrders).filter(o => o.table === identifier && o.orderType !== 'pickup' && o.orderType !== 'delivery');
            const allCooked = tableOrders.every(o => o.status === 'cooked');
            
            if (allCooked) {
                action = 'payment'; 
                ordersToProcess = tableOrders;
                title = `Bill: Table ${identifier}`;
            } else {
                action = 'serve';
                ordersToProcess = tableOrders.filter(o => o.status !== 'cooked');
            }
        } 
        else if (type === 'pickup-serve') {
            action = 'serve';
            ordersToProcess = [allOrders[identifier]];
        } 
        else if (type === 'pickup-archive') {
            action = 'payment';
            ordersToProcess = [allOrders[identifier]];
            title = `Bill: ${ordersToProcess[0].customerName}`;
        } 
        else if (type === 'single-serve') {
            action = 'serve';
            ordersToProcess = [allOrders[identifier]];
        }

        if (ordersToProcess.length === 0) return;

        if (action === 'payment') {
            showPaymentSummary(ordersToProcess, title);
        } 
        else if (action === 'serve') {
            if (buttonElement) {
                buttonElement.disabled = true;
                buttonElement.textContent = "Processing...";
            }
            try {
                const batch = db.batch();
                ordersToProcess.forEach(order => {
                    const docRef = db.collection("orders").doc(order.id);
                    batch.update(docRef, { status: "cooked" });
                });
                await batch.commit();
            } catch (e) {
                console.error("Error serving:", e);
                if (buttonElement) buttonElement.disabled = false;
            }
        }
    }

    // --- RENDER DINE-IN TABLE ---
    function renderDineInTable(tableId) {
        const tableBox = document.getElementById(`table-${tableId}`);
        if (!tableBox) return; 
        
        const orderList = tableBox.querySelector('.order-list');
        const emptyMsg = tableBox.querySelector('.order-list-empty');
        const clearBtn = tableBox.querySelector('.clear-table-btn'); 

        const ordersForThisTable = Object.values(allOrders).filter(o => o.table === tableId && o.orderType !== 'pickup' && o.orderType !== 'delivery');
        
        orderList.innerHTML = ""; 
        
        if (ordersForThisTable.length === 0) {
            orderList.style.display = 'none';
            emptyMsg.style.display = 'block';
            clearBtn.disabled = false;
            clearBtn.textContent = `Clear Table ${tableId}`;
            clearBtn.style.backgroundColor = "#8B0000"; 
            tableBox.classList.remove('new-order-flash'); 
        } else {
            orderList.style.display = 'block';
            emptyMsg.style.display = 'none';
            ordersForThisTable.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
            let allServed = true;

            ordersForThisTable.forEach(order => {
                const orderTimestamp = order.createdAt.toDate().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
                const isReady = order.status === 'ready';
                const isCooked = order.status === 'cooked';
                if (!isCooked) allServed = false; 

                let itemsHtml = order.items.map((item, index) => `
                    <li class="waiter-item">
                        <span>${item.quantity}x ${item.name} <strong style="color:var(--gold);">${getDishNumber(item.name)}</strong></span>
                        ${!isCooked ? `<button class="delete-item-btn" data-order-id="${order.id}" data-item-index="${index}">×</button>` : ''}
                    </li>
                `).join('');
                
                let notesHtml = order.notes ? `<p class="order-notes">⚠️ Notes: ${order.notes}</p>` : '';
                let orderClass = '';
                let statusBadge = '';
                let actionBtnHtml = '';

                if (isCooked) {
                    statusBadge = '<span style="color:#aaa;font-weight:bold;float:right;">🔵 SERVED</span>';
                } else if (isReady) {
                    orderClass = 'ready-order';
                    statusBadge = '<span style="color:#25D366;font-weight:bold;float:right;">✅ READY</span>';
                    actionBtnHtml = `<button class="btn-serve" onclick="handleSingleServe('${order.id}')">Serve / Clear</button>`;
                }

                const bgStyle = isCooked ? 'background-color: #222; opacity: 0.8; border: 1px solid #444;' : '';

                orderList.innerHTML += `
                    <div class="order-group ${orderClass}" id="${order.id}" style="${bgStyle}">
                        <h4>Order @ ${orderTimestamp} ${statusBadge}</h4>
                        <ul>${itemsHtml}</ul>
                        ${notesHtml} 
                        ${actionBtnHtml}
                    </div>
                `;
            });

            if (allServed) {
                clearBtn.textContent = "💰 Paid & Close Table";
                clearBtn.style.backgroundColor = "#006400"; 
                clearBtn.disabled = false;
            } else {
                clearBtn.textContent = `Clear Table ${tableId}`;
                clearBtn.style.backgroundColor = "#8B0000"; 
                clearBtn.disabled = false;
            }
        }
    }

    // --- RENDER ONLINE ORDERS ---
    function renderOnlineGrid() {
        if(!pickupGrid) return;
        pickupGrid.innerHTML = ''; 
        
        const onlineOrders = Object.values(allOrders).filter(o => o.orderType === 'pickup' || o.orderType === 'delivery');
        onlineOrders.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);

        if (onlineOrders.length === 0) {
            pickupGrid.innerHTML = `<div class="pickup-box-empty"><p>Waiting for online orders...</p></div>`;
            return;
        }

        onlineOrders.forEach(order => {
            const orderTimestamp = order.createdAt.toDate().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
            const isReady = order.status === 'ready';
            const isCooked = order.status === 'cooked';
            
            let typeBadge = order.orderType === 'delivery' ? "🚚 DELIVERY" : "🛍️ PICKUP";
            let typeColor = order.orderType === 'delivery' ? "#e67e22" : "#3498db"; 
            let addressHtml = order.deliveryAddress ? `<div style="font-size:0.85rem; color:#ccc; margin-bottom:8px; padding:5px; background:rgba(255,255,255,0.1); border-radius:4px;"><strong>📍</strong> ${order.deliveryAddress.street} ${order.deliveryAddress.house}, ${order.deliveryAddress.zip}</div>` : "";

            let statusHtml = `<span style="background:${typeColor}; color:white; padding:2px 6px; border-radius:4px; font-size:0.75rem;">${typeBadge}</span>`;
            if (isReady) statusHtml += ' <span style="color:#25D366; font-weight:bold; float:right;">✅ READY</span>';
            else if (isCooked) statusHtml += ' <span style="color:#aaa; font-weight:bold; float:right;">🔵 COMPLETED</span>';

            let itemsHtml = order.items.map((item, index) => `
                <li class="waiter-item">
                    <span>${item.quantity}x ${item.name} <strong style="color:var(--gold);">${getDishNumber(item.name)}</strong></span>
                    ${!isCooked ? `<button class="delete-item-btn" data-order-id="${order.id}" data-item-index="${index}">×</button>` : ''}
                </li>
            `).join('');

            // --- VISUAL FIX: Show Coupon on Card ---
            let couponHtml = "";
            if (order.coupon && order.coupon !== "None") {
                 couponHtml = `<div style="color: #ff4444; font-weight: bold; font-size: 0.9rem; margin-bottom: 5px;">🎟️ Coupon: ${order.coupon}</div>`;
            }

            let notesHtml = order.notes ? `<div style="font-style:italic; color:#888; font-size:0.8rem; margin-bottom:5px;">📝 "${order.notes}"</div>` : '';

            let buttonHtml = isCooked 
                ? `<button class="clear-pickup-btn" style="background-color: #006400;" onclick="handleClearOrder('${order.id}', 'pickup-archive', this)">💰 Paid & Close</button>`
                : `<button class="clear-pickup-btn" onclick="handleClearOrder('${order.id}', 'pickup-serve', this)">Mark Ready / Sent</button>`;

            pickupGrid.innerHTML += `
                <div class="pickup-box ${isReady ? 'ready-order' : ''}" style="${isCooked ? 'opacity:0.6; border:1px solid #444;' : 'border-top: 3px solid ' + typeColor}">
                    <div class="table-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                        <h2 style="font-size:1.1rem; margin:0;">${order.customerName}</h2> 
                        <span class="order-time" style="font-size:0.9rem;">@ ${orderTimestamp}</span>
                    </div>
                    <div style="margin-bottom:8px;">${statusHtml}</div>
                    <div style="font-size:0.85rem; color:#aaa; margin-bottom:5px;">📞 ${order.customerPhone}</div>
                    ${addressHtml}
                    <div style="font-weight:bold; color:#D4AF37; margin-bottom:5px;">Target: ${order.timeSlot} Uhr</div>
                    ${couponHtml} 
                    ${notesHtml}
                    <ul class="order-list" style="margin-top:5px;">${itemsHtml}</ul>
                    ${buttonHtml}
                </div>`;
        });
    }

    // --- POPUP: SEARCH & ADD ITEM ---
    function openOrderModal(tableId) {
        activeTableId = tableId;
        currentDraftOrder = []; 
        if(modalTableTitle) modalTableTitle.textContent = `Order for Table ${tableId}`;
        waiterModal.classList.remove('hidden');
        renderMenu(""); 
        renderDraftOrder();
        if(menuSearchInput) {
            menuSearchInput.value = "";
            menuSearchInput.focus();
        }
        const noteEl = document.getElementById('waiter-order-notes');
        if(noteEl) noteEl.value = ""; 
    }

    function closeOrderModal() {
        waiterModal.classList.add('hidden');
        activeTableId = null;
        currentDraftOrder = [];
    }

    if(closeModalX) closeModalX.addEventListener('click', closeOrderModal);
    if(cancelModalBtn) cancelModalBtn.addEventListener('click', closeOrderModal);

    if(menuSearchInput) menuSearchInput.addEventListener('input', (e) => { renderMenu(e.target.value.toLowerCase()); });

    function renderMenu(query) {
        if(!menuListContainer) return;
        menuListContainer.innerHTML = "";
        // Updated Filter: Checks name OR number
        const filteredItems = MENU_ITEMS.filter((item, index) => {
            const num = (index + 1).toString();
            return item.name.toLowerCase().includes(query) || num.includes(query);
        });

        filteredItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'menu-selection-item';
            div.innerHTML = `<span>${item.name} <strong style="color:var(--gold);">${getDishNumber(item.name)}</strong></span><span style="color: var(--gold);">${item.price.toFixed(2)} €</span>`;
            div.addEventListener('click', () => addItemToDraft(item));
            menuListContainer.appendChild(div);
        });
    }

    function addItemToDraft(item) {
        const existing = currentDraftOrder.find(i => i.name === item.name);
        if (existing) { existing.quantity++; } 
        else { currentDraftOrder.push({ name: item.name, price: item.price, quantity: 1 }); }
        renderDraftOrder();
    }

    function renderDraftOrder() {
        if(!currentOrderPreview) return;
        currentOrderPreview.innerHTML = "";
        if (currentDraftOrder.length === 0) {
            currentOrderPreview.innerHTML = '<p style="color:#aaa; font-style:italic;">No items selected.</p>';
            return;
        }
        currentDraftOrder.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'preview-item';
            div.innerHTML = `
                <span>${item.quantity}x ${item.name} <strong style="color:var(--gold);">${getDishNumber(item.name)}</strong></span>
                <button style="background:#8B0000;color:white;border:none;border-radius:50%;width:20px;height:20px;cursor:pointer;" onclick="removeDraftItem(${index})">×</button>
            `;
            currentOrderPreview.appendChild(div);
        });
    }

    window.removeDraftItem = function(index) {
        if (currentDraftOrder[index].quantity > 1) { currentDraftOrder[index].quantity--; } 
        else { currentDraftOrder.splice(index, 1); }
        renderDraftOrder();
    };

    if(submitModalBtn) {
        submitModalBtn.addEventListener('click', async () => {
            if (!activeTableId || currentDraftOrder.length === 0) return;
            submitModalBtn.textContent = "Sending...";
            submitModalBtn.disabled = true;
            const orderId = `${activeTableId}-${new Date().getTime()}`;
            const noteEl = document.getElementById('waiter-order-notes');
            let finalNote = "Waiter Order"; 
            if (noteEl && noteEl.value.trim() !== "") { finalNote = noteEl.value.trim(); }

            const newOrder = {
                id: orderId,
                table: activeTableId,
                items: currentDraftOrder,
                status: "new",
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                orderType: "dine-in",
                notes: finalNote
            };

            try {
                await db.collection("orders").doc(orderId).set(newOrder);
                closeOrderModal();
            } catch (e) {
                console.error("Error submitting waiter order:", e);
                alert("Failed to submit order.");
            } finally {
                submitModalBtn.textContent = "Submit Order";
                submitModalBtn.disabled = false;
            }
        });
    }

    function addDeleteItemListeners() {
        document.querySelectorAll('.delete-item-btn').forEach(btn => {
            btn.onclick = async () => {
                const orderId = btn.dataset.orderId;
                const itemIndex = parseInt(btn.dataset.itemIndex); 
                if (isNaN(itemIndex)) return;
                if (!confirm("Remove this item?")) return;
                btn.disabled = true;
                try {
                    const docRef = db.collection("orders").doc(orderId);
                    const doc = await docRef.get();
                    if (!doc.exists) return;
                    const orderData = doc.data();
                    const items = orderData.items;
                    if (!items) return; 
                    if (items.length === 1) { await docRef.delete(); } 
                    else {
                        items.splice(itemIndex, 1);
                        await docRef.update({ items: items });
                    }
                } catch (err) {
                    console.error("Error deleting item:", err);
                    btn.disabled = false; 
                }
            };
        });
    }
});
