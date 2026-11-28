// WithinWorks Leadership company page, new posts l2-1 to l2-7 (Mehr, 28 Nov 2026), from Megha's learning log.
// Editorial, never infographic: paper or forest grounds, serif doing the work, line drawings, a credit on every idea.
// LinkedIn uses the W with the full name, bottom left. Run: node li_series.mjs
import fs from 'fs';
import path from 'path';
import { chromium } from '/Users/mehrpatni/mehr-portfolio/node_modules/playwright/index.mjs';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const OUT = process.env.OUT || path.resolve(HERE, '..');
const C = { forest: '#2F3A32', ivory: '#FAF8F5', paper: '#F3EEE6', mocha: '#B08D6F', gold: '#E3C49C', sage: '#5D6E5E', lsage: '#93A894', charcoal: '#3D3A35' };
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.3 0 0 0 0 0.25 0 0 0 0 0.2 0 0 0 .07 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
const W = dark => `<div style="position:absolute;left:90px;bottom:60px;display:flex;align-items:center;gap:14px">
  <svg width="52" height="48" viewBox="0 0 120 110"><defs><clipPath id="l"><rect width="58" height="110"/></clipPath><clipPath id="r"><rect x="58" width="62" height="110"/></clipPath></defs>
  <text x="4" y="88" font-family="Fraunces" font-size="104" font-weight="600" fill="${dark ? C.lsage : C.sage}" clip-path="url(#l)">W</text>
  <text x="4" y="88" font-family="Fraunces" font-size="104" font-weight="600" fill="${C.mocha}" clip-path="url(#r)">W</text></svg>
  <span style="font:400 16px Jost;letter-spacing:.3em;text-transform:uppercase;color:${dark ? C.ivory : C.charcoal};opacity:.85">WithinWorks Leadership</span></div>`;
const credit = (t, dark) => `<p style="position:absolute;right:90px;bottom:72px;font:400 17px Jost;letter-spacing:.04em;color:${dark ? 'rgba(250,248,245,.7)' : 'rgba(61,58,53,.7)'}">${t}</p>`;
const lab = (t, col) => `<p style="position:absolute;left:90px;top:96px;font:500 18px Jost;letter-spacing:.3em;text-transform:uppercase;color:${col}">${t}</p>`;
const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Jost:wght@400;500&display=swap');
* { margin: 0; box-sizing: border-box; }
body { width: 1080px; height: 1350px; overflow: hidden; position: relative; font-family: Jost, sans-serif; color: ${C.charcoal}; }
.paper { background: ${C.paper}; } .paper::after { content: ''; position: absolute; inset: 0; background: ${GRAIN}; pointer-events: none; }
.green { background: ${C.forest}; color: ${C.ivory}; }
.serif { font-family: Fraunces, serif; }
`;
const big = (t, top, size = 84, col = C.forest) => `<p class="serif" style="position:absolute;left:90px;right:90px;top:${top}px;font-size:${size}px;font-weight:400;line-height:1.08;color:${col}">${t}</p>`;
const body = (t, top, col = C.charcoal) => `<p style="position:absolute;left:90px;right:120px;top:${top}px;font:400 32px/1.5 Jost;color:${col}">${t}</p>`;

const within = (name, q, d, tint) => `<body class="paper">${lab('The Within series', C.mocha)}
  <div style="position:absolute;left:90px;right:90px;top:430px;background:${C.ivory};padding:70px 64px;box-shadow:14px 14px 0 ${tint}">
    <p class="serif" style="font-size:40px;font-style:italic;color:${C.mocha}">${q}</p>
    <p class="serif" style="font-size:86px;line-height:1.05;margin-top:26px;color:${C.forest}">${name}</p>
    <p style="font:400 31px/1.5 Jost;margin-top:30px">${d}</p></div>${W(false)}</body>`;

const S = {
  'wn-1': `<body class="green">${lab('The Within series', C.gold)}${big('Three questions.<br><i style="color:' + C.gold + '">One journey.</i>', 430, 96, C.ivory)}
    ${body('Every coaching journey at WithinWorks Leadership rests on three questions, taken in order.', 750, 'rgba(250,248,245,.9)')}${W(true)}</body>`,
  'wn-2': within('Within Compass', 'Where am I now?', 'A clear, simple picture of your life today, across the areas that matter to you.', C.lsage),
  'wn-3': within('Within Core', 'What matters most to me?', 'In 90 minutes, name the values that guide your best decisions, and notice where your life honours them and where it does not.', C.gold),
  'wn-4': within('Within Direction', 'Where do I go from here?', 'Your next step, chosen by you, with a coach beside you to keep it honest.', C.mocha),

  'wt-1': `<body class="green">${lab('A coaching tool we use', C.gold)}${big('The Worry <i style="color:' + C.gold + '">Tree</i>', 430, 110, C.ivory)}
    ${body('Most of us carry worries we cannot act on, as if carrying them were a form of responsibility. Two questions help us put some of them down.', 650, 'rgba(250,248,245,.9)')}
    ${credit('From Gillian Butler and Tony Hope, Manage Your Mind', true)}${W(true)}</body>`,
  'wt-2': `<body class="paper">${big('Ask yourself', 330, 64)}
    <div style="position:absolute;left:90px;right:90px;top:510px;display:flex;flex-direction:column;gap:60px">
      ${['What am I worried about?', 'Can I do something useful about it now?'].map(q => `<p class="serif" style="font-size:62px;font-style:italic;line-height:1.15;color:${C.forest};border-left:4px solid ${C.mocha};padding-left:34px">${q}</p>`).join('')}</div>
    ${credit('From Gillian Butler and Tony Hope, Manage Your Mind')}${W(false)}</body>`,
  'wt-3': `<body class="paper">
    <svg style="position:absolute;left:0;top:0" width="1080" height="1350"><path d="M540 300 V420 M540 420 C540 470 300 470 300 540 M540 420 C540 470 780 470 780 540" fill="none" stroke="${C.sage}" stroke-width="3"/></svg>
    <p class="serif" style="position:absolute;left:0;right:0;top:200px;text-align:center;font-size:44px;font-style:italic;color:${C.mocha}">Can I do something useful now?</p>
    ${[['Yes', 'Decide the next step, and take it.', 90, C.lsage], ['No', 'Park it, and return to today.', 570, C.gold]].map(([h, t, x, sh]) => `<div style="position:absolute;left:${x}px;width:420px;top:570px;background:${C.ivory};padding:44px 40px;box-shadow:12px 12px 0 ${sh}">
      <p class="serif" style="font-size:64px;color:${C.forest}">${h}</p><p style="font:400 30px/1.45 Jost;margin-top:14px">${t}</p></div>`).join('')}
    ${body('Which worry would you park today?', 1010)}${credit('From Gillian Butler and Tony Hope, Manage Your Mind')}${W(false)}</body>`,

  'wz-1': `<body class="paper">${lab('Leading through uncertainty', C.mocha)}${big('The window of <i style="color:' + C.mocha + '">tolerance</i>', 150, 76)}
    ${[['Racing', 'Urgency, irritability, racing thoughts.', '#E8D9C7'], ['The workable middle', 'Flexible thinking, choice, perspective.', C.ivory], ['Shut down', 'Numbness, disengagement.', '#DDE3DC']].map(([h, t, bg], i) => `<div style="position:absolute;left:90px;right:90px;top:${410 + i * 210}px;height:${i === 1 ? 230 : 180}px;background:${bg};${i === 1 ? `border:3px solid ${C.forest};` : ''}padding:${i === 1 ? 46 : 36}px 48px">
      <p class="serif" style="font-size:${i === 1 ? 52 : 42}px;color:${C.forest}">${h}</p><p style="font:400 28px Jost;margin-top:8px">${t}</p></div>`).join('')}
    ${credit('After Dr Dan Siegel')}${W(false)}</body>`,

  'wb-1': `<body class="paper">${lab('Leading through uncertainty', C.mocha)}${big('The aim is not an empty bucket.', 150, 66)}
    <svg style="position:absolute;left:290px;top:420px" width="500" height="520" viewBox="0 0 500 520">
      <path d="M60 40 L100 470 H400 L440 40" fill="none" stroke="${C.forest}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M78 230 L422 230 L404 455 H96 Z" fill="${C.lsage}" opacity=".55"/>
      <path d="M70 150 H430" stroke="${C.mocha}" stroke-width="3" stroke-dasharray="12 10"/>
      <path d="M400 400 H470 V430" fill="none" stroke="${C.forest}" stroke-width="5"/><circle cx="470" cy="460" r="6" fill="${C.lsage}"/>
    </svg>
    <p style="position:absolute;left:740px;top:545px;font:400 24px Jost;color:${C.mocha}">the overflow line</p>
    ${body('It is noticing the level before it overflows, and keeping the taps open: sleep, movement, conversation, rest.', 990)}
    ${credit('After Alison Brabban and Douglas Turkington')}${W(false)}</body>`,

  'wp-1': `<body class="green">${lab('A wellbeing check', C.gold)}${big('PERMA', 150, 110, C.ivory)}
    <div style="position:absolute;left:90px;right:90px;top:370px;display:flex;flex-direction:column;gap:34px">
      ${[['Positive emotion', 'Feeling good, often enough.'], ['Engagement', 'Time that disappears in absorbing work.'], ['Relationships', 'Real, authentic connection.'], ['Meaning', 'Being part of something bigger than yourself.'], ['Accomplishment', 'Progress you can feel.']].map(([h, t]) => `<div><p class="serif" style="font-size:46px;color:${C.ivory}"><span style="color:${C.gold}">${h[0]}</span>${h.slice(1)}</p><p style="font:400 27px Jost;margin-top:4px;color:rgba(250,248,245,.82)">${t}</p></div>`).join('')}</div>
    ${credit('Martin Seligman, founder of positive psychology', true)}${W(true)}</body>`,

  'wr-1': `<body class="paper">${lab('Leading people', C.mocha)}${big('When someone shares <i style="color:' + C.mocha + '">good news</i>', 150, 64)}
    <div style="position:absolute;left:90px;right:90px;top:400px;height:640px;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:18px">
      ${[['Active and constructive', '“That’s wonderful. Tell me how it happened.”', true], ['Passive and constructive', '“Good job.”'], ['Active and destructive', '“Won’t that mean more work for you?”'], ['Passive and destructive', '“Anyway, about tomorrow…”']].map(([h, t, on]) => `<div style="background:${on ? C.forest : C.ivory};color:${on ? C.ivory : C.charcoal};padding:36px 34px">
        <p style="font:500 20px Jost;letter-spacing:.14em;text-transform:uppercase;color:${on ? C.gold : C.mocha}">${h}</p><p class="serif" style="font-size:36px;font-style:italic;line-height:1.25;margin-top:16px">${t}</p></div>`).join('')}</div>
    ${body('Only one builds the relationship.', 1080)}${credit('After Shelly Gable and Martin Seligman')}${W(false)}</body>`,

  'wd-1': `<body class="paper">${lab('Depth in leadership', C.mocha)}${big('Puddles <i style="color:' + C.mocha + '">and wells</i>', 150, 92)}
    <svg style="position:absolute;left:90px;top:420px" width="900" height="440" viewBox="0 0 900 440">
      <path d="M20 120 H440" stroke="${C.forest}" stroke-width="4"/><path d="M40 120 Q230 165 420 120" fill="${C.lsage}" opacity=".6"/>
      <path d="M640 40 V420 H760 V40" fill="none" stroke="${C.forest}" stroke-width="4"/><rect x="642" y="120" width="116" height="298" fill="${C.lsage}" opacity=".6"/>
    </svg>
    <p style="position:absolute;left:90px;top:620px;width:420px;font:400 28px/1.45 Jost">A mile wide and an inch deep.</p>
    <p style="position:absolute;left:640px;top:880px;width:360px;font:400 28px/1.45 Jost">An inch wide and a mile deep.</p>
    ${body('Breadth gets you noticed. Depth is what people return to.', 1030)}${credit('An image from Nick Santonastasso')}${W(false)}</body>`,
  'wq-1': `<body class="green">${lab('Two questions for a hard season', C.gold)}
    <div style="position:absolute;left:90px;right:90px;top:330px;display:flex;flex-direction:column;gap:80px">
      ${['What’s the gift in this?', 'Who am I going to become because I am going through this?'].map(q => `<p class="serif" style="font-size:70px;font-style:italic;line-height:1.15;color:${C.ivory};border-left:4px solid ${C.gold};padding-left:40px">${q}</p>`).join('')}</div>
    ${credit('From Nick Santonastasso, EO Dubai', true)}${W(true)}</body>`,
  'we-1': `<body class="paper">${lab('Leading through uncertainty', C.mocha)}${big('Effective does not mean <i style="color:' + C.mocha + '">certain</i>', 230, 80)}
    <div style="position:absolute;left:90px;right:90px;top:620px;display:flex;flex-direction:column;gap:26px">
      ${[['Control', 'my actions.', C.lsage], ['Influence', 'my conversations.', C.gold], ['Accept', 'what is unknown.', C.mocha]].map(([h, t, sh]) => `<div style="background:${C.ivory};padding:30px 44px;box-shadow:10px 10px 0 ${sh}"><p class="serif" style="font-size:52px;color:${C.forest}">${h} <span style="font-style:italic;color:${C.charcoal}">${t}</span></p></div>`).join('')}</div>
    ${W(false)}</body>`,
  'wbr-1': `<body class="green">${lab('Before a hard meeting', C.gold)}
    <div style="position:absolute;left:90px;right:90px;top:300px;display:flex;flex-direction:column;gap:56px">
      ${['Take a deep breath.', 'Take one more.', 'Release slowly through the mouth.'].map((t, i) => `<p class="serif" style="font-size:${78 - i * 6}px;line-height:1.1;color:${i === 2 ? C.gold : C.ivory}">${t}</p>`).join('')}</div>
    ${body('Prepare yourself as carefully as your slides.', 960, 'rgba(250,248,245,.88)')}${W(true)}</body>`,
};

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
const tmp = path.join(HERE, '_tmp_lis.html');
for (const [name, html] of Object.entries(S)) {
  fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head>${html}</html>`);
  await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(OUT, `${name}.jpg`), type: 'jpeg', quality: 92 });
}
fs.unlinkSync(tmp); await b.close(); console.log('ok');
