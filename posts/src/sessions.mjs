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

// A session, start to finish, in plain words: it starts with you, we look closer, you leave with a next step.
const LI_SWAP = { 'I listen, fully.': 'Megha listens, fully.', 'I ask simple questions.': 'Megha asks simple questions.' };
const steps = [
  ['It starts with you', ['You bring what’s on your mind.', 'A decision, a frustration, a role you’re unsure of. Nothing is too small.'], ['I listen, fully.', 'No advice and no rushing. Just room to say it out loud.']],
  ['Then we look closer', ['I ask simple questions.', 'The kind that help you see it from a new angle.'], ['You find your own answer.', 'Because it’s yours, it tends to stick.']],
  ['You leave with a next step', ['One small step, your choice.', 'Something to try before we meet again.'], ['Next time, we start there.', 'That’s how six sessions add up to real change.']],
];

const ST = n => `file://${path.join(HERE, 'stock', n + '.jpg')}`;
const BG = [['coffeehand', 'center 50%'], ['pen', 'center 45%'], ['roadwalk', 'center 60%']];  // everyday photos, Pexels; never reused in another post
const SHADOW = [C.mocha, C.lsage, C.gold];
const avatar = `<div style="position:absolute;left:-34px;top:-44px;width:104px;height:104px;border-radius:50%;overflow:hidden;border:4px solid ${C.ivory};box-shadow:0 6px 16px rgba(0,0,0,.25)"><img src="${FACE}" style="width:100%;height:100%;object-fit:cover;object-position:58% 46%;transform:scale(2.3);transform-origin:58% 46%"></div>`;
const card = ([h, t], i, side, li) => { h = li ? (LI_SWAP[h] || h) : h; return `<div style="position:relative;align-self:${side ? 'flex-end' : 'flex-start'};width:780px;background:${C.ivory};border-radius:14px;padding:50px 54px 46px 74px;box-shadow:14px 14px 0 ${SHADOW[i % 3]}">
  ${avatar}
  <p class="serif" style="font-size:58px;font-weight:500;line-height:1.08;color:${C.forest}">${h}</p>
  <p style="font:400 33px/1.42 Jost;margin-top:16px">${t}</p></div>`; };

const pages = name => ({
  1: `<body style="background:#d9cfc2">
    <img src="${COVER}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:46% 50%">
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(243,238,230,.0) 45%,rgba(30,28,24,.35) 100%)"></div>
    <div style="position:absolute;left:56px;top:80px;width:620px;background:${C.ivory};border-radius:50%/46%;padding:96px 92px;box-shadow:0 18px 40px rgba(40,30,20,.22);text-align:center">
      <p class="serif" style="font-size:62px;font-weight:400;line-height:1.12;color:${C.forest}">${name ? `What happens in a coaching <i style="color:${C.mocha}">session?</i>` : `What’s my session <i style="color:${C.mocha}">all about?</i>`}</p></div>
    <span style="position:absolute;left:400px;top:500px;width:46px;height:46px;border-radius:50%;background:${C.ivory};box-shadow:0 10px 24px rgba(40,30,20,.2)"></span>
    <span style="position:absolute;left:448px;top:556px;width:26px;height:26px;border-radius:50%;background:${C.ivory};box-shadow:0 8px 18px rgba(40,30,20,.2)"></span>
    <p class="hand" style="position:absolute;right:80px;bottom:150px;font-size:54px;color:${C.ivory};transform:rotate(-3deg);text-shadow:0 2px 12px rgba(0,0,0,.35)">${name ? 'one session with Megha, start to finish' : 'let me walk you through one'}</p>
    ${W(true, name)}</body>`,
  ...Object.fromEntries([0, 1, 2].map(k => [k + 2, `<body style="background:#333">
    <img src="${ST(BG[k][0])}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${BG[k][1]}">
    <div style="position:absolute;inset:0;background:rgba(25,22,18,.22)"></div>
    <p style="position:absolute;left:90px;top:100px;font:500 22px Jost;letter-spacing:.2em;text-transform:uppercase;color:${C.forest};background:${C.gold};padding:10px 18px">0${k + 1} &middot; ${steps[k][0]}</p>
    <div style="position:absolute;left:110px;right:90px;top:${k === 2 ? 270 : 340}px;display:flex;flex-direction:column;gap:96px">
      ${card(steps[k][1], k * 2, 0, name)}${card(steps[k][2], k * 2 + 1, 1, name)}</div>
    ${k === 2 ? `<p style="position:absolute;left:90px;bottom:150px;background:${C.forest};color:${C.ivory};font:400 32px/1.4 Jost;padding:22px 30px;border-radius:12px;box-shadow:10px 10px 0 ${C.gold}">Book a discovery call on <span style="color:${C.gold}">www.withinworksleadership.com</span></p>` : ''}
    ${W(true, name)}</body>`])),
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
