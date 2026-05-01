export type TokenMap = Record<string, string>;

export function fill(template: string, tokens: TokenMap): string {
  return template.replace(/\{([A-Z_]+)\}/g, (_, k) => tokens[k] ?? `{${k}}`);
}

export const TITLE_TEMPLATES = [
  "Cash for Cars in {CITY}, {STATE} — Free Towing & Same-Day Pickup",
  "{CITY} {STATE} Cash For Cars | Sell Your Car for Top Dollar Today",
  "Sell Your Car in {CITY}, {STATE} — Instant Cash Offer, Free Pickup",
  "We Buy Cars in {CITY}, {STATE} | Junk Cars, Used Cars, Any Condition",
  "Cash For Junk Cars {CITY}, {STATE} | Same-Day Cash & Free Removal",
  "{CITY}'s Trusted Cash For Cars Buyer — Free Towing Across {STATE}",
  "Get Cash For Your Car in {CITY}, {STATE} — No Hassle, No Fees",
  "Top Dollar for Cars in {CITY}, {STATE} | Speedy's Cash For Cars",
];

export const META_DESCRIPTION_TEMPLATES = [
  "Get top dollar for your car in {CITY}, {STATE}. Free towing, instant offers, any condition accepted. Call {PHONE} for a quote today.",
  "Sell your car fast in {CITY}. We buy running, junk, wrecked, and non-running vehicles for cash — paid on the spot. Free same-day pickup.",
  "Speedy's Cash For Cars pays top dollar for vehicles in {CITY}, {STATE}. No title? No problem in most cases. Call {PHONE} or get an online quote.",
  "Looking to sell a car in {CITY}, {STATE}? We offer fair cash prices, free towing, and same-day pickup. Any make, model, or condition.",
  "{CITY} drivers trust Speedy's for fast, fair cash for cars. Instant quotes, free pickup, cash or check on the spot. Serving all of {STATE}.",
];

export const H1_TEMPLATES = [
  "Cash For Cars in {CITY}, {STATE}",
  "Sell Your Car in {CITY} for Top Dollar",
  "We Buy Cars in {CITY}, {STATE} — Fast, Fair, Free Towing",
  "{CITY}'s #1 Cash For Cars Buyer",
  "Get Paid Cash for Your Car in {CITY}, {STATE}",
];

export const INTRO_PARAGRAPHS = [
  "If you're in {CITY}, {STATE} and want to sell a car without the stress of online listings or lowball tire-kickers, Speedy's Cash For Cars makes it simple. We pay cash for running cars, junk cars, wrecked cars, and anything in between — and we come to you with free towing anywhere in the {CITY} area.",
  "Selling a vehicle in {CITY} shouldn't eat up your weekend. At Speedy's, a quick call or online form is all it takes to get a real cash offer on your car, truck, or SUV. We buy any condition, handle the paperwork, and tow your vehicle for free — usually the same day.",
  "Speedy's Cash For Cars has been buying vehicles from drivers across {STATE} for years, and {CITY} is one of our most active service areas. Whether you have a daily driver you're ready to upgrade or a rust-bucket that's been sitting in the driveway, we'll give you a fast, fair offer and pay on the spot.",
  "Trying to get rid of an old car in {CITY}, {STATE}? Skip the Craigslist drama. Our buyers quote fast, pay in cash or check, and tow free within the {CITY} service area. You don't need a perfect title, a running engine, or even four wheels — we'll still make an offer.",
  "When {CITY} residents need to sell a car quickly, they call Speedy's. We've built a reputation across {STATE} for honest quotes, same-day pickups, and paying what we promise. No fees. No tow charges. No waiting around.",
  "Cars depreciate, life moves on, and eventually that vehicle in your driveway becomes more hassle than it's worth. If you're in {CITY}, {STATE}, Speedy's Cash For Cars will turn that headache into cash — today, if you want.",
  "Every {CITY} driveway has a car that's outlived its usefulness. Ours is the easiest way to trade that eyesore for real money. We buy any vehicle in any condition, pay cash on pickup, and take care of every piece of paperwork for you.",
  "You don't need to haggle with strangers or post your phone number on the internet to sell a car in {CITY}. Speedy's gives you a guaranteed cash offer, free towing, and same-day pickup across the {CITY}, {STATE} metro area.",
];

export const PROCESS_PARAGRAPHS = [
  "Here's how it works in {CITY}: call us or fill out our quick online form with your vehicle's year, make, model, and condition. We'll give you a firm offer within minutes. If you accept, we schedule a free pickup — usually the same day. Our driver shows up, hands you cash or a check, and hauls the car away. That's the whole process.",
  "Three steps, no surprises. Step one: tell us about the vehicle. Step two: accept our offer. Step three: we drive to {CITY}, pay you, and tow the car for free. No fees, no fine print, no unexpected deductions when the driver arrives.",
  "We keep the process dead simple because your time matters. After a two-minute quote, most {CITY} customers are paid and picked up within a few hours. We handle title paperwork on-site, cancel registration guidance is included, and you walk away with cash in hand.",
  "Getting cash for your car in {CITY} with Speedy's takes about as long as a coffee break. Quote online or by phone, confirm pickup, and our local tow operator arrives with payment ready. You sign the title, hand over the keys, and you're done.",
];

export const CONDITION_PARAGRAPHS = [
  "We buy vehicles in any condition across {CITY}, {STATE}. Running, not running, wrecked, flooded, blown engine, missing parts, no title — bring it on. Where other buyers pass, we make offers. Our network of dismantlers and parts buyers means we can pay more for scrap and salvage than most {CITY} junkyards.",
  "Condition doesn't scare us. We've bought cars in {CITY} with seized engines, blown transmissions, hail damage, accident frames, flood history, and 300,000+ miles. If it has four wheels (and sometimes even if it doesn't), we'll quote it.",
  "Junk, used, wrecked, clean — we buy it all in {CITY}. A beat-up daily driver gets one price. A totaled Camry after a rear-ender gets another. A barn-find project you've lost interest in gets a third. The common thread: we quote honestly and we pay cash.",
  "Most national cash-for-cars operators in {CITY} only want clean titles and running engines. We're different. We buy salvage, parts cars, non-runners, and anything else our {STATE} recyclers can use. You get a real offer even when other buyers say no.",
];

export const LOCAL_ANGLE_PARAGRAPHS = [
  "Our closest physical yard to {CITY} is in {NEAREST_YARD} — about {MILES} miles away — but that doesn't mean you pay for towing. We absorb the tow cost as part of our offer, so the number we quote is the number you get. Every {CITY} pickup is free.",
  "Speedy's doesn't have a yard right in {CITY}, but we service the entire area out of our {NEAREST_YARD} location, roughly {MILES} miles away. Free towing is included in every offer, so a {CITY} pickup costs you nothing.",
  "While our nearest dedicated yard is in {NEAREST_YARD} ({MILES} miles from {CITY}), our tow trucks run {CITY} routes daily. Same-day pickup is standard, and you never see a separate towing charge.",
  "We service {CITY} from our {NEAREST_YARD} location, {MILES} miles out. In practice that means a {CITY} seller gets the same quick quote, same free tow, and same cash payment as a customer walking into the yard.",
];

export const CTA_PARAGRAPHS = [
  "Ready to get an offer? Call {PHONE} or use the quote form below. Most {CITY} quotes come back within minutes, and most sellers are paid and picked up the same day.",
  "Stop staring at that car in the driveway. Grab your VIN, call {PHONE}, and in five minutes you'll know exactly what Speedy's will pay for it in {CITY}.",
  "Turn that car into cash today. Dial {PHONE} or submit the form — we'll have a {CITY} offer back to you before you finish your coffee.",
  "Selling a car in {CITY} has never been easier. Click the quote button, answer a few questions, and we'll take it from there.",
];

export const WHY_US_BULLETS = [
  { title: "Paid on the spot", body: "Cash or check handed to you when the driver arrives in {CITY} — no 'we'll mail it' nonsense." },
  { title: "Free towing, always", body: "No tow fee, no pickup charge, no deductions. The quote is the payout in {CITY}." },
  { title: "Any condition accepted", body: "Running, wrecked, flooded, rusted, or stripped — we buy cars in every shape across {CITY}, {STATE}." },
  { title: "Licensed & insured", body: "Legitimate operators with proper {STATE} licensing and insurance. Your title transfer is handled right." },
  { title: "Same-day pickup", body: "Most {CITY} jobs are quoted, paid, and towed within hours — not days." },
  { title: "No title? Often no problem", body: "In many {STATE} situations we can still buy without a title. Ask us about your specific case." },
  { title: "Honest, upfront pricing", body: "The offer you hear on the phone is the offer you sign for. No drop in price when the driver shows up." },
  { title: "Local drivers who know {CITY}", body: "Our {STATE} tow team works {CITY} daily. They know the streets, the traffic, and the fastest way to you." },
];

export const FAQ_POOL = [
  { q: "How much is my car worth in {CITY}?", a: "Offers in {CITY} typically range from a couple hundred dollars for a non-running junker up to several thousand for a newer car with a clean title. The best way to get a real number is to call {PHONE} or use our quote form — we'll give you a firm offer in minutes." },
  { q: "Do I need a title to sell my car in {CITY}, {STATE}?", a: "A title makes the process simplest, but in many {STATE} cases we can still buy your vehicle without one. We'll walk you through what documentation we need based on your specific situation." },
  { q: "How fast can you pick up my car in {CITY}?", a: "Most {CITY} pickups happen the same day — often within a few hours of accepting the offer. If you need a specific day or time, just let us know and we'll schedule around you." },
  { q: "Do you charge for towing?", a: "Never. Towing is free anywhere in the {CITY}, {STATE} service area. The price we quote you is exactly what you get — no tow fee, no processing fee, no surprises." },
  { q: "What kinds of vehicles do you buy in {CITY}?", a: "Cars, trucks, SUVs, minivans, motorcycles, and sometimes heavier vehicles. Running, non-running, wrecked, junk, high-mileage, flood-damaged — we'll quote almost anything with wheels in {CITY}." },
  { q: "How do I get paid?", a: "Cash or a certified check, handed to you when the driver arrives at your {CITY} address. You sign the title, get paid, and the car leaves on our tow truck. That's it." },
  { q: "Can I sell a leased or financed car?", a: "Leased cars generally can't be sold to us — that's between you and the leasing company. Financed cars can sometimes work if our offer covers the payoff or if you can pay the difference. Call and we'll sort it out." },
  { q: "Do you only buy junk cars?", a: "No. We buy clean, running used cars in {CITY} too, often at competitive prices. If your car is in decent shape, mention that — it usually bumps the offer." },
];

export const GENERIC_LOCAL_HOOKS = [
  "from downtown {CITY} out to the suburbs",
  "across the {CITY} metro area",
  "throughout {CITY} and surrounding communities",
  "in every neighborhood of {CITY}",
  "covering {CITY} proper and the nearby {STATE} towns",
];
