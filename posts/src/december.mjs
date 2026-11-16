// Two December posts (Mehr, 16 Nov), Instagram (d1-*, d2-*) and LinkedIn (e1-*, e2-* + e1.pdf, e2.pdf).
// d1 "What can I help you through?": after alinasvibes' session carousel, minus the meditation; everyday photos full bleed,
//    one moment of change per slide on an offset card (the DfzQuXCDYa7 look).
// d2 "How I explain coaching, in four analogies": Lumia's analogy carousel in Megha's style and words, two per page.
// Run: node december.mjs
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { chromium } from '/Users/mehrpatni/mehr-portfolio/node_modules/playwright/index.mjs';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.resolve(HERE, '..');
const C = { forest: '#2F3A32', ivory: '#FAF8F5', paper: '#F3EEE6', mocha: '#B08D6F', gold: '#E3C49C', sage: '#5D6E5E', lsage: '#93A894', charcoal: '#3D3A35' };
const ST = n => `file://${path.join(HERE, 'stock', n + '.jpg')}`;
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
const tag = (t, top = 100) => `<p style="position:absolute;left:90px;top:${top}px;font:500 22px Jost;letter-spacing:.24em;text-transform:uppercase;color:${C.forest};background:${C.gold};padding:10px 18px">${t}</p>`;
const CTA = `<p style="position:absolute;left:90px;bottom:150px;background:${C.forest};color:${C.ivory};font:400 32px/1.4 Jost;padding:22px 30px;border-radius:12px;box-shadow:10px 10px 0 ${C.gold}">Book a discovery call on <span style="color:${C.gold}">www.withinworksleadership.com</span></p>`;
const photo = (img, pos, shade = .3) => `<img src="${ST(img)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${pos}"><div style="position:absolute;inset:0;background:rgba(25,22,18,${shade})"></div>`;

// ---- d1: What can I help you through? Restart and reinvention first (Mehr, 16 Nov), two moments per slide, half and half.
const moments = [
  ['sunrisemug', 'center 50%', C.mocha, 'Coming back after a career break', 'Your skills didn’t go anywhere. We rebuild your confidence and find where you fit now.'],
  ['startline', 'center 60%', C.lsage, 'Reinventing your career', 'A fresh start doesn’t mean starting from zero. We work out what you carry with you.'],
  ['deskwork', 'center 45%', C.gold, 'Stepping into a new role', 'You have the title. Together, we work out the leader you want to be in it.'],
  ['lounge', 'center 50%', C.mocha, 'Moving to a new country', 'New city, new culture, the same ambition. We make room to find your footing.'],
];
const half = ([img, pos, sh, h, t], top, last) => `<div style="position:absolute;left:0;right:0;top:${top}px;height:675px;overflow:hidden">
    <img src="${ST(img)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${pos}"><div style="position:absolute;inset:0;background:rgba(25,22,18,.2)"></div>
    <div style="position:absolute;left:70px;right:70px;${top ? 'bottom:150px' : 'bottom:60px'};background:${C.ivory};border-radius:14px;padding:38px 46px 36px;box-shadow:12px 12px 0 ${sh}">
      <p class="serif" style="font-size:50px;font-weight:500;line-height:1.08;color:${C.forest}">${h}</p>
      <p style="font:400 30px/1.42 Jost;margin-top:14px">${t}</p>
      ${last ? `<p style="font:500 24px Jost;margin-top:18px;color:${C.mocha}">Book a discovery call on www.withinworksleadership.com</p>` : ''}</div></div>`;
const d1 = name => ({
  1: `<body style="background:#333">${photo('parkpath', 'center 55%', .34)}
    ${tag('Starting again')}
    <p class="serif" style="position:absolute;left:90px;right:120px;top:400px;font-size:112px;font-weight:400;line-height:1.02;color:${C.ivory}">What can I help you <i style="color:${C.gold}">through?</i></p>
    <p class="hand" style="position:absolute;left:96px;top:800px;font-size:54px;color:${C.ivory};transform:rotate(-2deg)">restarts, reinventions and new chapters &rarr;</p>
    ${W(true, name)}</body>`,
  2: `<body style="background:${C.ivory}">${half(moments[0], 0)}${half(moments[1], 675)}<div style="position:absolute;left:0;right:0;top:672px;height:6px;background:${C.ivory}"></div>${W(true, name)}</body>`,
  3: `<body style="background:${C.ivory}">${half(moments[2], 0)}${half(moments[3], 675, true)}<div style="position:absolute;left:0;right:0;top:672px;height:6px;background:${C.ivory}"></div>${W(true, name)}</body>`,
});

// ---- d2: Coaching with me is like… ---------------------------------------------------
const ICON = {
  compass: `<circle cx="50" cy="50" r="42"/><circle cx="50" cy="50" r="4"/><path d="M50 14 L60 50 L50 86 L40 50 Z"/><path d="M50 14 L60 50 L40 50 Z" fill="currentColor"/>`,
  mirror: `<path d="M24 92 L24 40 A26 26 0 0 1 76 40 L76 92 Z"/><path d="M36 50 L50 36 M38 64 L60 42"/><path d="M16 94 L84 94"/>`,
  plane: `<path d="M8 56 L44 48 L62 14 L72 16 L64 46 L90 42 Q98 44 90 50 L64 54 L72 84 L62 86 L44 56 L8 62 Z"/>`,
  pin: `<path d="M50 92 C34 70 22 56 22 40 A28 28 0 0 1 78 40 C78 56 66 70 50 92 Z"/><circle cx="50" cy="40" r="10"/>`,
  sprout: `<path d="M50 92 L50 46"/><path d="M50 60 C30 60 20 46 22 30 C40 30 50 42 50 60 Z"/><path d="M50 50 C66 50 78 40 78 24 C62 24 50 34 50 50 Z"/><path d="M30 92 L70 92"/>`,
};
const analogies = [
  ['pin', 'A GPS', 'You choose the destination. A coach helps you find the clearest route, and recalculate when the road changes.'],
  ['mirror', 'A mirror', 'It shows you what is hard to see up close, without judging what it sees.'],
  ['plane', 'A co-pilot', 'You fly the plane. A coach sits beside you, so you are never flying alone.'],
  ['sprout', 'A gardener', 'You do the growing. A coach helps create the conditions for it.'],
];
const blobs = `<div style="position:absolute;left:-260px;top:-180px;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(147,168,148,.55),rgba(147,168,148,0) 65%)"></div>
  <div style="position:absolute;right:-300px;top:380px;width:1000px;height:1000px;border-radius:50%;background:radial-gradient(circle,rgba(176,141,111,.45),rgba(176,141,111,0) 65%)"></div>`;
const analogy = ([ic, h, t], n) => `<div style="display:flex;gap:40px;align-items:flex-start">
  <svg width="104" height="104" viewBox="0 0 100 100" style="flex:none;color:${C.mocha}" fill="none" stroke="${C.forest}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">${ICON[ic]}</svg>
  <div><p class="serif" style="font-size:60px;font-weight:400;line-height:1.05;color:${C.forest}">${h}</p>
  <p style="font:400 30px/1.4 Jost;margin-top:10px">${t}</p></div></div>`;
const d2 = name => ({
  1: `<body class="paper">${blobs}
    <p class="serif" style="position:absolute;left:90px;right:90px;top:110px;font-size:88px;font-weight:400;line-height:1.02;color:${C.forest}">A coach is like…</p>
    <div style="position:absolute;left:90px;right:90px;top:310px;display:flex;flex-direction:column;gap:72px">${analogies.map(x => analogy(x)).join('')}</div>${W(false, name)}</body>`,
  2: `<body class="paper">${blobs}
    <p class="serif" style="position:absolute;left:90px;right:90px;top:250px;font-size:210px;font-weight:500;line-height:1;color:${C.mocha}">84%</p>
    <p class="serif" style="position:absolute;left:90px;right:90px;top:490px;font-size:58px;font-weight:400;line-height:1.2;color:${C.forest}">of people who have been coached were satisfied with it.</p>
    <p class="serif" style="position:absolute;left:90px;right:90px;top:800px;font-size:54px;font-style:italic;font-weight:400;line-height:1.22;color:${C.forest}">Want to give Executive &amp; Transformational Coaching a try?</p>
    <p style="position:absolute;left:90px;right:90px;top:650px;font:400 19px Jost;letter-spacing:.04em;color:rgba(61,58,53,.7)">Source: ICF and PwC, 2026 Global Consumer Awareness Study</p>
    ${CTA}${W(false, name)}</body>`,
});

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
for (const [pages, ig, li] of [[d1, 'd1', 'e1'], [d2, 'd2', 'e2']]) {
  const parts = [];
  for (const [prefix, name] of [[ig, false], [li, true]]) {
    for (const [i, html] of Object.entries(pages(name))) {
      const tmp = path.join(HERE, '_tmp_dec.html');
      fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><style>${css} @page{size:2160px 2700px;margin:0} html,body{margin:0}</style></head>${html}</html>`);
      await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
      await p.screenshot({ path: path.join(OUT, `${prefix}-${i}.jpg`), type: 'jpeg', quality: 92 });
      if (prefix === li) { const o = path.join(HERE, `_${li}-${i}.pdf`); await p.pdf({ path: o, width: '2160px', height: '2700px', printBackground: true, scale: 2 }); parts.push(o); }
    }
  }
  execFileSync('pdfunite', [...parts, path.join(OUT, `${li}.pdf`)]); parts.forEach(x => fs.unlinkSync(x));
}
fs.unlinkSync(path.join(HERE, '_tmp_dec.html'));
await b.close();
console.log('ok');
