// Instagram stories for Megha. Renders 1080x1920 frames to ../s1-*.jpg
// Run: node stories.mjs [prefix]
// Keep text out of the top 250px and bottom 340px, where Instagram puts its own bars.
import fs from 'fs';
import path from 'path';
import { chromium } from '/Users/mehrpatni/mehr-portfolio/node_modules/playwright/index.mjs';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.resolve(HERE, '..');
const PH = n => `file://${path.resolve(HERE, '../../photos', n + '.jpg')}`;
const C = { sage: '#5D6E5E', mocha: '#B08D6F', forest: '#2F3A32', ivory: '#FAF8F5', charcoal: '#3D3A35', paper: '#F3EEE6' };
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.3 0 0 0 0 0.25 0 0 0 0 0.2 0 0 0 .09 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const W = (dark = false, name = false) => `<div style="position:absolute;left:110px;bottom:300px;display:flex;align-items:center;gap:16px">
  <svg width="58" height="53" viewBox="0 0 120 110"><defs><clipPath id="l"><rect width="58" height="110"/></clipPath><clipPath id="r"><rect x="58" width="62" height="110"/></clipPath></defs>
  <text x="4" y="88" font-family="Fraunces" font-size="104" font-weight="600" fill="${dark ? '#93A894' : C.sage}" clip-path="url(#l)">W</text>
  <text x="4" y="88" font-family="Fraunces" font-size="104" font-weight="600" fill="${C.mocha}" clip-path="url(#r)">W</text></svg>
  ${name ? `<span style="font:400 19px Jost;letter-spacing:.3em;text-transform:uppercase;color:${dark ? C.ivory : C.charcoal};opacity:.85">WithinWorks Leadership</span>` : ''}</div>`;

const base = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,400&family=Jost:wght@300;400;500&display=swap');
* { margin: 0; box-sizing: border-box; }
body { width: 1080px; height: 1920px; overflow: hidden; position: relative; font-family: Jost, sans-serif; color: ${C.charcoal}; }
.grain::after { content: ''; position: absolute; inset: 0; background: ${GRAIN}; pointer-events: none; }
.lab { font: 400 21px Jost; letter-spacing: .3em; text-transform: uppercase; }
.serif { font-family: Fraunces, serif; }
.hand { font-family: Caveat, cursive; }
`;

// 100 tally marks in 20 bundles of five, a little uneven, like a hand kept count.
let seed = 7; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280 - 0.5;
const TALLY = Array.from({ length: 20 }, (_, g) => {
  const x = (g % 5) * 172 + 14, y = Math.floor(g / 5) * 128 + 10, ink = g % 3 === 2 ? C.mocha : C.forest;
  const line = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} Q${(x1 + x2) / 2 + rnd() * 6} ${(y1 + y2) / 2} ${x2} ${y2}" stroke="${ink}" stroke-width="${5 + rnd() * 1.5}" stroke-linecap="round" fill="none"/>`;
  return [0, 1, 2, 3].map(i => line(x + i * 34 + rnd() * 5, y + rnd() * 8, x + i * 34 + 4 + rnd() * 6, y + 112 + rnd() * 8)).join('')
    + line(x - 12, y + 92 + rnd() * 8, x + 128, y + 22 + rnd() * 8);
}).join('');

// A round rubber stamp, slightly faded.
const STAMP = (big, small, x, y, r) => `<div style="position:absolute;left:${x}px;top:${y}px;width:180px;height:180px;border-radius:50%;border:5px solid ${C.mocha};outline:2px solid ${C.mocha};outline-offset:-16px;transform:rotate(${r}deg);display:flex;flex-direction:column;align-items:center;justify-content:center;color:${C.mocha};background:${C.paper};box-shadow:0 8px 18px rgba(60,50,40,.18)">
  <p class="serif" style="font-size:${big.length > 3 ? 50 : 60}px;font-weight:500;line-height:1">${big}</p><p class="lab" style="font-size:15px;margin-top:8px">${small}</p></div>`;

const frames = {
  // Credentials, held lightly: 100 hand-drawn tallies, and two ink stamps. A fact, not an announcement.
  's1-1': `<body class="grain" style="background:${C.paper}">
    <p class="hand" style="position:absolute;left:110px;right:110px;top:255px;font-size:92px;line-height:1;color:${C.forest};transform:rotate(-2deg)">100 hours of listening.</p>
    <svg style="position:absolute;left:110px;top:400px" width="740" height="440" viewBox="0 0 860 512">${TALLY}</svg>
    <div style="position:absolute;left:0;right:0;margin:auto;top:915px;width:400px;background:#fff;padding:14px 14px 20px;transform:rotate(-2deg);box-shadow:0 22px 44px rgba(60,50,40,.22)">
      <img src="${PH('03')}" style="width:100%;height:auto;display:block"></div>
    ${STAMP("ACC", "ICF", 265, 1190, -10)}${STAMP("CPCC", "Co-Active", 640, 1165, 8)}
    <p class="serif" style="position:absolute;left:150px;right:150px;top:1400px;text-align:center;font-size:40px;font-weight:400;line-height:1.3;color:${C.charcoal};text-wrap:balance">Follow this space to learn more about <i style="color:${C.forest}">executive and transformational coaching.</i></p>
    ${W(false, true)}</body>`,
};

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
const only = process.argv[2];
for (const [name, html] of Object.entries(frames)) {
  if (only && !name.startsWith(only)) continue;
  fs.writeFileSync(path.join(HERE, '_tmp_story.html'), `<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head>${html}</html>`);
  await p.goto('file://' + path.join(HERE, '_tmp_story.html'));
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  await p.screenshot({ path: path.join(OUT, name + '.jpg'), type: 'jpeg', quality: 88 });
}
fs.unlinkSync(path.join(HERE, '_tmp_story.html'));
await b.close();
console.log('rendered');
