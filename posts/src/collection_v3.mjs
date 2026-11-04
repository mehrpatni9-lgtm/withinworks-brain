// Round three for Collection 1: About rewritten, Megha on the How it works cover,
// the starter pack rethought, and a Turning points post. Imported by collection.mjs.
export default (C, PH, ST, W) => ({
  // About, slide 2: who she is
  'c1-1b': `<body class="grain" style="background:${C.forest};color:${C.ivory}">
    <p class="lab" style="position:absolute;left:96px;right:96px;top:92px;font-size:19px;color:${C.mocha}">ACC &middot; CPCC &middot; 100 hours of coaching</p>
    <p class="serif" style="position:absolute;left:96px;right:96px;top:150px;font-size:54px;font-weight:400;line-height:1.22">I’m an executive and transformational coach in Dubai. Before this, I spent 25 years leading people.</p>
    <div style="position:absolute;right:86px;top:420px;width:430px;background:${C.ivory};padding:16px 16px 76px;transform:rotate(2.5deg);box-shadow:0 22px 46px rgba(0,0,0,.4)">
      <img src="${PH('08')}" style="width:100%;height:470px;object-fit:cover;object-position:64% center;display:block">
      <p class="hand" style="position:absolute;left:24px;bottom:18px;font-size:38px;color:${C.charcoal}">my most loyal colleague</p></div>
    <div style="position:absolute;left:96px;top:440px;width:440px">
      ${[['Banking', 'Fourteen years, Citibank and Barclays'], ['Building', 'Co-founded an online travel company, ten people to 300'], ['Biggest inspiration', 'My father'], ['Mum of', 'Two daughters, 21 and 16'], ['Pet lover', 'Guilty, see right'], ['Passport', '45 countries, still curious'], ['Every day', 'Spirituality and mindfulness']]
        .map(([k, v]) => `<div style="border-top:1px solid rgba(250,248,245,.22);padding:15px 0 13px"><p class="lab" style="font-size:15px;color:${C.mocha}">${k}</p><p style="font-size:29px;font-weight:300;margin-top:6px;line-height:1.25">${v}</p></div>`).join('')}</div>
    ${W(true)}</body>`,

  // About, slide 3: why coaching, and what it did for her
  'c1-1c': `<body class="grain" style="background:${C.paper}">
    <div style="position:absolute;inset:90px;border:1.5px solid rgba(61,58,53,.35)"></div>
    <p class="lab" style="position:absolute;left:150px;top:170px;color:${C.mocha}">[ Why coaching ]</p>
    <p class="serif" style="position:absolute;left:150px;right:150px;top:290px;font-weight:400;font-size:48px;line-height:1.36">Coaching started for me as a tool for my own growth.</p>
    <p class="serif" style="position:absolute;left:150px;right:150px;top:470px;font-style:italic;font-weight:400;font-size:48px;line-height:1.36;color:${C.forest}">It gave me answers that were within me all along. All this while, I had been looking for them outside, in situations and in people.</p>
    <p class="serif" style="position:absolute;left:150px;right:150px;top:800px;font-weight:400;font-size:48px;line-height:1.36">That is the power of it, and why I do this work now.</p>
    ${W()}</body>`,

  // How coaching works, cover: with Megha
  'c1-11a': `<body class="grain" style="background:${C.mocha}">
    <p class="lab" style="position:absolute;left:0;right:0;top:90px;text-align:center;color:${C.ivory};font-size:19px">Working together</p>
    <div style="position:absolute;left:100px;right:100px;top:170px;background:${C.ivory};padding:22px 22px 70px">
      <img src="${PH('07')}" style="width:100%;height:560px;object-fit:cover;object-position:58% 35%;display:block">
      <p class="serif" style="font-size:84px;font-weight:400;line-height:1.08;color:${C.forest};padding:52px 40px 0">How coaching with me works</p>
      <p style="font-size:36px;font-weight:300;line-height:1.45;padding:22px 40px 0">Three questions people ask before we begin.</p></div>
    ${W()}</body>`,

  // The new role starter pack, rethought: the missing piece is the coaching point
  'c1-13': `<body class="grain" style="background:#F4F0E8">
    <p class="serif" style="position:absolute;left:0;right:0;top:80px;text-align:center;font-style:italic;font-weight:400;font-size:92px;color:${C.charcoal}">The new role</p>
    <p class="serif" style="position:absolute;left:0;right:0;top:190px;text-align:center;font-weight:400;font-size:44px;color:${C.charcoal}">starter pack</p>
    ${[['cup', 'Coffee with everyone, week one', 110, 300, -3], ['calendar', 'A calendar that’s no longer yours', 590, 320, 2.5], ['glasses', 'Reading every email twice', 110, 720, 2]]
      .map(([img, t, x, y, r]) => `<div style="position:absolute;left:${x}px;top:${y}px;width:370px;transform:rotate(${r}deg)">
        <div style="background:#fff;padding:12px;border-radius:14px;box-shadow:0 10px 24px rgba(60,50,40,.18)"><img src="${ST(img)}" style="width:100%;height:250px;object-fit:cover;border-radius:6px;display:block"></div>
        <p class="hand" style="font-size:40px;line-height:1.05;margin-top:12px;color:${C.charcoal};text-align:center">${t}</p></div>`).join('')}
    <div style="position:absolute;left:590px;top:740px;width:370px;transform:rotate(-1.5deg)">
      <div style="height:274px;border:3px dashed ${C.sage};border-radius:14px;display:flex;align-items:center;justify-content:center;padding:26px;text-align:center">
        <p class="serif" style="font-size:34px;font-style:italic;font-weight:400;line-height:1.25;color:${C.forest}">Time to ask who you want to be in this role</p></div>
      <p class="hand" style="font-size:40px;margin-top:12px;color:${C.sage};text-align:center">Not included</p></div>
    ${W()}</body>`,

  // Turning points 01 · real photo
  'c1-16': `<body style="background:#151a22">
    <img src="${ST('lounge')}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 65%">
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(14,16,22,.82) 0%,rgba(14,16,22,.55) 34%,rgba(14,16,22,0) 58%)"></div>
    <p class="lab" style="position:absolute;left:90px;top:110px;color:${C.mocha};font-size:20px">Turning points &middot; 01</p>
    <p class="serif" style="position:absolute;left:90px;right:110px;top:190px;color:${C.ivory};font-weight:400;font-size:62px;line-height:1.22">A new country changes everything around you. Then, quietly, it asks who you are here.</p>
    ${W(true)}</body>`,
});
