// Collection 1 for Megha: ten posts across the themes. Renders 1080x1350 slides to ../c1-*.jpg
// Run: node collection.mjs [prefix]
import fs from 'fs';
import path from 'path';
import more from './collection_more.mjs';
import { chromium } from '/Users/mehrpatni/mehr-portfolio/node_modules/playwright/index.mjs';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.resolve(HERE, '..');
const PH = n => `file://${path.resolve(HERE, '../../photos', n + '.jpg')}`;
const ST = n => `file://${path.resolve(HERE, 'stock', n + '.jpg')}`;

const C = { sage: '#5D6E5E', mocha: '#B08D6F', forest: '#2F3A32', ivory: '#FAF8F5', charcoal: '#3D3A35', wash: '#e7ece6', paper: '#F3EEE6' };

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.3 0 0 0 0 0.25 0 0 0 0 0.2 0 0 0 .09 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// The split W, bottom left on every slide. Left half sage (ivory on dark grounds), right half mocha.
const W = (dark = false, name = false) => `<div style="position:absolute;left:64px;bottom:56px;display:flex;align-items:center;gap:16px">
  <svg width="58" height="53" viewBox="0 0 120 110"><defs><clipPath id="l"><rect width="58" height="110"/></clipPath><clipPath id="r"><rect x="58" width="62" height="110"/></clipPath></defs>
  <text x="4" y="88" font-family="Fraunces" font-size="104" font-weight="600" fill="${dark ? '#93A894' : C.sage}" clip-path="url(#l)">W</text>
  <text x="4" y="88" font-family="Fraunces" font-size="104" font-weight="600" fill="${C.mocha}" clip-path="url(#r)">W</text></svg>
  ${name ? `<span style="font:400 17px Jost;letter-spacing:.3em;text-transform:uppercase;color:${dark ? C.ivory : C.charcoal};opacity:.8">WithinWorks Leadership</span>` : ''}</div>`;

const base = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&family=Jost:wght@300;400;500&display=swap');
* { margin: 0; box-sizing: border-box; }
body { width: 1080px; height: 1350px; overflow: hidden; position: relative; font-family: Jost, sans-serif; color: ${C.charcoal}; }
.grain::after { content: ''; position: absolute; inset: 0; background: ${GRAIN}; pointer-events: none; }
.lab { font: 400 21px Jost; letter-spacing: .3em; text-transform: uppercase; }
.serif { font-family: Fraunces, serif; }
.hand { font-family: Caveat, cursive; }
`;

const slides = {
  // 01 · About Megha · carousel 3 · her photos
  'c1-1a': `<body style="background:#222">
    <img src="${PH('01')}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 30%;filter:grayscale(1)">
    <div class="serif" style="position:absolute;left:0;right:0;top:230px;text-align:center;color:${C.ivory};font-weight:300;font-size:132px;letter-spacing:.06em">[ About ]</div>
    ${W(true, true)}</body>`,
  'c1-1b': `<body class="grain" style="background:${C.forest};color:${C.ivory}">
    <p class="lab" style="position:absolute;left:90px;top:110px;right:90px;line-height:1.7;letter-spacing:.2em;font-size:25px">Megha Bhalla is a leadership coach in Dubai. Before coaching, she spent 25 years leading people.</p>
    <div style="position:absolute;left:90px;top:400px;width:520px;background:${C.ivory};padding:18px 18px 70px;transform:rotate(-1.5deg);box-shadow:0 18px 40px rgba(0,0,0,.35)">
      <img src="${PH('03')}" style="width:100%;height:560px;object-fit:cover;object-position:center 25%;display:block"></div>
    <div style="position:absolute;right:90px;top:520px;width:330px;text-align:right">
      <p class="lab" style="font-size:20px;line-height:2.4;opacity:.85">14 years<br>banking</p>
      <p class="lab" style="font-size:20px;line-height:2.4;opacity:.85;margin-top:30px">13 years<br>building Traveazy</p>
      <p class="lab" style="font-size:20px;line-height:2.4;opacity:.85;margin-top:30px">Now<br>coaching</p></div>
    ${W(true)}</body>`,
  'c1-1c': `<body class="grain" style="background:${C.paper}">
    <div style="position:absolute;inset:90px;border:1.5px solid rgba(61,58,53,.35)"></div>
    <p class="lab" style="position:absolute;left:150px;top:170px;color:${C.mocha}">[ Why coaching ]</p>
    <p class="serif" style="position:absolute;left:150px;right:150px;top:430px;font-weight:300;font-size:68px;line-height:1.3">“Most of the people I led didn’t need another answer from me. They needed room to find their own.”</p>
    ${W()}</body>`,

  // 02 · Words in the world · single · real photo
  'c1-2': `<body style="background:#111">
    <img src="${ST('busstop')}" style="position:absolute;left:-445px;top:-621px;width:1836px;height:2448px">
    <div style="position:absolute;left:252px;top:290px;width:436px;height:620px;padding:56px 44px;display:flex;flex-direction:column;justify-content:space-between;background:rgba(250,248,245,.94);box-shadow:0 0 60px rgba(255,250,235,.45)">
      <p class="serif" style="font-size:47px;line-height:1.18;font-weight:400;color:${C.forest}">Most leaders don’t need another answer.<br><br><i style="font-weight:300">They need a better question.</i></p>
      <p style="font:400 13px Jost;letter-spacing:.3em;text-transform:uppercase;color:${C.sage}">WithinWorks Leadership</p></div>
    ${W(true)}</body>`,

  // 03 · The Within Question · single · design
  'c1-3': `<body class="grain" style="background:#EFE9E0">
    <div class="grain" style="position:absolute;left:120px;top:170px;width:840px;height:800px;background:${C.forest};transform:rotate(-2deg);box-shadow:0 30px 60px rgba(40,35,30,.28),0 4px 10px rgba(40,35,30,.15)">
      <p class="lab" style="position:absolute;left:76px;top:76px;color:${C.mocha};font-size:20px">The Within Question &middot; 01</p>
      <p class="serif" style="position:absolute;left:76px;right:76px;top:250px;color:${C.ivory};font-style:italic;font-weight:300;font-size:78px;line-height:1.2">Where are you still leading from an old story about yourself?</p></div>
    <p class="hand" style="position:absolute;left:170px;right:120px;top:1040px;font-size:60px;color:${C.charcoal};transform:rotate(-1deg)">and whose voice is telling it?</p>
    ${W()}</body>`,

  // 04 · Leadership, unlearned · single · design (Mehr liked this one)
  'c1-4': `<body class="grain" style="background:${C.wash}">
    <p class="lab" style="position:absolute;left:90px;top:110px;color:${C.forest}">Leadership, unlearned &middot; 01</p>
    <div style="position:absolute;left:90px;top:300px;width:430px;height:680px;background:#fff;transform:rotate(-2.5deg);box-shadow:0 20px 40px rgba(30,40,32,.18);padding:56px 44px">
      <p class="lab" style="font-size:19px;color:${C.mocha}">Then</p><p class="lab" style="font-size:15px;opacity:.55;margin-top:8px;letter-spacing:.2em">as a leader</p>
      <p class="serif" style="font-size:46px;font-weight:300;line-height:1.3;margin-top:80px">I gave the answer, quickly. It felt like help.</p></div>
    <div style="position:absolute;right:90px;top:380px;width:430px;height:680px;background:${C.forest};color:${C.ivory};transform:rotate(2deg);box-shadow:0 24px 48px rgba(30,40,32,.28);padding:56px 44px">
      <p class="lab" style="font-size:19px;color:${C.mocha}">Now</p><p class="lab" style="font-size:15px;opacity:.6;margin-top:8px;letter-spacing:.2em">as a coach</p>
      <p class="serif" style="font-size:46px;font-weight:300;line-height:1.3;margin-top:80px">I ask, then wait. The answer they find is the one they act on.</p></div>
    ${W()}</body>`,

  // 05 · Coaching, plainly · carousel 2 · design
  'c1-5a': `<body class="grain" style="background:#F6F1EA">
    <p class="lab" style="position:absolute;left:100px;top:110px;color:${C.mocha}">Coaching, plainly</p>
    <p class="serif" style="position:absolute;left:100px;right:100px;top:230px;font-weight:300;font-size:118px;line-height:1.06">Coach, mentor, consultant, therapist?</p>
    <div style="position:absolute;left:100px;right:100px;top:870px;display:grid;grid-template-columns:1fr 1fr;border-top:1.5px solid rgba(61,58,53,.3);border-left:1.5px solid rgba(61,58,53,.3)">
      ${['Heal', 'Learn from', 'Be advised', 'Find your own'].map((t, i) => `<div style="border-right:1.5px solid rgba(61,58,53,.3);border-bottom:1.5px solid rgba(61,58,53,.3);padding:26px 30px;font:300 34px Fraunces;${i === 3 ? `background:${C.forest};color:${C.ivory}` : ''}">${t}</div>`).join('')}</div>
    <p class="serif" style="position:absolute;right:100px;top:1185px;font-style:italic;font-weight:300;font-size:36px;color:${C.sage}">Which do you need?</p>
    ${W()}</body>`,
  'c1-5b': `<body class="grain" style="background:#FBF8F3">
    ${[['Therapy', 'heals what makes everyday life feel unsteady.'], ['Mentoring', 'shows you a path someone has already walked.'], ['Consulting', 'studies the problem and hands you the plan.'], ['Coaching', 'helps you find your own answer, and act on it.']]
      .map(([h, t], i) => `<div style="position:absolute;left:100px;right:100px;top:${110 + i * 280}px;${i === 3 ? `background:${C.forest};color:${C.ivory};margin:-30px -40px;padding:30px 40px` : ''}">
        <p class="lab" style="font-size:19px;color:${C.mocha}">${h}</p>
        <p class="serif" style="font-size:54px;font-weight:300;line-height:1.22;margin-top:14px">${t}</p></div>`).join('')}
    ${W()}</body>`,

  // 06 · Before I give advice · single · real photo, handwriting
  'c1-6': `<body style="background:#3a2416">
    <img src="${ST('notebook')}" style="position:absolute;left:50%;top:50%;width:2050px;height:1402px;transform:translate(-50%,-50%) rotate(-90deg)">
    <div class="hand" style="position:absolute;left:210px;top:205px;width:640px;transform:rotate(-1.2deg);color:#23263a;mix-blend-mode:multiply;opacity:.9">
      <p style="font-size:66px;line-height:1.1">Before I give advice,<br>I ask:</p>
      <p style="font-size:50px;line-height:1.25;margin-top:44px">What have you already tried?</p>
      <p style="font-size:50px;line-height:1.25;margin-top:22px">What do you think you should do?</p>
      <p style="font-size:50px;line-height:1.25;margin-top:22px">And what would make it easier?</p></div>
    ${W(true)}</body>`,

  // 07 · What a coach hears · carousel 2 · design
  'c1-7a': `<body class="grain" style="background:${C.sage}">
    <p class="lab" style="position:absolute;left:0;right:0;top:110px;text-align:center;color:${C.ivory};font-size:20px">What a coach hears &middot; 01</p>
    <div style="position:absolute;left:110px;right:110px;top:240px;bottom:220px;background:${C.ivory};display:flex;flex-direction:column;justify-content:center;align-items:center">
      <p class="serif" style="font-size:250px;font-style:italic;font-weight:300;color:${C.forest};line-height:1">“Should.”</p>
      <p style="font-size:34px;font-weight:300;margin-top:40px;color:${C.charcoal}">The word I listen for.</p></div>
    ${W(true)}</body>`,
  'c1-7b': `<body class="grain" style="background:${C.sage}">
    <p class="lab" style="position:absolute;left:0;right:0;top:110px;text-align:center;color:${C.ivory};font-size:20px">What a coach hears &middot; 01</p>
    <div style="position:absolute;left:100px;right:100px;top:240px;bottom:220px;background:${C.ivory};padding:84px 72px;display:flex;flex-direction:column;justify-content:center">
      <p style="font-size:42px;font-weight:300;line-height:1.45">When someone says “I should”, I get curious. Whose should is it?</p>
      <p style="font-size:42px;font-weight:300;line-height:1.45;margin-top:34px">Often it belongs to someone else: a parent, a first boss, a version of you from ten years ago.</p>
      <p style="font-size:42px;font-weight:400;line-height:1.45;margin-top:34px;color:${C.forest}">Once you hear whose voice it is, you get to decide if you still agree.</p></div>
    ${W(true)}</body>`,

  // 08 · A book on my table · carousel 2 · real photo
  'c1-8a': `<body style="background:#222">
    <img src="${ST('book')}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 40%">
    <div style="position:absolute;left:90px;right:90px;bottom:150px;background:rgba(250,248,245,.95);padding:44px 52px">
      <p class="lab" style="font-size:18px;color:${C.mocha}">On my reading table</p>
      <p class="serif" style="font-size:62px;font-weight:400;margin-top:16px;color:${C.forest}">Time to Think</p>
      <p style="font-size:28px;font-weight:300;margin-top:6px">Nancy Kline</p></div>
    ${W(true)}</body>`,
  'c1-8b': `<body class="grain" style="background:${C.paper}">
    <p class="serif" style="position:absolute;left:110px;top:110px;font-size:260px;line-height:1;color:${C.mocha};opacity:.5">“</p>
    <p class="serif" style="position:absolute;left:110px;right:110px;top:330px;font-weight:300;font-style:italic;font-size:70px;line-height:1.25;color:${C.forest}">Everything we do depends for its quality on the thinking we do first.</p>
    <p class="lab" style="position:absolute;left:110px;top:720px;font-size:18px">Nancy Kline</p>
    <div style="position:absolute;left:110px;right:110px;top:830px;border-top:1.5px solid rgba(61,58,53,.3);padding-top:44px">
      <p style="font-size:38px;font-weight:300;line-height:1.45">As a leader I rarely gave people the room to think. Now it’s most of my job.</p></div>
    ${W()}</body>`,

  // 09 · Who I work with · single · design, after Sageform's grid
  'c1-9': `<body class="grain" style="background:${C.paper}">
    <p class="lab" style="position:absolute;left:0;right:0;top:100px;text-align:center;color:${C.mocha}">[ Who I work with ]</p>
    <div style="position:absolute;left:80px;right:80px;top:180px;height:1000px;border:1.5px solid rgba(61,58,53,.45)">
      <div style="position:absolute;left:50%;top:0;bottom:0;border-left:1.5px solid rgba(61,58,53,.45)"></div>
      <div style="position:absolute;top:50%;left:0;right:0;border-top:1.5px solid rgba(61,58,53,.45)"></div>
      ${[['Senior leaders', 'You lead well, and lately you’re asking where you’re leading to.', 'left:48px;top:56px'],
         ['Founders', 'You built something. Now it seems to be running you.', 'right:48px;top:56px;text-align:right'],
         ['Family business heirs', 'You’re taking a seat someone else built.', 'left:48px;bottom:56px'],
         ['At a turning point', 'A new country, a new role, or a chapter you haven’t named yet.', 'right:48px;bottom:56px;text-align:right']]
        .map(([h, t, pos]) => `<div style="position:absolute;${pos};width:330px"><p class="lab" style="font-size:18px;color:${C.forest}">${h}</p><p class="serif" style="font-size:31px;font-weight:300;line-height:1.3;margin-top:14px">${t}</p></div>`).join('')}
      <div style="position:absolute;left:50%;top:50%;width:330px;height:330px;margin:-165px 0 0 -165px;border-radius:50%;background:${C.forest};color:${C.ivory};display:flex;align-items:center;justify-content:center;text-align:center">
        <p class="serif" style="font-size:42px;font-style:italic;font-weight:300;line-height:1.2">This is<br>for you if</p></div></div>
    ${W()}</body>`,

  // 10 · Notes from the mat · single · real photo
  'c1-10': `<body style="background:#1d140b">
    <img src="${ST('hall')}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 60%">
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,14,8,.9) 0%,rgba(20,14,8,.75) 32%,rgba(20,14,8,0) 58%)"></div>
    <p class="lab" style="position:absolute;left:90px;top:110px;color:${C.mocha};font-size:20px">Notes from the mat &middot; 01</p>
    <p class="serif" style="position:absolute;left:90px;right:120px;top:190px;color:${C.ivory};font-weight:300;font-size:64px;line-height:1.22">I learned to pause on the mat long before I used it in a coaching room.</p>
    ${W(true)}</body>`,
};
Object.assign(slides, more(C, PH, ST, W));

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
const only = process.argv[2];
for (const [name, html] of Object.entries(slides)) {
  if (only && !name.startsWith(only)) continue;
  fs.writeFileSync(path.join(HERE, '_tmp.html'), `<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head>${html}</html>`);
  await p.goto('file://' + path.join(HERE, '_tmp.html'));
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  await p.screenshot({ path: path.join(OUT, name + '.jpg'), type: 'jpeg', quality: 88 });
}
fs.unlinkSync(path.join(HERE, '_tmp.html'));
await b.close();
console.log('rendered');
