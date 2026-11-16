// "Megha, what do you do in your sessions?" (Mehr, 16 Nov): a client's question in a thought bubble over Megha's photo,
// then her answers as chat bubbles, "I do this", in her voice. Idea from a Lumia Coaching caption on building trust.
// Instagram ms-*, LinkedIn lm-* (W with name) plus vector PDF lm.pdf. Run: node sessions.mjs
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { chromium } from '/Users/mehrpatni/mehr-portfolio/node_modules/playwright/index.mjs';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.resolve(HERE, '..');
const WW = path.resolve(HERE, '../../..');
const C = { forest: '#2F3A32', ivory: '#FAF8F5', paper: '#F3EEE6', mocha: '#B08D6F', gold: '#E3C49C', sage: '#5D6E5E', lsage: '#93A894', charcoal: '#3D3A35', line: 'rgba(47,58,50,.22)' };
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.3 0 0 0 0 0.25 0 0 0 0 0.2 0 0 0 .07 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
const COVER = `file://${WW}/megha-photos/M-156.jpg`;
const FACE = `file://${WW}/brain/photos/07.jpg`;
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
.lab { font: 500 18px Jost; letter-spacing: .3em; text-transform: uppercase; color: ${C.mocha}; }
`;

// Her answers, two per page: what I do, and what it means for you.
const answers = [
  ['I deeply listen.', 'To what you say, and to what you leave out.'],
  ['I show up as myself.', 'So you can feel free to do the same.'],
  ['I curiously ask.', 'First, I try to see it from where you stand.'],
  ['I notice the small wins.', 'And I make sure you notice them too.'],
  ['We build it together.', 'You bring the insight. You own the next step.'],
  ['I keep it honest.', 'Clear agreements, open conversation, and no judgement.'],
];

const avatar = `<div style="width:118px;height:118px;border-radius:50%;flex:none;overflow:hidden;border:4px solid ${C.ivory};box-shadow:0 6px 16px rgba(60,50,40,.18)"><img src="${FACE}" style="width:100%;height:100%;object-fit:cover;object-position:58% 36%;transform:scale(2.3);transform-origin:58% 36%"></div>`;
const bubble = ([h, t], side) => `<div style="display:flex;gap:24px;align-items:flex-end;${side ? 'flex-direction:row-reverse;' : ''}">
  ${avatar}
  <div style="position:relative;background:${C.ivory};border-radius:${side ? '40px 40px 8px 40px' : '40px 40px 40px 8px'};padding:48px 50px;box-shadow:0 12px 30px rgba(60,50,40,.10);max-width:790px">
    <p class="serif" style="font-size:60px;font-weight:400;line-height:1.08;color:${C.forest}">${h}</p>
    <p style="font:400 33px/1.42 Jost;margin-top:18px">${t}</p></div></div>`;

const pages = name => ({
  1: `<body style="background:#d9cfc2">
    <img src="${COVER}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:46% 50%">
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(243,238,230,.0) 45%,rgba(30,28,24,.35) 100%)"></div>
    <div style="position:absolute;left:56px;top:80px;width:620px;background:${C.ivory};border-radius:50%/46%;padding:96px 92px;box-shadow:0 18px 40px rgba(40,30,20,.22);text-align:center">
      <p class="serif" style="font-size:62px;font-weight:400;line-height:1.12;color:${C.forest}">Megha, what do you <i style="color:${C.mocha}">do</i> in your sessions?</p></div>
    <span style="position:absolute;left:400px;top:500px;width:46px;height:46px;border-radius:50%;background:${C.ivory};box-shadow:0 10px 24px rgba(40,30,20,.2)"></span>
    <span style="position:absolute;left:448px;top:556px;width:26px;height:26px;border-radius:50%;background:${C.ivory};box-shadow:0 8px 18px rgba(40,30,20,.2)"></span>
    <p class="hand" style="position:absolute;right:80px;bottom:150px;font-size:54px;color:${C.ivory};transform:rotate(-3deg);text-shadow:0 2px 12px rgba(0,0,0,.35)">a question I hear often</p>
    ${W(true, name)}</body>`,
  ...Object.fromEntries([0, 1, 2].map(k => [k + 2, `<body class="paper">
    <p class="lab" style="position:absolute;left:90px;top:110px">[ In my sessions ]</p>
    <div style="position:absolute;left:70px;right:70px;top:${k === 2 ? 250 : 380}px;display:flex;flex-direction:column;gap:90px">
      ${bubble(answers[k * 2], 0)}${bubble(answers[k * 2 + 1], 1)}</div>
    ${k === 2 ? `<p class="serif" style="position:absolute;left:90px;right:90px;bottom:150px;font-size:38px;font-weight:400;line-height:1.35;color:${C.forest}">Book a discovery call on <i>www.withinworksleadership.com</i></p>` : ''}
    ${W(false, name)}</body>`])),
});

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
const parts = [];
for (const [prefix, name] of [['ms', false], ['lm', true]]) {
  for (const [i, html] of Object.entries(pages(name))) {
    const tmp = path.join(HERE, '_tmp_ms.html');
    fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><style>${css} @page{size:2160px 2700px;margin:0} html,body{margin:0}</style></head>${html}</html>`);
    await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
    await p.screenshot({ path: path.join(OUT, `${prefix}-${i}.jpg`), type: 'jpeg', quality: 92 });
    if (prefix === 'lm') { const o = path.join(HERE, `_lm-${i}.pdf`); await p.pdf({ path: o, width: '2160px', height: '2700px', printBackground: true, scale: 2 }); parts.push(o); }
  }
}
fs.unlinkSync(path.join(HERE, '_tmp_ms.html'));
await b.close();
execFileSync('pdfunite', [...parts, path.join(OUT, 'lm.pdf')]); parts.forEach(x => fs.unlinkSync(x));
console.log('ok');
