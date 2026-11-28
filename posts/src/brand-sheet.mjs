// Brand kit downloads for the Brain (Mehr, 28 Nov 2026): logo PNGs from the outlined SVGs in
// brain/assets/downloads/logo-pack, a one-page brand sheet PDF, and the zipped logo pack.
// The SVGs (outlined Fraunces W, Jost wordmark) are made once with fontTools; see git history. Run: node brand-sheet.mjs
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { chromium } from '/Users/mehrpatni/mehr-portfolio/node_modules/playwright/index.mjs';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const DL = path.resolve(HERE, '../../assets/downloads');
const PACK = path.join(DL, 'logo-pack');
const pngs = JSON.parse(fs.readFileSync(path.join(HERE, 'logo-pack-src.json'), 'utf8'));

const b = await chromium.launch();
// PNGs, 2400px wide
for (const [name, svg] of Object.entries(pngs)) {
  const vb = svg.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
  const w = 2400, h = Math.round(w * vb[3] / vb[2]);
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.setContent(`<html><body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${w}" height="${h}" `)}</body></html>`);
  await p.screenshot({ path: path.join(PACK, name), omitBackground: name.includes('transparent') });
  await p.close();
}

// Brand sheet, A4 portrait, one page
const logo = fs.readFileSync(path.join(PACK, 'WithinWorks-logo.svg'), 'utf8');
const logoDark = fs.readFileSync(path.join(PACK, 'WithinWorks-logo-on-forest.svg'), 'utf8');
const C = [['Forest', '#2F3A32', 'Hero ground, deep bands'], ['Sage', '#5D6E5E', 'The mark, headings'], ['Mocha', '#B08D6F', 'The one accent'],
  ['Gold', '#E3C49C', 'Highlights on forest'], ['Light sage', '#93A894', 'The mark on dark grounds'], ['Ivory', '#FAF8F5', 'Cards, never pure white'],
  ['Paper', '#F3EEE6', 'The page ground, with grain'], ['Charcoal', '#3D3A35', 'Text, never black']];
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Jost:wght@400;500&display=swap');
@page { size: A4; margin: 0 } * { margin: 0; box-sizing: border-box }
body { width: 210mm; height: 297mm; background: #F3EEE6; font: 400 9.5pt/1.5 Jost, sans-serif; color: #3D3A35; padding: 16mm 16mm 12mm; position: relative }
h1 { font: 400 30pt/1 Fraunces, serif; color: #2F3A32 } h1 i { color: #B08D6F }
h2 { font: 500 8pt Jost; letter-spacing: .28em; text-transform: uppercase; color: #B08D6F; margin: 7mm 0 3mm }
.logos { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; margin-top: 7mm }
.logos div { height: 30mm; display: flex; align-items: center; justify-content: center; padding: 0 8mm }
.logos svg { width: 100%; height: auto; max-height: 14mm }
.sw { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm }
.sw div i { display: block; height: 14mm; border: .3mm solid rgba(0,0,0,.08) } .sw b { display: block; font-weight: 500; margin-top: 1.5mm } .sw span { font-size: 8pt; opacity: .8 }
.type { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm } .type div { background: #FAF8F5; padding: 4mm 5mm }
.f { font: 400 22pt Fraunces, serif; color: #2F3A32 } .j { font: 400 18pt Jost; color: #2F3A32 }
.rules { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm } .rules div { background: #FAF8F5; padding: 4mm 5mm }
.rules b { font: 500 8pt Jost; letter-spacing: .2em; text-transform: uppercase; color: #5D6E5E } .rules .no b { color: #B08D6F }
ul { padding-left: 4mm; margin-top: 1.5mm } li { margin: .8mm 0 }
.foot { position: absolute; left: 16mm; right: 16mm; bottom: 10mm; font-size: 8pt; opacity: .7; display: flex; justify-content: space-between }
</style></head><body>
<h1>WithinWorks <i>Leadership</i></h1><p style="margin-top:2mm">Brand sheet. Calm, direct, reflective. Restraint is the brand: when in doubt, take something out.</p>
<div class="logos"><div style="background:#FAF8F5">${logo}</div><div style="background:#2F3A32">${logoDark}</div></div>
<p style="margin-top:2mm;font-size:8.5pt">The split W: sage and mocha on light grounds, light sage and mocha on forest. Clear space on every side equals half the height of the W. Never boxed, stretched or recoloured. On posts it sits bottom left.</p>
<h2>Colour</h2><div class="sw">${C.map(([n, h, u]) => `<div><i style="background:${h}"></i><b>${n} ${h}</b><span>${u}</span></div>`).join('')}</div>
<h2>Type</h2><div class="type"><div><p class="f">Fraunces</p><p>Headlines, the wordmark, quotes. Italic for the turn of a line.</p></div><div><p class="j">Jost</p><p>Everything that is read. Small tracked capitals for labels.</p></div></div>
<h2>House style</h2><div class="rules"><div><b>Always</b><ul><li>Forest or paper grounds, serif doing the work</li><li>Real, everyday photographs and offset cards</li><li>One idea per slide, credited where it is someone else's</li><li>A quiet close: “Let’s have a conversation.”</li></ul></div>
<div class="no"><b>Never</b><ul><li>Listicles, pills, swipe arrows or infographics</li><li>Exclamation marks, superlatives, hustle</li><li>Hard sells or “book now” language</li><li>Stock clichés or decorative glows</li></ul></div></div>
<div class="foot"><span>www.withinworksleadership.com</span><span>Brand sheet, November 2026</span></div>
</body></html>`;
const p = await b.newPage();
await p.setContent(html); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
await p.pdf({ path: path.join(DL, 'WithinWorks-brand-sheet.pdf'), format: 'A4', printBackground: true });
await p.setViewportSize({ width: 794, height: 1123 }); await p.screenshot({ path: path.join(DL, 'brand-sheet-preview.jpg'), type: 'jpeg', quality: 88 });
await b.close();

// Zip the pack (SVGs and PNGs, not the build file)
const zip = path.join(DL, 'WithinWorks-logo-pack.zip');
if (fs.existsSync(zip)) fs.unlinkSync(zip);
execFileSync('zip', ['-q', '-j', zip, ...fs.readdirSync(PACK).filter(f => !f.startsWith('_')).map(f => path.join(PACK, f))]);
console.log('ok');
