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

const W = (dark = false) => `<div style="position:absolute;left:110px;bottom:320px">
  <svg width="58" height="53" viewBox="0 0 120 110"><defs><clipPath id="l"><rect width="58" height="110"/></clipPath><clipPath id="r"><rect x="58" width="62" height="110"/></clipPath></defs>
  <text x="4" y="88" font-family="Fraunces" font-size="104" font-weight="600" fill="${dark ? '#93A894' : C.sage}" clip-path="url(#l)">W</text>
  <text x="4" y="88" font-family="Fraunces" font-size="104" font-weight="600" fill="${C.mocha}" clip-path="url(#r)">W</text></svg></div>`;

const base = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,400&family=Jost:wght@300;400;500&display=swap');
* { margin: 0; box-sizing: border-box; }
body { width: 1080px; height: 1920px; overflow: hidden; position: relative; font-family: Jost, sans-serif; color: ${C.charcoal}; }
.grain::after { content: ''; position: absolute; inset: 0; background: ${GRAIN}; pointer-events: none; }
.lab { font: 400 21px Jost; letter-spacing: .3em; text-transform: uppercase; }
.serif { font-family: Fraunces, serif; }
.hand { font-family: Caveat, cursive; }
`;

const frames = {
  // Credentials, held quietly: a fact on the wall, not an announcement.
  's1-1': `<body class="grain" style="background:${C.forest};color:${C.ivory}">
    <div style="position:absolute;left:150px;right:150px;top:270px;background:${C.ivory};padding:20px 20px 0;transform:rotate(-1.5deg);box-shadow:0 26px 50px rgba(0,0,0,.4)">
      <img src="${PH('02')}" style="width:100%;height:640px;object-fit:cover;object-position:center 30%;display:block">
      <p class="hand" style="font-size:44px;color:${C.charcoal};padding:18px 10px 22px">the work behind the work</p></div>
    <div style="position:absolute;left:110px;right:110px;top:1090px">
      ${[['ACC', 'Associate Certified Coach, ICF'], ['CPCC', 'Certified Professional Co-Active Coach'], ['100', 'hours of coaching']]
        .map(([k, v]) => `<div style="display:flex;align-items:baseline;gap:34px;border-top:1px solid rgba(250,248,245,.22);padding:22px 0">
          <p class="serif" style="font-size:60px;font-weight:400;width:200px;color:${C.ivory}">${k}</p>
          <p style="font-size:30px;font-weight:300;line-height:1.3;opacity:.9">${v}</p></div>`).join('')}</div>
    ${W(true)}</body>`,
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
