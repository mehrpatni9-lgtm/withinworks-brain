import pathlib
HEAD = '''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}
body{width:1080px;height:1350px;overflow:hidden;background:#faf8f5;color:#3d3a35;font-family:Jost,sans-serif;font-weight:300;position:relative}
.pad{position:absolute;inset:0;padding:96px}
.eb{font:500 26px/1 Jost;letter-spacing:.24em;text-transform:uppercase;color:#8d6c50}
h1{font:500 132px/1.02 Fraunces;color:#2f3a32;letter-spacing:-.01em}
h1 em,h2 em{font-style:italic;color:#5d6e5e}
h2{font:500 88px/1.08 Fraunces;color:#2f3a32}
.foot{position:absolute;left:96px;right:96px;bottom:72px;display:flex;justify-content:space-between;align-items:center;font:400 22px Jost;letter-spacing:.22em;text-transform:uppercase;color:#7d766a}
.foot .b{display:flex;align-items:center;gap:16px}
.dark{background:#2f3a32;color:#eae7e0}
.dark .foot{color:#b9c0b7}
</style></head><body>'''
MARK = lambda c='#5d6e5e': f'<svg width="44" height="40" viewBox="0 0 120 110"><defs><clipPath id="a"><rect width="58" height="110"/></clipPath><clipPath id="b"><rect x="58" width="62" height="110"/></clipPath></defs><text x="4" y="88" font-family="Fraunces" font-size="104" font-weight="600" fill="{c}" clip-path="url(#a)">W</text><text x="4" y="88" font-family="Fraunces" font-size="104" font-weight="600" fill="#b08d6f" clip-path="url(#b)">W</text></svg>'
def foot(n, c='#5d6e5e'): return f'<div class="foot"><span class="b">{MARK(c)}WithinWorks Leadership</span><span>{n}</span></div>'
S = {}
S['p1-1'] = f'''<img src="online.jpg" style="position:absolute;top:0;left:0;width:1080px;height:860px;object-fit:cover;object-position:center 18%">
<div style="position:absolute;top:860px;left:0;right:0;bottom:0;padding:70px 96px">
<p class="eb">Megha Bhalla</p><h1 style="margin-top:26px">Three <em>chairs.</em></h1></div>{foot('1 / 3')}'''
row = lambda n, t, s: f'<div style="display:grid;grid-template-columns:250px 1fr;gap:30px;padding:46px 0;border-top:2px solid rgba(61,58,53,.13)"><div style="font:500 112px/1 Fraunces;color:#5d6e5e">{n}</div><div><div style="font:300 46px/1.3 Jost;color:#2f3a32">{t}</div><div style="font:400 28px Jost;color:#8d6c50;margin-top:14px;letter-spacing:.04em">{s}</div></div></div>'
S['p1-2'] = f'''<div class="pad" style="padding-top:190px">
{row('14', 'years across from people and their money', 'Citibank &middot; Barclays')}
{row('13', 'years across from people and their careers', 'Traveazy Group &middot; Chief People Officer')}
{row('<em style="font-style:italic">Now</em>', 'across from people and themselves', 'Executive coach &middot; CPCC')}
</div>{foot('2 / 3')}'''
S['p1-3'] = f'''<div class="pad" style="display:flex;flex-direction:column;justify-content:center;padding-bottom:200px">
<p class="eb" style="color:#b08d6f">The third chair</p>
<h2 style="color:#eae7e0;margin-top:40px;font-size:84px">The first two taught me how much leaders carry and never say.</h2>
<h2 style="color:#adbcae;font-style:italic;margin-top:44px;font-size:84px">The third is where they finally can.</h2>
</div>{foot('3 / 3', '#adbcae')}'''
S['p2-1'] = f'''<div class="pad" style="display:flex;flex-direction:column;justify-content:space-between;padding:110px 96px 200px">
<div style="display:flex;justify-content:space-between;align-items:baseline"><p class="eb" style="color:#b08d6f">The Within Question</p><span style="font:italic 400 44px Fraunces;color:#b9c0b7">No. 01</span></div>
<h2 style="color:#eae7e0;font-style:italic;font-weight:400;font-size:104px;line-height:1.12">What would you stop doing if no one were keeping score?</h2>
<p style="font:300 32px Jost;color:#b9c0b7">Sit with it this week.</p>
</div>{foot('withinworks', '#adbcae').replace('<span>withinworks</span>','<span></span>')}'''
S['p3-1'] = f'''<div class="pad" style="display:flex;flex-direction:column;justify-content:center;padding-bottom:220px">
<p class="eb">Inside the room</p>
<h1 style="margin-top:36px;font-size:120px">What happens in a first <em>conversation</em></h1>
<p style="font:300 44px/1.4 Jost;color:#5c574f;margin-top:48px">45 minutes. Free.<br>Nothing to prepare.</p>
</div>{foot('1 / 3')}'''
st = lambda n, t: f'<div style="display:grid;grid-template-columns:150px 1fr;gap:20px;padding:54px 0;border-top:2px solid rgba(61,58,53,.13)"><div style="font:400 30px Jost;letter-spacing:.2em;color:#8d6c50;padding-top:16px">{n}</div><div style="font:500 62px/1.2 Fraunces;color:#2f3a32">{t}</div></div>'
S['p3-2'] = f'''<div class="pad" style="padding-top:200px">
{st('01', 'You talk about where you are.')}
{st('02', 'I listen, and ask a few <em style="color:#5d6e5e">questions.</em>')}
{st('03', 'We both see if this feels like the right partnership.')}
</div>{foot('2 / 3')}'''
S['p3-3'] = f'''<img src="hero.jpg" style="position:absolute;top:0;left:0;width:1080px;height:900px;object-fit:cover;object-position:center 42%">
<div style="position:absolute;top:900px;left:0;right:0;padding:70px 96px">
<h2 style="font-size:84px">Begin with a <em>conversation.</em></h2>
<p style="font:300 36px Jost;color:#5c574f;margin-top:22px">The link is in my bio.</p></div>{foot('3 / 3')}'''
for k, v in S.items():
    dark = k in ('p1-3', 'p2-1')
    pathlib.Path(f'{k}.html').write_text(HEAD.replace('<body>', '<body class="dark">' if dark else '<body>') + v + '</body></html>')
