/* ════════════════════════════════════════════════
   WHATSAPP ORDER NOTIFICATIONS — via Green API
   Sends the full order details to the store owner's
   WhatsApp the moment a customer places an order.
   Never blocks the checkout response — a failed
   notification should never fail the order itself.
   ════════════════════════════════════════════════ */
const GREENAPI_PHONE = process.env.GREENAPI_PHONE || '201027380269';
const GREENAPI_ID_INSTANCE = process.env.GREENAPI_ID_INSTANCE;
const GREENAPI_API_TOKEN = process.env.GREENAPI_API_TOKEN;

function fmt(n) {
  return Math.round(n || 0).toLocaleString('en-US');
}

function buildOrderMessage(order) {
  const lines = [];
  lines.push('🛍️ *New Order — ' + order.orderNumber + '*');
  lines.push('');
  lines.push('👤 ' + order.customer.name);
  lines.push('📞 ' + order.customer.phone);
  if (order.customer.email) lines.push('✉️ ' + order.customer.email);
  lines.push('');
  lines.push('📍 ' + [order.address.address, order.address.apartment, order.address.city, order.address.governorate].filter(Boolean).join(', '));
  lines.push('');
  lines.push('🧾 *Items:*');
  order.items.forEach(item => {
    lines.push('• ' + item.name + (item.size ? ' (' + item.size + ')' : '') + ' x' + item.qty + ' — ' + fmt(item.unitPrice * item.qty) + ' EGP');
  });
  lines.push('');
  lines.push('Subtotal: ' + fmt(order.subtotal) + ' EGP');
  if (order.discountTotal > 0) lines.push('Discount: -' + fmt(order.discountTotal) + ' EGP');
  lines.push('Shipping: ' + (order.shippingFee > 0 ? fmt(order.shippingFee) + ' EGP' : 'FREE'));
  lines.push('*Total: ' + fmt(order.total) + ' EGP*');
  lines.push('');
  const paymentLabel = { cod: 'Cash on Delivery', instapay: 'InstaPay', card: 'Card' }[order.paymentMethod] || order.paymentMethod;
  lines.push('💳 Payment: ' + paymentLabel);
  if (order.couponCode) lines.push('🏷️ Coupon: ' + order.couponCode);
  if (order.customerNotes) { lines.push(''); lines.push('📝 Note: ' + order.customerNotes); }
  return lines.join('\n');
}

async function sendOrderWhatsApp(order) {
  if (!GREENAPI_ID_INSTANCE || !GREENAPI_API_TOKEN) {
    console.warn('GREENAPI_ID_INSTANCE/GREENAPI_API_TOKEN not set — skipping WhatsApp order notification.');
    return;
  }
  const url = `https://api.green-api.com/waInstance${GREENAPI_ID_INSTANCE}/sendMessage/${GREENAPI_API_TOKEN}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatId: `${GREENAPI_PHONE}@c.us`,
        message: buildOrderMessage(order)
      })
    });
    if (!res.ok) console.error('Green API WhatsApp notification failed:', res.status, await res.text());
  } catch (e) {
    console.error('Green API WhatsApp notification error:', e.message);
  }
}

module.exports = { sendOrderWhatsApp };
