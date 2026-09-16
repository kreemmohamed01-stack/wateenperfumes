/* ════════════════════════════════════════════════
   WHATSAPP ORDER NOTIFICATIONS — via CallMeBot
   Sends the full order details to the store owner's
   WhatsApp the moment a customer places an order.
   Never blocks the checkout response — a failed
   notification should never fail the order itself.
   ════════════════════════════════════════════════ */
const CALLMEBOT_PHONE = process.env.CALLMEBOT_PHONE || '201027380269';
const CALLMEBOT_APIKEY = process.env.CALLMEBOT_APIKEY;

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
  if (!CALLMEBOT_APIKEY) {
    console.warn('CALLMEBOT_APIKEY not set — skipping WhatsApp order notification.');
    return;
  }
  const text = encodeURIComponent(buildOrderMessage(order));
  const url = `https://api.callmebot.com/whatsapp.php?phone=${CALLMEBOT_PHONE}&text=${text}&apikey=${CALLMEBOT_APIKEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) console.error('CallMeBot WhatsApp notification failed:', res.status, await res.text());
  } catch (e) {
    console.error('CallMeBot WhatsApp notification error:', e.message);
  }
}

module.exports = { sendOrderWhatsApp };
