// "Megha says" quote stories (Mehr, 27 Nov). One story frame per quote (Mehr: one story, not two): the
// quote card, then Megha's one line (a statement or a question), signed like the author. Quotes verified in research/quotes-simple-2026-11-27.md.
// 1080x1920. Text stays out of the top 250px and bottom 340px (Instagram bars). Run: node quotes.mjs
import fs from 'fs';
import path from 'path';
import { chromium } from '/Users/mehrpatni/mehr-portfolio/node_modules/playwright/index.mjs';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const OUT = process.env.OUT || path.resolve(HERE, '..');
const C = { forest: '#2F3A32', ivory: '#FAF8F5', paper: '#F3EEE6', mocha: '#B08D6F', gold: '#E3C49C', sage: '#5D6E5E', lsage: '#93A894', charcoal: '#3D3A35' };
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.3 0 0 0 0 0.25 0 0 0 0 0.2 0 0 0 .07 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
const ST = n => `file://${path.join(HERE, 'stock', n)}`;

const QUOTES = [
  { id: 'q1', img: 'cups.jpg', pos: '50% 62%', block: C.sage, size: 60,
    q: 'Almost everything will work again if you unplug it for a few minutes, including you.', by: 'Anne Lamott',
    m: 'When did you last rest without guilt?' },
  { id: 'q2', img: 'door.jpg', pos: '50% 45%', block: C.gold, size: 96,
    q: 'Courage is fear walking.', by: 'Susan David',
    m: 'Courage rarely feels brave from the inside.' },
  { id: 'q3', img: 'window.jpg', pos: '50% 40%', block: C.mocha, size: 76,
    q: 'Let’s not be <span style="white-space:nowrap">know-it-alls.</span><br>Let’s be <span style="white-space:nowrap">learn-it-alls.</span>', by: 'Satya Nadella',
    m: 'What did you learn this year that changed your mind?' },
  { id: 'q4', img: 'skybird.jpg', pos: '50% 30%', block: C.lsage, size: 68,
    q: 'The bird wishes it were a cloud. The cloud wishes it were a bird.', by: 'Rabindranath Tagore',
    m: 'We often long for the life we are not living.' },
];

const W = `<div style="position:absolute;left:96px;bottom:300px;display:flex;align-items:center;gap:16px">
  <svg width="58" height="53" viewBox="0 0 120 110"><defs><clipPath id="l"><rect width="58" height="110"/></clipPath><clipPath id="r"><rect x="58" width="62" height="110"/></clipPath></defs>
  <text x="4" y="88" font-family="Fraunces" font-size="104" font-weight="600" fill="${C.sage}" clip-path="url(#l)">W</text>
  <text x="4" y="88" font-family="Fraunces" font-size="104" font-weight="600" fill="${C.mocha}" clip-path="url(#r)">W</text></svg>
  <span style="font:400 19px Jost;letter-spacing:.3em;text-transform:uppercase;color:${C.charcoal};opacity:.85">WithinWorks Leadership</span></div>`;

const sign = (name, col) => `<p style="display:flex;align-items:center;font:500 21px Jost;letter-spacing:.28em;text-transform:uppercase;color:${col}">${name}</p>`;

const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Jost:wght@400;500&display=swap');
* { margin: 0; box-sizing: border-box; }
body { width: 1080px; height: 1920px; overflow: hidden; position: relative; font-family: Jost, sans-serif; color: ${C.charcoal}; background: ${C.paper}; }
body::after { content: ''; position: absolute; inset: 0; background: ${GRAIN}; pointer-events: none; }
.serif { font-family: Fraunces, serif; }
`;

// Photo window at the top, the quote on an ivory card with a coloured offset block, and on frame b Megha's take.
const frame = (Q, withMegha) => {
  const cardTop = 660;
  const photoH = cardTop + 160;
  return `<body>
  <img src="${ST(Q.img)}" style="position:absolute;left:0;top:0;width:1080px;height:${photoH}px;object-fit:cover;object-position:${Q.pos}">
  <div id="card" style="position:absolute;left:96px;right:96px;top:${cardTop}px">
    <div style="position:absolute;inset:0;transform:translate(18px,18px);background:${Q.block};border-radius:6px"></div>
    <div style="position:relative;background:${C.ivory};border-radius:6px;padding:92px 70px 64px;box-shadow:0 14px 34px rgba(60,50,40,.10)">
      <p class="serif" style="position:absolute;left:58px;top:-96px;font-size:300px;font-style:italic;line-height:1;color:${Q.block === C.gold ? C.mocha : Q.block}">“</p>
      <p class="serif" style="font-size:${Q.size}px;font-weight:400;line-height:1.16;color:${C.forest}">${Q.q}</p>
      <div style="margin-top:40px">${sign(Q.by, C.mocha)}</div>
    </div></div>
  ${withMegha ? `<div id="m" style="position:absolute;left:96px;right:96px;background:${C.forest};color:${C.ivory};border-radius:6px;padding:46px 60px 44px">
    <p class="serif" style="font-size:46px;font-style:italic;line-height:1.24">“${Q.m}”</p>
    <div style="margin-top:28px">${sign('Megha Bhalla', C.gold)}</div></div>` : ''}
  ${W}</body>`;
};

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
const tmp = path.join(HERE, '_tmp_q.html');
for (const Q of QUOTES) {
  for (const [suffix, withMegha] of [['', true]]) {
    fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head>${frame(Q, withMegha)}</html>`);
    await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    // Megha's line sits under the card, wherever the card ends.
    await p.evaluate(() => { const m = document.getElementById('m'); if (!m) return; const card = document.getElementById('card'); const r = card.getBoundingClientRect(); m.style.top = (r.bottom + 64) + 'px'; });
    const over = await p.evaluate(() => { const m = document.getElementById('m'); return m ? m.getBoundingClientRect().bottom : 0; });
    if (over > 1560) console.log(`warn ${Q.id}${suffix}: bubble ends at ${Math.round(over)}px, into the logo / IG bar zone`);
    await p.screenshot({ path: path.join(OUT, `${Q.id}${suffix}.jpg`), type: 'jpeg', quality: 92 });
  }
}
fs.unlinkSync(tmp);
await b.close();
console.log('ok');
