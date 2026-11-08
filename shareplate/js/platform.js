/* SHAREPLATE platform (demonstration). All data lives in this browser's localStorage.
   No backend, no real authentication, no real donations. */
(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => '&#' + c.charCodeAt(0) + ';');
const H = 36e5, KEY = 'shareplate.v1', ORD = ['listed', 'connected', 'scheduled', 'collected', 'done'];
const ST = { listed: 'Listed', connected: 'Connected', scheduled: 'Pickup scheduled', collected: 'Collected', done: 'Distributed' };
const CITY = { Bengaluru: [12.97, 77.59], Mysore: [12.30, 76.64], Mangalore: [12.91, 74.86], Bidar: [17.91, 77.52], Hubballi: [15.36, 75.12], Tumakuru: [13.34, 77.10] };
const CATS = ['Cooked meals', 'Bakery', 'Snacks / street food', 'Packaged food', 'Fruit & vegetables'];
const P = 'assets/images/stories/';
const IMG = { 'Cooked meals': P + 'mysore-restaurant.jpg', 'Bakery': P + 'bakery.jpg', 'Snacks / street food': P + 'bengaluru-streetfood.jpg', 'Packaged food': 'assets/images/challenge.jpg', 'Fruit & vegetables': P + 'college-canteen.jpg' };
const K = { 'Home': 'ಮುಖಪುಟ', 'The Challenge': 'ಸವಾಲು', 'Our Approach': 'ನಮ್ಮ ವಿಧಾನ', 'How It Works': 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ', 'Stories': 'ಕಥೆಗಳು', 'Platform': 'ವೇದಿಕೆ', 'Get Involved': 'ಭಾಗವಹಿಸಿ',
 'Think before you waste.': 'ವ್ಯರ್ಥ ಮಾಡುವ ಮೊದಲು ಯೋಚಿಸಿ.', 'Share Food': 'ಆಹಾರ ಹಂಚಿ', 'Discover Our Mission': 'ನಮ್ಮ ಧ್ಯೇಯವನ್ನು ತಿಳಿಯಿರಿ',
 'Food is wasted. Needs remain.': 'ಆಹಾರ ವ್ಯರ್ಥವಾಗುತ್ತಿದೆ. ಅಗತ್ಯಗಳು ಉಳಿದಿವೆ.', "Let's make sharing easier.": 'ಹಂಚಿಕೊಳ್ಳುವುದನ್ನು ಸುಲಭಗೊಳಿಸೋಣ.', 'From surplus to shared meals.': 'ಹೆಚ್ಚುವರಿ ಆಹಾರದಿಂದ ಹಂಚಿದ ಊಟದವರೆಗೆ.',
 'Stories of Change': 'ಬದಲಾವಣೆಯ ಕಥೆಗಳು', 'Before you share': 'ಹಂಚುವ ಮೊದಲು', 'Every shared meal begins with a choice.': 'ಪ್ರತಿ ಹಂಚಿದ ಊಟವೂ ಒಂದು ಆಯ್ಕೆಯಿಂದ ಆರಂಭವಾಗುತ್ತದೆ.',
 'Be part of the sharing movement.': 'ಹಂಚಿಕೊಳ್ಳುವ ಚಳವಳಿಯ ಭಾಗವಾಗಿ.', 'Food is meant to be shared, not wasted.': 'ಆಹಾರವನ್ನು ಹಂಚಲು, ವ್ಯರ್ಥ ಮಾಡಲು ಅಲ್ಲ.', 'Start Sharing': 'ಹಂಚಲು ಪ್ರಾರಂಭಿಸಿ',
 'Donate food': 'ಆಹಾರ ದಾನ ಮಾಡಿ', 'Volunteer': 'ಸ್ವಯಂಸೇವಕ', 'Partner with us': 'ನಮ್ಮೊಂದಿಗೆ ಪಾಲುದಾರರಾಗಿ', 'Donate Food': 'ಆಹಾರ ದಾನ ಮಾಡಿ', 'Become a Volunteer': 'ಸ್ವಯಂಸೇವಕರಾಗಿ', 'Partner With Us': 'ನಮ್ಮೊಂದಿಗೆ ಪಾಲುದಾರರಾಗಿ',
 'The SharePlate Platform': 'ಶೇರ್‌ಪ್ಲೇಟ್ ವೇದಿಕೆ', 'Available Food Near You': 'ನಿಮ್ಮ ಹತ್ತಿರದ ಲಭ್ಯ ಆಹಾರ', 'Marketplace': 'ಮಾರುಕಟ್ಟೆ', 'Smart Match': 'ಸ್ಮಾರ್ಟ್ ಮ್ಯಾಚ್', 'What Communities Need': 'ಸಮುದಾಯಗಳಿಗೆ ಏನು ಬೇಕು',
 'Track Your Food Rescue': 'ನಿಮ್ಮ ಆಹಾರ ರಕ್ಷಣೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ', 'Dashboard': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', 'Insights': 'ಒಳನೋಟಗಳು', 'Map': 'ನಕ್ಷೆ', 'Community': 'ಸಮುದಾಯ', 'View Details': 'ವಿವರಗಳನ್ನು ನೋಡಿ',
 'Claim Donation': 'ದಾನವನ್ನು ಪಡೆಯಿರಿ', 'Claimed': 'ಪಡೆಯಲಾಗಿದೆ', 'Available': 'ಲಭ್ಯವಿದೆ', 'Demo Data': 'ಡೆಮೊ ಡೇಟಾ', 'Fulfil This Request': 'ಈ ಕೋರಿಕೆಯನ್ನು ಪೂರೈಸಿ', 'View Match': 'ಹೊಂದಾಣಿಕೆ ನೋಡಿ', 'Connect': 'ಸಂಪರ್ಕಿಸಿ',
 'Submit': 'ಸಲ್ಲಿಸಿ', 'Track': 'ಟ್ರ್ಯಾಕ್', 'Location': 'ಸ್ಥಳ', 'Food category': 'ಆಹಾರ ವರ್ಗ', 'Your name': 'ನಿಮ್ಮ ಹೆಸರು', 'Email': 'ಇಮೇಲ್', 'Phone (10 digits)': 'ಫೋನ್ (10 ಅಂಕೆಗಳು)', 'I am a': 'ನಾನು',
 'Food Donor': 'ಆಹಾರ ದಾನಿ', 'NGO / Community Organisation': 'ಎನ್‌ಜಿಒ / ಸಮುದಾಯ ಸಂಸ್ಥೆ', 'Event Organiser': 'ಕಾರ್ಯಕ್ರಮ ಆಯೋಜಕ', 'This field is required.': 'ಈ ಕ್ಷೇತ್ರ ಅಗತ್ಯವಿದೆ.', 'Explore as': 'ಹೀಗೆ ಅನ್ವೇಷಿಸಿ',
 'Listed': 'ಪಟ್ಟಿ ಮಾಡಲಾಗಿದೆ', 'Connected': 'ಸಂಪರ್ಕಿಸಲಾಗಿದೆ', 'Pickup scheduled': 'ಪಿಕಪ್ ನಿಗದಿ', 'Collected': 'ಸಂಗ್ರಹಿಸಲಾಗಿದೆ', 'Distributed': 'ವಿತರಿಸಲಾಗಿದೆ', 'Donations listed': 'ಪಟ್ಟಿ ಮಾಡಿದ ದಾನಗಳು',
 'Portions available': 'ಲಭ್ಯ ಊಟದ ಭಾಗಗಳು', 'Awaiting collection': 'ಸಂಗ್ರಹಕ್ಕೆ ಕಾಯುತ್ತಿದೆ', 'Completed distributions': 'ಪೂರ್ಣಗೊಂಡ ವಿತರಣೆಗಳು', 'Donors / NGOs': 'ದಾನಿಗಳು / ಎನ್‌ಜಿಒಗಳು', 'Donations claimed': 'ಪಡೆದ ದಾನಗಳು',
 'Search food, donor or city': 'ಆಹಾರ, ದಾನಿ ಅಥವಾ ನಗರ ಹುಡುಕಿ', 'No donations match your filters.': 'ನಿಮ್ಮ ಫಿಲ್ಟರ್‌ಗಳಿಗೆ ಹೊಂದುವ ದಾನಗಳಿಲ್ಲ.', 'Reset demo data': 'ಡೆಮೊ ಡೇಟಾ ಮರುಹೊಂದಿಸಿ' };
let S = load(), tab = 'market', tracked = 'SP-1001', map = null, F = { q: '', city: '', cat: '', min: '', urg: '' };
const T = s => (S.lang == 'kn' && K[s]) || s;
const fmt = t => new Date(t).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
const sum = (a, f) => a.reduce((x, y) => x + f(y), 0), find = id => S.donations.find(d => d.id == id);

function seed() {
  const n = Date.now();
  const D = (id, food, cat, qty, city, donor, veg, dl, st, org, al) => ({ id, food, cat, qty, city, donor, veg, prep: n - 2 * H, deadline: n + dl * H, storage: 'Sealed food-grade containers, kept covered', pack: 'Sealed', allergen: al || 'Not recorded', notes: 'Collect within the deadline. Do not reheat more than once.', status: st, org: org || null, pickup: st == 'scheduled' ? n + .5 * H : null, log: ORD.slice(0, ORD.indexOf(st) + 1).map((s, i) => ({ s, t: n - (6 - i) * .5 * H })) });
  const R = (id, org, city, cat, qty, due, diet) => ({ id, org, city, cat, qty, due: n + due * H, diet: diet || 'any', status: 'open' });
  return { lang: 'en', role: 'ngo', org: 'Bengaluru Community Kitchen (demo)', seq: 1009,
    donations: [D('SP-1001', 'Vegetable biryani and raita', 'Cooked meals', 35, 'Bengaluru', 'Spice Court Restaurant (demo)', 1, 3, 'listed', 0, 'Dairy (raita)'),
      D('SP-1002', 'Fish curry meals', 'Cooked meals', 20, 'Mangalore', 'Coastal Spice Hotel (demo)', 0, 4, 'listed', 0, 'Fish'),
      D('SP-1003', 'Wedding feast: rice, curries, sweets', 'Cooked meals', 120, 'Bidar', 'Wedding caterer (demo)', 1, 2, 'connected', 'Bidar Community Centre (demo)'),
      D('SP-1004', 'Idli and sambar', 'Cooked meals', 40, 'Mysore', 'Tiffin House (demo)', 1, 3, 'listed'),
      D('SP-1005', 'Buns, puffs and cakes', 'Bakery', 60, 'Bengaluru', 'Apoorva Bakery (demo)', 1, 12, 'listed', 0, 'Gluten, milk, eggs'),
      D('SP-1006', 'Dosa and chaat', 'Snacks / street food', 25, 'Hubballi', 'Street vendors collective (demo)', 1, 3, 'scheduled', 'Hubballi Sahaya Trust (demo)'),
      D('SP-1007', 'Canteen rice and sambar', 'Cooked meals', 80, 'Tumakuru', 'College canteen (demo)', 1, 2.5, 'done', 'Tumakuru Meals Trust (demo)'),
      D('SP-1008', 'Packaged biscuits', 'Packaged food', 150, 'Bengaluru', 'Packaging unit (demo)', 1, 72, 'listed')],
    demands: [R('RQ-1', 'Bengaluru Community Kitchen (demo)', 'Bengaluru', 'Cooked meals', 100, 6), R('RQ-2', 'Mysore Evening Seva Trust (demo)', 'Mysore', 'Packaged food', 60, 8, 'veg'),
      R('RQ-3', 'Mangalore Annapoorna Kitchen (demo)', 'Mangalore', 'Fruit & vegetables', 40, 10), R('RQ-4', 'Bidar Community Centre (demo)', 'Bidar', 'Bakery', 50, 9), R('RQ-5', 'Hubballi Sahaya Trust (demo)', 'Hubballi', 'Cooked meals', 30, 5, 'veg')],
    users: [{ name: 'Sample donor', type: 'donor', city: 'Bengaluru' }, { name: 'Sample NGO', type: 'ngo', city: 'Mysore' }, { name: 'Sample volunteer', type: 'volunteer', city: 'Mangalore' }] };
}
function load() { try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.donations) return s; } catch (e) {} return seed(); }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
const toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(toast.k); toast.k = setTimeout(() => t.classList.remove('on'), 4500); };
const dlg = $('#pm'), pbody = $('#pbody');
const show = (title, html) => { $('#pmt').textContent = title; $('#pmb').innerHTML = html; dlg.showModal ? dlg.showModal() : dlg.setAttribute('open', ''); };
$('.pmx').addEventListener('click', () => dlg.close ? dlg.close() : dlg.removeAttribute('open'));
dlg.addEventListener('click', e => { if (e.target === dlg) $('.pmx').click(); });

// ---- Dashboard stats (derived from the same data as everything else)
function stats() {
  const d = S.donations, L = d.filter(x => x.status == 'listed'), cl = d.filter(x => x.status != 'listed'), aw = d.filter(x => x.status == 'connected' || x.status == 'scheduled'), dn = d.filter(x => x.status == 'done');
  const donors = new Set(d.map(x => x.donor)).size, ngos = new Set([...S.demands.map(x => x.org), ...d.filter(x => x.org).map(x => x.org)]).size;
  const c = [['Donations listed', d.length], ['Portions available', sum(L, x => x.qty)], ['Donations claimed', cl.length], ['Awaiting collection', aw.length], ['Completed distributions', dn.length], ['Donors / NGOs', donors + ' / ' + ngos]];
  const p = n => d.length ? Math.round(n / d.length * 100) : 0;
  $('#stats').innerHTML = c.map(x => `<div class="stat"><b>${x[1]}</b><span>${T(x[0])}</span></div>`).join('') +
    `<div class="prog"><p>${T('Donations claimed')}: ${p(cl.length)}%</p><i style="--w:${p(cl.length)}%"></i><p>${T('Completed distributions')}: ${p(dn.length)}%</p><i style="--w:${p(dn.length)}%"></i>
    <div class="seg" role="img" aria-label="Donations by status">${ORD.map(s => `<span class="s-${s}" style="flex:${d.filter(x => x.status == s).length}" title="${T(ST[s])}: ${d.filter(x => x.status == s).length}"></span>`).join('')}</div></div>`;
}

// ---- Transparent Smart Match: weighted rules, no machine learning
const km = (a, b) => { const r = Math.PI / 180, [p, q] = CITY[a], [u, v] = CITY[b], x = Math.sin((u - p) * r / 2) ** 2 + Math.cos(p * r) * Math.cos(u * r) * Math.sin((v - q) * r / 2) ** 2; return 12742 * Math.asin(Math.sqrt(x)); };
function score(d, q) {
  const dist = km(d.city, q.city), hrs = (d.deadline - Date.now()) / H;
  const f = [['Distance', 25, Math.max(0, 1 - dist / 400), `${Math.round(dist)} km apart`], ['Quantity', 25, Math.min(d.qty, q.qty) / Math.max(d.qty, q.qty), `${d.qty} available vs ${q.qty} needed`],
    ['Food category', 15, d.cat == q.cat ? 1 : 0, d.cat == q.cat ? 'same category' : `${d.cat} vs ${q.cat}`], ['Dietary fit', 10, q.diet == 'veg' && !d.veg ? 0 : 1, q.diet == 'veg' ? (d.veg ? 'vegetarian, as required' : 'non-vegetarian, not suitable') : 'no restriction'],
    ['Time left', 15, Math.max(0, Math.min(1, hrs / 2)), `${Math.max(0, hrs).toFixed(1)} h to collection deadline`], ['Collection availability', 10, q.status == 'open' ? 1 : 0, q.status == 'open' ? 'request is open' : 'request closed']];
  return { pct: Math.round(sum(f, x => x[1] * x[2])), f };
}
const pairs = () => S.donations.filter(d => d.status == 'listed').flatMap(d => S.demands.filter(q => q.status == 'open').map(q => ({ d, q, ...score(d, q) }))).sort((a, b) => b.pct - a.pct);
const why = m => `${m.q.org} (${m.q.city}) needs about ${m.q.qty} portions of ${m.q.cat.toLowerCase()}, and ${m.d.donor} in ${m.d.city} has ${m.d.qty} portions available.`;
const table = m => `<p>${esc(why(m))}</p><table class="mt"><tr><th>Factor</th><th>Weight</th><th>Score</th><th>Why</th></tr>${m.f.map(x => `<tr><td>${x[0]}</td><td>${x[1]}</td><td>${(x[1] * x[2]).toFixed(1)}</td><td>${x[3]}</td></tr>`).join('')}</table><p class="note">${m.pct}% is the sum of these weighted rules (demonstration logic, not an AI prediction).</p>`;

// ---- Actions
function canAct() { if (S.role == 'ngo' || S.role == 'volunteer') return true; toast('Switch to the NGO or Volunteer role above to claim or connect (demo).'); return false; }
function connect(d, org, q) { d.status = 'connected'; d.org = org; d.log.push({ s: 'connected', t: Date.now() }); if (q) q.status = d.qty >= q.qty ? 'fulfilled' : 'partly met'; save(); refresh(); toast(`${d.id} connected to ${org}. Demo only: no real organisation was contacted.`); }
function claim(id) { const d = find(id); if (d && d.status == 'listed' && canAct()) connect(d, S.org); }
function adv(id) { const d = find(id), i = ORD.indexOf(d.status); if (i < 1 || i > 3) return; if (S.role != 'volunteer' && S.role != 'admin') return toast('Only the Volunteer or Administrator demo role updates pickup status.'); d.status = ORD[i + 1]; if (d.status == 'scheduled') d.pickup = Date.now() + 45 * 6e4; d.log.push({ s: d.status, t: Date.now() }); save(); refresh(); }
const passport = d => `<dl class="pp"><dt>Prepared</dt><dd>${fmt(d.prep)}</dd><dt>Category</dt><dd>${esc(d.cat)}</dd><dt>Storage</dt><dd>${esc(d.storage)}</dd><dt>Packaging</dt><dd>${esc(d.pack)}</dd><dt>Allergens</dt><dd>${esc(d.allergen)}</dd><dt>Diet</dt><dd>${d.veg ? 'Vegetarian' : 'Non-vegetarian'}</dd><dt>Collection deadline</dt><dd>${fmt(d.deadline)}</dd><dt>Handling notes</dt><dd>${esc(d.notes)}</dd></dl>
  <p class="note">Food Safety Passport: donor-recorded information only. It is not a food-safety certification. The donor and receiving organisation must assess the food and follow applicable food-safety requirements.</p><button class="btn pri" data-a="track" data-id="${d.id}">Track ${d.id}</button>`;

// ---- Tabs
const TABS = [['market', 'Marketplace'], ['match', 'Smart Match'], ['demand', 'What Communities Need'], ['track', 'Track Your Food Rescue'], ['mine', 'Dashboard'], ['insights', 'Insights'], ['map', 'Map'], ['community', 'Community']];
const urgOK = (d, u) => { const h = (d.deadline - Date.now()) / H; return !u || (u == 'u' ? h < 3 : u == 't' ? h < 24 : h >= 24); };
const opt = (a, cur) => a.map(x => `<option${x == cur ? ' selected' : ''}>${x}</option>`).join('');
function market() {
  if (!$('#mgrid')) pbody.innerHTML = `<h3>${T('Available Food Near You')}</h3><p class="demo">Illustrative demonstration listings · images are representative</p>
  <div class="filt"><input data-f="q" type="search" placeholder="${T('Search food, donor or city')}" aria-label="Search" value="${esc(F.q)}"><select data-f="city" aria-label="Location"><option value="">All locations</option>${opt(Object.keys(CITY), F.city)}</select><select data-f="cat" aria-label="Food category"><option value="">All categories</option>${opt(CATS, F.cat)}</select>
  <input data-f="min" type="number" min="0" placeholder="Min. portions" aria-label="Minimum portions" value="${esc(F.min)}"><select data-f="urg" aria-label="Collection urgency"><option value="">Any urgency</option><option value="u"${F.urg == 'u' ? ' selected' : ''}>Urgent (under 3 h)</option><option value="t"${F.urg == 't' ? ' selected' : ''}>Today (under 24 h)</option><option value="l"${F.urg == 'l' ? ' selected' : ''}>Later (24 h+)</option></select></div><p id="mcount" aria-live="polite"></p><div id="mgrid" class="mgrid"></div>`;
  const q = F.q.toLowerCase(), v = S.donations.filter(d => (!F.city || d.city == F.city) && (!F.cat || d.cat == F.cat) && d.qty >= (+F.min || 0) && urgOK(d, F.urg) && (!q || [d.food, d.donor, d.city, d.cat, d.id].join(' ').toLowerCase().includes(q)));
  $('#mcount').textContent = `${v.length} of ${S.donations.length} listings`;
  $('#mgrid').innerHTML = v.map(d => `<article class="mc"><img src="${IMG[d.cat]}" alt="" loading="lazy"><div class="mc-b"><span class="badge s-${d.status}">${d.status == 'listed' ? T('Available') : T(ST[d.status])}</span><h4>${esc(d.food)}</h4>
    <p class="mc-m">${esc(d.cat)} · ${d.qty} portions · ${esc(d.city)}</p><p>${esc(d.donor)}</p><p class="mc-m">Prepared ${fmt(d.prep)} · Collect by ${fmt(d.deadline)}</p><p class="mc-m">Storage: ${esc(d.storage)}</p>
    <div class="btns"><button class="btn line" data-a="view" data-id="${d.id}">${T('View Details')}</button><button class="btn pri" data-a="claim" data-id="${d.id}"${d.status != 'listed' ? ' disabled' : ''}>${d.status == 'listed' ? T('Claim Donation') : T('Claimed')}</button></div></div></article>`).join('') || `<p class="empty">${T('No donations match your filters.')}</p>`;
}
function matchTab() {
  const m = pairs().slice(0, 6);
  pbody.innerHTML = `<h3>Smart Match</h3><p class="note">Scores use six transparent weighted rules (distance 25, quantity 25, category 15, dietary fit 10, time left 15, availability 10). It is demonstration logic, not an AI prediction.</p>` +
    (m.map((x, i) => `<div class="mrow"><b class="pct">${x.pct}%</b><div><p>${esc(why(x))}</p><div class="btns"><button class="btn line" data-a="vm" data-i="${i}">${T('View Match')}</button><button class="btn pri" data-a="cn" data-i="${i}">${T('Connect')}</button></div></div></div>`).join('') || '<p class="empty">No open matches right now. List food or publish a request.</p>');
  pbody._m = m;
}
function demandTab() {
  pbody.innerHTML = `<h3>${T('What Communities Need')}</h3><p class="demo">Illustrative demonstration requests</p>` + (S.role == 'ngo' ? `<form class="rq" id="rq"><input id="rqq" type="number" min="1" placeholder="Portions needed" aria-label="Portions needed" required><select id="rqc" aria-label="Category">${opt(CATS)}</select><select id="rqt" aria-label="City">${opt(Object.keys(CITY))}</select><button class="btn pri" type="submit">Publish request as ${esc(S.org)}</button></form>` : '<p class="note">Switch to the NGO role to publish a request.</p>') +
    `<div class="mgrid">${S.demands.map(q => `<article class="mc"><div class="mc-b"><span class="badge s-${q.status == 'open' ? 'listed' : 'done'}">${esc(q.status)}</span><h4>${esc(q.org)}</h4><p class="mc-m">${esc(q.city)} · ${esc(q.cat)} · ${q.qty} portions</p><p class="mc-m">Needed by ${fmt(q.due)}${q.diet == 'veg' ? ' · vegetarian only' : ''}</p><div class="btns"><button class="btn pri" data-a="ful" data-id="${q.id}"${q.status != 'open' ? ' disabled' : ''}>${T('Fulfil This Request')}</button></div></div></article>`).join('')}</div>`;
}
function trackTab() {
  const d = find(tracked);
  pbody.innerHTML = `<h3>${T('Track Your Food Rescue')}</h3><form class="rq" id="tf"><input id="tid" value="${esc(tracked)}" aria-label="Donation ID" placeholder="e.g. SP-1001"><button class="btn pri" type="submit">${T('Track')}</button></form><p class="note">Status-based tracking only. There is no live GPS.</p>` +
    (d ? `<ol class="tl">${ORD.map((s, i) => { const e = d.log.find(x => x.s == s); return `<li class="${e ? 'on' : ''}"><i>${e ? '✓' : i + 1}</i><b>${T(ST[s])}</b><small>${e ? fmt(e.t) : '—'}</small></li>`; }).join('')}</ol>
    <dl class="pp"><dt>Donation ID</dt><dd>${d.id}</dd><dt>Food</dt><dd>${esc(d.food)} · ${d.qty} portions</dd><dt>Donor</dt><dd>${esc(d.donor)}</dd><dt>Receiving organisation</dt><dd>${esc(d.org || 'Not yet connected')}</dd><dt>Status</dt><dd>${T(ST[d.status])}</dd><dt>Scheduled pickup</dt><dd>${d.pickup ? fmt(d.pickup) : 'Not scheduled'}</dd></dl><button class="btn line" data-a="view" data-id="${d.id}">Food Safety Passport</button>` : '<p class="empty">No donation found with that ID. Try SP-1001 to SP-1008.</p>');
}
const row = (d, b) => `<li><b>${d.id}</b> ${esc(d.food)} · ${d.qty} · ${esc(d.city)} · ${T(ST[d.status])} ${b || ''}<button class="lnk" data-a="track" data-id="${d.id}">track</button></li>`;
function mineTab() {
  const r = S.role, d = S.donations, nxt = { connected: 'Accept pickup', scheduled: 'Mark collected', collected: 'Mark distributed' }, ab = x => nxt[x.status] ? `<button class="btn line" data-a="adv" data-id="${x.id}">${nxt[x.status]}</button>` : '';
  let h = `<h3>${T('Dashboard')}: ${r}</h3>`;
  if (r == 'donor') { const m = d.filter(x => x.mine); h += `<p><a class="btn pri" href="#involve" data-role="donor">List surplus food</a></p><h4>Your submissions</h4><ul class="lst">${m.map(x => row(x)).join('') || '<li>None yet. Use the Get Involved form.</li>'}</ul><h4>History (distributed)</h4><ul class="lst">${d.filter(x => x.mine && x.status == 'done').map(x => row(x)).join('') || '<li>No completed donations yet.</li>'}</ul>`; }
  if (r == 'ngo') h += `<h4>Incoming food for ${esc(S.org)}</h4><ul class="lst">${d.filter(x => x.org == S.org).map(x => row(x)).join('') || '<li>Nothing claimed yet. Open the Marketplace.</li>'}</ul><h4>Community demand</h4><ul class="lst">${S.demands.filter(q => q.status == 'open').map(q => `<li>${esc(q.org)}: ${q.qty} ${esc(q.cat)}</li>`).join('')}</ul>`;
  if (r == 'volunteer') h += `<h4>Pickup requests and assigned collections</h4><ul class="lst">${d.filter(x => x.status != 'listed' && x.status != 'done').map(x => row(x, ab(x))).join('') || '<li>No pickups waiting.</li>'}</ul><h4>Completed activities</h4><ul class="lst">${d.filter(x => x.status == 'done').map(x => row(x)).join('')}</ul>`;
  if (r == 'admin') h += `<h4>All listings</h4><ul class="lst">${d.map(x => row(x, ab(x))).join('')}</ul><h4>Registered demo users (${S.users.length})</h4><ul class="lst">${S.users.map(u => `<li>${esc(u.name)} · ${u.type} · ${esc(u.city)}</li>`).join('')}</ul>`;
  pbody.innerHTML = h + '<p class="note">Demo role selection only. It is not secure authentication.</p>';
}
const HIST = [[7, 0, 40, 1], [7, 1, 25, 1], [6, 0, 55, 1], [6, 3, 30, 0], [5, 0, 45, 1], [5, 2, 20, 1], [4, 0, 60, 1], [4, 1, 30, 1], [3, 0, 50, 0], [3, 4, 25, 1], [2, 0, 65, 1], [2, 2, 20, 1], [1, 0, 55, 1], [1, 1, 25, 1], [0, 0, 48, 1]];
function insights() {
  const rec = [...HIST.map(x => ({ w: x[0], cat: CATS[x[1]], q: x[2], ok: !!x[3] })), ...S.donations.filter(x => x.mine).map(x => ({ w: 0, cat: x.cat, q: x.qty, ok: x.status != 'listed' }))];
  const wk = [7, 6, 5, 4, 3, 2, 1, 0].map(w => sum(rec.filter(x => x.w == w), x => x.q)), mx = Math.max(...wk), tot = sum(rec, x => x.q);
  const by = CATS.map(c => [c, sum(rec.filter(x => x.cat == c), x => x.q)]).sort((a, b) => b[1] - a[1]), top = by[0], un = rec.filter(x => !x.ok).length, red = rec.filter(x => x.ok).length;
  const recent = (wk[5] + wk[6] + wk[7]) / 3, before = (wk[2] + wk[3] + wk[4]) / 3;
  pbody.innerHTML = `<h3>Restaurant food waste insights</h3><p class="demo">Demo Data · sample restaurant records plus anything you list</p>
  <p class="note"><b>Suggestion:</b> ${top[0]} account for ${Math.round(top[1] / tot * 100)}% of the ${tot} surplus portions recorded here. Consider adjusting preparation quantities for this category based on demand. Surplus portions per week are ${recent > before ? 'rising' : 'falling or steady'} (${Math.round(recent)} recent average vs ${Math.round(before)} earlier).</p>
  <h4>Surplus portions by week (oldest to current)</h4><div class="bars">${wk.map((v, i) => `<button type="button" title="Week ${i == 7 ? 'now' : '-' + (7 - i)}: ${v} portions" aria-label="Week ${i == 7 ? 'now' : '-' + (7 - i)}: ${v} portions" style="--h:${Math.round(v / mx * 100)}%"><span>${v}</span></button>`).join('')}</div>
  <h4>Most listed categories</h4>${by.map(c => `<div class="hb"><span>${c[0]}</span><i style="--w:${Math.round(c[1] / tot * 100)}%"></i><b>${c[1]}</b></div>`).join('')}
  <p>Total surplus recorded: <b>${tot}</b> portions · Redistributed entries: <b>${red}</b> · Unclaimed entries: <b>${un}</b></p>`;
}
function mapTab() {
  pbody.innerHTML = `<h3>Food rescue map (illustrative)</h3><p class="demo">Demonstration locations, not live positions</p><div id="map" role="region" aria-label="Map of Karnataka demonstration activity"></div><p class="lg"><span class="k-donor">Donor</span><span class="k-ngo">NGO partner</span><span class="k-avail">Available donation</span><span class="k-done">Completed</span></p>`;
  if (!window.L) { $('#map').textContent = 'Map library could not load (it needs internet). Locations: ' + Object.keys(CITY).join(', '); return; }
  map = L.map('map').setView([14.6, 76.4], 6); L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© OpenStreetMap contributors' }).addTo(map);
  const pts = [], seen = {}, add = (n, t, c, i) => { const k = t + n; if (seen[k]) return; seen[k] = 1; pts.push([n, t, c, i]); };
  S.donations.forEach(d => { add(d.donor, 'Food donor', d.city, 0); if (d.org) add(d.org, 'NGO partner', d.city, 1); if (d.status == 'listed') add(d.id + ' ' + d.food, 'Available donation', d.city, 2); if (d.status == 'done') add(d.id + ' ' + d.food, 'Completed distribution', d.city, 3); });
  S.demands.forEach(q => add(q.org, 'NGO partner', q.city, 1));
  const col = ['#344C3D', '#B66D4B', '#C5A66A', '#6f8f78'], cnt = {};
  pts.forEach(p => { const c = CITY[p[2]], n = cnt[p[2]] = (cnt[p[2]] || 0) + 1, a = n * 1.1; L.circleMarker([c[0] + Math.sin(a) * .09 * Math.ceil(n / 6), c[1] + Math.cos(a) * .09 * Math.ceil(n / 6)], { radius: 8, color: '#fff', weight: 2, fillColor: col[p[3]], fillOpacity: .95 }).addTo(map).bindPopup(`<b>${esc(p[0])}</b><br>${p[1]}<br>${esc(p[2])} · demo location`); });
  setTimeout(() => map && map.invalidateSize(), 50);
}
function community() {
  const done = sum(S.donations.filter(x => x.status == 'done'), x => x.qty), pc = Math.min(100, Math.round(done / 500 * 100));
  pbody.innerHTML = `<h3>Community recognition</h3><p class="demo">Sample users · demonstration profiles</p><div class="comm"><div><h4>Participating donors</h4><p>Spice Court Restaurant (demo)<br>Apoorva Bakery (demo)<br>Tiffin House (demo)</p></div><div><h4>Active volunteers</h4><p>Sample volunteer A<br>Sample volunteer B</p></div><div><h4>Community organisations</h4><p>Bidar Community Centre (demo)<br>Hubballi Sahaya Trust (demo)</p></div></div>
  <h4>Badges</h4><p class="badges"><span>First Food Rescue</span><span>Community Contributor</span><span>Food Rescue Champion</span><span>Consistent Volunteer</span></p>
  <h4>Monthly milestone: ${done} of 500 demo portions distributed</h4><div class="hb"><i style="--w:${pc}%"></i></div><p class="note">Recognition celebrates participation together. There are no rankings or scores between people.</p>`;
}
const VIEW = { market, match: matchTab, demand: demandTab, track: trackTab, mine: mineTab, insights, map: mapTab, community };
function render() { if (map) { map.remove(); map = null; } $$('#ptabs button').forEach(b => b.setAttribute('aria-selected', b.dataset.t == tab)); if (tab != 'market' || !$('#mgrid')) pbody.innerHTML = ''; VIEW[tab](); tr(pbody); }
function refresh() { stats(); render(); }
function go(t) { tab = t; render(); }

// ---- Toolbar, language, events
function bar() {
  $('#roleBar').innerHTML = `<label>${T('Explore as')} <select id="role">${['donor', 'ngo', 'volunteer', 'admin'].map(r => `<option value="${r}"${r == S.role ? ' selected' : ''}>${r}</option>`).join('')}</select></label>${S.role == 'ngo' || S.role == 'volunteer' ? `<label>Acting for <select id="org">${opt([...new Set(S.demands.map(q => q.org))], S.org)}</select></label>` : ''}<button type="button" class="lnk" id="reset">${T('Reset demo data')}</button><small>Demo sign-in only: no passwords, not secure authentication.</small>`;
}
$('#ptabs').innerHTML = TABS.map(t => `<button type="button" role="tab" data-t="${t[0]}">${T(t[1])}</button>`).join('');
$('#platform').addEventListener('change', e => { const t = e.target; if (t.id == 'role') { S.role = t.value; save(); bar(); render(); } else if (t.id == 'org') { S.org = t.value; save(); render(); } else if (t.dataset.f) { F[t.dataset.f] = t.value; market(); } });
$('#platform').addEventListener('input', e => { if (e.target.dataset.f) { F[e.target.dataset.f] = e.target.value; market(); } });
$('#platform').addEventListener('submit', e => {
  e.preventDefault();
  if (e.target.id == 'tf') { tracked = $('#tid').value.trim().toUpperCase(); trackTab(); }
  if (e.target.id == 'rq') { S.demands.unshift({ id: 'RQ-' + S.seq++, org: S.org, city: $('#rqt').value, cat: $('#rqc').value, qty: +$('#rqq').value, due: Date.now() + 8 * H, diet: 'any', status: 'open' }); save(); refresh(); toast('Request published (demo).'); }
});
$('#platform').addEventListener('click', e => {
  const b = e.target.closest('button,a'); if (!b) return;
  if (b.dataset.t) return go(b.dataset.t);
  if (b.id == 'reset') { localStorage.removeItem(KEY); S = seed(); F = { q: '', city: '', cat: '', min: '', urg: '' }; bar(); refresh(); return toast('Demo data reset.'); }
  const a = b.dataset.a, d = find(b.dataset.id), m = pbody._m && pbody._m[+b.dataset.i];
  if (a == 'view') show(d.food + ' · ' + d.id, passport(d));
  if (a == 'claim') claim(b.dataset.id);
  if (a == 'adv') adv(b.dataset.id);
  if (a == 'track') { tracked = b.dataset.id; if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); go('track'); $('#platform').scrollIntoView(); }
  if (a == 'vm') show(m.pct + '% match', table(m));
  if (a == 'cn' && canAct()) connect(m.d, m.q.org, m.q);
  if (a == 'ful') { const q = S.demands.find(x => x.id == b.dataset.id), c = S.donations.filter(x => x.status == 'listed').map(x => ({ d: x, q, ...score(x, q) })).sort((x, y) => y.pct - x.pct).slice(0, 3); pbody._c = c;
    show('Fulfil: ' + q.org, c.map((x, i) => `<div class="mrow"><b class="pct">${x.pct}%</b><div><p>${esc(x.d.food)} · ${x.d.qty} portions · ${esc(x.d.city)}</p><button class="btn pri" data-a="fc" data-i="${i}">${T('Connect')}</button></div></div>`).join('') || '<p>No listed donations yet.</p>'); }
  if (a == 'fc' && canAct()) { const x = pbody._c[+b.dataset.i]; $('.pmx').click(); connect(x.d, x.q.org, x.q); }
});

// ---- Language (English / Kannada): translates headings, nav, buttons, labels. Long paragraphs stay in English.
function tr(root = document) { $$('a,h1,h2,h3,h4,button,label,p,span,option,th,legend,li,dt', root).forEach(e => { if (e.childElementCount) return; const k = e.dataset.en || e.textContent.trim(); if (K[k]) { e.dataset.en = k; e.textContent = S.lang == 'kn' ? K[k] : k; } }); }
function lang() { document.documentElement.lang = S.lang == 'kn' ? 'kn' : 'en-IN'; $('#lang').textContent = S.lang == 'kn' ? 'English' : 'ಕನ್ನಡ'; $$('#ptabs button').forEach(b => b.textContent = T(TABS.find(t => t[0] == b.dataset.t)[1])); tr(); bar(); fields(); stats(); pbody.innerHTML = ''; render(); }
$('#lang').addEventListener('click', () => { S.lang = S.lang == 'kn' ? 'en' : 'kn'; save(); lang(); });

// ---- Multi-role Get Involved form: stores into the same data model
const DEF = { name: ['Your name', 'text'], email: ['Email', 'email'], phone: ['Phone (10 digits)', 'tel'], city: ['Location', 'sel', Object.keys(CITY)] };
const FD = { donor: [['name'], ['email'], ['phone'], ['org', 'Restaurant / household name'], ['food', 'Food item'], ['cat', 'Food category', 'sel', CATS], ['qty', 'Available quantity (portions)', 'number'], ['city'], ['prep', 'Preparation time', 'datetime-local'], ['deadline', 'Collection deadline', 'datetime-local'], ['storage', 'Storage information'], ['veg', 'Vegetarian / non-vegetarian', 'sel', ['Vegetarian', 'Non-vegetarian']], ['pack', 'Packaging status', 'sel', ['Sealed', 'Open container', 'Not yet packed']], ['allergen', 'Allergen information'], ['notes', 'Handling notes', 'area']],
  ngo: [['org', 'Organisation name'], ['name', 'Contact person'], ['email'], ['phone'], ['city'], ['cat', 'Food category needed', 'sel', CATS], ['qty', 'Portions required', 'number'], ['due', 'Required by', 'datetime-local'], ['diet', 'Dietary requirement', 'sel', ['Any', 'Vegetarian only']], ['notes', 'Community requirements', 'area']],
  volunteer: [['name'], ['email'], ['phone'], ['city'], ['avail', 'Availability', 'sel', ['Weekday evenings', 'Weekends', 'Flexible']], ['act', 'Preferred volunteering activity', 'sel', ['Collection and transport', 'Packing', 'Distribution', 'Coordination']]] };
FD.event = FD.donor.map(f => f[0] == 'org' ? ['org', 'Event name / organiser'] : f);
const fld = f => { const id = f[0], lab = f[1] || DEF[id][0], ty = f[2] || (DEF[id] || [])[1] || 'text', op = f[3] || (DEF[id] || [])[2], req = id != 'allergen' && id != 'notes';
  const c = ty == 'sel' ? `<select id="f_${id}"><option value="">Select…</option>${op.map(o => `<option>${o}</option>`).join('')}</select>` : ty == 'area' ? `<textarea id="f_${id}" rows="3"></textarea>` : `<input id="f_${id}" type="${ty}"${ty == 'number' ? ' min="1"' : ''}>`;
  return `<div class="f${ty == 'area' ? ' full' : ''}"><label for="f_${id}">${T(lab)}${req ? ' *' : ''}</label>${c}<span class="err"></span></div>`; };
function fields() { const t = $('#utype').value; $('#fields').innerHTML = FD[t].map(fld).join('') + (t == 'donor' || t == 'event' ? `<div class="f full"><label class="ck"><input type="checkbox" id="ack"> I have recorded the food-safety details honestly. I understand SharePlate does not certify food as safe and that applicable food-safety requirements must be followed. *</label><span class="err"></span></div>` : ''); $('#ok').textContent = ''; }
$('#utype').addEventListener('change', fields);
$$('[data-role]').forEach(a => a.addEventListener('click', () => { $('#utype').value = a.dataset.role; fields(); }));
$('#join').addEventListener('submit', e => {
  e.preventDefault(); const t = $('#utype').value, v = {}; let first = null;
  const bad = (id, m) => { const el = $(id); el.setAttribute('aria-invalid', !!m); el.closest('.f').querySelector('.err').textContent = m; if (m && !first) first = el; return !m; };
  FD[t].forEach(f => { const id = f[0], val = $('#f_' + id).value.trim(); v[id] = val; let m = '';
    if (id != 'allergen' && id != 'notes' && !val) m = T('This field is required.');
    else if (id == 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) m = 'Enter a valid email address.';
    else if (id == 'phone' && !/^[6-9]\d{9}$/.test(val)) m = 'Enter a 10-digit Indian mobile number.';
    else if (id == 'qty' && !(+val >= 1 && +val <= 5000)) m = 'Enter a quantity between 1 and 5000.';
    bad('#f_' + id, m); });
  if (t == 'donor' || t == 'event') { const p = new Date(v.prep), d = new Date(v.deadline); if (v.deadline && v.prep && !(d > Date.now() && d > p)) bad('#f_deadline', 'Deadline must be in the future and after the preparation time.'); bad('#ack', $('#ack').checked ? '' : 'Please confirm to continue.'); }
  if (t == 'ngo' && v.due && new Date(v.due) <= Date.now()) bad('#f_due', 'Choose a future date and time.');
  const ok = $('#ok'); if (first) { ok.textContent = 'Please fix the highlighted fields.'; return first.focus(); }
  let id = '';
  if (t == 'donor' || t == 'event') { id = 'SP-' + S.seq++; S.donations.unshift({ id, food: v.food, cat: v.cat, qty: +v.qty, city: v.city, donor: v.org, veg: v.veg == 'Vegetarian', prep: +new Date(v.prep), deadline: +new Date(v.deadline), storage: v.storage, pack: v.pack, allergen: v.allergen || 'Not recorded', notes: v.notes || 'None recorded', status: 'listed', org: null, pickup: null, mine: true, log: [{ s: 'listed', t: Date.now() }] }); tracked = id; }
  if (t == 'ngo') { id = 'RQ-' + S.seq++; S.demands.unshift({ id, org: v.org, city: v.city, cat: v.cat, qty: +v.qty, due: +new Date(v.due), diet: v.diet == 'Vegetarian only' ? 'veg' : 'any', status: 'open' }); }
  S.users.push({ name: v.name, type: t, city: v.city }); save(); bar(); refresh();
  ok.textContent = `Demo submission saved in this browser${id ? ' as ' + id : ''}. No real donation was scheduled and no organisation was contacted.`; ok.focus(); $('#join').reset(); fields(); $('#ok').textContent = `Demo submission saved in this browser${id ? ' as ' + id : ''}. Nothing was sent: no real donation was scheduled and no organisation was contacted.`;
});
bar(); lang();
})();
