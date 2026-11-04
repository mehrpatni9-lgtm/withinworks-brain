// Replacement and new slides for Collection 1. Imported by collection.mjs.
export default (C, PH, ST, W) => ({
  // 01 · About Megha, slide 2: the person, warm and true
  'c1-1b': `<body class="grain" style="background:${C.forest};color:${C.ivory}">
    <div style="position:absolute;left:96px;top:120px;width:560px;background:${C.ivory};padding:20px 20px 96px;transform:rotate(-2deg);box-shadow:0 22px 46px rgba(0,0,0,.4)">
      <img src="${PH('08')}" style="width:100%;height:600px;object-fit:cover;object-position:62% center;display:block">
      <p class="hand" style="position:absolute;left:30px;bottom:24px;font-size:44px;color:${C.charcoal}">my most loyal colleague</p></div>
    <div style="position:absolute;left:96px;right:96px;top:900px">
      <p class="serif" style="font-size:44px;font-weight:400;line-height:1.38">Before the titles, I’m a mother of two girls, 21 and 16. Forty-five countries, and still curious about the next one. Yoga and meditation keep me steady.</p></div>
    ${W(true)}</body>`,

  // 01 · About Megha, slide 3: why, with feeling
  'c1-1c': `<body class="grain" style="background:${C.paper}">
    <div style="position:absolute;inset:90px;border:1.5px solid rgba(61,58,53,.35)"></div>
    <p class="lab" style="position:absolute;left:150px;top:170px;color:${C.mocha}">[ Why coaching ]</p>
    <p class="serif" style="position:absolute;left:150px;right:150px;top:300px;font-weight:400;font-size:50px;line-height:1.36">For 25 years I led people. The moments I remember aren’t the milestones.</p>
    <p class="serif" style="position:absolute;left:150px;right:150px;top:560px;font-style:italic;font-weight:400;font-size:50px;line-height:1.36;color:${C.forest}">They’re the quiet conversations, when someone capable admitted they weren’t sure anymore.</p>
    <p class="serif" style="position:absolute;left:150px;right:150px;top:880px;font-weight:400;font-size:50px;line-height:1.36">Coaching lets me have more of those.</p>
    ${W()}</body>`,

  // 07 · What happens in the pause · single · teaching graphic
  'c1-6': `<body class="grain" style="background:#F6F1EA">
    <p class="lab" style="position:absolute;left:100px;top:110px;color:${C.mocha}">Inside a coaching session</p>
    <p class="serif" style="position:absolute;left:100px;right:100px;top:190px;font-weight:400;font-size:84px;line-height:1.1">What happens in the pause</p>
    <div style="position:absolute;left:180px;top:470px;height:640px;border-left:2px solid ${C.sage}"></div>
    ${[['Notice', 'what you feel, before you react to it.'], ['Get curious', 'about what sits underneath it.'], ['Choose', 'your response, not your reflex.']]
      .map(([h, t], i) => `<div style="position:absolute;left:156px;top:${450 + i * 300}px;display:flex;gap:44px;align-items:flex-start">
        <span style="width:50px;height:50px;border-radius:50%;flex:none;background:${i === 2 ? C.forest : '#F6F1EA'};border:2px solid ${i === 2 ? C.forest : C.sage}"></span>
        <div><p class="serif" style="font-size:58px;font-weight:400;color:${C.forest};line-height:1">${h}</p>
        <p style="font-size:36px;font-weight:300;line-height:1.4;margin-top:16px;max-width:620px">${t}</p></div></div>`).join('')}
    ${W()}</body>`,

  // 05 · A book on my table · a real photo, left alone
  'c1-8a': `<body style="background:#eee">
    <img src="${ST('book2')}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:46% center">
    <p class="lab" style="position:absolute;left:84px;top:96px;font-size:19px;color:${C.charcoal}">On my reading table</p>
    <p class="serif" style="position:absolute;left:84px;bottom:150px;font-size:46px;font-weight:400;color:${C.charcoal}">Time to Think <span style="font-weight:300;font-size:32px">&middot; Nancy Kline</span></p>
    ${W()}</body>`,

  // 11 · How coaching with me works · carousel 3 · cream cards on one colour field
  'c1-11a': `<body class="grain" style="background:${C.mocha}">
    <p class="lab" style="position:absolute;left:0;right:0;top:110px;text-align:center;color:${C.ivory};font-size:19px">Working together</p>
    <div style="position:absolute;left:100px;right:100px;top:50%;transform:translateY(-50%);background:${C.ivory};padding:110px 84px">
      <p class="serif" style="font-size:96px;font-weight:400;line-height:1.08;color:${C.forest}">How coaching with me works</p>
      <p style="font-size:42px;font-weight:300;line-height:1.45;margin-top:44px">Three questions people ask before we begin.</p></div>
    ${W()}</body>`,
  'c1-11b': `<body class="grain" style="background:${C.mocha}">
    <div style="position:absolute;left:90px;right:90px;top:50%;transform:translateY(-50%);background:${C.ivory};padding:90px 80px">
      <p class="serif" style="font-size:58px;font-weight:500;color:${C.forest}">Where do we start?</p>
      <p style="font-size:42px;font-weight:300;line-height:1.48;margin-top:24px">With a complimentary 45-minute call, to explore what is possible for you and whether we are the right fit.</p>
      <p class="serif" style="font-size:58px;font-weight:500;color:${C.forest};margin-top:64px">How long does it take?</p>
      <p style="font-size:42px;font-weight:300;line-height:1.48;margin-top:24px">Six 60-minute sessions, ideally every two weeks, in person, online or both.</p></div>
    ${W()}</body>`,
  'c1-11c': `<body class="grain" style="background:${C.mocha}">
    <div style="position:absolute;left:90px;right:90px;top:50%;transform:translateY(-50%);background:${C.ivory};padding:90px 80px">
      <p class="serif" style="font-size:58px;font-weight:500;color:${C.forest}">What do I bring?</p>
      <p style="font-size:42px;font-weight:300;line-height:1.48;margin-top:24px">Courage, honesty and something real you want to change. Some weeks you will stumble and begin again. That is part of the process.</p>
      <p class="serif" style="font-size:58px;font-weight:500;color:${C.forest};margin-top:64px">Is it confidential?</p>
      <p style="font-size:42px;font-weight:300;line-height:1.48;margin-top:24px">Always. What you share stays between us.</p></div>
    ${W()}</body>`,

  // 12 · Three people in the room · carousel 2 · diagram
  'c1-12a': `<body class="grain" style="background:${C.wash}">
    <p class="lab" style="position:absolute;left:100px;top:110px;color:${C.forest}">When your company pays for coaching</p>
    <p class="serif" style="position:absolute;left:100px;right:100px;top:180px;font-weight:400;font-size:80px;line-height:1.1">There are three people in the room.</p>
    <svg style="position:absolute;left:0;top:470px" width="1080" height="700"><line x1="540" y1="130" x2="260" y2="560" stroke="${C.sage}" stroke-width="2"/><line x1="540" y1="130" x2="820" y2="560" stroke="${C.sage}" stroke-width="2"/><line x1="260" y1="560" x2="820" y2="560" stroke="${C.sage}" stroke-width="2" stroke-dasharray="8 10"/></svg>
    ${[['You', 'the client', 540, 600, C.forest, C.ivory], ['Your company', 'the sponsor', 260, 1030, '#fff', C.charcoal], ['Me', 'the coach', 820, 1030, '#fff', C.charcoal]]
      .map(([h, t, x, y, bg, fg]) => `<div style="position:absolute;left:${x - 125}px;top:${y - 125}px;width:250px;height:250px;border-radius:50%;background:${bg};color:${fg};border:2px solid ${C.forest};display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">
        <p class="serif" style="font-size:44px;line-height:1.05">${h}</p><p class="lab" style="font-size:15px;margin-top:10px;opacity:.75">${t}</p></div>`).join('')}
    ${W()}</body>`,
  'c1-12b': `<body class="grain" style="background:${C.wash}">
    ${[['Your company', 'shares why it’s investing, and agrees the goals with us at the start.'], ['You', 'set the agenda in every session. It’s your coaching.'], ['Me', 'I keep what you say confidential. The sponsor hears progress, never the conversation.']]
      .map(([h, t], i) => `<div style="position:absolute;left:100px;right:100px;top:${190 + i * 360}px;border-top:1.5px solid rgba(47,58,50,.35);padding-top:34px">
        <p class="lab" style="font-size:19px;color:${C.forest}">${h}</p>
        <p class="serif" style="font-size:52px;font-weight:400;line-height:1.25;margin-top:18px">${t}</p></div>`).join('')}
    ${W()}</body>`,

  // 13 · The new role starter pack · single · objects on paper
  'c1-13': `<body class="grain" style="background:#F4F0E8">
    <p class="serif" style="position:absolute;left:0;right:0;top:90px;text-align:center;font-style:italic;font-weight:400;font-size:96px;color:${C.charcoal}">The new role</p>
    <p class="serif" style="position:absolute;left:0;right:0;top:205px;text-align:center;font-weight:400;font-size:46px;color:${C.charcoal}">starter pack</p>
    ${[['cup', 'Coffee with everyone, week one', 120, 330, -3], ['calendar', 'A calendar that’s no longer yours', 580, 360, 2.5], ['notepad', 'A notebook full of questions', 130, 780, 2], ['glasses', 'Reading everything twice', 590, 800, -2]]
      .map(([img, t, x, y, r]) => `<div style="position:absolute;left:${x}px;top:${y}px;width:380px;transform:rotate(${r}deg)">
        <div style="background:#fff;padding:12px;border-radius:14px;box-shadow:0 10px 24px rgba(60,50,40,.18)"><img src="${ST(img)}" style="width:100%;height:270px;object-fit:cover;border-radius:6px;display:block"></div>
        <p class="hand" style="font-size:42px;line-height:1.05;margin-top:14px;color:${C.charcoal};text-align:center">${t}</p></div>`).join('')}
    ${W()}</body>`,

  // 14 · The Within Question 02 · single · two posters on a real wall
  'c1-14': `<body style="background:${C.forest}">
    <img src="${ST('ivy')}" style="position:absolute;left:-110px;top:-80px;width:1300px">
    ${[['What decision are you waiting for permission to make?', 174, 270, 208, 310, 34], ['Whose permission?', 732, 270, 218, 318, 46]]
      .map(([t, x, y, w, h, fs]) => `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;display:flex;align-items:center;justify-content:center;padding:18px;text-align:center"><p class="serif" style="font-style:italic;font-weight:400;font-size:${fs}px;line-height:1.2;color:${C.forest}">${t}</p></div>`).join('')}
    <div style="position:absolute;left:0;right:0;top:1209px;bottom:0;background:${C.forest}"></div>
    <p class="lab" style="position:absolute;right:70px;bottom:62px;color:${C.mocha};font-size:19px">The Within Question &middot; 02</p>
    ${W(true)}</body>`,

  // 15 · Inside a session · carousel 2 · real photo then card
  'c1-15a': `<body style="background:#222">
    <img src="${ST('chairs')}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center center">
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(25,22,18,.7) 0%,rgba(25,22,18,.2) 34%,rgba(25,22,18,0) 50%)"></div>
    <p class="serif" style="position:absolute;left:90px;right:110px;top:120px;color:${C.ivory};font-weight:400;font-size:62px;line-height:1.22">Two chairs. One hour. Nowhere else to be.</p>
    ${W(true)}</body>`,
  'c1-15b': `<body class="grain" style="background:${C.paper}">
    <p class="lab" style="position:absolute;left:100px;top:120px;color:${C.mocha}">What that hour is like</p>
    <p class="serif" style="position:absolute;left:100px;right:100px;top:300px;font-weight:400;font-size:54px;line-height:1.38">You bring something real. A decision, a relationship at work, a feeling you can’t name yet.</p>
    <p class="serif" style="position:absolute;left:100px;right:100px;top:640px;font-weight:400;font-size:54px;line-height:1.38">I listen, and I ask. Most of the thinking is yours.</p>
    <p class="serif" style="position:absolute;left:100px;right:100px;top:900px;font-style:italic;font-weight:400;font-size:54px;line-height:1.38;color:${C.forest}">You leave with your own next step, and the reasons it’s yours.</p>
    ${W()}</body>`,
});
