/* SHAREPLATE — interactions. Demonstration only: nothing is submitted to a server. */
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Missing photos -> clearly named placeholder
  $$('img').forEach(img => {
    const miss = () => { const f = img.closest('.ph'); if (f) { f.classList.add('missing'); f.dataset.name = img.getAttribute('src').split('/').pop(); } img.hidden = true; };
    img.addEventListener('error', miss);
    if (img.complete && !img.naturalWidth) miss();
  });

  // Nav: solid on scroll, mobile menu, active link
  const nav = $('#nav'), menu = $('#menu'), burger = $('.burger');
  const onScroll = () => nav.classList.toggle('solid', scrollY > 60 || menu.classList.contains('open'));
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  burger.addEventListener('click', () => { const o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o); onScroll(); });
  $$('#menu a').forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); onScroll(); }));
  const links = $$('#menu a');
  const spy = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && links.forEach(l => l.classList.toggle('on', l.hash === '#' + e.target.id))), { rootMargin: '-45% 0px -50%' });
  $$('main section[id]').forEach(s => spy.observe(s));

  // Reduced motion: stop hero video (poster stays)
  const vid = $('.hero video');
  const vc = $('.vctl'), setV = p => { vc.textContent = p ? 'Play video' : 'Pause video'; vc.setAttribute('aria-pressed', p); };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches && vid) { vid.removeAttribute('autoplay'); vid.pause(); setV(true); }
  vc.addEventListener('click', () => { if (!vid) return; if (vid.paused) { vid.play().catch(() => {}); setV(false); } else { vid.pause(); setV(true); } });

  // Journey thread: Surplus → Connection → Collection → Distribution → Community
  const stages = ['Surplus', 'Connection', 'Collection', 'Distribution', 'Community'];
  $$('[data-stage]').forEach(s => {
    const p = document.createElement('p'); p.className = 'chain'; p.setAttribute('aria-hidden', 'true');
    p.innerHTML = stages.map((t, i) => `<span class="${i == s.dataset.stage ? 'on' : ''}">${t}</span>`).join('');
    s.prepend(p);
  });

  // Entrance animation
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), { threshold: .12 });
    $$('.story,.roles li,.feat li,.paths div,.themes p,.journey').forEach(el => { el.classList.add('rv'); io.observe(el); });
  }

  // Share Journey
  const J = [
    ['Donation listed', 'A neighbourhood restaurant in Bengaluru lists 25 untouched meal portions after evening service, with preparation time and storage details.', 'Status: Listed, awaiting a partner'],
    ['Partner connected', 'An illustrative NGO partner confirms it can receive the portions and share them at a community distribution point.', 'Status: Partner confirmed'],
    ['Collection coordinated', 'A volunteer is assigned a collection window agreed with the restaurant. Packaging and handover are checked by both sides.', 'Status: Pickup scheduled'],
    ['Distribution completed', 'The portions reach an illustrative community distribution point and are shared responsibly and respectfully.', 'Status: Shared']
  ];
  const tabs = $('.tabs');
  J.forEach((j, i) => { const b = document.createElement('button'); b.role = 'tab'; b.innerHTML = `<b>0${i + 1}</b>${j[0]}`; b.addEventListener('click', () => show(i)); b.addEventListener('keydown', e => { if (e.key == 'ArrowRight') show((i + 1) % 4, 1); if (e.key == 'ArrowLeft') show((i + 3) % 4, 1); }); tabs.append(b); });
  function show(i, focus) {
    $$('button', tabs).forEach((b, k) => { b.setAttribute('aria-selected', k == i); b.tabIndex = k == i ? 0 : -1; if (focus && k == i) b.focus(); });
    const img = $('#jimg'), f = img.closest('.ph');
    f.classList.remove('missing'); img.hidden = false; img.src = `assets/images/journey-${i + 1}.jpg`;
    $('#jtitle').textContent = J[i][0]; $('#jtext').textContent = J[i][1]; $('#jstatus').textContent = J[i][2] + ' · illustrative';
    $('#jbar').style.width = (i + 1) * 25 + '%';
  }
  show(0);

  // Goal numbers count up once (final value is already in the HTML)
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cio = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; cio.unobserve(e.target); const el = e.target, t = +el.dataset.count; let s = null; if (reduce) return;
    const step = ts => { s = s || ts; const p = Math.min((ts - s) / 1200, 1); el.textContent = Math.round(t * p).toLocaleString('en-IN'); if (p < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }), { threshold: .6 });
  $$('[data-count]').forEach(el => cio.observe(el));

  // Checklist
  const boxes = $$('.check input'), cnt = $('#count');
  boxes.forEach(b => b.addEventListener('change', () => cnt.textContent = `${boxes.filter(x => x.checked).length} of 5 considered`));

  // Calculator (illustrative)
  const inp = $('#portions'), out = $('#calcout');
  const calc = () => { const n = Math.floor(+inp.value); out.textContent = n > 0 ? `Illustrative estimate: ${n} portions, packed at an assumed 10 per box, would mean coordinating about ${Math.ceil(n / 10)} boxes, one pickup and one partner. This does not measure people served or any environmental impact.` : 'Enter a number of portions above 0.'; };
  inp.addEventListener('input', calc); $('#calc').addEventListener('submit', e => e.preventDefault()); calc();

  // Stories of Change: six cards + video modal (videos load only when opened)
  const S = [
    ['mangalore', 'Mangalore · Karnataka', 'Hotel & seafood restaurant', 'From Coastal Kitchens to Communities', 'Untouched lunchtime surplus from a busy coastal restaurant finds its way to people in need.', 'After the lunch rush at a busy hotel and seafood restaurant, freshly prepared food remains unsold. The owner lists it on SharePlate from his phone, an NGO volunteer collects the safely packed meals, and they reach people who happily enjoy them.'],
    ['bidar-wedding', 'Bidar · Karnataka', 'The wedding feast', 'A Celebration Worth Sharing', 'A wedding feast becomes a chance to spread happiness beyond the hall.', 'As a grand traditional wedding winds down, untouched portions of biryani, rice, curries and sweets remain. The catering manager lists them on SharePlate, a volunteer collects the packed meals, and families enjoy them.'],
    ['bengaluru-streetfood', 'Bengaluru · Karnataka', 'Street food market', 'Every Unsold Meal Deserves a Chance', 'A street vendor turns the evening\u2019s unsold food into someone\u2019s meal.', 'At the end of a lively evening in a Bengaluru street food market, a vendor has freshly prepared food left. He lists it on SharePlate, a volunteer collects the hygienically packed food from his stall, and it is distributed to people in need.'],
    ['college-canteen', 'India · Campus', 'College canteen', 'One Campus, Many Meals Saved', 'A college canteen joins the movement against food waste.', 'After the lunch rush, the canteen manager sees a considerable quantity of untouched food. He submits a donation request on SharePlate, and a volunteer carries the packed meals to a nearby community organisation for distribution.'],
    ['mysore-restaurant', 'Mysore · Karnataka', 'Restaurant owner', 'A Restaurant\u2019s Small Step Towards Change', 'One owner\u2019s simple decision creates a meaningful impact.', 'After the lunch rush at a traditional Mysore restaurant, freshly prepared dosas, idlis and curries remain. The owner lists the meals on SharePlate, an NGO representative collects them, and they are delivered to people who happily enjoy them.'],
    ['bakery', 'India · Bakery', 'Bakery & pastry shop', 'Don\u2019t Let Good Food Go to Waste', 'Fresh bakery products head to a community centre instead of the bin.', 'As an Indian bakery prepares to close, cakes, buns, puffs and other products remain unsold. The owner lists them on SharePlate, a volunteer collects them, and volunteers at a community centre share them with people in need.']
  ];
  const host = $('#sgrid'), dlg = $('#vmodal'), pl = $('#vplayer'), still = matchMedia('(prefers-reduced-motion: reduce)').matches; let lastBtn = null;
  host.insertAdjacentHTML('beforeend', S.map((s, i) => `<article class="sv${i % 2 ? ' r' : ''}" aria-labelledby="sv${i}">
    <video muted loop playsinline preload="none" poster="assets/images/stories/${s[0]}.jpg" data-src="assets/videos/stories/${s[0]}.mp4" aria-hidden="true"></video>
    <div class="sv-in"><p class="sv-loc">${s[1]} · ${s[2]}</p><h3 id="sv${i}">${s[3]}</h3><p class="sv-lead">${s[4]}</p><p>${s[5]}</p>
    <div class="btns"><button type="button" class="btn gold sv-watch" data-i="${i}">\u25B6 Watch with sound</button><span class="demo">Illustrative AI-generated video</span></div></div>
    <button type="button" class="svctl" aria-label="Pause or play background video: ${s[3]}">Pause</button></article>`).join(''));
  const play = v => { if (!v.src) v.src = v.dataset.src; v.muted = true; v.play().catch(() => {}); };
  // Only the story in view plays; the others stay paused and unloaded
  const sio = new IntersectionObserver(es => es.forEach(e => { const v = e.target.querySelector('video'); if (e.intersectionRatio >= .45 && !v.dataset.hold) play(v); else v.pause(); }), { threshold: [0, .45] });
  $$('.sv').forEach(s => sio.observe(s));
  if (still) $$('.svctl').forEach(c => { c.textContent = 'Play'; c.parentNode.querySelector('video').dataset.hold = 1; });
  host.addEventListener('click', e => {
    const c = e.target.closest('.svctl');
    if (c) { const v = c.parentNode.querySelector('video'); if (v.paused) { delete v.dataset.hold; play(v); c.textContent = 'Pause'; } else { v.dataset.hold = 1; v.pause(); c.textContent = 'Play'; } return; }
    const b = e.target.closest('.sv-watch'); if (!b) return;
    const s = S[+b.dataset.i]; lastBtn = b;
    pl.poster = `assets/images/stories/${s[0]}.jpg`; pl.src = `assets/videos/stories/${s[0]}.mp4`;
    $('#vloc').textContent = `${s[1]} · ${s[2]}`; $('#vtitle').textContent = s[3]; $('#vdesc').textContent = s[5];
    dlg.showModal ? dlg.showModal() : dlg.setAttribute('open', '');
    pl.play().catch(() => {});
  });
  const cleanup = () => { pl.pause(); pl.removeAttribute('src'); pl.load(); if (lastBtn) lastBtn.focus(); };
  dlg.addEventListener('close', cleanup);
  $('.vclose').addEventListener('click', () => dlg.close ? dlg.close() : (dlg.removeAttribute('open'), cleanup()));
  dlg.addEventListener('click', e => { if (e.target === dlg) $('.vclose').click(); });
})();
