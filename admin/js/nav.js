/* ════════════════════════════════════════════════
   SIDEBAR NAVIGATION MAP
   ════════════════════════════════════════════════ */
const NAV_SECTIONS = [
  {
    label: 'STORE',
    items: [
      { id: 'overview', label: 'Overview', icon: 'grid', permission: null },
      { id: 'orders', label: 'Orders', icon: 'box', permission: 'orders' },
      { id: 'products', label: 'Products', icon: 'tag', permission: 'products' },
      { id: 'categories', label: 'Categories', icon: 'layers', permission: 'products' },
      { id: 'brands', label: 'Brands', icon: 'award', permission: 'products' },
      { id: 'customers', label: 'Customers', icon: 'users', permission: 'customers' },
      { id: 'inventory', label: 'Inventory', icon: 'archive', permission: 'inventory' }
    ]
  },
  {
    label: 'GROWTH',
    items: [
      { id: 'discounts', label: 'Discounts', icon: 'percent', permission: 'discounts' },
      { id: 'reviews', label: 'Reviews', icon: 'star', permission: 'reviews' },
      { id: 'analytics', label: 'Analytics', icon: 'chart', permission: 'analytics' },
      { id: 'marketing', label: 'Marketing', icon: 'megaphone', permission: 'discounts' },
      { id: 'content', label: 'Content', icon: 'file', permission: 'settings' }
    ]
  },
  {
    label: 'OPERATIONS',
    items: [
      { id: 'shipping', label: 'Shipping', icon: 'truck', permission: 'settings' },
      { id: 'payments', label: 'Payments', icon: 'card', permission: 'settings' }
    ]
  },
  {
    label: 'SYSTEM',
    items: [
      { id: 'notifications', label: 'Notifications', icon: 'bell', permission: null },
      { id: 'staff', label: 'Staff & Permissions', icon: 'shield', permission: 'staff', superOnly: true },
      { id: 'settings', label: 'Settings', icon: 'settings', permission: 'settings' },
      { id: 'activity', label: 'Activity Log', icon: 'clock', permission: null }
    ]
  }
];

const NAV_ICONS = {
  grid: '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/>',
  box: '<path d="M3 8l9-5 9 5-9 5-9-5Z" stroke-linejoin="round"/><path d="M3 8v8l9 5 9-5V8" stroke-linejoin="round"/><path d="M12 13v8"/>',
  tag: '<path d="M20 12.5 12.5 20a1.8 1.8 0 0 1-2.5 0L3 13V4h9l8 8.5Z" stroke-linejoin="round"/><circle cx="7.5" cy="7.5" r="1.3"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z" stroke-linejoin="round"/><path d="m3 13 9 5 9-5" stroke-linejoin="round"/>',
  award: '<circle cx="12" cy="8" r="5.5"/><path d="M8.5 13 7 21l5-2.5L17 21l-1.5-8" stroke-linejoin="round"/>',
  users: '<circle cx="9" cy="8" r="3.4"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0" stroke-linecap="round"/><path d="M16 4.8a3.4 3.4 0 0 1 0 6.6M19 20a6 6 0 0 0-4.5-8" stroke-linecap="round"/>',
  archive: '<rect x="3" y="4" width="18" height="5" rx="1.2"/><path d="M5 9v9a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 18V9" /><path d="M10 13h4" stroke-linecap="round"/>',
  percent: '<circle cx="7" cy="7" r="2.6"/><circle cx="17" cy="17" r="2.6"/><path d="M18 6 6 18" stroke-linecap="round"/>',
  star: '<path d="m12 3 2.9 6 6.6.7-5 4.5 1.4 6.5-5.9-3.4-5.9 3.4L7.5 14 2.5 9.7l6.6-.7L12 3Z" stroke-linejoin="round"/>',
  chart: '<path d="M4 20V10M12 20V4M20 20v-7" stroke-linecap="round"/>',
  bell: '<path d="M6 9a6 6 0 0 1 12 0v5l2 3H4l2-3V9Z" stroke-linejoin="round"/><path d="M9.5 20a2.5 2.5 0 0 0 5 0"/>',
  shield: '<path d="M12 3 20 6v6c0 5-3.4 8.7-8 9.9C7.4 20.7 4 17 4 12V6Z" stroke-linejoin="round"/>',
  settings: '<circle cx="12" cy="12" r="3.2"/><path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H10.5a1.7 1.7 0 0 0 1-1.6V4a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V10.5a1.7 1.7 0 0 0 1.6 1H20a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.6 1Z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2" stroke-linecap="round"/>',
  megaphone: '<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1Z" stroke-linejoin="round"/><path d="M16 8.5a4 4 0 0 1 0 7" stroke-linecap="round"/><path d="M19 6a7.5 7.5 0 0 1 0 12" stroke-linecap="round"/>',
  file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" stroke-linejoin="round"/><path d="M14 3v5h5" stroke-linejoin="round"/><path d="M9 13h6M9 17h4" stroke-linecap="round"/>',
  truck: '<path d="M3 7a1 1 0 0 1 1-1h9v10H4a1 1 0 0 1-1-1V7Z" stroke-linejoin="round"/><path d="M13 10h4l3 3v3h-7v-6Z" stroke-linejoin="round"/><circle cx="7.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/>',
  card: '<rect x="2.5" y="5" width="19" height="14" rx="2.2"/><path d="M2.5 9.5h19" stroke-linecap="round"/><path d="M6.5 15h3" stroke-linecap="round"/>'
};

function iconSvg(name) {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">' + (NAV_ICONS[name] || '') + '</svg>';
}
