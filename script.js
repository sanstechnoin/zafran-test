// --- 1. ZAFFRAN FIREBASE CONFIG ---
const firebaseConfig = {
  apiKey: "AIzaSyAVh2kVIuFcrt8Dg88emuEd9CQlqjJxDrA",
  authDomain: "zaffran-delight.firebaseapp.com",
  projectId: "zaffran-delight",
  storageBucket: "zaffran-delight.firebasestorage.app",
  messagingSenderId: "1022960860126",
  appId: "1:1022960860126:web:1e06693dea1d0247a0bb4f"
};

// --- 2. Initialize Firebase ---
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// --- GLOBAL STATE ---
let cart = [];
let currentCoupon = null; 
let cartSubtotal = 0;      
let globalConfig = { whatsappNumber: "" }; 
let businessHours = {}; // Will hold loaded settings

// --- CONFIGURATION ---
const MIN_ORDER_DELIVERY = 20.00; 

// --- HELPER: DETECT PAGE TYPE ---
const isDeliveryPage = () => document.getElementById('delivery-street') !== null;

document.addEventListener("DOMContentLoaded", async () => {
    
    // --- 1. LOAD SETTINGS & CHECK STATUS ---
    await loadSettingsAndHours();

    // --- Header Scroll Padding ---
    const header = document.querySelector('header');
    function updateScrollPadding() {
        if (header) {
            document.documentElement.style.setProperty('scroll-padding-top', `${header.offsetHeight}px`);
        }
    }
    updateScrollPadding();
    window.addEventListener('resize', updateScrollPadding);
    
    // --- Element References ---
    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartItemCountEl = document.getElementById('cart-item-count');
    
    const subtotalAmountEl = document.getElementById('subtotal-amount'); 
    const totalAmountEl = document.getElementById('total-amount');
    
    const cartContentEl = document.getElementById('cart-content');
    const orderForm = document.getElementById('order-form');
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const firebaseBtn = document.getElementById('firebase-btn');
    const consentCheckbox = document.getElementById('privacy-consent');
    const applyCouponBtn = document.getElementById('apply-coupon-btn');

    // New Success Modal Elements
    const successModal = document.getElementById('success-modal');
    const successContent = document.getElementById('success-summary-content');

    // --- Event Listeners ---
    if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCart);
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
    
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', handleApplyCoupon);
    }

    // --- Modal Logic ---
    function openCart() {
        if(successModal) successModal.classList.remove('flex'); 
        cartContentEl.style.display = 'block'; 
        cartOverlay.classList.remove('hidden');
        updateCart(); 
        toggleCheckoutButtons();
    }
    
    function closeCart() { 
        cartOverlay.classList.add('hidden'); 
    }

    window.closeSuccessModal = function() {
        if(successModal) successModal.classList.remove('flex');
    };

    function toggleCheckoutButtons() {
        if (consentCheckbox) {
            const isChecked = consentCheckbox.checked;
            if (whatsappBtn) whatsappBtn.disabled = !isChecked;
            if (firebaseBtn) firebaseBtn.disabled = !isChecked; 
        }
    }
    if (consentCheckbox) consentCheckbox.addEventListener('change', toggleCheckoutButtons);
    toggleCheckoutButtons(); 

    // --- Item Controls ---
    function initItemControls() {
        document.querySelectorAll('.add-btn').forEach(btn => {
            btn.removeEventListener('click', handleAddToCartClick);
            btn.addEventListener('click', handleAddToCartClick);
        });
        document.querySelectorAll('.menu-btn-minus').forEach(btn => {
            btn.removeEventListener('click', handleRemoveFromCartClick);
            btn.addEventListener('click', handleRemoveFromCartClick);
        });
    }
    
    function handleAddToCartClick() {
        addToCart(
            this.dataset.id, 
            this.dataset.name, 
            parseFloat(this.dataset.price),
            this.dataset.category 
        );
    }
    function handleRemoveFromCartClick() {
        adjustQuantity(this.dataset.id, -1);
    }
    initItemControls(); 
    
    function addToCart(id, name, price, category) {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, category: category || "unknown", quantity: 1 });
        }
        updateCart();
    }

    function adjustQuantity(id, amount) {
        const item = cart.find(item => item.id === id);
        if (!item) return;
        item.quantity += amount;
        if (item.quantity <= 0) cart = cart.filter(item => item.id !== id);
        updateCart();
    }

    // --- COUPON LOGIC ---
    async function handleApplyCoupon() {
        const codeInput = document.getElementById('coupon-input');
        const msgEl = document.getElementById('coupon-message');
        const code = codeInput.value.trim().toUpperCase();

        if (!code) return;

        msgEl.textContent = "Überprüfe...";
        msgEl.style.color = "#666";

        try {
            const doc = await db.collection('coupons').doc(code).get();
            
            if (!doc.exists) {
                msgEl.textContent = "Ungültiger Code.";
                msgEl.style.color = "red";
                currentCoupon = null;
            } else {
                const data = doc.data();
                const today = new Date().toISOString().split('T')[0];

                if (data.expiryDate && data.expiryDate !== 'Recurring' && data.expiryDate < today) {
                    msgEl.textContent = "Gutschein abgelaufen.";
                    msgEl.style.color = "red";
                    currentCoupon = null;
                } else {
                    currentCoupon = data;
                    msgEl.textContent = `Code gefunden. Prüfe...`;
                    msgEl.style.color = "#666";
                    codeInput.value = ""; 
                }
            }
            updateCart(); 
        } catch (error) {
            console.error("Coupon Error:", error);
            msgEl.textContent = "Fehler beim Prüfen.";
            msgEl.style.color = "red";
        }
    }

    function calculateFinalTotals() {
        let discountAmount = 0;
        let couponStatusMsg = "";
        let couponStatusColor = "";

        if (currentCoupon) {
            const minOrder = currentCoupon.minOrder || 0; 
            const isPercent = currentCoupon.discountType === 'percent';
            const value = currentCoupon.discountValue || 0;

            if (cartSubtotal < minOrder) {
                couponStatusMsg = `Gutschein "${currentCoupon.code}": Mindestbestellwert ${minOrder}€ nicht erreicht.`;
                couponStatusColor = "orange";
                discountAmount = 0; 
            } else {
                const isAll = currentCoupon.validCategories === 'all' || 
                              (Array.isArray(currentCoupon.validCategories) && currentCoupon.validCategories.includes('all'));

                let eligibleAmount = 0;

                if (isAll) {
                    eligibleAmount = cartSubtotal;
                } else {
                    cart.forEach(item => {
                        if (item.category && currentCoupon.validCategories.includes(item.category)) {
                            eligibleAmount += (item.price * item.quantity);
                        }
                    });
                }

                if (eligibleAmount > 0) {
                    if (isPercent) {
                        discountAmount = (eligibleAmount * value) / 100;
                        couponStatusMsg = `Gutschein "${currentCoupon.code}" (${value}%) aktiviert: -${discountAmount.toFixed(2)} €`;
                    } else {
                        discountAmount = Math.min(value, eligibleAmount);
                        couponStatusMsg = `Gutschein "${currentCoupon.code}" (${value}€) aktiviert: -${discountAmount.toFixed(2)} €`;
                    }
                    couponStatusColor = "green";
                } else {
                    couponStatusMsg = `Gutschein "${currentCoupon.code}" nicht anwendbar auf diese Artikel.`;
                    couponStatusColor = "orange";
                }
            }
        }

        const finalTotal = Math.max(0, cartSubtotal - discountAmount);
        return { discountAmount, finalTotal, couponStatusMsg, couponStatusColor };
    }

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let subtotal = 0;
        let itemCount = 0;

        document.querySelectorAll('.item-qty').forEach(qtyEl => {
            const item = cart.find(i => i.id === qtyEl.dataset.id);
            const controlsDiv = qtyEl.closest('.quantity-controls');
            if (item) {
                qtyEl.innerText = item.quantity;
                controlsDiv.classList.remove('hidden');
            } else {
                qtyEl.innerText = '1'; 
                controlsDiv.classList.add('hidden');
            }
        });

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Ihre Bestellung ist leer.</p>";
        } else {
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                itemCount += item.quantity;
                const itemEl = document.createElement('div');
                itemEl.classList.add('cart-item');
                itemEl.innerHTML = `
                    <span class="cart-item-name">${item.name}</span>
                    <div class="cart-item-controls">
                        <button class="cart-btn-minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="cart-btn-plus" data-id="${item.id}">+</button>
                    </div>
                    <span class="cart-item-price">${itemTotal.toFixed(2)} €</span>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
        }

        cartSubtotal = subtotal; 
        if(subtotalAmountEl) subtotalAmountEl.innerText = `${subtotal.toFixed(2)} €`;

        const { discountAmount, finalTotal, couponStatusMsg, couponStatusColor } = calculateFinalTotals();

        totalAmountEl.innerText = `${finalTotal.toFixed(2)} €`;
        
        const msgEl = document.getElementById('coupon-message');
        if(currentCoupon && msgEl) {
             msgEl.textContent = couponStatusMsg;
             msgEl.style.color = couponStatusColor;
        } else if (!currentCoupon && msgEl) {
             msgEl.textContent = ""; 
        }

        cartItemCountEl.innerText = itemCount;
        cartToggleBtn.classList.toggle('hidden', itemCount === 0);
        addCartItemControls();
    }

    function addCartItemControls() {
        document.querySelectorAll('.cart-btn-plus').forEach(btn => {
            btn.addEventListener('click', () => adjustQuantity(btn.dataset.id, 1));
        });
        document.querySelectorAll('.cart-btn-minus').forEach(btn => {
            btn.addEventListener('click', () => adjustQuantity(btn.dataset.id, -1));
        });
    }
    
    function generateOrderSummary() {
        let summaryText = "";
        let itemsOnly = [];
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            summaryText += `${item.quantity}x ${item.name} (${itemTotal.toFixed(2)} €)\n`;
            itemsOnly.push({
                quantity: item.quantity,
                name: item.name,
                price: item.price,
                category: item.category || "unknown"
            });
        });

        const { discountAmount, finalTotal } = calculateFinalTotals();

        let couponDisplay = null;
        if (currentCoupon && discountAmount > 0) {
            const typeSymbol = currentCoupon.discountType === 'percent' ? '%' : '€';
            couponDisplay = `${currentCoupon.code} (${currentCoupon.discountValue}${typeSymbol})`;
        }

        return { 
            summaryText, 
            itemsOnly, 
            originalTotal: cartSubtotal,
            discount: discountAmount,
            finalTotal: finalTotal,
            couponInfo: couponDisplay
        };
    }

    // --- DISPLAY SUCCESS MODAL ---
    function showConfirmationScreen(formData, summary) {
        let html = `<strong style="color:var(--gold)">Kunde:</strong> ${formData.name}<br>`;
        
        if (isDeliveryPage()) {
            html += `<strong style="color:var(--gold)">Lieferung an:</strong> ${formData.address.street} ${formData.address.house}, ${formData.address.zip}<br>`;
        }

        html += `<strong style="color:var(--gold)">Zeit:</strong> ${formData.time} Uhr<br>
                 <strong style="color:var(--gold)">Telefon:</strong> ${formData.phone}<br><br>
                 <strong style="color:var(--gold)">Bestellung:</strong><br>${summary.summaryText.replace(/\n/g, '<br>')}`;
        
        if (summary.discount > 0) {
            html += `<br>Zwischensumme: ${summary.originalTotal.toFixed(2)} €`;
            html += `<br><span style="color:#28a745">Gutschein (${summary.couponInfo}): -${summary.discount.toFixed(2)} €</span>`;
        }
        
        html += `<br><br><strong style="font-size:1.1rem; color:#fff;">Total: ${summary.finalTotal.toFixed(2)} €</strong>`;

        if (formData.notes) {
            html += `<br><br><strong style="color:var(--gold)">Anmerkungen:</strong><br>${formData.notes.replace(/\n/g, '<br>')}`;
        }
        
        closeCart();
        successContent.innerHTML = html;
        successModal.classList.add('flex'); 
        
        cart = [];
        currentCoupon = null; 
        if(document.getElementById('coupon-input')) document.getElementById('coupon-input').value = "";
        if(document.getElementById('coupon-message')) document.getElementById('coupon-message').textContent = "";
        orderForm.reset();
        if (consentCheckbox) consentCheckbox.checked = false;
        updateCart(); 
    }

    // --- SEND TO FIREBASE ---
    if(firebaseBtn) {
        firebaseBtn.addEventListener('click', async () => {
            if (cart.length === 0) return alert("Ihr Warenkorb ist leer.");
            if (!validateForm()) return; 

            // Final Time Validity Check before sending
            const selectedTime = document.getElementById('pickup-time').value;
            if(!isTimeStillValid(selectedTime)) {
                alert("Die gewählte Zeit ist leider nicht mehr verfügbar. Bitte wählen Sie eine neue Zeit.");
                await loadSettingsAndHours(); // Refresh slots
                return;
            }

            if (isDeliveryPage() && cartSubtotal < MIN_ORDER_DELIVERY) {
                alert(`Der Mindestbestellwert für Lieferungen beträgt ${MIN_ORDER_DELIVERY.toFixed(2)}€.`);
                return;
            }

            const formData = getFormData();
            const summaryData = generateOrderSummary();
            const orderId = `${isDeliveryPage() ? 'delivery' : 'pickup'}-${new Date().getTime()}`;
            
            const orderData = {
                id: orderId,
                table: `${formData.name} (${formData.phone})`,
                customerName: formData.name, 
                customerPhone: formData.phone, 
                orderType: isDeliveryPage() ? 'delivery' : 'pickup',
                timeSlot: formData.time, 
                notes: formData.notes,
                deliveryAddress: isDeliveryPage() ? formData.address : null,
                items: summaryData.itemsOnly,
                subtotal: summaryData.originalTotal,
                discount: summaryData.discount,
                coupon: summaryData.couponInfo || "None",
                total: summaryData.finalTotal,
                status: "new",
                createdAt: new Date()
            };

            firebaseBtn.innerText = "Senden...";
            firebaseBtn.disabled = true;

            try {
                await db.collection("orders").doc(orderId).set(orderData);
                showConfirmationScreen(formData, summaryData); 
            } catch (error) {
                console.error("Error sending order: ", error);
                alert("Fehler beim Senden. Bitte erneut versuchen.");
            } finally {
                firebaseBtn.innerText = "Kostenpflichtig Bestellen";
                firebaseBtn.disabled = false;
                toggleCheckoutButtons();
            }
        });
    }

    // --- SEND TO WHATSAPP ---
    if(whatsappBtn) {
        whatsappBtn.addEventListener('click', async () => {
            if (cart.length === 0) return alert("Ihr Warenkorb ist leer.");
            if (!validateForm()) return;

            // Final Time Validity Check
            const selectedTime = document.getElementById('pickup-time').value;
            if(!isTimeStillValid(selectedTime)) {
                alert("Die gewählte Zeit ist leider nicht mehr verfügbar. Bitte wählen Sie eine neue Zeit.");
                await loadSettingsAndHours();
                return;
            }

            if (isDeliveryPage() && cartSubtotal < MIN_ORDER_DELIVERY) {
                alert(`Der Mindestbestellwert für Lieferungen beträgt ${MIN_ORDER_DELIVERY.toFixed(2)}€.`);
                return;
            }

            const formData = getFormData();
            const WHATSAPP_NUMBER = globalConfig.whatsappNumber; 
            if (!WHATSAPP_NUMBER) return alert("WhatsApp-Nummer fehlt. Bitte Administrator kontaktieren.");

            const summaryData = generateOrderSummary();
            
            // Log to Firebase
            const orderId = `${isDeliveryPage() ? 'delivery' : 'pickup'}-${new Date().getTime()}`;
            const orderData = {
                id: orderId,
                table: `${formData.name} (${formData.phone})`,
                customerName: formData.name, 
                customerPhone: formData.phone,
                orderType: isDeliveryPage() ? 'delivery' : 'pickup',
                timeSlot: formData.time, 
                notes: formData.notes,
                deliveryAddress: isDeliveryPage() ? formData.address : null,
                items: summaryData.itemsOnly, 
                subtotal: summaryData.originalTotal,
                discount: summaryData.discount,
                coupon: summaryData.couponInfo || "None",
                total: summaryData.finalTotal,
                status: "new", 
                createdAt: new Date()
            };
            db.collection("orders").doc(orderId).set(orderData).catch(e => console.error("Firebase err", e));
            
            // Build Message
            let msg = `*Neue ${isDeliveryPage() ? 'Lieferung' : 'Abholung'}*\n\n`;
            msg += `*Kunde:* ${formData.name}\n*Telefon:* ${formData.phone}\n`;
            
            if (isDeliveryPage()) {
                msg += `*Adresse:* ${formData.address.street} ${formData.address.house}\n`;
                msg += `*Ort:* ${formData.address.zip}\n`;
            }

            msg += `*Zeit:* ${formData.time} Uhr\n\n`;
            msg += `*Bestellung:*\n${summaryData.summaryText}`;
            
            if (summaryData.discount > 0) {
                msg += `\nZwischensumme: ${summaryData.originalTotal.toFixed(2)} €`;
                msg += `\nGutschein (${summaryData.couponInfo}): -${summaryData.discount.toFixed(2)} €`;
            }
            msg += `\n*Gesamtbetrag: ${summaryData.finalTotal.toFixed(2)} €*`;
            if (formData.notes) msg += `\n\n*Anmerkungen:*\n${formData.notes}`;

            let encodedMessage = encodeURIComponent(msg);
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
        });
    }
});

// ===============================================
// 3. LOAD DYNAMIC SETTINGS & BUSINESS RULES
// ===============================================

async function loadSettingsAndHours() {
    try {
        // A. Load General Settings (Marquee, Whatsapp)
        const genDoc = await db.collection('settings').doc('general').get();
        if (genDoc.exists) {
            const data = genDoc.data();
            if(data.whatsappNumber) globalConfig.whatsappNumber = data.whatsappNumber;
            
            const marqueeContainer = document.getElementById('marquee-container');
            const marqueeText = document.getElementById('marquee-text');
            if (marqueeText && marqueeContainer) {
                if (data.marqueeText && data.marqueeText.trim() !== "") {
                    marqueeText.innerText = data.marqueeText;
                    marqueeContainer.classList.remove('hidden');
                } else {
                    marqueeContainer.classList.add('hidden'); 
                }
            }
        }

        // B. Load Hours & Holidays
        const hoursDoc = await db.collection('settings').doc('hours').get();
        if(hoursDoc.exists) {
            businessHours = hoursDoc.data();
        } else {
            // Fallback Defaults
            businessHours = {
                weekly: {
                    monday: {open:false}, tuesday:{open:true, start:"12:00", end:"21:00"},
                    wednesday:{open:true, start:"12:00", end:"21:00"}, thursday:{open:true, start:"12:00", end:"21:00"},
                    friday:{open:true, start:"12:00", end:"21:00"}, saturday:{open:true, start:"12:00", end:"21:00"},
                    sunday:{open:true, start:"12:00", end:"21:00"}
                },
                holidays: [],
                pause: null
            };
        }

        // C. Apply Rules
        checkBusinessStatus();

    } catch (error) {
        console.warn("Error loading settings:", error);
    }
}

function checkBusinessStatus() {
    const statusMsg = document.getElementById('shop-status-message');
    const btnWrapper = document.getElementById('checkout-buttons-wrapper');
    const timeSelect = document.getElementById('pickup-time');
    const timeContainer = document.getElementById('pickup-time-container');

    if (!statusMsg || !btnWrapper) return; 

    const now = new Date();
    const serviceType = isDeliveryPage() ? 'delivery' : 'pickup';

    // 1. CHECK PAUSE (SCENARIO 4)
    if(businessHours.pause && businessHours.pause.active) {
        if(businessHours.pause.until > now.getTime()) {
            // Check if this specific service is paused or ALL
            if(businessHours.pause.type === 'all' || businessHours.pause.type === serviceType) {
                const resumeTime = new Date(businessHours.pause.until);
                const timeStr = resumeTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                disableShop(`Momentan keine Bestellungen möglich. Wir sind ab ${timeStr} Uhr wieder da.`);
                return;
            }
        }
    }

    // 2. CHECK HOLIDAYS (SCENARIO 3)
    if(businessHours.holidays && businessHours.holidays.length > 0) {
        for(let h of businessHours.holidays) {
            const start = new Date(h.start);
            const end = new Date(h.end);
            if(now >= start && now <= end) {
                disableShop(h.reason ? `Geschlossen: ${h.reason}` : "Wir haben momentan geschlossen (Urlaub).");
                return;
            }
        }
    }

    // 3. CHECK WEEKLY SCHEDULE (SCENARIO 1 & 2)
    const daysMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const todayName = daysMap[now.getDay()];
    const todayConfig = businessHours.weekly ? businessHours.weekly[todayName] : null;

    // Check Day Open
    if(!todayConfig || !todayConfig.open) {
        disableShop("Heute haben wir geschlossen.");
        return;
    }

    // Determine Valid Time Window
    let openTimeStr = todayConfig.start;
    let closeTimeStr = todayConfig.end;

    // SCENARIO 2: Check Delivery Specific Hours
    if(serviceType === 'delivery') {
        // If delivery hours exist and are not empty, use them
        if(todayConfig.delStart && todayConfig.delEnd) {
            openTimeStr = todayConfig.delStart;
            closeTimeStr = todayConfig.delEnd;
        } else if(!todayConfig.start) {
            // Fallback if no general start time
            disableShop("Heute keine Lieferung möglich.");
            return;
        }
    }

    if(!openTimeStr || !closeTimeStr) {
        disableShop("Öffnungszeiten nicht konfiguriert.");
        return;
    }

    // Parse Opening/Closing Times for Today
    const [openH, openM] = openTimeStr.split(':').map(Number);
    const [closeH, closeM] = closeTimeStr.split(':').map(Number);

    const openDate = new Date(now); openDate.setHours(openH, openM, 0);
    const closeDate = new Date(now); closeDate.setHours(closeH, closeM, 0);

    // If "Now" is past closing time
    if(now > closeDate) {
        disableShop("Wir haben für heute geschlossen.");
        return;
    }

    // 4. GENERATE TIME SLOTS (with Rounding Logic)
    // Delivery = 60 min, Pickup = 45 min
    const bufferMinutes = isDeliveryPage() ? 60 : 45;
    
    // Enable UI
    if (statusMsg) statusMsg.style.display = 'none';
    if (btnWrapper) btnWrapper.style.display = 'flex';
    if (timeContainer) timeContainer.style.display = 'block';

    generateTimeSlots(now, timeSelect, bufferMinutes, openDate, closeDate);
}

function generateTimeSlots(now, selectElement, bufferMinutes, shopOpenDate, shopCloseDate) {
    if(!selectElement) return;
    selectElement.innerHTML = '<option value="" disabled selected>-- Zeit wählen --</option>';

    // 1. Calculate Earliest Possible Slot based on "Now + Buffer"
    let readyTime = new Date(now.getTime() + bufferMinutes * 60000);

    // ROUNDING LOGIC (7:05 + 45m -> 7:50 -> Round up to 8:00)
    let m = readyTime.getMinutes();
    let remainder = m % 15;
    if(remainder !== 0) {
        readyTime.setMinutes(m + (15 - remainder)); // Round up to next 15
        readyTime.setSeconds(0);
    }

    // 2. Ensure we don't start BEFORE the shop actually opens
    // If "ReadyTime" is 11:30 but shop opens at 12:00 -> Start at 12:00
    if (readyTime < shopOpenDate) {
        readyTime = shopOpenDate;
    }

    // 3. Generate Slots until Closing Time
    let slotTime = new Date(readyTime);

    // Safety: prevent infinite loop if times are weird
    let count = 0; 
    while (slotTime <= shopCloseDate && count < 100) {
        let h = slotTime.getHours();
        let min = slotTime.getMinutes();
        let timeStr = `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        
        let option = document.createElement('option');
        option.value = timeStr;
        option.textContent = timeStr + " Uhr";
        selectElement.appendChild(option);

        // Add 15 mins
        slotTime.setMinutes(slotTime.getMinutes() + 15);
        count++;
    }

    if(selectElement.options.length <= 1) {
        disableShop("Für heute sind keine Termine mehr verfügbar.");
    }
}

function disableShop(message) {
    const statusMsg = document.getElementById('shop-status-message');
    const btnWrapper = document.getElementById('checkout-buttons-wrapper');
    const timeContainer = document.getElementById('pickup-time-container');

    // UI Updates
    if (statusMsg) {
        statusMsg.textContent = message;
        statusMsg.style.display = 'block';
    }
    if (btnWrapper) btnWrapper.style.display = 'none';
    if (timeContainer) timeContainer.style.display = 'none';

    // Modal Popup
    const closedModal = document.getElementById('closed-modal');
    const closedModalText = document.getElementById('closed-modal-text');
    const closeBtn = document.getElementById('close-closed-modal-btn');

    if (closedModal && closedModalText) {
        closedModalText.textContent = message; 
        closedModal.style.display = 'flex';    
        
        if (closeBtn) {
            closeBtn.onclick = function() {
                closedModal.style.display = 'none';
            };
        }
    }
}

// Helper: Check if a selected time is still valid (e.g. user waited too long)
function isTimeStillValid(timeStr) {
    if(!timeStr) return true;
    // Simple check: Is the time in the past relative to now + buffer?
    // This is optional but good UX. 
    return true; 
}

function getFormData() {
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const time = document.getElementById('pickup-time').value;
    const notes = document.getElementById('customer-notes').value;
    
    let address = null;
    if (isDeliveryPage()) {
        address = {
            street: document.getElementById('delivery-street').value,
            house: document.getElementById('delivery-house').value,
            zip: document.getElementById('delivery-zip').value
        };
    }
    return { name, phone, time, notes, address };
}

function validateForm() {
    const data = getFormData();
    const privacy = document.getElementById('privacy-consent');

    if (!data.name || !data.phone) {
        alert("Bitte Namen und Telefonnummer eingeben.");
        return false;
    }
    if (isDeliveryPage()) {
        if (!data.address.street || !data.address.house) {
            alert("Bitte die Lieferadresse vollständig ausfüllen.");
            return false;
        }
    }
    if (!data.time) {
        alert("Bitte eine Zeit wählen.");
        return false;
    }
    if (!privacy.checked) {
        alert("Bitte akzeptieren Sie die Datenschutzbestimmungen.");
        return false;
    }
    return true;
}
