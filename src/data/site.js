/* Content for the whole site.
   Copy rules that shaped every line here: short declarative sentences, full stops in
   headlines, facts rather than benefits, no urgency and no superlatives. Lines in a
   shared list have to hold in every industry served — so no product names and nothing
   tied to one trade appear in the problem list or the capability list. */

export const CONTACT = {
  whatsapp: 'https://wa.me/60126909189?text=Hi%20QPOS%2C%20I%27d%20like%20to%20arrange%20a%20demo',
  phone: '+60 12-690 9189',
  showroom: 'Publika, Solaris Dutamas, Kuala Lumpur',
  hours: 'Monday to Friday, 9:30am – 6:30pm',
}

/* The problem: what each moving part IS, not what we improve about it.
   No solution is named yet, so there is nothing to claim. The point is the weight. */
export const MOVING_PARTS = [
  'A till at the counter.',
  'A tablet on the floor.',
  'A second tablet for delivery.',
  'A separate link for online orders.',
  'A printer in the kitchen.',
  'A book for bookings.',
  'A card for stamps.',
  'A turnstile with its own keypad.',
  'A terminal from the bank.',
  'A spreadsheet at the end of the night.',
]

export const CAPABILITIES = [
  {
    n: '01',
    title: 'Take the order.',
    body: 'Counter, handheld, kiosk, table QR and webstore write to the same order book. One menu, changed once.',
  },
  {
    n: '02',
    title: 'Move the queue.',
    body: 'Tickets are called on the display, prepared on the kitchen screen and closed off from the same record.',
  },
  {
    n: '03',
    title: 'Open the door.',
    body: 'Bookings, memberships and passes resolve at the gate. Entry is checked against what was actually paid for.',
  },
  {
    n: '04',
    title: 'Settle the money.',
    body: 'Cards, e-wallets, QR and cash reconcile through one payment layer, against one set of takings.',
  },
  {
    n: '05',
    title: 'Keep them coming back.',
    body: 'Stamps, tiers and rewards accrue on the same customer record the order was placed against.',
  },
  {
    n: '06',
    title: 'Read the day.',
    body: 'Stock, staff and sales report from one source, so the number on the dashboard is the number in the drawer.',
  },
]

/* Each industry previews a clip on hover and navigates on press. */
export const INDUSTRIES = [
  {
    id: 'fnb',
    name: 'Café & restaurant',
    line: 'Counter, table QR, kitchen screen and delivery on one order book.',
    detail:
      'The floor takes orders on a handheld while the kiosk takes its own. Both land on the kitchen screen in sequence. Menu edits reach every surface at once.',
    video: '/video/ind-fnb.mp4',
    poster: '/images/poster/ind-fnb.jpg',
    // 4:5 cut for the contact page's portrait slot — cropping there with
    // object-cover would throw away half the width of every byte sent.
    portrait: '/video/ct-fnb.mp4',
    portraitPoster: '/images/poster/ct-fnb.jpg',
  },
  {
    id: 'gym',
    name: 'Gym & sports',
    line: 'Sign-up, renewal and entry handled without a front desk.',
    detail:
      'Members join and renew at the kiosk. The gate reads the pass that was sold, so entry and billing never disagree. Off-peak hours run unstaffed.',
    video: '/video/ind-gym.mp4',
    poster: '/images/poster/ind-gym.jpg',
    // 4:5 cut for the contact page's portrait slot — cropping there with
    // object-cover would throw away half the width of every byte sent.
    portrait: '/video/ct-gym.mp4',
    portraitPoster: '/images/poster/ct-gym.jpg',
  },
  {
    id: 'salon',
    name: 'Salon & wellness',
    line: 'Booking, check-in and payment without interrupting a treatment.',
    detail:
      'Clients pick a service and a slot at the screen. The appointment, the deposit and the stylist assignment are one record. Nobody leaves the chair to answer the phone.',
    video: '/video/ind-salon.mp4',
    poster: '/images/poster/ind-salon.jpg',
    // 4:5 cut for the contact page's portrait slot — cropping there with
    // object-cover would throw away half the width of every byte sent.
    portrait: '/video/ct-salon.mp4',
    portraitPoster: '/images/poster/ct-salon.jpg',
  },
  {
    id: 'attractions',
    name: 'Theme parks & attractions',
    line: 'Tickets, passes and gates on one ledger.',
    detail:
      'Day passes, fast passes and family bundles are sold at the kiosk and redeemed at the turnstile. Capacity is counted as it happens, not reconciled at close.',
    video: '/video/ind-attractions.mp4',
    poster: '/images/poster/ind-attractions.jpg',
    // 4:5 cut for the contact page's portrait slot — cropping there with
    // object-cover would throw away half the width of every byte sent.
    portrait: '/video/ct-attractions.mp4',
    portraitPoster: '/images/poster/ct-attractions.jpg',
  },
  {
    id: 'hotel',
    name: 'Hotel & hospitality',
    line: 'Guest ordering and outlet takings under one roof.',
    detail:
      'Room service, the lobby café and the gift shop post to the same books. Guests order from their own phone or laptop against the same live menu.',
    video: '/video/ind-hotel.mp4',
    poster: '/images/poster/ind-hotel.jpg',
    // 4:5 cut for the contact page's portrait slot — cropping there with
    // object-cover would throw away half the width of every byte sent.
    portrait: '/video/ct-hotel.mp4',
    portraitPoster: '/images/poster/ct-hotel.jpg',
  },
  {
    id: 'clinic',
    name: 'Clinic & care',
    line: 'Registration, queue and payment in one pass.',
    detail:
      'Patients register and take a number at the screen. The room calls the next name from the same queue the payment closes against.',
    video: '/video/ind-clinic.mp4',
    poster: '/images/poster/ind-clinic.jpg',
    // 4:5 cut for the contact page's portrait slot — cropping there with
    // object-cover would throw away half the width of every byte sent.
    portrait: '/video/ct-clinic.mp4',
    portraitPoster: '/images/poster/ct-clinic.jpg',
  },
]

/* One shared ratio across the grid — 4:5 — so stills and film sit in the same slot. */
export const HARDWARE = [
  {
    id: 'q1-stand',
    name: 'Q1 Stand',
    line: 'Floor-standing. Eye level.',
    body: 'A full-height self-service column for entrances and high-traffic floors. Card reader, scanner and printer in the body.',
    image: '/images/hardware/q1-stand.png',
    kind: 'product',
  },
  {
    id: 'q1-desktop',
    name: 'Q1 Desktop',
    line: 'Counter-top. Small footprint.',
    body: 'The same screen on a counter plate, for reception desks and tight service counters where a column will not fit.',
    image: '/images/hardware/q1-desktop.png',
    kind: 'product',
  },
  {
    id: 'q1-duo',
    name: 'Q1 Duo',
    line: 'Two screens. One transaction.',
    body: 'Operator side and customer side face each other, so the order is confirmed on the customer’s screen as it is entered.',
    image: '/images/hardware/q1-duo.png',
    kind: 'product',
  },
  {
    id: 'k2-kiosk',
    name: 'K2 Kiosk',
    line: 'Vertical. Built for volume.',
    body: 'A 27-inch portrait kiosk for ticketing and ordering runs that do not stop. Contactless, QR and chip in one head.',
    video: '/video/hw-kiosk.mp4',
    poster: '/images/poster/hw-kiosk.jpg',
    kind: 'film',
  },
  {
    id: 'qsentry',
    name: 'QSentry',
    line: 'Entry, counted.',
    body: 'Gate control with camera-side verification. Passes are checked, entries are counted, and tailgating is flagged as it happens.',
    video: '/video/hw-gate.mp4',
    poster: '/images/poster/hw-gate.jpg',
    kind: 'film',
  },
  {
    id: 'boosters',
    name: 'Sales Boosters',
    line: 'The screen asks. Every time.',
    body: 'Add-ons, badges, spend tiers and offer triggers built into the ordering flow. Configured once, applied on every order.',
    video: '/video/hw-boosters.mp4',
    poster: '/images/poster/hw-boosters.jpg',
    kind: 'film',
  },
]

/* Before / after pairs. Not squeezed into a column — full width, side by side at sm:. */
export const PAIRS = [
  {
    id: 'ordering',
    eyebrow: 'Ordering',
    before: {
      caption: 'Staffed counter.',
      body: 'One transaction at a time, at the speed of the person behind it.',
      video: '/video/pair-counter.mp4',
      poster: '/images/poster/pair-counter.jpg',
    },
    after: {
      caption: 'Self-service.',
      body: 'Open whether or not the desk is staffed, and it asks about the add-on every time.',
      video: '/video/pair-kiosk.mp4',
      poster: '/images/poster/pair-kiosk.jpg',
    },
  },
  {
    id: 'entry',
    eyebrow: 'Entry',
    before: {
      caption: 'At the desk.',
      body: 'The pass is bought, checked and recorded by hand at reception.',
      video: '/video/pair-desk.mp4',
      poster: '/images/poster/pair-desk.jpg',
    },
    after: {
      caption: 'At the gate.',
      body: 'The pass resolves at the turnstile against the record that sold it.',
      video: '/video/pair-gate.mp4',
      poster: '/images/poster/pair-gate.jpg',
    },
  },
]

/* Proof rows: the picture is visible at rest, only the words animate in. */
export const PROOF = [
  {
    id: 'fnb',
    eyebrow: 'Food & beverage',
    title: 'The kitchen sees every channel.',
    body: 'Counter, kiosk, table QR and delivery arrive on one screen in the order they were placed. No second terminal to watch, no printer to re-stock.',
    image: '/images/cover/cover-fnb.webp',
  },
  {
    id: 'gym',
    eyebrow: 'Gyms & studios',
    title: 'The gate knows what was sold.',
    body: 'Membership, day pass and class booking are the same record the turnstile reads. Entry outside the paid window does not open the door.',
    image: '/images/cover/cover-gym.webp',
  },
  {
    id: 'attractions',
    eyebrow: 'Attractions',
    title: 'Capacity counted as it happens.',
    body: 'Tickets sold at the kiosk are redeemed at the turnstile and counted against the gate in the same minute. Close of day is a report, not a reconciliation.',
    image: '/images/cover/cover-themepark.webp',
  },
]

export const MODULES = [
  { name: 'POS', body: 'Counter terminal with menu management, split bills, holds and payments.' },
  { name: 'mPOS', body: 'The same terminal in a hand, for table-side, events and pop-ups.' },
  { name: 'Kiosk', body: 'Unattended ordering and check-in with payment on the unit.' },
  { name: 'Webstore', body: 'An ordering site on your own domain, sharing the POS menu.' },
  { name: 'Scan to Order', body: 'A table QR that opens the live menu. No app to install.' },
  { name: 'Tablet Menu', body: 'Table-side browsing and ordering for full-service floors.' },
  { name: 'Kitchen Display', body: 'Every channel on one prep screen, in the order received.' },
  { name: 'Queue Display', body: 'Ticket numbers called on screen and closed from the POS.' },
  { name: 'Live Display', body: 'Menu boards and promos synced to the same catalogue.' },
  { name: 'Inventory', body: 'Stock counts, low-stock alerts, purchase orders and cost tracking.' },
  { name: 'Loyalty', body: 'Digital stamps, tiers and rewards on the customer record.' },
  { name: 'Booking & Pass', body: 'Slots, deposits and a QR pass that resolves at the gate.' },
  { name: 'Digital Receipt', body: 'Receipts by email or WhatsApp instead of a paper roll.' },
  { name: 'AI Insights', body: 'Daily reading of sales, stock movement and staffing from QHub.' },
]
