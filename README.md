# 📱 The Royal Cafe — Customer QR Dine-In Ordering App

Ye **The Royal Cafe & Bistro** ka standalone **Customer Ordering Frontend** hai jisko aap apne **Custom Domain** par host kar sakte hain.

---

## 🌟 Key Features
- 🍔 **Minimalist Customer Menu:** Crispy Burgers, Grilled Sandwiches, Woodfired Pizza, Cold Coffee & Desserts.
- 📱 **QR Table Dine-In:** Automatic table detection via `/?table=1`, `/?table=2`, etc.
- 🛍️ **Cart & Live Tracking:** Order customization, special cooking requests, and real-time status updates (Preparing -> Served).
- 🛎️ **Call Waiter & Service:** Single tap to request water, waiter assistance, or the bill.
- 🔒 **Zero Staff Data:** Is repository me restaurant ka koi private data (sales, kitchen tickets, settings) nahi hai. Customers ko sirf menu dikhega.

---

## 🔗 How to Connect with Hosted Dashboard Backend

Aapka Restaurant Dashboard already host hai (jaise Vercel par `https://cafe-qr-system.vercel.app` ya aapka backend URL).

### Option 1: `config.js` me Backend URL set karein
File `config.js` kholein aur apna hosted dashboard URL likh dein:
```javascript
window.CAFE_CONFIG = {
  BACKEND_URL: "https://cafe-qr-system.vercel.app" // Aapka hosted dashboard URL
};
```

### Option 2: URL Parameter (Automatic)
Aap kisi bhi browser me link open karte waqt `?backend=https://...` laga sakte hain, ye automatically save ho jaayega:
`https://yourdomain.com/?table=1&backend=https://cafe-qr-system.vercel.app`

---

## 🚀 Vercel Deployment & Custom Domain Setup
1. **GitHub Repository:** [https://github.com/damandeeps107-eng/cafe-customer-order](https://github.com/damandeeps107-eng/cafe-customer-order)
2. [Vercel.com](https://vercel.com) par **Add New Project** -> **Import `cafe-customer-order`**.
3. **Deploy** par click karein.
4. **Custom Domain:** Vercel Dashboard me **Settings -> Domains** me jaakar apna domain add kar dein (jaise `order.thecafe.com` ya `thecafe.com`).
