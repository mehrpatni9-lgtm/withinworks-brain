// "A coaching tool I use" series (Mehr, 16 Nov), built from Megha's worksheets. Fresh page: explain everything,
// assume nothing, one CTA on the last slide. Instagram t1/t2/t3 (Megha, first person); LinkedIn u1/u2/u3
// (page voice: "a coaching tool we use", Megha in third person) + vector PDFs u1.pdf, u2.pdf, u3.pdf.
// t1 Wheel of Life · t2 Values · t3 Inner voices (from the Saboteurs worksheet, in our own words: the Positive
// Intelligence names are not used). Run: node tools.mjs
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { chromium } from '/Users/mehrpatni/mehr-portfolio/node_modules/playwright/index.mjs';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.resolve(HERE, '..');
const C = { forest: '#2F3A32', ivory: '#FAF8F5', paper: '#F3EEE6', mocha: '#B08D6F', gold: '#E3C49C', sage: '#5D6E5E', lsage: '#93A894', charcoal: '#3D3A35', wash: '#E7ECE6' };
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
.paper { background: ${C.paper}; } .paper::after, .grain::after { content: ''; position: absolute; inset: 0; background: ${GRAIN}; pointer-events: none; }
.serif { font-family: Fraunces, serif; } .hand { font-family: Caveat, cursive; }
.lab { font: 500 20px Jost; letter-spacing: .28em; text-transform: uppercase; }
`;
const ST = n => `file://${path.join(HERE, 'stock', n + '.jpg')}`;
const ICON = col => `<svg width="48" height="48" viewBox="0 0 24 24" style="flex:none" fill="none" stroke="${col}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/><path d="M3 3l1.2 2.8L11 12.6"/><rect x="11.6" y="13.1" width="8" height="3.4" rx="1.4" transform="rotate(45 15.6 14.8)" fill="${col}" stroke="none"/></svg>`;
const series = (li, col) => `<div style="position:absolute;left:90px;top:88px;display:flex;align-items:center;gap:16px">${ICON(col)}<p class="lab" style="color:${col}">${li ? 'A coaching tool we use' : 'A coaching tool I use'}</p></div>`;
const photo = (img, pos, shade) => `<img src="${ST(img)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${pos}"><div style="position:absolute;inset:0;background:${shade}"></div>`;
const cta = (li, dark) => `<div style="position:absolute;left:90px;right:90px;bottom:140px;background:${dark ? C.ivory : C.forest};color:${dark ? C.forest : C.ivory};border-radius:14px;padding:26px 34px;box-shadow:10px 10px 0 ${C.gold}">
  <p class="serif" style="font-size:36px;line-height:1.2">${li ? 'Want to use this with a coach?' : 'Want to work through this together?'}</p>
  <p style="font:400 25px/1.4 Jost;margin-top:8px">Book a complimentary discovery call${li ? ' with Megha Bhalla' : ''} on <span style="color:${dark ? C.mocha : C.gold}">www.withinworksleadership.com</span></p></div>`;

// ---- wheel helper
const wheel = (scores, size, { ring, fill, line, labels, labelCol, fs = 28 }) => {
  const c = size / 2, R = size / 2 - (labels ? 110 : 6), pt = (i, v) => { const a = -Math.PI / 2 + i * Math.PI / 4; return [c + R * v / 10 * Math.cos(a), c + R * v / 10 * Math.sin(a)]; };
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="overflow:visible">${[2, 4, 6, 8, 10].map(v => `<circle cx="${c}" cy="${c}" r="${R * v / 10}" fill="none" stroke="${ring}" stroke-width="${v === 10 ? 2 : 1.2}"/>`).join('')}
  ${scores.map((_, i) => { const [x, y] = pt(i, 10); return `<line x1="${c}" y1="${c}" x2="${x}" y2="${y}" stroke="${ring}" stroke-width="1.2"/>`; }).join('')}
  <polygon points="${scores.map((v, i) => pt(i, v).join(',')).join(' ')}" fill="${fill}" stroke="${line}" stroke-width="${size > 300 ? 4 : 3}" stroke-linejoin="round"/>
  ${scores.map((v, i) => { const [x, y] = pt(i, v); return `<circle cx="${x}" cy="${y}" r="${size > 300 ? 7 : 4.5}" fill="${line}"/>`; }).join('')}
  ${labels ? labels.map((t, i) => { const [x, y] = pt(i, 12.8); return `<text x="${x}" y="${y + 9}" text-anchor="middle" font-family="Jost" font-size="${fs}" fill="${labelCol}">${t}</text>`; }).join('') : ''}</svg>`;
};
const AREAS = ['Career', 'Money', 'Health', 'Family', 'Love', 'Friends', 'Growth', 'Fun'];
const TYPES = [
  ['The Steady Wheel', [8, 9, 8, 7, 9, 8, 8, 9], 'Most areas feel good. Notice what is holding it together, and protect it.'],
  ['The Lopsided Wheel', [9, 3, 8, 2, 9, 4, 3, 8], 'One or two areas are carrying the rest. Ask what the strong ones are costing the weak.'],
  ['The Middle Wheel', [5, 6, 4, 5, 6, 5, 4, 6], 'Nothing broken, nothing thriving. One area, given real attention, can lift the rest.'],
  ['The Rebuild Wheel', [3, 2, 4, 3, 2, 3, 4, 2], 'A heavy year. Start with one area and move it one point. Small counts.'],
];

const t1 = li => ({
  1: `<body style="background:#1e1a16;color:${C.ivory}">${photo('sunchair', '62% 50%', 'linear-gradient(180deg,rgba(24,20,16,.86) 0%,rgba(24,20,16,.5) 40%,rgba(24,20,16,.66) 100%)')}${series(li, C.gold)}
    <p class="serif" style="position:absolute;left:90px;right:90px;top:150px;font-size:100px;font-weight:400;line-height:1;color:${C.ivory}">The Wheel <i style="color:${C.gold}">of Life</i></p>
    <p style="position:absolute;left:90px;right:120px;top:290px;font:400 30px/1.45 Jost;color:rgba(250,248,245,.92)">${li ? 'One of the first exercises Megha Bhalla does with new clients.' : 'One of the first exercises I do with new clients.'} Fifteen minutes, one page, and a whole year at a glance.</p>
    <div style="position:absolute;left:170px;top:470px">${wheel([8, 6, 4, 7, 5, 6, 8, 3], 740, { ring: 'rgba(250,248,245,.3)', fill: 'rgba(227,196,156,.28)', line: C.gold, labels: AREAS, labelCol: 'rgba(250,248,245,.95)', fs: 30 })}</div>
    ${W(true, li)}</body>`,
  2: `<body class="paper">
    <p class="serif" style="position:absolute;left:90px;right:90px;top:100px;font-size:70px;font-weight:400;line-height:1.05;color:${C.forest}">How it <i style="color:${C.mocha}">works</i></p>
    ${[['Choose eight areas of your life.', `<div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:20px">${AREAS.map(a => `<span style="background:${C.ivory};border:1.5px solid rgba(47,58,50,.18);border-radius:99px;padding:8px 20px;font:400 24px Jost">${a}</span>`).join('')}</div><p style="font:400 25px/1.4 Jost;margin-top:14px;opacity:.75">Or your own words: spirituality, home, community.</p>`],
       ['Score each one from 1 to 10.', `<p style="font:400 28px/1.45 Jost;margin-top:12px">For how satisfied you feel right now, not how satisfied you think you should feel. 1 sits at the centre, 10 at the outer ring.</p>`],
       ['Join the dots, then look at the shape.', `<p style="font:400 28px/1.45 Jost;margin-top:12px">The shape tells you more than any single number. Where is it full, and where does it dip?</p>`]]
      .map(([h, body], i) => `<div style="position:absolute;left:90px;right:90px;top:${250 + i * 330}px;display:flex;gap:36px">
        <p class="serif" style="font-size:80px;font-weight:400;line-height:.9;color:${C.mocha};width:110px;flex:none">0${i + 1}</p>
        <div style="border-top:1.5px solid rgba(47,58,50,.2);padding-top:22px;flex:1"><p class="serif" style="font-size:44px;font-weight:500;line-height:1.1;color:${C.forest}">${h}</p>${body}</div></div>`).join('')}
    ${W(false, li)}</body>`,
  3: `<body class="paper">
    <p class="serif" style="position:absolute;left:90px;right:90px;top:90px;font-size:64px;font-weight:400;line-height:1.05;color:${C.forest}">What your shape <i style="color:${C.mocha}">says</i></p>
    <div style="position:absolute;left:90px;right:90px;top:220px;display:grid;grid-template-columns:1fr 1fr;gap:26px">
      ${TYPES.map(([h, sc, t], i) => `<div style="background:${C.ivory};border-radius:18px;padding:30px 28px;box-shadow:0 8px 20px rgba(60,50,40,.07)">
        <div style="display:flex;align-items:center;gap:18px">${wheel(sc, 124, { ring: 'rgba(47,58,50,.16)', fill: i === 1 ? 'rgba(176,141,111,.3)' : 'rgba(147,168,148,.3)', line: i === 1 ? C.mocha : C.sage })}
        <p class="serif" style="font-size:35px;font-weight:500;line-height:1.05;color:${C.forest}">${h}</p></div>
        <p style="font:400 28px/1.42 Jost;margin-top:16px">${t}</p></div>`).join('')}</div>
    ${cta(li, false)}${W(false, li)}</body>`,
});

// ---- t2 Values
const WORDS = ['Security', 'Freedom', 'Impact', 'Calm', 'Courage', 'Balance', 'Growth', 'Learning', 'Faith', 'Recognition', 'Honesty', 'Family', 'Adventure', 'Service', 'Wealth', 'Joy', 'Belonging', 'Legacy'];
const CIRCLED = new Set(['Freedom', 'Family', 'Growth']);
const t2 = li => ({
  1: `<body style="background:${C.forest};color:${C.ivory}">${photo('blindsplant', '50% 40%', 'linear-gradient(180deg,rgba(30,36,32,.86) 0%,rgba(30,36,32,.45) 45%,rgba(30,36,32,.7) 100%)')}${series(li, C.gold)}
    <p class="serif" style="position:absolute;left:90px;right:90px;top:150px;font-size:100px;font-weight:400;line-height:1">Your <i style="color:${C.gold}">values</i></p>
    <p style="position:absolute;left:90px;right:140px;top:290px;font:400 31px/1.45 Jost;opacity:.92">The few things that matter most to you. When work honours them, even hard weeks feel right. When it doesn’t, even a good job can feel wrong.</p>
    <div style="position:absolute;left:90px;right:90px;top:600px;display:flex;flex-wrap:wrap;gap:44px 58px;align-items:center">
      ${WORDS.map((w, i) => `<span class="serif" style="position:relative;font-size:${[44, 38, 50, 36, 42][i % 5]}px;${CIRCLED.has(w) ? `color:${C.gold}` : 'color:rgba(250,248,245,.62)'}">${w}${CIRCLED.has(w) ? `<svg style="position:absolute;left:-18px;top:-12px;width:calc(100% + 36px);height:calc(100% + 24px)" viewBox="0 0 100 40" preserveAspectRatio="none"><ellipse cx="50" cy="20" rx="48" ry="18" fill="none" stroke="${C.gold}" stroke-width="1.6" transform="rotate(-3 50 20)"/></svg>` : ''}</span>`).join('')}</div>
    ${W(true, li)}</body>`,
  2: `<body class="paper">
    <p class="serif" style="position:absolute;left:90px;right:90px;top:100px;font-size:70px;font-weight:400;line-height:1.05;color:${C.forest}">Find yours in <i style="color:${C.mocha}">20 minutes</i></p>
    ${[['Circle 10 to 12 words.', 'Read a list of values slowly. Circle every word that makes you feel something, not the ones you think you should choose.', 12],
       ['Narrow them to five.', 'If you could only keep five, which would stay?', 5],
       ['Keep three, in your own words.', 'Write what each one means to you, and a moment you lived it. “Freedom” for one person is “Family” for another.', 3]]
      .map(([h, t, n], i) => `<div style="position:absolute;left:90px;right:90px;top:${250 + i * 320}px;display:flex;gap:36px;align-items:flex-start">
        <div style="width:150px;flex:none;display:flex;flex-wrap:wrap;gap:8px;padding-top:8px">${Array.from({ length: n }, () => `<span style="width:${n > 5 ? 26 : n > 3 ? 40 : 56}px;height:${n > 5 ? 26 : n > 3 ? 40 : 56}px;border-radius:50%;background:${i === 2 ? C.mocha : C.lsage}"></span>`).join('')}</div>
        <div style="border-top:1.5px solid rgba(47,58,50,.2);padding-top:22px;flex:1"><p class="serif" style="font-size:44px;font-weight:500;line-height:1.1;color:${C.forest}">${h}</p><p style="font:400 28px/1.45 Jost;margin-top:12px">${t}</p></div></div>`).join('')}
    ${W(false, li)}</body>`,
  3: `<body class="paper">
    <p class="serif" style="position:absolute;left:90px;right:90px;top:100px;font-size:66px;font-weight:400;line-height:1.08;color:${C.forest}">Then use them as <i style="color:${C.mocha}">a filter</i></p>
    <p style="position:absolute;left:90px;right:90px;top:300px;font:400 33px/1.5 Jost">Before a big decision, a new role, a move, a restart, or a yes you’re unsure about, ask one question:</p>
    <p class="serif" style="position:absolute;left:90px;right:90px;top:500px;font-size:56px;font-style:italic;font-weight:400;line-height:1.2;color:${C.forest};border-left:4px solid ${C.mocha};padding-left:34px">Does this honour my top three?</p>
    <p style="position:absolute;left:90px;right:90px;top:700px;font:400 31px/1.5 Jost;opacity:.85">If freedom is one of yours, a role with no say over your time will cost you, however good the title or the pay.</p>
    ${cta(li, false)}${W(false, li)}</body>`,
});

// ---- t3 Inner voices
const VOICES = [
  ['The one who holds on', '“If I don’t do it myself, it won’t be done right.”', 'Kept things from going wrong.'],
  ['The one who keeps the peace', '“I’ll just say yes. It’s easier.”', 'Kept you liked and included.'],
  ['The one who has to win', '“I’m only as good as my last result.”', 'Got you noticed and promoted.'],
  ['The one who can’t sit still', '“Fine. What’s next?”', 'Kept you moving and curious.'],
];
const t3 = li => ({
  1: `<body style="background:#151515;color:${C.ivory}">${photo('windowfigure', '50% 40%', 'linear-gradient(180deg,rgba(18,18,18,.82) 0%,rgba(18,18,18,.45) 45%,rgba(18,18,18,.55) 100%)')}${series(li, C.gold)}
    <p class="serif" style="position:absolute;left:90px;right:90px;top:150px;font-size:92px;font-weight:400;line-height:1.02">The inner <i style="color:${C.gold}">voices</i> at work</p>
    <p style="position:absolute;left:90px;right:150px;top:390px;font:400 31px/1.45 Jost">Old habits of mind that once protected us. Over time, they start making our decisions for us.</p>
    ${VOICES.map(([, q], i) => `<div style="position:absolute;${i % 2 ? 'right:70px' : 'left:70px'};top:${590 + i * 150}px;max-width:640px;background:${C.ivory};color:${C.forest};border-radius:${i % 2 ? '30px 30px 6px 30px' : '30px 30px 30px 6px'};padding:24px 32px;box-shadow:0 10px 24px rgba(40,30,20,.18)"><p class="serif" style="font-size:33px;font-style:italic;line-height:1.25">${q}</p></div>`).join('')}
    ${W(true, li)}</body>`,
  2: `<body class="paper">
    <p class="serif" style="position:absolute;left:90px;right:90px;top:100px;font-size:66px;font-weight:400;line-height:1.05;color:${C.forest}">Four you may <i style="color:${C.mocha}">recognise</i></p>
    ${VOICES.map(([h, q, why], i) => `<div style="position:absolute;left:90px;right:90px;top:${235 + i * 255}px;background:${C.ivory};border-radius:18px;padding:26px 34px;box-shadow:0 8px 20px rgba(60,50,40,.07)">
      <p class="serif" style="font-size:38px;font-weight:500;color:${C.forest}">${h}</p>
      <p class="serif" style="font-size:28px;font-style:italic;margin-top:6px;color:${C.mocha}">${q}</p>
      <p style="font:400 25px/1.4 Jost;margin-top:8px"><b style="font-weight:500">Once useful:</b> ${why}</p></div>`).join('')}
    ${W(false, li)}</body>`,
  3: `<body class="paper">
    <p class="serif" style="position:absolute;left:90px;right:90px;top:100px;font-size:66px;font-weight:400;line-height:1.08;color:${C.forest}">They’re not flaws. <i style="color:${C.mocha}">Get curious.</i></p>
    <p style="position:absolute;left:90px;right:90px;top:280px;font:400 31px/1.5 Jost">In coaching we don’t fight these voices. We look at them closely, with three questions:</p>
    ${['When does this voice show up?', 'What is it trying to protect me from?', 'What would my calm, steady self do instead?'].map((q, i) => `<div style="position:absolute;left:90px;right:90px;top:${430 + i * 120}px;display:flex;gap:28px;align-items:baseline"><span class="serif" style="font-size:46px;color:${C.mocha};width:60px">${i + 1}</span><p class="serif" style="font-size:42px;font-weight:400;line-height:1.2;color:${C.forest}">${q}</p></div>`).join('')}
    ${cta(li, false)}${W(false, li)}</body>`,
});

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
for (const [pages, ig, lk] of [[t1, 't1', 'u1'], [t2, 't2', 'u2'], [t3, 't3', 'u3']]) {
  const parts = [];
  for (const [prefix, li] of [[ig, false], [lk, true]]) {
    for (const [i, html] of Object.entries(pages(li))) {
      const tmp = path.join(HERE, '_tmp_tools.html');
      fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><style>${css} @page{size:2160px 2700px;margin:0} html,body{margin:0}</style></head>${html}</html>`);
      await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
      await p.screenshot({ path: path.join(OUT, `${prefix}-${i}.jpg`), type: 'jpeg', quality: 92 });
      if (li) { const o = path.join(HERE, `_${lk}-${i}.pdf`); await p.pdf({ path: o, width: '2160px', height: '2700px', printBackground: true, scale: 2 }); parts.push(o); }
    }
  }
  execFileSync('pdfunite', [...parts, path.join(OUT, `${lk}.pdf`)]); parts.forEach(x => fs.unlinkSync(x));
}
fs.unlinkSync(path.join(HERE, '_tmp_tools.html'));
await b.close();
console.log('ok');
