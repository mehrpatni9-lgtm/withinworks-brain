// "Sound familiar?" (Mehr, 16 Nov): three thoughts people bring to coaching, one ICF and PwC 2026 number for each,
// then the UAE push. Same pages for Instagram (sf-*) and LinkedIn (ls-*, W with the name, plus a vector PDF ls.pdf).
// Text weights stay at 400 or more so it survives LinkedIn's compression.
// Run: node familiar.mjs
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { chromium } from '/Users/mehrpatni/mehr-portfolio/node_modules/playwright/index.mjs';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.resolve(HERE, '..');
const C = { forest: '#2F3A32', ivory: '#FAF8F5', paper: '#F3EEE6', mocha: '#B08D6F', gold: '#E3C49C', sage: '#5D6E5E', lsage: '#93A894', charcoal: '#3D3A35', line: 'rgba(47,58,50,.22)', track: 'rgba(47,58,50,.10)' };
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.3 0 0 0 0 0.25 0 0 0 0 0.2 0 0 0 .07 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
const W = (dark, name) => `<div style="position:absolute;left:90px;bottom:60px;display:flex;align-items:center;gap:14px">
  <svg width="52" height="48" viewBox="0 0 120 110"><defs><clipPath id="l"><rect width="58" height="110"/></clipPath><clipPath id="r"><rect x="58" width="62" height="110"/></clipPath></defs>
  <text x="4" y="88" font-family="Fraunces" font-size="104" font-weight="600" fill="${dark ? C.lsage : C.sage}" clip-path="url(#l)">W</text>
  <text x="4" y="88" font-family="Fraunces" font-size="104" font-weight="600" fill="${C.mocha}" clip-path="url(#r)">W</text></svg>
  ${name ? `<span style="font:400 16px Jost;letter-spacing:.3em;text-transform:uppercase;color:${dark ? C.ivory : C.charcoal};opacity:.85">WithinWorks Leadership</span>` : ''}</div>`;
const SRC = (dark) => `<p style="position:absolute;right:90px;bottom:72px;font:400 17px Jost;letter-spacing:.04em;color:${dark ? 'rgba(250,248,245,.7)' : 'rgba(61,58,53,.7)'}">Source: ICF and PwC, 2026 Global Consumer Awareness Study</p>`;

const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Jost:wght@400;500&display=swap');
* { margin: 0; box-sizing: border-box; }
body { width: 1080px; height: 1350px; overflow: hidden; position: relative; font-family: Jost, sans-serif; color: ${C.charcoal}; }
.paper { background: ${C.paper}; } .paper::after { content: ''; position: absolute; inset: 0; background: ${GRAIN}; pointer-events: none; }
.green { background: ${C.forest}; color: ${C.ivory}; }
.serif { font-family: Fraunces, serif; }
.lab { font: 500 18px Jost; letter-spacing: .3em; text-transform: uppercase; color: ${C.mocha}; }
`;

const thoughts = ['I feel stuck at work.', 'I second-guess every decision.', 'I’ve lost my confidence.'];
const rows = [
  ['Stuck at work', 41, 'come for their career, the most common reason.'],
  ['Second-guessing', 65, 'say coaching helped them make better decisions.'],
  ['Confidence', 64, 'say they came out of it more confident.'],
];

const pages = name => ({
  1: `<body class="paper">
    <p class="lab" style="position:absolute;left:90px;top:110px">[ Sound familiar? ]</p>
    ${thoughts.map((t, i) => `<div style="position:absolute;left:90px;right:90px;top:${250 + i * 290}px;border-top:1.5px solid ${C.line};padding-top:52px">
      <p class="serif" style="font-size:76px;font-style:italic;font-weight:400;line-height:1.12;color:${C.forest}">“${t}”</p></div>`).join('')}
    <p class="serif" style="position:absolute;left:90px;right:90px;top:1130px;font-size:38px;font-weight:400;color:${C.charcoal}">You’re in good company.</p>
    ${W(false, name)}</body>`,

  2: `<body class="paper">
    <p class="lab" style="position:absolute;left:90px;top:110px">[ What the research says ]</p>
    ${rows.map(([h, n, t], i) => `<div style="position:absolute;left:90px;right:90px;top:${215 + i * 315}px;border-top:1.5px solid ${C.line};padding-top:38px">
      <p class="serif" style="font-size:44px;font-style:italic;font-weight:400;color:${C.forest}">${h}</p>
      <div style="display:flex;align-items:center;gap:30px;margin-top:22px">
        <div style="flex:1;height:30px;background:${C.track};border-radius:15px;overflow:hidden"><div style="width:${n}%;height:100%;background:${i ? C.forest : C.mocha};border-radius:15px"></div></div>
        <p class="serif" style="font-size:72px;font-weight:500;line-height:1;width:170px;text-align:right;color:${C.forest}">${n}%</p></div>
      <p style="font:400 30px/1.4 Jost;margin-top:14px;max-width:740px">${t}</p></div>`).join('')}
    ${SRC(false)}${W(false, false)}</body>`,

  3: `<body class="green">
    <p class="lab" style="position:absolute;left:90px;top:110px;color:${C.gold}">[ In the UAE ]</p>
    <div style="position:absolute;left:90px;top:220px;display:flex;gap:34px">
      ${[1, 1, 0].map(f => `<span style="width:96px;height:96px;border-radius:50%;border:3px solid ${C.gold};background:${f ? C.gold : 'transparent'}"></span>`).join('')}</div>
    <p class="serif" style="position:absolute;left:90px;right:90px;top:400px;font-size:74px;font-weight:400;line-height:1.14">Nearly <i style="color:${C.gold}">2 in 3</i> people who get a coach pay for it themselves.</p>
    <p class="serif" style="position:absolute;left:90px;right:90px;top:745px;font-size:46px;font-style:italic;font-weight:400;line-height:1.25;opacity:.92">They didn’t wait to be sent.</p>
    <p style="position:absolute;left:90px;right:90px;top:960px;font:400 32px/1.45 Jost;color:${C.ivory}">Book a discovery call on<br><span style="color:${C.gold}">www.withinworksleadership.com</span></p>
    <p style="position:absolute;left:90px;right:90px;bottom:150px;font:400 17px Jost;letter-spacing:.04em;color:rgba(250,248,245,.7)">Source: ICF and PwC, 2026 Global Consumer Awareness Study</p>
    ${W(true, name)}</body>`,
});

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
const pdfParts = [];
for (const [prefix, name] of [['sf', false], ['ls', true]]) {
  for (const [i, html] of Object.entries(pages(name))) {
    const tmp = path.join(HERE, '_tmp_sf.html');
    fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><style>${css} @page{size:2160px 2700px;margin:0} html,body{margin:0}</style></head>${html}</html>`);
    await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
    await p.screenshot({ path: path.join(OUT, `${prefix}-${i}.jpg`), type: 'jpeg', quality: 92 });
    if (prefix === 'ls') { const o = path.join(HERE, `_ls-${i}.pdf`); await p.pdf({ path: o, width: '2160px', height: '2700px', printBackground: true, scale: 2 }); pdfParts.push(o); }
  }
}
fs.unlinkSync(path.join(HERE, '_tmp_sf.html'));
await b.close();
execFileSync('pdfunite', [...pdfParts, path.join(OUT, 'ls.pdf')]); pdfParts.forEach(x => fs.unlinkSync(x));
console.log('ok');
