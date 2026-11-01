# Feed style v1: photo posts full bleed, text posts in Jost on soft washes, Fraunces only for The Within Question.
import pathlib
HEAD = '''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<style>*{box-sizing:border-box;margin:0}body{width:1080px;height:1350px;overflow:hidden;font-family:Jost,sans-serif;font-weight:300;position:relative}
.t{position:absolute;left:100px;right:100px}.lab{font:400 30px Jost;letter-spacing:.04em}
</style></head><body>'''
S = {}
# 1. photo, one quiet line
S['f1-1'] = '''<img src="about.jpg" style="position:absolute;inset:0;width:1080px;height:1350px;object-fit:cover;object-position:center 38%">
<div class="t" style="top:84px;left:150px;color:#3d3a35"><div style="font:300 76px/1.15 Jost">Hi, I&rsquo;m Megha.</div>
<div style="font:300 36px/1.4 Jost;margin-top:14px;color:#5c574f">This is why I decided<br>to become a coach.</div></div>'''
# 2. carousel on sage wash
bg2 = 'background:#e7ece6;color:#2f3a32'
S['f2-1'] = f'''<div style="position:absolute;inset:0;{bg2}"></div>
<div class="t" style="top:120px"><div class="lab" style="color:#5d6e5e">1 / 3</div></div>
<div class="t" style="bottom:200px"><div style="font:400 120px/1.05 Jost;letter-spacing:-.02em">What is<br>coaching?</div>
<div style="font:300 54px/1.3 Jost;margin-top:34px;color:#5d6e5e">And why does it matter?</div></div>'''
S['f2-2'] = f'''<div style="position:absolute;inset:0;{bg2}"></div>
<div class="t" style="top:120px"><div class="lab" style="color:#5d6e5e">2 / 3 &nbsp;&middot;&nbsp; What it is</div></div>
<div class="t" style="top:330px;font:300 66px/1.3 Jost">A conversation where you do most of the thinking.<br><br>I ask the questions. The answers were yours all along.</div>'''
S['f2-3'] = f'''<div style="position:absolute;inset:0;{bg2}"></div>
<div class="t" style="top:120px"><div class="lab" style="color:#5d6e5e">3 / 3 &nbsp;&middot;&nbsp; Why it matters</div></div>
<div class="t" style="top:330px;font:300 66px/1.3 Jost">Advice solves one problem.<br><br>Seeing your own patterns changes how you meet every problem after it.</div>
<div class="t" style="bottom:110px;font:400 28px Jost;letter-spacing:.2em;color:#5d6e5e">WITHINWORKS</div>'''
# 3. The Within Question
S['f3-1'] = '''<div style="position:absolute;inset:0;background:#2f3a32"></div>
<div class="t" style="top:120px;font:400 30px Jost;letter-spacing:.04em;color:#c9a685">The Within Question &middot; 01</div>
<div class="t" style="top:430px;font:italic 400 96px/1.18 Fraunces;color:#f2ede6">Where are you still leading from an old story about yourself?</div>'''
for k, v in S.items():
    pathlib.Path(f'{k}.html').write_text(HEAD + v + '</body></html>')
