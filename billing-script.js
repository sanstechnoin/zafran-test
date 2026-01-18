// --- 1. ZAFFRAN FIREBASE CONFIG ---
const firebaseConfig = {
  apiKey: "AIzaSyAVh2kVIuFcrt8Dg88emuEd9CQlqjJxDrA",
  authDomain: "zaffran-delight.firebaseapp.com",
  projectId: "zaffran-delight",
  storageBucket: "zaffran-delight.firebasestorage.app",
  messagingSenderId: "1022960860126",
  appId: "1:1022960860126:web:1e06693dea1d0247a0bb4f"
};
// --- END OF FIREBASE CONFIG ---

// --- NEW: ZAFFRAN MASTER MENU LIST ---
const MENU_ITEMS = [
    { name: "Tomatensuppe", price: 5.00 },
    { name: "Daal Linsensuppe", price: 5.00 },
    { name: "Hähnchen Suppe", price: 6.00 },
    { name: "Mulligatawny Suppe", price: 6.50 },
    { name: "Veg. Samosa", price: 5.00 },
    { name: "Chicken Samosa", price: 5.50 },
    { name: "Aloo Tiki", price: 5.00 },
    { name: "Mix Pakora", price: 5.50 },
    { name: "Paneer Pakora", price: 6.00 },
    { name: "Aloo Pakora", price: 5.50 },
    { name: "Gobi Pakora", price: 5.50 },
    { name: "Mashroom Pakora", price: 5.50 },
    { name: "Chicken Pakora", price: 6.00 },
    { name: "Prawn Pakora", price: 7.50 },
    { name: "Vegi Mix", price: 13.00 },
    { name: "Palak Aallu", price: 13.00 },
    { name: "Saag Aallu", price: 13.00 },
    { name: "Tarka Daal", price: 12.50 },
    { name: "Bhindi Masala", price: 13.00 },
    { name: "Baingen Aallu", price: 13.00 },
    { name: "Mushroom Aallu", price: 13.00 },
    { name: "Gobi Aallu", price: 13.00 },
    { name: "Channa Masala", price: 12.50 },
    { name: "Veg. Korma", price: 13.50 },
    { name: "Nauratan Korma", price: 14.00 },
    { name: "Shahi Paneer", price: 14.00 },
    { name: "Paneer Tikka Masala", price: 14.50 },
    { name: "Paneer Jalfrezi", price: 14.00 },
    { name: "Paneer Bhunna Masala", price: 14.00 },
    { name: "Palak Paneer", price: 14.00 },
    { name: "Paneer Muttar Aallu", price: 14.50 },
    { name: "Chicken Curry", price: 14.50 },
    { name: "Chicken Tikka Masala", price: 15.50 },
    { name: "Chicken Korma", price: 15.00 },
    { name: "Butter Chicken", price: 15.50 },
    { name: "Kashmiri Chicken", price: 15.50 },
    { name: "Chicken Goan Curry", price: 15.50 },
    { name: "Chicken Jalfrezi", price: 15.50 },
    { name: "Chicken Kadai", price: 15.50 },
    { name: "Chicken Bhuna", price: 15.50 },
    { name: "Vegi Chicken", price: 15.00 },
    { name: "Chicken Palak", price: 15.50 },
    { name: "Chicken Dhansik", price: 15.50 },
    { name: "Chicken Madras", price: 15.50 },
    { name: "Chicken Vindalo", price: 15.50 },
    { name: "Lamb Curry", price: 17.00 },
    { name: "Lamb Tikka Masala", price: 17.50 },
    { name: "Lamb Korma", price: 17.00 },
    { name: "Butter Lamb", price: 17.50 },
    { name: "Kashmiri Lamb", price: 17.50 },
    { name: "Lamb Goan Curry", price: 17.50 },
    { name: "Lamb Jalfrezi", price: 17.50 },
    { name: "Lamb Kadai", price: 17.50 },
    { name: "Lamb Bhuna", price: 17.50 },
    { name: "Vegi Lamb", price: 17.00 },
    { name: "Lamb Palak", price: 17.50 },
    { name: "Lamb Dhansik", price: 17.50 },
    { name: "Lamb Madras", price: 17.50 },
    { name: "Lamb Vindalo", price: 17.50 },
    { name: "Prawn Curry", price: 18.50 },
    { name: "Prawn Korma", price: 18.50 },
    { name: "Prawn Tikka Masala", price: 18.50 },
    { name: "Fish Curry", price: 18.50 },
    { name: "Fish Tikka Masala", price: 18.50 },
    { name: "Chicken Tikka", price: 17.50 },
    { name: "Tandoori Chicken", price: 17.50 },
    { name: "Malai Tikka", price: 17.50 },
    { name: "Haryali Tikka", price: 17.50 },
    { name: "Lamb Tikka", price: 18.50 },
    { name: "Lamb Chops", price: 20.50 },
    { name: "Seekh Kabab", price: 19.50 },
    { name: "Prawn Tikka", price: 20.50 },
    { name: "Paneer Tikka", price: 17.50 },
    { name: "Fish Tawa Fry", price: 20.50 },
    { name: "Zafrani Mix Grill", price: 24.00 },
    { name: "Vegi Biryani", price: 14.50 },
    { name: "Chicken Bombay Biryani", price: 16.50 },
    { name: "Lamb Karachi Biryani", price: 17.50 },
    { name: "Prawn Zafran Biryani", price: 20.50 },
    { name: "Frisches Tandoori Brot", price: 3.50 },
    { name: "Chapati Roti", price: 3.50 },
    { name: "Naan", price: 3.00 },
    { name: "Allo Naan", price: 4.50 },
    { name: "Cheese Naan", price: 5.00 },
    { name: "Butter Naan", price: 3.50 },
    { name: "Garlic Naan", price: 4.50 },
    { name: "Tandoori Parantha", price: 4.50 },
    { name: "Mint Sauce", price: 3.00 },
    { name: "Natur Joghurt", price: 2.50 },
    { name: "Raita", price: 4.00 },
    { name: "Mango Chutney", price: 3.00 },
    { name: "Imli (Tamarind) Chutney", price: 3.00 },
    { name: "Laal Chutney (scharfe...)", price: 3.50 },
    { name: "Green Chutney", price: 3.50 },
    { name: "Pickles", price: 3.50 },
    { name: "Soße nach Wahl", price: 5.00 },
    { name: "Gemüse-Frühlingsrollen", price: 5.00 },
    { name: "Pommes frites", price: 3.50 },
    { name: "Chicken Nuggets (6 Stk.)", price: 4.50 },
    { name: "Basmati - Reis", price: 3.50 },
    { name: "Zeera - Reis", price: 4.00 },
    { name: "Zafrani - Reis", price: 5.50 },
    { name: "Gemischter Salat", price: 6.00 },
    { name: "Chicken Salat", price: 7.50 },
    { name: "Zafrani Chicken Salat", price: 8.50 },
    { name: "Mango Kulfi", price: 5.50 },
    { name: "Almond Kulfi", price: 5.50 },
    { name: "Pista Kulfi", price: 5.50 },
    { name: "Gulab Jamun", price: 5.50 },
    { name: "Ras Malai", price: 5.50 },
    { name: "Lassi", price: 4.00 },
    { name: "Mango Lassi", price: 4.50 },
    { name: "Rosé Lassi", price: 4.50 },
    { name: "Coca Cola", price: 3.50 },
    { name: "Cola Zero", price: 3.50 },
    { name: "Sprite", price: 3.50 },
    { name: "Fanta", price: 3.50 },
    { name: "Pinacolada", price: 5.50 },
    { name: "Mint-Margarita", price: 5.50 },
    { name: "Ipanema", price: 5.50 }
];
// --- END MASTER MENU LIST ---

// --- 2. Initialize Firebase ---
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- 3. Global State and DOM Elements ---
document.addEventListener("DOMContentLoaded", () => {
    const connectionIconEl = document.getElementById('connection-icon');
    const loginOverlay = document.getElementById('billing-login-overlay');
    const loginButton = document.getElementById('login-button');
    const passwordInput = document.getElementById('billing-password');
    const loginError = document.getElementById('login-error');
    const contentWrapper = document.getElementById('billing-content-wrapper');

    const tableListEl = document.getElementById('table-list');
    const billViewEl = document.getElementById('bill-view-container');
    const billTableNumberEl = document.getElementById('bill-table-number');
    const billItemListEl = document.getElementById('bill-item-list');
    const billTotalAmountEl = document.getElementById('bill-total-amount');
    const addItemForm = document.getElementById('add-item-form');
    const closeBillBtn = document.getElementById('close-bill-btn');

    const itemNameInput = document.getElementById('item-name');
    const itemQtyInput = document.getElementById('item-qty');
    const itemPriceInput = document.getElementById('item-price');
    const menuDatalist = document.getElementById('menu-items-list');

    let allCookedOrders = []; 
    let currentSelectedTable = null; 
    const BILLING_PASSWORD = "zafran"; // <-- NEW PASSWORD

    // --- 4. NEW SECURE LOGIN LOGIC ---
loginButton.addEventListener('click', () => {
    // 1. Check if the staff typed the correct simple PIN ("zafran")
    if (passwordInput.value === RECORDS_PASSWORD) {
        
        // 2. If correct, secretly log them in with the real account
        const hiddenEmail = "webmaster@zafraneuskirchen.de";
        const hiddenPass  = "!Zafran2025";

        loginButton.innerText = "Verbinden..."; // Optional: Show loading text
        
        firebase.auth().signInWithEmailAndPassword(hiddenEmail, hiddenPass)
        .then((userCredential) => {
            // Success! The system is now logged in securely.
            loginOverlay.style.display = 'none';
            contentWrapper.style.opacity = '1';
            initializeRecordsPage(); 
        })
        .catch((error) => {
            console.error("Login Error:", error);
            loginError.innerText = "Systemfehler: Login nicht möglich.";
            loginError.style.display = 'block';
            loginButton.innerText = "UNLOCK DASHBOARD";
        });

    } else {
        // Wrong PIN entered
        loginError.innerText = "Falsches Passwort";
        loginError.style.display = 'block';
    }
});
    passwordInput.addEventListener('keyup', (e) => e.key === 'Enter' && loginButton.click());


    // --- 5. Main Billing Functions ---
    function initializeBilling() {
        populateDatalist(); 

        db.collection("orders")
          .where("status", "==", "cooked") 
          .onSnapshot(
            (snapshot) => {
                connectionIconEl.textContent = '✅';
                allCookedOrders = snapshot.docs.map(doc => doc.data());
                renderTableList();
                if (currentSelectedTable) {
                    renderBillForTable(currentSelectedTable);
                }
            },
            (error) => {
                console.error("Error connecting to Firestore: ", error);
                connectionIconEl.textContent = '❌';
            }
        );
        
        itemNameInput.addEventListener('input', handleItemSearch);

        // Add Manual Item Form
        addItemForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!currentSelectedTable) return;

            const name = itemNameInput.value;
            const qty = parseInt(itemQtyInput.value);
            const price = parseFloat(itemPriceInput.value);
            
            if (!name || isNaN(qty) || isNaN(price) || qty <= 0 || price < 0) {
                alert("Please enter valid item details.");
                return;
            }

            const newOrderId = `${currentSelectedTable}-manual-${new Date().getTime()}`;
            const isPickup = allCookedOrders.some(order => order.table === currentSelectedTable && order.orderType === 'pickup');

            const newItem = {
                id: newOrderId,
                table: currentSelectedTable, 
                items: [{ name: name, quantity: qty, price: price }], 
                status: "cooked", 
                createdAt: new Date(),
                orderType: isPickup ? "pickup" : "dine-in",
                // Get customer name and phone from the 'table' identifier
                customerName: isPickup ? currentSelectedTable.split(' (')[0] : null, 
                customerPhone: isPickup ? currentSelectedTable.split(' (')[1].replace(')','') : null, 
                name: name,
                quantity: qty,
                price: price
            };
            
            try {
                await db.collection("orders").doc(newOrderId).set(newItem);
                addItemForm.reset();
            } catch (err) {
                console.error("Error adding manual item: ", err);
                alert("Failed to add item. Check console.");
            }
        });

        // Close Bill Button
        closeBillBtn.addEventListener('click', async () => {
            if (!currentSelectedTable) return;

            const confirmMessage = `Are you sure you want to CLOSE and ARCHIVE the bill for ${currentSelectedTable}? This cannot be undone.`;
            if (!confirm(confirmMessage)) {
                return;
            }
            
            const ordersToClose = allCookedOrders.filter(order => order.table === currentSelectedTable);
            
            if (ordersToClose.length === 0) return;
            
            let finalBillItems = [];
            let finalBillTotal = 0;

            ordersToClose.forEach(order => {
                const items = order.items || [{ name: order.name, quantity: order.quantity, price: order.price }];
                items.forEach(item => {
                    finalBillItems.push({
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    });
                    finalBillTotal += (item.price || 0) * (item.quantity || 1);
                });
            });

            const archiveDoc = {
                table: currentSelectedTable, // This is the Table # or "Name (Phone)"
                items: finalBillItems,
                total: finalBillTotal,
                closedAt: new Date()
            };

            try {
                const archiveId = `archive-${new Date().getTime()}`;
                await db.collection("archived_orders").doc(archiveId).set(archiveDoc);

                const batch = db.batch();
                ordersToClose.forEach(order => {
                    batch.delete(db.collection("orders").doc(order.id));
                });
                await batch.commit();

                console.log(`Bill for ${currentSelectedTable} has been archived and closed.`);
                billViewEl.classList.add('hidden'); 
                currentSelectedTable = null;
            
            } catch (err) {
                console.error("Error archiving bill: ", err);
                alert("Error closing bill. Check the console.");
            }
        });
    } // End initializeBilling()

    function renderTableList() {
        const tablesWithBills = [...new Set(allCookedOrders.map(order => order.table))];
        
        tablesWithBills.sort((a, b) => {
            const aIsNum = !isNaN(parseInt(a));
            const bIsNum = !isNaN(parseInt(b));

            if (aIsNum && !bIsNum) return -1; 
            if (!aIsNum && bIsNum) return 1;  
            if (aIsNum && bIsNum) return parseInt(a) - parseInt(b); 
            return a.localeCompare(b); 
        });
        
        tableListEl.innerHTML = ""; 
        
        if (tablesWithBills.length === 0) {
            tableListEl.innerHTML = "<p>No open bills.</p>";
            return;
        }

        tablesWithBills.forEach(tableIdentifier => {
            const button = document.createElement('button');
            button.className = 'table-list-btn';
            
            const order = allCookedOrders.find(o => o.table === tableIdentifier);
            
            if (order && order.orderType === 'pickup') {
                button.innerHTML = `🛍️ ${tableIdentifier}`; // "Name (Phone)"
            } else {
                button.innerHTML = `Table ${tableIdentifier}`; 
            }
            
            button.dataset.tableId = tableIdentifier;
            
            if (tableIdentifier === currentSelectedTable) {
                button.classList.add('selected');
            }
            
            button.addEventListener('click', () => {
                renderBillForTable(tableIdentifier);
            });
            tableListEl.appendChild(button);
        });
    }

    function renderBillForTable(tableIdentifier) {
        currentSelectedTable = tableIdentifier;
        
        document.querySelectorAll('.table-list-btn').forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.tableId === tableIdentifier);
        });

        const tableOrders = allCookedOrders.filter(order => order.table === tableIdentifier);
        
        if (tableOrders.length === 0) {
            billViewEl.classList.add('hidden');
            currentSelectedTable = null;
            renderTableList(); 
            return;
        }
        
        const isPickup = tableOrders.some(order => order.orderType === 'pickup');

        billViewEl.classList.remove('hidden');
        
        if (isPickup) {
            billTableNumberEl.innerHTML = `🛍️ ${tableIdentifier}`; // "Name (Phone)"
        } else {
            billTableNumberEl.innerHTML = `Table ${tableIdentifier}`; 
        }
        
        billItemListEl.innerHTML = "";
        let total = 0;

        tableOrders.forEach(order => {
            const items = order.items || [{ name: order.name, quantity: order.quantity, price: order.price }];
            
            items.forEach((item, index) => {
                const itemTotal = (item.price || 0) * (item.quantity || 1);
                total += itemTotal;
                
                const li = document.createElement('li');
                li.className = 'bill-item';
                
                li.innerHTML = `
                    <span class="item-name">${item.quantity}x ${item.name}</span>
                    <span class="item-price">${itemTotal.toFixed(2)} €</span>
                    <button class="bill-delete-item" data-order-id="${order.id}" data-item-index="${index}">×</button>
                `;
                billItemListEl.appendChild(li);
            });
        });

        billTotalAmountEl.textContent = `${total.toFixed(2)} €`;
        
        addDeleteButtonListeners();
    }

    function addDeleteButtonListeners() {
        document.querySelectorAll('.bill-delete-item').forEach(btn => {
            btn.replaceWith(btn.cloneNode(true));
        });
        
        document.querySelectorAll('.bill-delete-item').forEach(btn => {
            btn.addEventListener('click', async () => {
                const orderId = btn.dataset.orderId;
                const itemIndex = parseInt(btn.dataset.itemIndex); 
                btn.disabled = true;

                try {
                    const docRef = db.collection("orders").doc(orderId);
                    const doc = await docRef.get();

                    if (!doc.exists) {
                        console.error("Document does not exist, cannot delete item.");
                        return;
                    }

                    const orderData = doc.data();
                    const items = orderData.items;

                    if (!items || items.length === 1) {
                        await docRef.delete();
                    } else {
                        items.splice(itemIndex, 1);
                        await docRef.update({ items: items });
                    }
                } catch (err) {
                    console.error("Error deleting item:", err);
                    btn.disabled = false; 
                }
            });
        });
    }

    // --- NEW HELPER FUNCTIONS ---
    function populateDatalist() {
        menuDatalist.innerHTML = ""; // Clear any existing
        MENU_ITEMS.forEach(item => {
            const option = document.createElement('option');
            option.value = item.name;
            menuDatalist.appendChild(option);
        });
    }

    function handleItemSearch() {
        const query = itemNameInput.value;
        const match = MENU_ITEMS.find(item => item.name.toLowerCase() === query.toLowerCase());
        
        if (match) {
            itemPriceInput.value = match.price.toFixed(2);
        } else {
            itemPriceInput.value = ''; // Clear price if no match
        }
    }
});
