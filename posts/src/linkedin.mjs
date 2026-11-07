// LinkedIn documents for Megha, the November reset (see projects/withinworks/LINKEDIN-REFRESH.md).
// Visual language: ivory paper, forest type, one line-art motif per document, gold glow used once, her handwriting
// in the margin. Renders 1080x1350 pages to ../lf-*.jpg (Facts and the story) and ../lp-*.jpg (A process, not a pill).
import fs from 'fs';
import path from 'path';
import { chromium } from '/Users/mehrpatni/mehr-portfolio/node_modules/playwright/index.mjs';
import { tile } from './diwali.mjs';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.resolve(HERE, '..');
const C = { forest: '#2F3A32', ivory: '#FAF8F5', paper: '#F3EEE6', mocha: '#B08D6F', gold: '#E2B06E', sage: '#5D6E5E', lsage: '#93A894', charcoal: '#3D3A35', line: 'rgba(47,58,50,.22)' };
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.3 0 0 0 0 0.25 0 0 0 0 0.2 0 0 0 .07 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
const icon = (name, size, col = C.forest) => tile(name, size).replaceAll('#F3EEE6', col);
const glowBox = (w, h) => `<svg style="position:absolute;inset:0;overflow:visible;filter:drop-shadow(0 0 4px rgba(240,190,120,1)) drop-shadow(0 0 14px rgba(226,176,110,.75))" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect x="1.5" y="1.5" width="${w - 3}" height="${h - 3}" fill="none" stroke="#E8B978" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round"/></svg>`;
const W = (dark = false) => `<div style="position:absolute;left:90px;bottom:60px;display:flex;align-items:center;gap:14px">
  <svg width="48" height="44" viewBox="0 0 120 110"><defs><clipPath id="l"><rect width="58" height="110"/></clipPath><clipPath id="r"><rect x="58" width="62" height="110"/></clipPath></defs>
  <text x="4" y="88" font-family="Fraunces" font-size="104" font-weight="600" fill="${dark ? C.lsage : C.sage}" clip-path="url(#l)">W</text>
  <text x="4" y="88" font-family="Fraunces" font-size="104" font-weight="600" fill="${C.mocha}" clip-path="url(#r)">W</text></svg>
  <span style="font:400 16px Jost;letter-spacing:.3em;text-transform:uppercase;color:${dark ? C.ivory : C.charcoal};opacity:.85">WithinWorks Leadership</span></div>`;

const css = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300;1,9..144,400&family=Jost:wght@300;400;500&display=swap');
* { margin: 0; box-sizing: border-box; }
body { width: 1080px; height: 1350px; overflow: hidden; position: relative; font-family: Jost, sans-serif; color: ${C.charcoal}; }
.paper { background: ${C.paper}; } .paper::after { content: ''; position: absolute; inset: 0; background: ${GRAIN}; pointer-events: none; }
.green { background: ${C.forest}; color: ${C.ivory}; }
.serif { font-family: Fraunces, serif; } .hand { font-family: Caveat, cursive; }
.lab { font: 400 17px Jost; letter-spacing: .3em; text-transform: uppercase; color: ${C.mocha}; }
.body { font: 300 32px/1.55 Jost; }
`;
const P = (cls, inner, dark) => `<body class="${cls}">${inner}${W(dark)}</body>`;

// ---- Facts and the story -------------------------------------------------------------
const facts = {
  'lf-1': P('green', `
    <p class="lab" style="position:absolute;left:90px;top:100px;color:#E3C49C">[ Understanding coaching ]</p>
    <p class="serif" style="position:absolute;left:90px;right:90px;top:230px;font-size:92px;font-weight:300;line-height:1.08">The facts,<br><i style="color:#E3C49C">and the story</i><br>we tell about them.</p>
    <p class="body" style="position:absolute;left:90px;right:300px;top:640px;opacity:.88">A coaching tool you can use today, on a moment most of us have lived through.</p>`, true),

  'lf-2': P('paper', `
    <p class="lab" style="position:absolute;left:90px;top:100px">[ The moment ]</p>
    <p class="serif" style="position:absolute;left:90px;right:90px;top:180px;font-size:66px;font-weight:300;line-height:1.15;color:${C.forest}">A meeting about your project took place. <i>You weren’t invited.</i></p>
    <div style="position:absolute;left:90px;right:90px;top:470px;display:grid;grid-template-columns:1fr 1fr;gap:0;border-top:1.5px solid ${C.line}">
      <div style="padding:40px 40px 0 0;border-right:1.5px solid ${C.line}">
        <p class="lab" style="color:${C.forest}">The facts</p>
        <p class="body" style="margin-top:22px">A meeting happened.<br>Your name was not on the invite.</p></div>
      <div style="padding:40px 0 0 40px">
        <p class="lab">The story</p>
        <p class="body" style="margin-top:22px">They don’t value my work. I’m being sidelined. It’s happening again, and soon it will be obvious to everyone.</p></div></div>
    <p class="hand" style="position:absolute;left:560px;right:70px;top:1010px;font-size:46px;line-height:1.05;color:${C.mocha};transform:rotate(-3deg)">two facts…<br>and a whole future</p>`),

  'lf-3': P('paper', `
    <p class="lab" style="position:absolute;left:90px;top:100px">[ What weighs on us ]</p>
    <p class="serif" style="position:absolute;left:90px;right:90px;top:190px;font-size:74px;font-weight:300;line-height:1.12;color:${C.forest}">The facts are usually short. <i>The story is usually long.</i></p>
    <p class="body" style="position:absolute;left:90px;right:120px;top:520px">Most of what keeps us awake lives in the story: the meaning we add, the motive we assume, the future we predict.</p>
    <p class="body" style="position:absolute;left:90px;right:120px;top:760px">Decisions made from the story feel urgent. Decisions made from the facts feel calm, and they tend to be better.</p>`),

  'lf-4': P('paper', `
    <p class="lab" style="position:absolute;left:90px;top:100px">[ The coaching question ]</p>
    <p class="serif" style="position:absolute;left:90px;right:90px;top:190px;padding:46px 0;border-top:1.5px solid ${C.forest};border-bottom:1.5px solid ${C.forest};font-size:66px;font-style:italic;font-weight:300;line-height:1.18;color:${C.forest}">Can the story change when the perspective changes?</p>
    <p class="lab" style="position:absolute;left:90px;top:600px;color:${C.forest}">Other stories, same facts</p>
    ${['It was a working session for one team, nothing more.', 'Someone forgot. It happens.', 'It’s a chance to ask what I want to be part of.']
      .map((t, i) => `<p class="hand" style="position:absolute;left:90px;right:90px;top:${660 + i * 110}px;font-size:50px;line-height:1.1;color:${C.charcoal}">${t}</p>`).join('')}`),

  'lf-5': P('green', `
    <p class="serif" style="position:absolute;left:90px;right:90px;top:220px;font-size:64px;font-weight:300;line-height:1.2">Much of coaching is this: separating the facts from the story, <i style="color:#E3C49C">so you can choose your next step with a clear head.</i></p>
    <p class="body" style="position:absolute;left:90px;right:90px;top:720px;opacity:.88">Try it on one thing that is weighing on you this week. Write the facts in one line. Then notice how long the story is.</p>
    <p style="position:absolute;left:90px;top:960px;font:400 22px Jost;letter-spacing:.06em;opacity:.8">Megha Bhalla · Executive and Transformational Coach</p>`, true),
};

// ---- A process, not a pill -------------------------------------------------------------
const step = (label, title, text, top) => `<div style="position:absolute;left:90px;right:120px;top:${top}px">
  <p class="lab">${label}</p><p class="serif" style="font-size:52px;font-weight:300;line-height:1.12;margin-top:12px;color:${C.forest}">${title}</p>
  <p class="body" style="font-size:30px;margin-top:14px">${text}</p></div>`;
const pill = {
  'lp-1': P('green', `
    <p class="lab" style="position:absolute;left:90px;top:100px;color:#E3C49C">[ How coaching works ]</p>
    <p class="serif" style="position:absolute;left:90px;right:90px;top:240px;font-size:100px;font-weight:300;line-height:1.05">Coaching is<br>a process,<br><i style="color:#E3C49C">not a pill.</i></p>
    <p class="body" style="position:absolute;left:90px;right:200px;top:700px;opacity:.88">What happens, in what order, and what it asks of you.</p>`, true),

  'lp-2': P('paper', `
    <p class="serif" style="position:absolute;left:90px;right:90px;top:100px;font-size:64px;font-weight:300;line-height:1.12;color:${C.forest}">How it <i>unfolds</i></p>
    ${[['It begins with a conversation.', 'A 45-minute discovery call to explore what’s possible for you, and whether this feels like the right partnership.'],
       ['Then, six sessions.', '60 minutes each, ideally every two weeks, in person, online or both.'],
       ['Between them, small steps.', 'The real change happens in your week. Each session ends with what you will try next.']]
      .map(([lead, text], i) => `<p class="serif" style="position:absolute;left:90px;right:110px;top:${270 + i * 290}px;font-size:40px;font-weight:300;line-height:1.42"><i style="color:${C.forest};font-weight:400">${lead}</i> ${text}</p>`).join('')}`),

  'lp-3': P('paper', `
    <p class="lab" style="position:absolute;left:90px;top:100px">[ What it asks of you ]</p>
    <p class="serif" style="position:absolute;left:90px;right:90px;top:180px;font-size:70px;font-weight:300;line-height:1.12;color:${C.forest}">Progress asks for <i>four things.</i></p>
    ${[['Intent', 'in every conversation'], ['Courage', 'to look at what you’ve been avoiding'], ['Patience', 'to fail, and to start again'], ['Small steps', 'over grand plans']]
      .map(([h, t], i) => `<div style="position:absolute;left:90px;right:90px;top:${420 + i * 130}px;display:flex;align-items:baseline;gap:24px"><p class="serif" style="width:300px;font-size:46px;font-style:italic;color:${C.forest}">${h}</p><p class="body" style="font-size:30px">${t}</p></div>`).join('')}
    <p class="hand" style="position:absolute;left:90px;right:90px;top:980px;font-size:56px;color:${C.mocha};transform:rotate(-2deg)">No judgement, just progress.</p>`),

  'lp-4': P('green', `
    <p class="lab" style="position:absolute;left:90px;top:100px;color:#E3C49C">[ What stays the same ]</p>
    <p class="serif" style="position:absolute;left:90px;right:90px;top:200px;font-size:70px;font-weight:300;line-height:1.15">What you share <i style="color:#E3C49C">stays between us.</i> Always.</p>
    <p class="body" style="position:absolute;left:90px;right:120px;top:520px;opacity:.88">The agenda is yours in every session. My work is to listen deeply, ask the questions that matter, and hold the space while you find your answers.</p>
    <p class="serif" style="position:absolute;left:90px;right:90px;top:900px;font-size:40px;font-weight:300;line-height:1.4">Book a discovery call on<br><i style="color:#E3C49C">www.withinworksleadership.com</i></p>`, true),
};

const frames = { ...facts, ...pill };
const only = process.argv[2];
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
for (const [name, html] of Object.entries(frames)) {
  if (only && !name.startsWith(only)) continue;
  fs.writeFileSync(path.join(HERE, '_tmp_li.html'), `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head>${html}</html>`);
  await p.goto('file://' + path.join(HERE, '_tmp_li.html')); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  await p.screenshot({ path: path.join(OUT, name + '.jpg'), type: 'jpeg', quality: 90 });
}
fs.unlinkSync(path.join(HERE, '_tmp_li.html')); await b.close(); console.log('rendered');
