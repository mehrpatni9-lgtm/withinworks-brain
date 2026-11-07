// Diwali 2026: one story (1080x1920) and one post (1080x1350). Renders to ../diwali-story.jpg, ../diwali-post.jpg
// Idea: a grid of fine-line tiles, one Diwali motif each, like lit windows. Every tile is drawn except the
// bottom-right corner, left empty and dotted: "Which corner of your life is still waiting for light?"
import fs from 'fs';
import path from 'path';
import { chromium } from '/Users/mehrpatni/mehr-portfolio/node_modules/playwright/index.mjs';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.resolve(HERE, '..');
const C = { forest: '#2F3A32', ivory: '#F3EEE6', mocha: '#B08D6F', warm: '#E3C49C', sage: '#93A894' };
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 .9 0 0 0 0 .8 0 0 0 .05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const css = (w, h) => `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=Jost:wght@300;400;500&display=swap');
* { margin: 0; box-sizing: border-box; }
body { width: ${w}px; height: ${h}px; overflow: hidden; position: relative; background: ${C.forest}; font-family: Jost, sans-serif; }
body::after { content: ''; position: absolute; inset: 0; background: ${GRAIN}; pointer-events: none; }
.serif { font-family: Fraunces, serif; }
.caps { font: 400 var(--caps, 19px) Jost; letter-spacing: .5em; text-transform: uppercase; }
`;

// --- motifs, each drawn in a 200x200 box -------------------------------------------------
const range = (a, b, s) => { const r = []; for (let x = a; x <= b + 1e-6; x += s) r.push(x); return r; };
const rad = d => d * Math.PI / 180;
const M = {
  diya: () => `${[205, 230, 255, 270, 285, 310, 335].map(a => `<line x1="${100 + 50 * Math.cos(rad(a))}" y1="${86 + 50 * Math.sin(rad(a))}" x2="${100 + 74 * Math.cos(rad(a))}" y2="${86 + 74 * Math.sin(rad(a))}"/>`).join('')}
    <path d="M36 118 L164 118 C160 154 132 164 100 164 C68 164 40 154 36 118 Z"/><path d="M84 164 L80 176 L120 176 L116 164"/>
    <path d="M100 58 C113 78 114 96 100 110 C86 96 87 78 100 58 Z"/>`,
  lotus: () => `${range(138, 186, 12).map(y => `<line x1="14" y1="${y}" x2="186" y2="${y}"/>`).join('')}
    <path d="M100 130 C80 106 84 72 100 48 C116 72 120 106 100 130 Z"/>
    <path d="M100 130 C72 126 48 106 40 78 C66 84 90 100 100 130 Z"/><path d="M100 130 C128 126 152 106 160 78 C134 84 110 100 100 130 Z"/>`,
  lantern: () => `<line x1="100" y1="12" x2="100" y2="38"/><path d="M100 38 L146 62 L146 112 L100 136 L54 112 L54 62 Z"/>
    <path d="M100 38 L100 136 M54 62 L146 112 M146 62 L54 112"/>${range(82, 118, 6).map(x => `<line x1="${x}" y1="140" x2="${x}" y2="178"/>`).join('')}`,
  rangoli: () => `<circle cx="100" cy="100" r="82"/><circle cx="100" cy="100" r="12"/>
    ${range(0, 315, 45).map(a => `<ellipse cx="100" cy="60" rx="14" ry="34" transform="rotate(${a} 100 100)"/>`).join('')}`,
  home: () => `<path d="M52 190 L52 92 A48 48 0 0 1 148 92 L148 190"/><path d="M64 190 L64 94 A36 36 0 0 1 136 94 L136 190"/>
    <path d="M80 168 L120 168 A20 13 0 0 1 80 168 Z"/><path d="M100 136 C106 146 106 156 100 163 C94 156 94 146 100 136 Z"/>`,
  sparkler: () => `<circle cx="100" cy="100" r="5"/>${range(0, 345, 15).map(a => `<line x1="${100 + 16 * Math.cos(rad(a))}" y1="${100 + 16 * Math.sin(rad(a))}" x2="${100 + 130 * Math.cos(rad(a))}" y2="${100 + 130 * Math.sin(rad(a))}"/>`).join('')}`,
  ripple: () => [10, 24, 40, 58, 78, 100].map(r => `<circle cx="100" cy="100" r="${r}"/>`).join(''),
  jaali: () => range(-200, 400, 30).map(c => `<line x1="0" y1="${c}" x2="200" y2="${c - 200}"/><line x1="0" y1="${c - 200}" x2="200" y2="${c}"/>`).join(''),
  star: () => { const pts = (ro, ri, off) => range(0, 15, 1).map(i => { const r = i % 2 ? ri : ro, a = rad(i * 22.5 + off - 90); return `${100 + r * Math.cos(a)},${100 + r * Math.sin(a)}`; }).join(' ');
    return `<polygon points="${pts(82, 36, 0)}"/><polygon points="${pts(46, 20, 11.25)}"/><circle cx="100" cy="100" r="8"/>`; },
  toran: () => `<line x1="12" y1="34" x2="188" y2="34"/>${range(14, 164, 25).map(x => `<path d="M${x} 34 L${x + 12} 68 L${x + 24} 34"/>`).join('')}
    <path d="M40 190 L40 130 A60 60 0 0 1 160 130 L160 190"/>`,
  sun: () => `${[28, 52, 76].map(r => `<path d="M${100 - r} 188 A${r} ${r} 0 0 1 ${100 + r} 188"/>`).join('')}
    ${range(195, 345, 15).map(a => `<line x1="${100 + 84 * Math.cos(rad(a))}" y1="${188 + 84 * Math.sin(rad(a))}" x2="${100 + 170 * Math.cos(rad(a))}" y2="${188 + 170 * Math.sin(rad(a))}"/>`).join('')}`,
  kandil: () => `<line x1="100" y1="10" x2="100" y2="30"/><path d="M70 30 L130 30 L142 46 L58 46 Z"/><rect x="58" y="46" width="84" height="96"/>
    ${range(69, 131, 10.5).map(x => `<line x1="${x}" y1="46" x2="${x}" y2="142"/>`).join('')}<rect x="64" y="142" width="72" height="12"/>
    ${range(78, 122, 5.5).map(x => `<line x1="${x}" y1="154" x2="${x}" y2="186"/>`).join('')}`,
  laddoo: () => `<line x1="12" y1="190" x2="188" y2="190"/>${[6, 5, 4, 3, 2, 1].map((n, row) => range(0, n - 1, 1).map(i => `<circle cx="${100 + (i - (n - 1) / 2) * 27}" cy="${174 - row * 25}" r="13"/>`).join('')).join('')}`,
  rockets: () => [55, 100, 145].map(x => `<path d="M${x - 14} 46 L${x} 18 L${x + 14} 46 Z"/><rect x="${x - 14}" y="46" width="28" height="96"/>
    ${range(58, 130, 14).map(y => `<line x1="${x - 14}" y1="${y + 10}" x2="${x + 14}" y2="${y}"/>`).join('')}<line x1="${x}" y1="142" x2="${x}" y2="168"/>
    ${range(0, 315, 45).map(a => `<line x1="${x + 4 * Math.cos(rad(a))}" y1="${178 + 4 * Math.sin(rad(a))}" x2="${x + 11 * Math.cos(rad(a))}" y2="${178 + 11 * Math.sin(rad(a))}"/>`).join('')}`).join(''),
  flower8: () => `<circle cx="100" cy="100" r="14"/>${range(0, 315, 45).map(a => `<path d="M100 86 C86 70 86 44 100 22 C114 44 114 70 100 86 Z" transform="rotate(${a} 100 100)"/>`).join('')}`,
  anar: () => `<path d="M58 192 Q100 112 142 192"/>${range(200, 340, 10).map((a, i) => { const L = 70 + (i % 3) * 22; return `<path d="M100 120 Q${100 + L * 0.5 * Math.cos(rad(a))} ${120 + L * 0.7 * Math.sin(rad(a)) - 10} ${100 + L * Math.cos(rad(a))} ${120 + L * Math.sin(rad(a))}"/>`; }).join('')}`,
  chakri: () => `<circle cx="100" cy="100" r="88"/><polyline points="${range(0, 6 * Math.PI, 0.12).map(t => { const r = 4 + t * 4.2; return `${(100 + r * Math.cos(t)).toFixed(1)},${(100 + r * Math.sin(t)).toFixed(1)}`; }).join(' ')}"/>`,
  phuljhadi: () => `<line x1="100" y1="190" x2="100" y2="104"/><circle cx="100" cy="96" r="5"/>${range(0, 348, 12).filter(a => a < 66 || a > 114).map(a => `<line x1="${100 + 14 * Math.cos(rad(a))}" y1="${96 + 14 * Math.sin(rad(a))}" x2="${100 + 140 * Math.cos(rad(a))}" y2="${96 + 140 * Math.sin(rad(a))}"/>`).join('')}`,
  pinwheel: () => `<circle cx="100" cy="100" r="16"/>${range(0, 345, 15).map(a => { const p = (r, d) => `${(100 + r * Math.cos(rad(a + d))).toFixed(1)} ${(100 + r * Math.sin(rad(a + d))).toFixed(1)}`; return `<path d="M${p(24, 0)} Q${p(80, 30)} ${p(140, 62)}"/>`; }).join('')}`,
  flower4: () => `<circle cx="100" cy="100" r="88"/><path d="M100 88 L112 100 L100 112 L88 100 Z"/>${[0, 90, 180, 270].map(a => `<path d="M100 88 C76 80 62 48 80 34 C90 27 100 36 100 46 C100 36 110 27 120 34 C138 48 124 80 100 88 Z" transform="rotate(${a} 100 100)"/>`).join('')}`,
  burst: () => `${[14, 30, 46, 62, 78].map((r, i) => `<circle cx="100" cy="100" r="${r}"${i % 2 ? ` stroke-dasharray="${i === 1 ? '3 6' : '12 6'}"` : ''}/>`).join('')}${range(0, 350, 10).map(a => `<line x1="${100 + 86 * Math.cos(rad(a))}" y1="${100 + 86 * Math.sin(rad(a))}" x2="${100 + 100 * Math.cos(rad(a))}" y2="${100 + 100 * Math.sin(rad(a))}"/>`).join('')}`,
  ladi: () => `<line x1="100" y1="12" x2="100" y2="188"/>${range(22, 172, 19).map(y => `<rect x="36" y="${y}" width="58" height="11"/><rect x="106" y="${y}" width="58" height="11"/>`).join('')}`,
  flower6: () => `<circle cx="100" cy="100" r="88"/>${range(0, 300, 60).map(a => `<ellipse cx="100" cy="56" rx="24" ry="40" transform="rotate(${a} 100 100)"/>`).join('')}<path d="M100 84 L105 95 L116 100 L105 105 L100 116 L95 105 L84 100 L95 95 Z"/>`,
  scales: () => range(0, 200, 34).map(y => range(0, 200, 34).map(x => `<circle cx="${x + ((y / 34) % 2 ? 17 : 0)}" cy="${y}" r="17"/>`).join('')).join(''),
  suits: () => `<line x1="100" y1="12" x2="100" y2="188"/><line x1="12" y1="100" x2="188" y2="100"/>
    <path d="M56 24 L80 56 L56 88 L32 56 Z"/>
    <circle cx="144" cy="40" r="12"/><circle cx="131" cy="60" r="12"/><circle cx="157" cy="60" r="12"/><path d="M144 62 L137 86 L151 86 Z"/>
    <path d="M56 176 C26 156 26 122 44 120 C52 119 56 126 56 132 C56 126 60 119 68 120 C86 122 86 156 56 176 Z"/>
    <path d="M144 114 C114 134 114 166 132 168 C140 169 144 162 144 156 C144 162 148 169 156 168 C174 166 174 134 144 114 Z"/><path d="M144 160 L137 184 L151 184 Z"/>`,
};

let tid = 0;
const tile = (name, size) => {
  const id = 't' + (tid++);
  if (name === 'empty') return `<svg width="${size}" height="${size}" viewBox="0 0 200 200" style="overflow:visible;filter:drop-shadow(0 0 4px rgba(240,190,120,1)) drop-shadow(0 0 12px rgba(226,176,110,.95)) drop-shadow(0 0 26px rgba(226,176,110,.6))">
    <rect x="1.5" y="1.5" width="197" height="197" fill="none" stroke="#F0C487" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round"/>
    </svg>`;
  return `<svg width="${size}" height="${size}" viewBox="0 0 200 200"><defs><clipPath id="${id}"><rect x="12" y="12" width="176" height="176"/></clipPath></defs>
    <rect x="1.5" y="1.5" width="197" height="197" fill="none" stroke="${C.ivory}" stroke-width="2"/>
    <rect x="12" y="12" width="176" height="176" fill="none" stroke="${C.ivory}" stroke-width="1.4" opacity=".55"/>
    <g clip-path="url(#${id})" fill="none" stroke="${C.ivory}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">${M[name]()}</g></svg>`;
};

const grid = (names, cols, size, gap, qf) => `<div style="display:grid;grid-template-columns:repeat(${cols}, ${size}px);gap:${gap}px;justify-content:center">${names.map(n => n !== 'empty' ? tile(n, size)
  : `<div style="position:relative;width:${size}px;height:${size}px">${tile(n, size)}<p class="serif" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;font-size:${qf}px;font-style:italic;font-weight:400;line-height:1.22;color:${C.warm}">Which corner<br>of your life<br>is still waiting<br>for light?</p></div>`).join('')}</div>`;

const W = `<svg width="54" height="50" viewBox="0 0 120 110"><defs><clipPath id="l"><rect width="58" height="110"/></clipPath><clipPath id="r"><rect x="58" width="62" height="110"/></clipPath></defs>
  <text x="4" y="88" font-family="Fraunces" font-size="104" font-weight="600" fill="${C.sage}" clip-path="url(#l)">W</text>
  <text x="4" y="88" font-family="Fraunces" font-size="104" font-weight="600" fill="${C.mocha}" clip-path="url(#r)">W</text></svg>
  <span style="font:400 18px Jost;letter-spacing:.3em;text-transform:uppercase;color:${C.ivory};opacity:.85">WithinWorks Leadership</span>`;


// Glowing gold L-brackets just outside the four outer corners of the grid.
const glowCorners = (w, L) => {
  const rows = Math.ceil(L.tiles.length / L.cols), gw = L.cols * L.size + (L.cols - 1) * L.gap, gh = rows * L.size + (rows - 1) * L.gap;
  const x0 = (w - gw) / 2 - L.off, y0 = L.grid - L.off, x1 = (w + gw) / 2 + L.off, y1 = L.grid + gh + L.off, a = L.arm;
  const col = '#E2B06E', glow = 'filter:drop-shadow(0 0 8px rgba(226,176,110,.95)) drop-shadow(0 0 22px rgba(226,176,110,.5))';
  const c = (x, y, bt, bs) => `<div style="position:absolute;left:${x}px;top:${y}px;width:${a}px;height:${a}px;${bt}:2.5px solid ${col};${bs}:2.5px solid ${col};${glow}"></div>`;
  return c(x0, y0, 'border-top', 'border-left') + c(x1 - a, y0, 'border-top', 'border-right') + c(x0, y1 - a, 'border-bottom', 'border-left') + c(x1 - a, y1 - a, 'border-bottom', 'border-right');
};


// Four-point sparkle, gold with a glow.
const sparkle = (x, y, r) => `<svg style="position:absolute;left:${x - r}px;top:${y - r}px;overflow:visible;filter:drop-shadow(0 0 6px rgba(226,176,110,.9))" width="${2 * r}" height="${2 * r}" viewBox="-10 -10 20 20"><path d="M0 -10 C1 -2 2 -1 10 0 C2 1 1 2 0 10 C-1 2 -2 1 -10 0 C-2 -1 -1 -2 0 -10 Z" fill="#EBC58C"/></svg>`;
const sparkles = (w, L) => {
  const rows = Math.ceil(L.tiles.length / L.cols), gw = L.cols * L.size + (L.cols - 1) * L.gap, gh = rows * L.size + (rows - 1) * L.gap;
  const x0 = (w - gw) / 2 - L.off, y0 = L.grid - L.off, x1 = (w + gw) / 2 + L.off, y1 = L.grid + gh + L.off, k = L.off * 1.6;
  return sparkle(x0 - k * .55, y0 - k * .3, 11) + sparkle(x0 - k * .1, y0 - k * .95, 6) + sparkle(x1 + k * .5, y0 - k * .5, 9)
    + sparkle(x0 - k * .5, y1 + k * .45, 8) + sparkle(x1 + k * .55, y1 + k * .25, 11) + sparkle(x1 + k * .05, y1 + k * .95, 6);
};
const divider = y => `<div style="position:absolute;left:0;right:0;top:${y}px;display:flex;align-items:center;justify-content:center;gap:14px">
  <i style="width:120px;height:1.5px;background:linear-gradient(90deg, rgba(226,176,110,0), #E2B06E)"></i>
  <i style="width:9px;height:9px;transform:rotate(45deg);border:1.5px solid #E2B06E;box-shadow:0 0 10px rgba(226,176,110,.8)"></i>
  <i style="width:120px;height:1.5px;background:linear-gradient(270deg, rgba(226,176,110,0), #E2B06E)"></i></div>`;

const page = (w, h, L) => `<body>
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 70% 45% at 50% ${(L.grid + 420) / h * 100}%, rgba(226,176,110,.09), rgba(226,176,110,0) 70%), radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,.22) 100%)"></div>
  <p class="serif" style="position:absolute;left:0;right:0;top:${L.h1}px;text-align:center;font-size:${L.f1}px;font-weight:300;line-height:1.12;color:${C.ivory};text-shadow:0 0 18px rgba(226,176,110,.55), 0 0 44px rgba(226,176,110,.28)">${L.head}</p>
  ${glowCorners(w, L)}${sparkles(w, L)}${L.div ? divider(L.div) : ''}
  <div style="position:absolute;left:0;right:0;top:${L.grid}px">${grid(L.tiles, L.cols, L.size, L.gap, L.qf)}</div>
  <p class="caps" style="--caps:${L.cf}px;position:absolute;left:0;right:0;top:${L.caps}px;text-align:center;color:${C.ivory};opacity:.82">Wishing you a Diwali full of light</p>
  <div style="position:absolute;left:0;right:0;${L.logoPos};display:flex;align-items:center;justify-content:center;gap:16px">${W}</div>
</body>`;

const TILES = ['diya', 'kandil', 'laddoo', 'rockets', 'flower8', 'jaali', 'anar', 'chakri', 'phuljhadi', 'pinwheel', 'flower4', 'lantern', 'burst', 'star', 'ladi', 'lotus', 'flower6', 'scales', 'suits', 'empty'];
const formats = {
  'diwali-story': [1080, 1920, { head: 'Every home is <i style="color:#EBC58C">lit up</i> today.', h1: 240, f1: 60, grid: 372,
    tiles: TILES, cols: 4, size: 200, gap: 14, qf: 27, off: 22, arm: 56, cf: 25,
    caps: 1488, logoX: 110, logoPos: 'bottom:250px' }],
  'diwali-post': [1080, 1350, { head: 'Every home is <i style="color:#EBC58C">lit up</i> today.', h1: 44, f1: 52, grid: 150,
    tiles: TILES, cols: 4, size: 170, gap: 12, qf: 23, off: 18, arm: 46, cf: 22, div: 1182,
    caps: 1116, logoX: 64, logoPos: 'bottom:56px' }],
};

// Run directly to render; imported (by the Diwali PDF) it only lends its motifs.
export { M, tile, C };
if (process.argv[1] && import.meta.url === 'file://' + process.argv[1]) {
const b = await chromium.launch();
for (const [name, [w, h, L]] of Object.entries(formats)) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  fs.writeFileSync(path.join(HERE, '_tmp_diwali.html'), `<!doctype html><html><head><meta charset="utf-8"><style>${css(w, h)}</style></head>${page(w, h, L)}</html>`);
  await p.goto('file://' + path.join(HERE, '_tmp_diwali.html'));
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(600);
  await p.screenshot({ path: path.join(OUT, name + '.jpg'), type: 'jpeg', quality: 92 });
}
fs.unlinkSync(path.join(HERE, '_tmp_diwali.html'));
await b.close();
console.log('rendered');
}
