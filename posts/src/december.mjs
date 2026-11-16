// Two December posts (Mehr, 16 Nov), Instagram (d1-*, d2-*) and LinkedIn (e1-*, e2-* + e1.pdf, e2.pdf).
// d1 "What can I help you through?": after alinasvibes' session carousel, minus the meditation; everyday photos full bleed,
//    one moment of change per slide on an offset card (the DfzQuXCDYa7 look).
// d2 "Coaching with me is like…": after Lumia's analogy carousel, one analogy per WithinWorks offer, two per page.
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

// ---- d1: What can I help you through? -----------------------------------------------
const moments = [
  ['calendar', 'center 50%', C.mocha, 'A new role', 'You have the title. Together, we work out the leader you want to be in it.'],
  ['boardroom', '40% 55%', C.lsage, 'Leading people for the first time', 'Doing the work and leading the work are different jobs. We find your way into the second.'],
  ['lounge', 'center 50%', C.gold, 'A move to a new country', 'New city, new culture, the same ambition. We make room to find your footing.'],
];
const d1 = name => ({
  1: `<body style="background:#333">${photo('door', 'center 50%', .38)}
    ${tag('Moments of change')}
    <p class="serif" style="position:absolute;left:90px;right:120px;top:420px;font-size:112px;font-weight:400;line-height:1.02;color:${C.ivory}">What can I help you <i style="color:${C.gold}">through?</i></p>
    <p class="hand" style="position:absolute;left:96px;top:820px;font-size:52px;color:${C.ivory};transform:rotate(-2deg)">swipe for three I see often &rarr;</p>
    ${W(true, name)}</body>`,
  ...Object.fromEntries(moments.map(([img, pos, sh, h, t], i) => [i + 2, `<body style="background:#333">${photo(img, pos, .22)}
    <p class="serif" style="position:absolute;right:90px;top:90px;font-size:30px;color:${C.ivory};opacity:.9">0${i + 1} / 03</p>
    <div style="position:absolute;left:90px;right:90px;top:${i === 2 ? 600 : 760}px;background:${C.ivory};border-radius:14px;padding:54px 58px 50px;box-shadow:14px 14px 0 ${sh}">
      <p class="serif" style="font-size:62px;font-weight:500;line-height:1.08;color:${C.forest}">${h}</p>
      <p style="font:400 34px/1.45 Jost;margin-top:20px">${t}</p></div>
    ${i === 2 ? CTA : ''}${W(true, name)}</body>`])),
});

// ---- d2: Coaching with me is like… ---------------------------------------------------
const ICON = {
  compass: `<circle cx="50" cy="50" r="42"/><circle cx="50" cy="50" r="4"/><path d="M50 14 L60 50 L50 86 L40 50 Z"/><path d="M50 14 L60 50 L40 50 Z" fill="currentColor"/>`,
  mirror: `<path d="M24 92 L24 40 A26 26 0 0 1 76 40 L76 92 Z"/><path d="M36 50 L50 36 M38 64 L60 42"/><path d="M16 94 L84 94"/>`,
  plane: `<path d="M8 56 L44 48 L62 14 L72 16 L64 46 L90 42 Q98 44 90 50 L64 54 L72 84 L62 86 L44 56 L8 62 Z"/>`,
  fork: `<path d="M38 10 L38 50 Q38 64 50 64 Q62 64 62 50 L62 10"/><path d="M50 64 L50 94"/><path d="M76 24 q8 8 0 16 M84 18 q14 14 0 28"/>`,
};
const analogies = [
  ['compass', 'Discovery call', 'A compass', 'Forty-five minutes to find your direction, before we talk about any route.'],
  ['mirror', 'The six-session journey', 'A mirror', 'Six conversations that show you what is hard to see up close.'],
  ['plane', 'C-level one to one', 'A co-pilot', 'You fly the plane. I sit beside you, for six months.'],
  ['fork', 'Team coaching', 'A tuning fork', 'One session a month, until the whole team finds the same note.'],
];
const blobs = `<div style="position:absolute;left:-260px;top:-180px;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(147,168,148,.55),rgba(147,168,148,0) 65%)"></div>
  <div style="position:absolute;right:-300px;top:380px;width:1000px;height:1000px;border-radius:50%;background:radial-gradient(circle,rgba(176,141,111,.45),rgba(176,141,111,0) 65%)"></div>`;
const analogy = ([ic, offer, h, t]) => `<div style="display:flex;gap:40px;align-items:flex-start">
  <svg width="130" height="130" viewBox="0 0 100 100" style="flex:none;color:${C.mocha}" fill="none" stroke="${C.forest}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">${ICON[ic]}</svg>
  <div><p style="font:500 19px Jost;letter-spacing:.24em;text-transform:uppercase;color:${C.mocha}">${offer}</p>
  <p class="serif" style="font-size:76px;font-weight:400;line-height:1.05;color:${C.forest};margin-top:10px">${h}</p>
  <p style="font:400 33px/1.45 Jost;margin-top:16px">${t}</p></div></div>`;
const d2 = name => ({
  1: `<body class="paper">${blobs}
    <p class="hand" style="position:absolute;left:0;right:0;top:300px;text-align:center;font-size:56px;color:${C.mocha};transform:rotate(-2deg)">how I explain it</p>
    <p class="serif" style="position:absolute;left:90px;right:90px;top:400px;text-align:center;font-size:118px;font-weight:400;line-height:1.02;color:${C.forest}">Coaching with me is like…</p>
    <div style="position:absolute;left:539px;top:760px;width:2px;height:120px;background:${C.forest};opacity:.5"></div>
    <p style="position:absolute;left:0;right:0;top:920px;text-align:center;font:500 22px Jost;letter-spacing:.3em;text-transform:uppercase">Four ways to work together</p>
    ${W(false, name)}</body>`,
  2: `<body class="paper">${blobs}<div style="position:absolute;left:90px;right:90px;top:300px;display:flex;flex-direction:column;gap:120px">${analogy(analogies[0])}${analogy(analogies[1])}</div>${W(false, name)}</body>`,
  3: `<body class="paper">${blobs}<div style="position:absolute;left:90px;right:90px;top:160px;display:flex;flex-direction:column;gap:110px">${analogy(analogies[2])}${analogy(analogies[3])}</div>${CTA}${W(false, name)}</body>`,
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
