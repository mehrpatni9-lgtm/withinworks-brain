// Theme samples for Megha (Collection 1). Renders 1080x1350 slides to ../s1-*.jpg
// Run: node samples.mjs
import fs from 'fs';
import path from 'path';
import { chromium } from '/Users/mehrpatni/mehr-portfolio/node_modules/playwright/index.mjs';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.resolve(HERE, '..');
const PH = n => `file://${path.resolve(HERE, '../../photos', n + '.jpg')}`;

const C = { sage: '#5D6E5E', mocha: '#B08D6F', forest: '#2F3A32', ivory: '#FAF8F5', charcoal: '#3D3A35', wash: '#e7ece6', paper: '#F3EEE6' };

// Fine paper grain, laid over any ground
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.3 0 0 0 0 0.25 0 0 0 0 0.2 0 0 0 .09 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const base = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=Jost:wght@300;400;500&display=swap');
* { margin: 0; box-sizing: border-box; }
body { width: 1080px; height: 1350px; overflow: hidden; position: relative; font-family: Jost, sans-serif; color: ${C.charcoal}; }
.grain::after { content: ''; position: absolute; inset: 0; background: ${GRAIN}; pointer-events: none; }
.lab { font: 400 22px Jost; letter-spacing: .32em; text-transform: uppercase; }
.br::before { content: '[ '; } .br::after { content: ' ]'; }
.serif { font-family: Fraunces, serif; }
.mark { position: absolute; right: 70px; bottom: 62px; font: 400 18px Jost; letter-spacing: .34em; text-transform: uppercase; opacity: .7; }
`;

const slides = {
  // 1 · About Megha (founder) · editorial, after Sageform
  's1-1a': `<body style="background:#222">
    <img src="${PH('01')}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 30%;filter:grayscale(1) contrast(1.02)">
    <div class="serif" style="position:absolute;left:0;right:0;top:250px;text-align:center;color:${C.ivory};font-weight:300;font-size:132px;letter-spacing:.06em">[ About ]</div>
    <div class="mark" style="color:${C.ivory}">WithinWorks</div></body>`,
  's1-1b': `<body class="grain" style="background:${C.forest};color:${C.ivory}">
    <p class="lab" style="position:absolute;left:90px;top:110px;right:90px;line-height:1.7;letter-spacing:.2em;font-size:25px">Megha Bhalla is a leadership coach in Dubai. Before coaching, she spent 25 years leading people.</p>
    <div style="position:absolute;left:90px;top:400px;width:520px;background:${C.ivory};padding:18px 18px 70px;transform:rotate(-1.5deg);box-shadow:0 18px 40px rgba(0,0,0,.35)">
      <img src="${PH('03')}" style="width:100%;height:560px;object-fit:cover;object-position:center 25%;display:block"></div>
    <div style="position:absolute;right:90px;top:520px;width:330px;text-align:right">
      <p class="lab" style="font-size:20px;line-height:2.4;opacity:.85">14 years<br>banking</p>
      <p class="lab" style="font-size:20px;line-height:2.4;opacity:.85;margin-top:30px">13 years<br>building Traveazy</p>
      <p class="lab" style="font-size:20px;line-height:2.4;opacity:.85;margin-top:30px">Now<br>coaching</p></div>
    <div class="mark" style="color:${C.ivory}">WithinWorks</div></body>`,
  's1-1c': `<body class="grain" style="background:${C.paper}">
    <div style="position:absolute;inset:90px;border:1.5px solid rgba(61,58,53,.35)"></div>
    <p class="lab br" style="position:absolute;left:150px;top:170px;color:${C.mocha}">Why coaching</p>
    <p class="serif" style="position:absolute;left:150px;right:150px;top:470px;font-weight:300;font-size:66px;line-height:1.32">“Most of the people I led didn’t need another answer from me. They needed room to find their own.”</p>
    <p class="lab" style="position:absolute;right:150px;bottom:190px;font-size:20px">Megha</p></body>`,

  // 2 · Coaching, plainly · numbered serif comparison, after Carol Braha
  's1-2a': `<body class="grain" style="background:#F6F1EA">
    <p class="lab" style="position:absolute;left:110px;top:110px;font-size:19px;opacity:.6">WithinWorks</p>
    <p class="serif" style="position:absolute;left:110px;right:110px;top:380px;font-weight:300;font-size:104px;line-height:1.12">Coach, mentor, consultant, therapist?</p>
    <p class="serif" style="position:absolute;left:110px;right:110px;top:860px;font-style:italic;font-weight:300;font-size:58px;line-height:1.25;color:${C.sage}">Which one do you need right now?</p></body>`,
  's1-2b': `<body class="grain" style="background:#FBF8F3">
    ${[['Therapy', 'heals what makes everyday life feel unsteady.'], ['Mentoring', 'shows you a path someone has already walked.'], ['Consulting', 'studies the problem and hands you the plan.'], ['Coaching', 'helps you find your own answer, and act on it.']]
      .map(([h, t], i) => `<div style="position:absolute;left:110px;right:110px;top:${150 + i * 280}px">
        <p class="serif" style="font-size:22px;letter-spacing:.2em;color:${C.mocha}">0${i + 1} &nbsp;&mdash;</p>
        <p class="serif" style="font-size:54px;font-weight:${i === 3 ? 400 : 300};line-height:1.25;margin-top:16px;color:${i === 3 ? C.forest : C.charcoal}">${h} ${t}</p></div>`).join('')}</body>`,
  's1-2c': `<body class="grain" style="background:#F6F1EA">
    <p class="serif" style="position:absolute;left:110px;right:130px;top:330px;font-weight:300;font-size:64px;line-height:1.3">If you’re functioning well, but something feels unfinished, that’s where coaching begins.</p>
    <p class="serif" style="position:absolute;left:110px;right:130px;top:820px;font-style:italic;font-weight:300;font-size:46px;line-height:1.35;color:${C.sage}">Which kind of support are you looking for?</p>
    <p class="lab" style="position:absolute;left:110px;bottom:110px;font-size:19px;opacity:.6">WithinWorks</p></body>`,

  // 3 · The Within Question 01 · a printed card on paper
  's1-3a': `<body class="grain" style="background:#EFE9E0">
    <div class="grain" style="position:absolute;left:150px;top:250px;width:780px;height:850px;background:${C.forest};transform:rotate(-2deg);box-shadow:0 30px 60px rgba(40,35,30,.28),0 4px 10px rgba(40,35,30,.15)">
      <p class="lab" style="position:absolute;left:70px;top:70px;color:${C.mocha};font-size:19px">The Within Question &middot; 01</p>
      <p class="serif" style="position:absolute;left:70px;right:70px;top:300px;color:${C.ivory};font-style:italic;font-weight:300;font-size:70px;line-height:1.22">Where are you still leading from an old story about yourself?</p></div></body>`,
  's1-3b': `<body class="grain" style="background:#EFE9E0">
    <div style="position:absolute;left:190px;top:330px;width:700px;height:640px;background:${C.ivory};transform:rotate(1.5deg);box-shadow:0 26px 50px rgba(40,35,30,.22),0 3px 8px rgba(40,35,30,.12)">
      <p class="lab" style="position:absolute;left:64px;top:64px;color:${C.mocha};font-size:19px">And the quieter one</p>
      <p class="serif" style="position:absolute;left:64px;right:64px;top:250px;color:${C.forest};font-style:italic;font-weight:300;font-size:72px;line-height:1.2">Whose voice is telling it?</p></div></body>`,

  // 4 · Leadership, unlearned 01 · one repeated device: then card, now card
  's1-4a': `<body class="grain" style="background:${C.wash}">
    <p class="lab" style="position:absolute;left:100px;top:110px;color:${C.forest}">Leadership, unlearned &middot; 01</p>
    <div style="position:absolute;left:90px;top:330px;width:430px;height:680px;background:#fff;transform:rotate(-2.5deg);box-shadow:0 20px 40px rgba(30,40,32,.18);padding:56px 44px">
      <p class="lab" style="font-size:19px;color:${C.mocha}">Then</p><p class="lab" style="font-size:15px;opacity:.55;margin-top:8px;letter-spacing:.2em">as a leader</p>
      <p class="serif" style="font-size:44px;font-weight:300;line-height:1.3;margin-top:80px">I gave the answer, quickly. It felt like help.</p></div>
    <div style="position:absolute;right:90px;top:400px;width:430px;height:680px;background:${C.forest};color:${C.ivory};transform:rotate(2deg);box-shadow:0 24px 48px rgba(30,40,32,.28);padding:56px 48px">
      <p class="lab" style="font-size:19px;color:${C.mocha}">Now</p><p class="lab" style="font-size:15px;opacity:.6;margin-top:8px;letter-spacing:.2em">as a coach</p>
      <p class="serif" style="font-size:44px;font-weight:300;line-height:1.3;margin-top:80px">I ask, then wait. The answer they find is the one they act on.</p></div>
    <div class="mark" style="color:${C.forest}">WithinWorks</div></body>`,

  // 5 · What a coach hears 01 · cream card on one colour field, after Nonlinear News
  's1-5a': `<body class="grain" style="background:${C.sage}">
    <p class="lab" style="position:absolute;left:0;right:0;top:110px;text-align:center;color:${C.ivory};font-size:20px">What a coach hears &middot; 01</p>
    <div style="position:absolute;left:150px;top:260px;width:780px;background:${C.ivory};padding:22px 22px 0">
      <img src="${PH('02')}" style="width:100%;height:560px;object-fit:cover;object-position:center 40%;display:block">
      <p class="serif" style="font-size:66px;font-weight:300;line-height:1.15;padding:46px 26px 54px">The word I listen for.</p></div>
    <p class="lab" style="position:absolute;left:0;right:0;bottom:90px;text-align:center;color:${C.ivory};font-size:18px;opacity:.75">WithinWorks</p></body>`,
  's1-5b': `<body class="grain" style="background:${C.sage}">
    <p class="lab" style="position:absolute;left:0;right:0;top:110px;text-align:center;color:${C.ivory};font-size:20px">What a coach hears &middot; 01</p>
    <div style="position:absolute;left:100px;right:100px;top:230px;background:${C.ivory};padding:76px 70px 84px">
      <p class="serif" style="font-size:96px;font-style:italic;font-weight:300;color:${C.forest}">“Should.”</p>
      <p style="font-size:39px;font-weight:300;line-height:1.5;margin-top:44px">When someone says “I should”, I get curious. Whose should is it?</p>
      <p style="font-size:39px;font-weight:300;line-height:1.5;margin-top:30px">Often it belongs to someone else: a parent, a first boss, a version of you from ten years ago.</p>
      <p style="font-size:39px;font-weight:400;line-height:1.5;margin-top:30px;color:${C.forest}">Once you hear whose voice it is, you get to decide if you still agree.</p></div>
    <p class="lab" style="position:absolute;left:0;right:0;bottom:90px;text-align:center;color:${C.ivory};font-size:18px;opacity:.75">WithinWorks</p></body>`,
};

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
const only = process.argv[2];
for (const [name, html] of Object.entries(slides)) {
  if (only && !name.startsWith(only)) continue;
  fs.writeFileSync(path.join(HERE, '_tmp.html'), `<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head>${html}</html>`);
  await p.goto('file://' + path.join(HERE, '_tmp.html'));
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  await p.screenshot({ path: path.join(OUT, name + '.jpg'), type: 'jpeg', quality: 88 });
}
fs.unlinkSync(path.join(HERE, '_tmp.html'));
await b.close();
console.log('rendered');
