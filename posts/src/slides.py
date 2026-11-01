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
S['p1-1'] = f"""<img src="online.jpg" style="position:absolute;top:0;left:0;width:1080px;height:860px;object-fit:cover;object-position:center 18%">
<div style="position:absolute;top:860px;left:0;right:0;bottom:0;padding:64px 96px">
<p class="eb">Hi, I&rsquo;m Megha</p><h1 style="margin-top:24px;font-size:104px">Been there. <em>Learnt from it.</em></h1></div>{foot('1 / 3')}"""
row = lambda n, t: f'<div style="padding:48px 0;border-top:2px solid rgba(61,58,53,.13)"><div style="font:500 28px Jost;letter-spacing:.2em;text-transform:uppercase;color:#8d6c50">{n}</div><div style="font:500 58px/1.22 Fraunces;color:#2f3a32;margin-top:18px">{t}</div></div>'
S['p1-2'] = f"""<div class="pad" style="padding-top:150px">
{row('Banking', 'My career began in wealth management at Citibank and Barclays.')}
{row('Traveazy Group', 'I helped grow a business from an idea to more than 300 people.')}
{row('Now', 'Certified Co-Active Coach, <em style="color:#5d6e5e">CPCC.</em>')}
</div>{foot('2 / 3')}"""
S['p1-3'] = f"""<div class="pad" style="display:flex;flex-direction:column;justify-content:center;padding-bottom:200px">
<h2 style="color:#eae7e0;font-size:92px;font-weight:400;font-style:italic;line-height:1.15">Sometimes, we simply need the space to explore our thoughts and find our own answers.</h2>
</div>{foot('3 / 3', '#adbcae')}"""
S['p2-1'] = f"""<div class="pad" style="display:flex;flex-direction:column;justify-content:space-between;padding:110px 96px 200px">
<div style="display:flex;justify-content:space-between;align-items:baseline"><p class="eb" style="color:#b08d6f">The Within Question</p><span style="font:italic 400 44px Fraunces;color:#b9c0b7">No. 01</span></div>
<h2 style="color:#eae7e0;font-style:italic;font-weight:400;font-size:92px;line-height:1.14">What am I believing right now that&rsquo;s shaping what I think I should do next?</h2>
<p style="font:300 32px Jost;color:#b9c0b7">One question a week to sit with.</p>
</div>{foot('', '#adbcae')}"""
S['p3-1'] = f"""<div class="pad" style="display:flex;flex-direction:column;justify-content:center;padding-bottom:220px">
<p class="eb">Discovery call</p>
<h1 style="margin-top:36px;font-size:112px">Every engagement starts with a <em>conversation.</em></h1>
<p style="font:300 44px/1.4 Jost;color:#5c574f;margin-top:48px">Complimentary &middot; 45 minutes</p>
</div>{foot('1 / 3')}"""
S['p3-2'] = f"""<div class="pad" style="display:flex;flex-direction:column;justify-content:center;padding-bottom:200px">
<h2 style="font-size:96px;line-height:1.15">What&rsquo;s possible for you, and whether this feels like the right <em>partnership.</em></h2>
</div>{foot('2 / 3')}"""
S['p3-3'] = f"""<img src="hero.jpg" style="position:absolute;top:0;left:0;width:1080px;height:900px;object-fit:cover;object-position:center 42%">
<div style="position:absolute;top:900px;left:0;right:0;padding:70px 96px">
<h2 style="font-size:84px">Book a discovery <em>call.</em></h2>
<p style="font:300 36px Jost;color:#5c574f;margin-top:22px">Link in bio</p></div>{foot('3 / 3')}"""
for k, v in S.items():
    dark = k in ('p1-3', 'p2-1')
    pathlib.Path(f'{k}.html').write_text(HEAD.replace('<body>', '<body class="dark">' if dark else '<body>') + v + '</body></html>')
