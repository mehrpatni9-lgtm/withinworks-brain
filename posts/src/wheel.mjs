// Year-end giveaway post (Mehr, 16 Nov): "What does your wheel say about your 2026?" Comment WHEEL for the
// fillable Wheel of Life plus "What your wheel says" (four wheel types, read like a star sign).
// Instagram wh-1, wh-2; LinkedIn wl-1, wl-2 (page voice) + wl.pdf. Run: node wheel.mjs
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { chromium } from '/Users/mehrpatni/mehr-portfolio/node_modules/playwright/index.mjs';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.resolve(HERE, '..');
const C = { forest: '#2F3A32', ivory: '#FAF8F5', paper: '#F3EEE6', mocha: '#B08D6F', gold: '#E3C49C', sage: '#5D6E5E', lsage: '#93A894', charcoal: '#3D3A35' };
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.3 0 0 0 0 0.25 0 0 0 0 0.2 0 0 0 .07 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
const W = (dark, name) => `<div style="position:absolute;left:90px;bottom:60px;display:flex;align-items:center;gap:14px">
  <svg width="52" height="48" viewBox="0 0 120 110"><defs><clipPath id="l"><rect width="58" height="110"/></clipPath><clipPath id="r"><rect x="58" width="62" height="110"/></clipPath></defs>
  <text x="4" y="88" font-family="Fraunces" font-size="104" font-weight="600" fill="${dark ? C.lsage : C.sage}" clip-path="url(#l)">W</text>
  <text x="4" y="88" font-family="Fraunces" font-size="104" font-weight="600" fill="${C.mocha}" clip-path="url(#r)">W</text></svg>
  ${name ? `<span style="font:400 16px Jost;letter-spacing:.3em;text-transform:uppercase;color:${dark ? C.ivory : C.charcoal};opacity:.85">WithinWorks Leadership</span>` : ''}</div>`;
const css = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Jost:wght@400;500&display=swap');
* { margin: 0; box-sizing: border-box; }
body { width: 1080px; height: 1350px; overflow: hidden; position: relative; font-family: Jost, sans-serif; color: ${C.charcoal}; }
.paper { background: ${C.paper}; } .paper::after { content: ''; position: absolute; inset: 0; background: ${GRAIN}; pointer-events: none; }
.serif { font-family: Fraunces, serif; } .hand { font-family: Caveat, cursive; }
`;

// A wheel: rings, spokes, and the shape made by 8 scores out of 10.
const wheel = (scores, size, { ring, fill, line, labels, labelCol, dots = true }) => {
  const c = size / 2, R = size / 2 - (labels ? 120 : 6), pt = (i, v) => { const a = -Math.PI / 2 + i * Math.PI / 4; return [c + R * v / 10 * Math.cos(a), c + R * v / 10 * Math.sin(a)]; };
  const rings = [2, 4, 6, 8, 10].map(v => `<circle cx="${c}" cy="${c}" r="${R * v / 10}" fill="none" stroke="${ring}" stroke-width="${v === 10 ? 2 : 1.2}"/>`).join('');
  const spokes = scores.map((_, i) => { const [x, y] = pt(i, 10); return `<line x1="${c}" y1="${c}" x2="${x}" y2="${y}" stroke="${ring}" stroke-width="1.2"/>`; }).join('');
  const shape = `<polygon points="${scores.map((v, i) => pt(i, v).join(',')).join(' ')}" fill="${fill}" stroke="${line}" stroke-width="${size > 400 ? 4 : 3}" stroke-linejoin="round"/>`;
  const dot = dots ? scores.map((v, i) => { const [x, y] = pt(i, v); return `<circle cx="${x}" cy="${y}" r="${size > 400 ? 8 : 5}" fill="${line}"/>`; }).join('') : '';
  const lab = labels ? labels.map((t, i) => { const [x, y] = pt(i, 12.6); return `<text x="${x}" y="${y + 10}" text-anchor="middle" font-family="Jost" font-size="30" fill="${labelCol}">${t}</text>`; }).join('') : '';
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${rings}${spokes}${shape}${dot}${lab}</svg>`;
};

const TYPES = [
  ['The Steady Wheel', 'Mostly 7 to 10', [8, 9, 8, 7, 9, 8, 8, 9]],
  ['The Lopsided Wheel', 'A few 8s, a few 4s', [9, 3, 8, 2, 9, 4, 3, 8]],
  ['The Middle Wheel', 'Mostly 4 to 6', [5, 6, 4, 5, 6, 5, 4, 6]],
  ['The Rebuild Wheel', 'Mostly 1 to 3', [3, 2, 4, 3, 2, 3, 4, 2]],
];

const pages = name => ({
  1: `<body style="background:${C.forest};color:${C.ivory}">
    <p style="position:absolute;left:90px;top:100px;font:500 20px Jost;letter-spacing:.28em;text-transform:uppercase;color:${C.gold}">Year-end check-in</p>
    <p class="serif" style="position:absolute;left:90px;right:90px;top:150px;font-size:86px;font-weight:400;line-height:1.05">What does your wheel say about <i style="color:${C.gold}">your 2026?</i></p>
    <div style="position:absolute;left:150px;top:430px">${wheel([8, 6, 4, 7, 5, 6, 8, 3], 780, { ring: 'rgba(250,248,245,.22)', fill: 'rgba(227,196,156,.28)', line: C.gold, labels: ['Career', 'Money', 'Health', 'Family', 'Love', 'Friends', 'Growth', 'Fun'], labelCol: 'rgba(250,248,245,.85)' })}</div>
    ${W(true, name)}</body>`,
  2: `<body class="paper">
    <p class="serif" style="position:absolute;left:90px;right:90px;top:100px;font-size:70px;font-weight:400;line-height:1.08;color:${C.forest}">Score 8 areas. <i style="color:${C.mocha}">Find your type.</i></p>
    <div style="position:absolute;left:90px;right:90px;top:250px;display:grid;grid-template-columns:1fr 1fr;gap:26px">
      ${TYPES.map(([h, t, sc], i) => `<div style="background:${C.ivory};border-radius:20px;padding:26px 20px 24px;text-align:center;box-shadow:0 10px 24px rgba(60,50,40,.08)">
        ${wheel(sc, 210, { ring: 'rgba(47,58,50,.16)', fill: i === 1 ? 'rgba(176,141,111,.3)' : 'rgba(147,168,148,.3)', line: i === 1 ? C.mocha : C.sage })}
        <p class="serif" style="font-size:38px;font-weight:500;color:${C.forest};margin-top:12px">${h}</p>
        <p style="font:400 24px Jost;margin-top:4px;opacity:.75">${t}</p></div>`).join('')}</div>
    <p style="position:absolute;left:90px;right:90px;top:1115px;text-align:center"><span style="display:inline-block;background:${C.forest};color:${C.ivory};font:500 34px Jost;letter-spacing:.04em;padding:22px 40px;border-radius:14px;box-shadow:10px 10px 0 ${C.gold}">Comment <b style="color:${C.gold};letter-spacing:.12em">WHEEL</b> ${name ? 'and we’ll send it to you' : 'and I’ll send it to you'}</span></p>
    ${W(false, name)}</body>`,
});

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
const parts = [];
for (const [prefix, name] of [['wh', false], ['wl', true]]) {
  for (const [i, html] of Object.entries(pages(name))) {
    const tmp = path.join(HERE, '_tmp_wh.html');
    fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><style>${css} @page{size:2160px 2700px;margin:0} html,body{margin:0}</style></head>${html}</html>`);
    await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
    await p.screenshot({ path: path.join(OUT, `${prefix}-${i}.jpg`), type: 'jpeg', quality: 92 });
    if (prefix === 'wl') { const o = path.join(HERE, `_wl-${i}.pdf`); await p.pdf({ path: o, width: '2160px', height: '2700px', printBackground: true, scale: 2 }); parts.push(o); }
  }
}
fs.unlinkSync(path.join(HERE, '_tmp_wh.html'));
await b.close();
execFileSync('pdfunite', [...parts, path.join(OUT, 'wl.pdf')]); parts.forEach(x => fs.unlinkSync(x));
console.log('ok');
