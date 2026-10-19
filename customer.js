// Modern Minimalist Customer Dine-In Logic (Pure English UI)
function getBackendUrl() {
  const params = new URLSearchParams(window.location.search);
  const backendParam = params.get('backend');
  if (backendParam) {
    const cleanUrl = backendParam.replace(/\/+$/, '');
    localStorage.setItem('cafe_backend_url', cleanUrl);
    return cleanUrl;
  }
  const saved = localStorage.getItem('cafe_backend_url');
  if (saved) return saved.replace(/\/+$/, '');
  if (window.CAFE_CONFIG && window.CAFE_CONFIG.BACKEND_URL) {
    return window.CAFE_CONFIG.BACKEND_URL.replace(/\/+$/, '');
  }
  return '';
}

function getApiUrl(path) {
  const base = getBackendUrl();
  return base ? `${base}${path}` : path;
}

const FALLBACK_MENU = [
  { id: "b1", category: "burgers", name: "Crispy Paneer Burger", nameHindi: "क्रिस्पी पनीर बर्गर", price: 129, isVeg: true, isBestseller: true, description: "Crunchy herb paneer patty, melted cheddar cheese, fresh crisp lettuce, and special cafe sauce.", image: "images/burger.jpg", spicyLevel: 1 },
  { id: "b2", category: "burgers", name: "Cheesy Veg Burger", nameHindi: "चीज़ी वेज बर्गर", price: 99, isVeg: true, isBestseller: false, description: "Golden vegetable patty topped with double cheese slice, mayo, and caramelized onions.", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80", spicyLevel: 0 },
  { id: "b3", category: "burgers", name: "Spicy Mexican Volcano Burger", nameHindi: "स्पाइसी मैक्सिकन बर्गर", price: 149, isVeg: true, isBestseller: true, description: "Fiery chipotle sauce, pickled jalapenos, crispy patty, and overflowing liquid cheese.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80", spicyLevel: 3 },
  { id: "s1", category: "sandwiches", name: "Corn & Cheese Grilled Sandwich", nameHindi: "कॉर्न और चीज़ ग्रिल्ड सैंडविच", price: 119, isVeg: true, isBestseller: true, description: "Sweet golden corn tossed in creamy mozzarella & herbs, grilled to golden crisp perfection.", image: "images/sandwich.jpg", spicyLevel: 0 },
  { id: "s2", category: "sandwiches", name: "Paneer Tikka Club Sandwich", nameHindi: "पनीर टिक्का सैंडविच", price: 149, isVeg: true, isBestseller: true, description: "Tandoori spiced paneer cubes, mint chutney, crunchy bell peppers, layered in three toasted bread slices.", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80", spicyLevel: 2 },
  { id: "s3", category: "sandwiches", name: "Bombay Masala Grilled Sandwich", nameHindi: "बॉम्बे मसाला सैंडविच", price: 99, isVeg: true, isBestseller: false, description: "Authentic street-style spicy potato masala, beets, cucumber, sev, and house green chutney.", image: "https://images.unsplash.com/photo-1619096252214-ef06c45683e3?auto=format&fit=crop&w=600&q=80", spicyLevel: 2 },
  { id: "p1", category: "pizza_fries", name: "Peri Peri French Fries", nameHindi: "पेरी पेरी फ्रेंच फ्राइज़", price: 89, isVeg: true, isBestseller: true, description: "Golden crispy potato fries tossed in zesty African peri-peri spice dust. Served with garlic dip.", image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80", spicyLevel: 2 },
  { id: "p2", category: "pizza_fries", name: "Cheesy Loaded Fries", nameHindi: "चीज़ी लोडेड फ्राइज़", price: 129, isVeg: true, isBestseller: false, description: "Fries drenched in warm cheddar cheese sauce, topped with diced tomatoes, onions, and spring herbs.", image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80", spicyLevel: 1 },
  { id: "p3", category: "pizza_fries", name: "Classic Margherita Pizza (8\")", nameHindi: "मार्गेरिटा पिज़्ज़ा", price: 179, isVeg: true, isBestseller: true, description: "San Marzano herb tomato sauce, loaded with 100% dairy mozzarella and fresh basil leaves.", image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80", spicyLevel: 0 },
  { id: "p4", category: "pizza_fries", name: "Farmhouse Feast Pizza (8\")", nameHindi: "फार्महाउस स्पेशल पिज़्ज़ा", price: 229, isVeg: true, isBestseller: false, description: "Crisp capsicum, sweet corn, mushrooms, red paprika, and onions on a hand-stretched crust.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80", spicyLevel: 1 },
  { id: "d1", category: "drinks", name: "Royal Cafe Cold Coffee", nameHindi: "कोल्ड कॉफ़ी विथ आइसक्रीम", price: 119, isVeg: true, isBestseller: true, description: "Rich espresso blended with chilled milk and cream, topped with a scoop of vanilla ice cream & chocolate fudge.", image: "images/coffee.jpg", spicyLevel: 0 },
  { id: "d2", category: "drinks", name: "Thick Belgian Chocolate Shake", nameHindi: "बेल्जियन चॉकलेट शेक", price: 139, isVeg: true, isBestseller: true, description: "Decadent dark Belgian cocoa, creamy milk, chocolate truffle syrup, finished with chocolate shavings.", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80", spicyLevel: 0 },
  { id: "d3", category: "drinks", name: "Fresh Virgin Mojito", nameHindi: "वर्जिन मोजिटो", price: 99, isVeg: true, isBestseller: false, description: "Crushed fresh mint leaves, lime wedges, simple cane syrup, and sparkling soda on ice.", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80", spicyLevel: 0 },
  { id: "sw1", category: "desserts", name: "Hot Choco Lava Cake", nameHindi: "चोको लावा केक", price: 89, isVeg: true, isBestseller: true, description: "Warm moist chocolate sponge with a molten chocolate center that flows with every spoon.", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80", spicyLevel: 0 },
  { id: "sw2", category: "desserts", name: "Sizzling Brownie with Vanilla", nameHindi: "सिज़लिंग ब्राउनी विथ वैनिला", price: 149, isVeg: true, isBestseller: false, description: "Rich walnut brownie served on a hot sizzler plate with vanilla ice cream and sizzling hot chocolate ganache.", image: "https://images.unsplash.com/photo-1589252840614-b6338b3096b7?auto=format&fit=crop&w=600&q=80", spicyLevel: 0 }
];

let socket = null;
try {
  if (typeof io === 'function') {
    const backend = getBackendUrl();
    socket = backend
      ? io(backend, { transports: ['websocket', 'polling'], timeout: 4000 })
      : io({ transports: ['websocket', 'polling'], timeout: 4000 });
  }
} catch (e) {
  console.warn('Socket.IO init bypassed, will use polling fallback:', e);
}

// State
let menuData = [];
let cart = {}; // { [dishId]: quantity }
let currentTable = 2;
let currentCategory = 'all';
let searchQuery = '';
let activeOrder = null;

// Audio & Haptic Feedback
function triggerHaptic() {
  if ('vibrate' in navigator) {
    navigator.vibrate(30);
  }
}

function showToast(message, icon = '✓') {
  const toast = document.getElementById('toastNotification');
  const msgEl = document.getElementById('toastMessage');
  const iconEl = document.getElementById('toastIcon');
  if (!toast) return;

  msgEl.innerText = message;
  iconEl.innerText = icon;
  toast.style.transform = 'translateX(-50%) translateY(0)';

  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(-100px)';
  }, 2400);
}

// Table Initialization
function initTable() {
  const urlParams = new URLSearchParams(window.location.search);
  const tableParam = urlParams.get('table');

  if (tableParam) {
    currentTable = parseInt(tableParam, 10);
    localStorage.setItem('cafe_table_no', currentTable);
  } else {
    const saved = localStorage.getItem('cafe_table_no');
    if (saved) {
      currentTable = parseInt(saved, 10);
    } else {
      currentTable = 2;
    }
  }

  updateTableBadge();
  setupTableGrid();
}

function updateTableBadge() {
  const badge = document.getElementById('tableBadgeText');
  const cartIndicator = document.getElementById('cartTableIndicator');
  const formatted = currentTable < 10 ? `0${currentTable}` : currentTable;
  if (badge) badge.innerText = `TABLE ${formatted}`;
  if (cartIndicator) cartIndicator.innerText = `Table ${formatted}`;
}

function setupTableGrid() {
  const grid = document.getElementById('tableGridContainer');
  if (!grid) return;
  grid.innerHTML = '';
  for (let i = 1; i <= 12; i++) {
    const btn = document.createElement('button');
    btn.innerText = `Table ${i}`;
    btn.style.padding = '12px 6px';
    btn.style.borderRadius = '8px';
    btn.style.fontWeight = '700';
    btn.style.cursor = 'pointer';
    btn.style.border = currentTable === i ? '1.5px solid #18181b' : '1px solid #edeae4';
    btn.style.background = currentTable === i ? '#18181b' : '#ffffff';
    btn.style.color = currentTable === i ? '#ffffff' : '#18181b';

    btn.onclick = () => {
      currentTable = i;
      localStorage.setItem('cafe_table_no', currentTable);
      updateTableBadge();
      document.getElementById('tableSelectModal').classList.remove('open');
      showToast(`Selected Table ${i}`, '📍');
      checkActiveOrdersForTable();
    };
    grid.appendChild(btn);
  }
}

// Fetch Menu Data
async function fetchMenu() {
  try {
    const res = await fetch(getApiUrl('/api/menu'));
    if (!res.ok) throw new Error('Network response not ok: ' + res.status);
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      menuData = data;
    } else {
      menuData = FALLBACK_MENU;
    }
    renderDishes();
  } catch (err) {
    console.warn('API menu load notice, loading standard cafe menu:', err);
    menuData = FALLBACK_MENU;
    renderDishes();
  }
}

// Check Active Orders for current table
async function checkActiveOrdersForTable() {
  try {
    const res = await fetch(getApiUrl(`/api/orders/table/${currentTable}`));
    if (!res.ok) return;
    const orders = await res.json();
    if (orders && orders.length > 0) {
      activeOrder = orders[0];
      updateActiveOrderBanner();
    } else {
      activeOrder = null;
      updateActiveOrderBanner();
    }
  } catch (e) {
    console.warn('Check active orders notice:', e.message);
  }
}

// Render Dish Cards
function renderDishes() {
  const container = document.getElementById('dishesContainer');
  const countBadge = document.getElementById('itemsCountBadge');
  if (!container) return;

  const filtered = menuData.filter(item => {
    const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
    const matchesSearch = searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (countBadge) {
    countBadge.innerText = `${filtered.length} curated items`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; color: var(--text-secondary);">
        <p style="font-size: 16px; font-weight: 700; color: var(--text-primary);">No dishes found</p>
        <p style="font-size: 13px; margin-top: 4px;">Try searching for another craving or browse categories.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(dish => {
    const qty = cart[dish.id] || 0;
    return `
      <article class="menu-card" id="dish-${dish.id}">
        <div class="menu-card-body">
          <div class="meta-tags-row">
            <span class="pure-veg-tag" title="Vegetarian"><span class="veg-bullet"></span></span>
            ${dish.isBestseller ? '<span class="tag-bestseller">Signature</span>' : ''}
            ${dish.spicyLevel > 1 ? '<span class="tag-spice">Spicy</span>' : ''}
          </div>
          <h3 class="item-heading">${dish.name}</h3>
          <p class="item-summary">${dish.description}</p>
          <div class="item-pricing-row">
            <span class="item-price-tag">₹${dish.price}</span>
          </div>
        </div>

        <div class="card-media-box">
          <img src="${dish.image}" alt="${dish.name}" class="card-media-img" loading="lazy" onerror="this.src='/images/burger.jpg'">
          <div class="action-cta-wrap">
            ${qty === 0 ? `
              <button class="btn-add-item" onclick="addToCart('${dish.id}')">ADD +</button>
            ` : `
              <div class="item-qty-stepper">
                <button class="btn-step" onclick="changeQty('${dish.id}', -1)">−</button>
                <span class="step-count">${qty}</span>
                <button class="btn-step" onclick="changeQty('${dish.id}', 1)">+</button>
              </div>
            `}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Cart Management
function addToCart(dishId) {
  triggerHaptic();
  cart[dishId] = (cart[dishId] || 0) + 1;
  updateCartUI();
  renderDishes();
  showToast('Item added to order', '✓');
}

function changeQty(dishId, delta) {
  triggerHaptic();
  const current = cart[dishId] || 0;
  const next = current + delta;
  if (next <= 0) {
    delete cart[dishId];
  } else {
    cart[dishId] = next;
  }
  updateCartUI();
  renderDishes();
}

function updateCartUI() {
  let totalQty = 0;
  let totalPrice = 0;

  for (const [id, qty] of Object.entries(cart)) {
    const dish = menuData.find(d => d.id === id);
    if (dish) {
      totalQty += qty;
      totalPrice += dish.price * qty;
    }
  }

  const dock = document.getElementById('cartFloatingBar');
  const countEl = document.getElementById('cartTotalQty');
  const priceEl = document.getElementById('cartTotalPrice');

  if (countEl) countEl.innerText = totalQty;
  if (priceEl) priceEl.innerText = `₹${totalPrice}`;

  if (dock) {
    if (totalQty > 0) {
      dock.classList.add('visible');
    } else {
      dock.classList.remove('visible');
      document.getElementById('cartModalOverlay').classList.remove('open');
    }
  }
}

// Render Cart Drawer
function renderCartDrawer() {
  const listEl = document.getElementById('cartItemsList');
  const subtotalEl = document.getElementById('billSubtotal');
  const gstEl = document.getElementById('billGst');
  const totalEl = document.getElementById('billGrandTotal');

  if (!listEl) return;

  const entries = Object.entries(cart);
  if (entries.length === 0) {
    listEl.innerHTML = '<p style="text-align:center; color: var(--text-secondary); padding: 20px 0;">Your cart is empty.</p>';
    return;
  }

  let subtotal = 0;
  listEl.innerHTML = entries.map(([id, qty]) => {
    const dish = menuData.find(d => d.id === id);
    if (!dish) return '';
    const itemTotal = dish.price * qty;
    subtotal += itemTotal;

    return `
      <div class="order-item-line">
        <div>
          <div class="order-item-title">${dish.name}</div>
          <div class="order-item-sub">₹${dish.price} each</div>
        </div>
        <div style="display: flex; align-items: center;">
          <span class="order-item-total">₹${itemTotal}</span>
          <div class="item-qty-stepper" style="width: 76px; height: 28px;">
            <button class="btn-step" onclick="changeQty('${dish.id}', -1); renderCartDrawer();">−</button>
            <span class="step-count">${qty}</span>
            <button class="btn-step" onclick="changeQty('${dish.id}', 1); renderCartDrawer();">+</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const gst = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + gst;

  if (subtotalEl) subtotalEl.innerText = `₹${subtotal}`;
  if (gstEl) gstEl.innerText = `₹${gst}`;
  if (totalEl) totalEl.innerText = `₹${grandTotal}`;
}

// Place Order
async function placeOrder() {
  const items = [];
  for (const [id, qty] of Object.entries(cart)) {
    const dish = menuData.find(d => d.id === id);
    if (dish && qty > 0) {
      items.push({
        id: dish.id,
        name: dish.name,
        nameHindi: dish.nameHindi,
        price: dish.price,
        qty: qty
      });
    }
  }

  if (items.length === 0) {
    showToast('Please add items first', '✕');
    return;
  }

  const specialNote = document.getElementById('specialNoteInput')?.value.trim() || '';
  const confirmBtn = document.getElementById('confirmOrderBtn');
  if (confirmBtn) {
    confirmBtn.disabled = true;
    confirmBtn.innerText = 'Transmitting to kitchen...';
  }

  try {
    const res = await fetch(getApiUrl('/api/orders'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({
        tableNo: currentTable,
        items,
        specialNote,
        customerName: `Table ${currentTable}`
      })
    });

    const newOrder = await res.json();
    activeOrder = newOrder;

    // Instant cross-tab sync to dashboard (0.001s)
    try {
      if ('BroadcastChannel' in window) {
        const liveCh = new BroadcastChannel('pos_live_orders');
        liveCh.postMessage({ type: 'NEW_ORDER', order: newOrder });
      }
    } catch (e) {}

    // Reset Cart
    cart = {};
    updateCartUI();
    renderDishes();

    // Close Cart Modal
    document.getElementById('cartModalOverlay').classList.remove('open');
    if (document.getElementById('specialNoteInput')) {
      document.getElementById('specialNoteInput').value = '';
    }

    triggerHaptic();
    showToast('Order sent to kitchen!', '🚀');

    // Show Live Tracking Modal
    openStatusModal(activeOrder);
    updateActiveOrderBanner();

  } catch (err) {
    console.error('Order placement failed:', err);
    showToast('Failed to send order', '✕');
  } finally {
    if (confirmBtn) {
      confirmBtn.disabled = false;
      confirmBtn.innerHTML = 'Confirm & Send to Kitchen <span>→</span>';
    }
  }
}

// Service Requests (Call Waiter / Water / Bill)
async function requestService(type) {
  try {
    await fetch(getApiUrl('/api/call-waiter'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tableNo: currentTable,
        requestType: type
      })
    });
    triggerHaptic();
    showToast(`${type} requested`, '🛎️');
  } catch (err) {
    console.error(err);
  }
}

// Live Status Modal & Banner Logic
function updateActiveOrderBanner() {
  const banner = document.getElementById('activeOrderBanner');
  const bannerText = document.getElementById('bannerStatusText');
  if (!banner) return;

  if (activeOrder && activeOrder.status !== 'completed' && activeOrder.status !== 'cancelled') {
    banner.classList.remove('hidden');
    let text = 'Kitchen is preparing your order...';
    if (activeOrder.status === 'pending') text = 'Order received by kitchen';
    if (activeOrder.status === 'served') text = 'Served at your table. Enjoy!';
    if (bannerText) bannerText.innerText = text;
  } else {
    banner.classList.add('hidden');
  }
}

function openStatusModal(order) {
  const modal = document.getElementById('statusModalOverlay');
  if (!modal || !order) return;

  const idTag = document.getElementById('statusOrderIdTag');
  const title = document.getElementById('statusTitle');
  const subtitle = document.getElementById('statusSubtitle');
  const emoji = document.getElementById('statusEmoji');
  const summary = document.getElementById('statusItemsSummary');

  if (idTag) idTag.innerText = `ORDER #${order.id} • TABLE ${order.tableNo}`;

  // Update steps
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');

  step1.className = 'stepper-node done';
  step2.className = 'stepper-node';
  step3.className = 'stepper-node';

  if (order.status === 'pending') {
    step2.className = 'stepper-node current';
    if (title) title.innerText = 'Order Received by Kitchen';
    if (subtitle) subtitle.innerText = 'The chef has received your ticket and is preparing to cook.';
    if (emoji) emoji.innerText = '🛎️';
  } else if (order.status === 'preparing') {
    step2.className = 'stepper-node done';
    step3.className = 'stepper-node current';
    if (title) title.innerText = 'Cooking in Progress';
    if (subtitle) subtitle.innerText = 'Your artisanal dishes are being handcrafted fresh.';
    if (emoji) emoji.innerText = '👨‍🍳';
  } else if (order.status === 'served') {
    step2.className = 'stepper-node done';
    step3.className = 'stepper-node done';
    if (title) title.innerText = 'Served at Your Table';
    if (subtitle) subtitle.innerText = 'Dishes delivered. Enjoy your exquisite meal!';
    if (emoji) emoji.innerText = '✨';
  }

  if (summary && order.items) {
    summary.innerHTML = order.items.map(it => `
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <span>${it.qty}× ${it.name}</span>
        <span style="font-weight: 700;">₹${it.price * it.qty}</span>
      </div>
    `).join('');
  }

  modal.classList.add('open');
}

// Socket.io Real-time event listeners
if (socket) {
  socket.on('order_status_updated', (updated) => {
    if (activeOrder && activeOrder.id === updated.id) {
      activeOrder = updated;
      updateActiveOrderBanner();
      if (document.getElementById('statusModalOverlay').classList.contains('open')) {
        openStatusModal(activeOrder);
      }
      showToast(`Order status: ${updated.status}`, '🔔');
    }
  });
}

// Instant cross-tab real-time tracking updates (0.001s)
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    const liveCh = new BroadcastChannel('pos_live_orders');
    liveCh.onmessage = (event) => {
      if (event.data && event.data.type === 'ORDER_STATUS_UPDATED' && event.data.order) {
        const updated = event.data.order;
        if (activeOrder && activeOrder.id === updated.id) {
          activeOrder = updated;
          updateActiveOrderBanner();
          if (document.getElementById('statusModalOverlay')?.classList.contains('open')) {
            openStatusModal(activeOrder);
          }
          showToast(`Order status: ${updated.status.toUpperCase()}`, '🔔');
        }
      }
    };
  } catch (e) {}
}

// Expose global functions on window for inline onclicks
window.addToCart = addToCart;
window.changeQty = changeQty;
window.renderCartDrawer = renderCartDrawer;
window.openStatusModal = openStatusModal;

// Event Bindings
document.addEventListener('DOMContentLoaded', () => {
  initTable();
  fetchMenu();
  checkActiveOrdersForTable();

  // Search input
  const searchInput = document.getElementById('dishSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderDishes();
    });
  }

  // Category filter buttons
  const pills = document.querySelectorAll('.tab-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.dataset.category;
      
      const heading = document.getElementById('categoryHeading');
      if (heading) {
        heading.innerText = pill.innerText === 'All Items' ? 'Featured Creations' : pill.innerText;
      }
      renderDishes();
    });
  });

  // Table badge click
  document.getElementById('tableBadgeBtn')?.addEventListener('click', () => {
    document.getElementById('tableSelectModal').classList.add('open');
  });

  // Open & Close Cart
  document.getElementById('openCartBtn')?.addEventListener('click', () => {
    renderCartDrawer();
    document.getElementById('cartModalOverlay').classList.add('open');
  });

  document.getElementById('closeCartBtn')?.addEventListener('click', () => {
    document.getElementById('cartModalOverlay').classList.remove('open');
  });

  // Confirm Order
  document.getElementById('confirmOrderBtn')?.addEventListener('click', placeOrder);

  // Status Modal bindings
  document.getElementById('activeOrderBanner')?.addEventListener('click', () => {
    if (activeOrder) openStatusModal(activeOrder);
  });

  document.getElementById('closeStatusBtn')?.addEventListener('click', () => {
    document.getElementById('statusModalOverlay').classList.remove('open');
  });

  document.getElementById('statusCloseActionBtn')?.addEventListener('click', () => {
    document.getElementById('statusModalOverlay').classList.remove('open');
  });

  // Quick service buttons
  document.getElementById('callWaterBtn')?.addEventListener('click', () => requestService('Water Service'));
  document.getElementById('callWaiterBtn')?.addEventListener('click', () => requestService('Waiter Assistance'));
  document.getElementById('askBillBtn')?.addEventListener('click', () => requestService('Bill Request'));

  // Live order status poll (ensures tracking works seamlessly on Vercel)
  setInterval(() => {
    if (activeOrder && activeOrder.status !== 'completed' && activeOrder.status !== 'cancelled') {
      fetch(getApiUrl(`/api/orders/table/${currentTable}`))
        .then(r => r.json())
        .then(activeOrders => {
          const match = activeOrders.find(o => o.id === activeOrder.id);
          if (match && match.status !== activeOrder.status) {
            activeOrder = match;
            updateActiveOrderBanner();
            if (document.getElementById('statusModalOverlay')?.classList.contains('open')) {
              openStatusModal(activeOrder);
            }
          }
        })
        .catch(() => {});
    }
  }, 4000);
});
