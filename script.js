/* ====== EDIT THIS PART ====== */
const CONFIG = {
  name: "Maahi",
  from: "Ritik",
  sub: "The world became a little brighter the day you were born 💖",
  // Put your photos in the images/ folder and match the names here.
  photos: [
    { src: "images/1.jpg", cap: "Where it all began" },
    { src: "images/2.jpg", cap: "My favourite smile" },
    { src: "images/3.jpg", cap: "Us, being us" },
    { src: "images/4.jpg", cap: "Never wanted this day to end" },
    { src: "images/5.jpg", cap: "My happy place" },
    { src: "images/6.jpg", cap: "Forever to go" }
  ],
  reasons: [
    "Your smile fixes my worst days",
    "The way you care without being asked",
    "I feel at home when I'm with you",
    "Your laugh is my favourite sound",
    "You believe in me, always",
    "You make ordinary days feel special",
    "Your hugs are my safest place",
    "How kind your heart is to everyone",
    "You make me want to be better",
    "Because it's you. Just you."
  ],
  letter: [
    "Today the whole world celebrates the day it got you, and I'm the luckiest person alive, because I get to love you on every other day too.",
    "You walked into my life and quietly turned ordinary days into the ones I never want to end. Your smile is my favourite sight, your laugh is my favourite sound, and your hand in mine is the one place that always feels like home.",
    "Thank you for your patience on my busiest days, for believing in me when I doubt myself, and for loving me in a way that makes me want to be better every single day.",
    "On your birthday, I wish you everything you give so freely to others: endless happiness, a peace that stays, dreams that come true, and a love that never lets you feel alone.",
    "Whatever comes next, I'll be right beside you, holding your hand and cheering the loudest. I love you more than words, and far more than this little website could ever show."
  ]
};
/* ============================ */

const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);
const rnd = (a, b) => a + Math.random() * (b - a);
const COLORS = ['#ff4d85', '#ff8fb1', '#ffc9dc', '#ffd9a0', '#e8457b', '#fff'];

/* hearts + confetti canvas */
const cv = $('#bg'), cx = cv.getContext('2d'); let W, H, dpr;
const size = () => { dpr = Math.min(devicePixelRatio || 1, 2); W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr; };
size(); addEventListener('resize', size);
const P = [];
const floater = () => ({ bg: 1, x: rnd(0, W), y: H + rnd(0, H * .3), s: rnd(10, 34) * dpr, v: rnd(.3, 1.1) * dpr, ph: rnd(0, 6.28), c: COLORS[(Math.random() * 5) | 0], a: rnd(.15, .5) });
for (let i = 0; i < (innerWidth < 600 ? 22 : 40); i++) { const f = floater(); f.y = rnd(0, H); P.push(f); }
function burst(x, y, n = 14, conf) {
  for (let i = 0; i < n; i++) {
    const a = rnd(0, 6.28), v = (conf ? rnd(2, 7) : rnd(.8, 2.6)) * dpr;
    P.push({ x: x * dpr, y: y * dpr, vx: Math.cos(a) * v, vy: Math.sin(a) * v - (conf ? 2 : 1) * dpr, g: (conf ? .12 : .025) * dpr, s: rnd(10, 24) * dpr, c: COLORS[(Math.random() * 6) | 0], a: 1, life: 1, d: conf ? .012 : .007, ch: conf && Math.random() < .5 ? '■' : '♥' });
  }
}
function rain(x, y) { // slow, soft hearts that drift down from the cursor
  P.push({ x: x * dpr + rnd(-8, 8) * dpr, y: y * dpr, vx: 0, vy: rnd(.25, .6) * dpr, g: .004 * dpr, s: rnd(9, 18) * dpr, c: COLORS[(Math.random() * 4) | 0], a: 1, life: 1, d: .0045, sw: rnd(0, 6.28) });
}
(function loop(t) {
  cx.clearRect(0, 0, W, H);
  for (let i = P.length - 1; i >= 0; i--) {
    const p = P[i];
    if (p.bg) { p.y -= p.v; p.x += Math.sin(t / 1000 + p.ph) * .5 * dpr; if (p.y < -50 * dpr) { Object.assign(p, floater()); } }
    else { p.x += p.vx; p.y += p.vy; p.vy += p.g; p.vx *= .99; if (p.sw !== undefined) p.x += Math.sin(t / 400 + p.sw) * .35 * dpr; p.life -= p.d; p.a = Math.max(p.life, 0); if (p.life <= 0) { P.splice(i, 1); continue; } }
    cx.globalAlpha = p.a; cx.fillStyle = p.c; cx.font = p.s + 'px serif'; cx.fillText(p.ch || '♥', p.x, p.y);
  }
  requestAnimationFrame(loop);
})(0);
addEventListener('pointerdown', e => burst(e.clientX, e.clientY, 8));
let last = 0;
addEventListener('pointermove', e => { const n = performance.now(); if (n - last > 90) { last = n; rain(e.clientX, e.clientY); } });

function balloons(n) {
  for (let i = 0; i < n; i++) {
    const b = document.createElement('div'); b.className = 'balloon';
    b.style.cssText = `left:${rnd(2, 92)}vw;background:radial-gradient(circle at 30% 30%,#fff9,${COLORS[i % 5]});--dx:${rnd(-70, 70)}px;animation-duration:${rnd(6, 11)}s;animation-delay:${rnd(0, 2.5)}s`;
    document.body.append(b); setTimeout(() => b.remove(), 15000);
  }
}

/* build content */
document.title = `Happy Birthday ${CONFIG.name} 💖`;
const PH = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb3cb"/><stop offset="1" stop-color="#ff4d85"/></linearGradient></defs><rect width="100" height="100" fill="url(#g)"/><text x="50" y="66" font-size="46" text-anchor="middle" fill="#fff">♥</text></svg>');
$('#gallery').innerHTML = CONFIG.photos.map((p, i) =>
  `<div class="pw"><figure class="pol" tabindex="0" style="--r:${(i % 2 ? -1 : 1) * rnd(2, 4).toFixed(1)}deg;animation-delay:${(-i * .7).toFixed(1)}s"><img src="${p.src}" alt="${p.cap}" loading="lazy"><figcaption class="script">${p.cap}</figcaption></figure></div>`).join('');
$$('.pol').forEach(f => {
  const img = f.querySelector('img'); img.onerror = () => { img.onerror = null; img.src = PH; };
  f.onclick = () => { $('#lbimg').src = img.src; $('#lbcap').textContent = img.alt; $('#lightbox').classList.add('show'); };
});
$('#lightbox').onclick = () => $('#lightbox').classList.remove('show');
addEventListener('keydown', e => { if (e.key === 'Escape') $('#lightbox').classList.remove('show'); if (e.key === 'Enter' && e.target.matches('[tabindex]')) e.target.click(); });

const EMO = ['💖', '💕', '🌹', '✨', '💞', '🦋', '🌸', '💗', '🥰', '💘'];
$('#reasonlist').innerHTML = CONFIG.reasons.map((r, i) => `<div class="card" tabindex="0" style="--i:${i}"><div><b>${EMO[i % EMO.length]}</b><em>${r}</em></div></div>`).join('');
$$('.card').forEach(c => c.onclick = () => { c.classList.toggle('flip'); const r = c.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, 8); });

$('#letterbody').innerHTML = `<h3 class="script">My dearest ${CONFIG.name},</h3>` +
  CONFIG.letter.map((t, i) => `<p style="--i:${i}">${t}</p>`).join('') +
  `<p class="script sign" style="--i:${CONFIG.letter.length}">Happy Birthday, my heart 💖<br>Forever yours, ${CONFIG.from}</p>`;
$('#env').onclick = () => {
  $('#env').classList.add('open'); $('#letterbody').classList.add('open'); $('#envhint').remove();
  burst(innerWidth / 2, innerHeight / 2, 30, 1);
};
$('#fin').textContent = `Happy Birthday, ${CONFIG.name} 💖`;
$('#bigheart').onclick = e => { const r = e.currentTarget.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, 40, 1); balloons(6); };

/* cake */
$('#blow').onclick = () => {
  const c = $('#cake'); if (c.classList.contains('out')) return;
  c.classList.add('out'); $('#blow').disabled = true; $('#blow').textContent = 'Wish made 💖';
  setTimeout(() => {
    burst(innerWidth / 2, innerHeight / 2, 70, 1); balloons(10);
    $('#wishmsg').textContent = 'May every wish your heart holds come true ✨'; $('#wishmsg').classList.add('show');
  }, 700);
};
$('#cake').onclick = () => $('#blow').click();

/* intro + hero sequence */
function showName() {
  $('#name').innerHTML = `<span>${CONFIG.name}</span>`;
  setTimeout(() => { $('#sub').textContent = CONFIG.sub; $('#sub').classList.add('show'); heroDone = true; syncNav(); burst(innerWidth / 2, innerHeight * .4, 30); }, 2300);
}
function typeTitle() {
  const t = $('#t1'), s = 'Happy Birthday'; let i = 0; t.classList.add('caret');
  const id = setInterval(() => {
    t.textContent = s.slice(0, ++i);
    if (i >= s.length) { clearInterval(id); setTimeout(() => { t.classList.remove('caret'); showName(); }, 500); }
  }, 110);
}
const audio = $('#music');
$('#mute').onclick = e => { audio.paused ? audio.play() : audio.pause(); e.currentTarget.textContent = audio.paused ? '🔇' : '🔊'; };
$('#open').onclick = () => {
  $('#intro').classList.add('gone'); $('#main').classList.remove('hidden');
  burst(innerWidth / 2, innerHeight / 2, 60, 1); balloons(14);
  audio.play().then(() => $('#mute').hidden = false).catch(() => {}); // add music.mp3 to enable
  setTimeout(typeTitle, 700); $('#dots').classList.add('show'); syncNav();
  const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: .15 });
  $$('.reveal').forEach(el => io.observe(el));
};

/* section navigation: dots + next button scroll to exact sections */
const NAV = [['hero', 'Home'], ['wish', 'Make a wish'], ['moments', 'Our moments'], ['reasons', 'Why I love you'], ['letter', 'My letter'], ['finale', 'Finale']];
const secs = NAV.map(([id]) => document.getElementById(id));
const behavior = matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth';
let cur = 0, heroDone = false;
const go = i => secs[Math.max(0, Math.min(i, secs.length - 1))].scrollIntoView({ behavior, block: 'start' });
$('#dots').innerHTML = NAV.map(([, l]) => `<button data-l="${l}" aria-label="Go to ${l}"></button>`).join('');
$$('#dots button').forEach((b, i) => b.onclick = () => go(i));
function syncNav() {
  $$('#dots button').forEach((b, i) => b.classList.toggle('on', i === cur));
  $('#next').classList.toggle('show', heroDone && cur < secs.length - 1);
}
$('#next').onclick = () => go(cur + 1);
const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { cur = secs.indexOf(e.target); syncNav(); } }), { rootMargin: '-45% 0px -45% 0px' });
secs.forEach(s => so.observe(s));
