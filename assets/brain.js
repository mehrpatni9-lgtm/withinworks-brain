// Shared by the Brain pages: who is viewing, sending to the feed, and reading it back.
// Submissions go to a Google Form; a sync on Mehr's Mac copies them into a public sheet every 2 minutes.
const BRAIN = (() => {
  const FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSdfxZI3qGRSJ1joR2pl1VKlteFtpU3ob5d1lTukNKt2hpPS9A/formResponse';
  const ENTRY = { item: 'entry.1308432967', kind: 'entry.829302562', text: 'entry.1336080496', from: 'entry.542877254' };
  const FEED = 'https://docs.google.com/spreadsheets/d/1wzbF13f555KayH6-oYAOF6IlpRB6KeBfGqRpKkQ5hwE/gviz/tq?tqx=out:csv&sheet=Feed';
  const PEOPLE = ['Megha', 'Mehr', 'Sahil'];

  const ls = {
    get(k) { try { return JSON.parse(localStorage.getItem('ww-' + k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem('ww-' + k, JSON.stringify(v)); } catch (e) {} }
  };

  function who() {
    const q = new URLSearchParams(location.search).get('from');
    // Everyone is Megha by default. Mehr's own browser was marked once with ?from=Mehr.
    if (q && PEOPLE.includes(q)) ls.set('who3', q);
    if (DEMO && !q) return 'Mehr';
    return ls.get('who3') || 'Megha';
  }
  function setWho(name) { ls.set('who3', name); }

  // Entries sent from this browser, shown at once while the sheet catches up.
  function pending() { return ls.get('pending') || []; }

  async function send(kind, item, text) {
    if (DEMO) { const p = pending(); p.push({ time: new Date().toISOString(), from: who(), kind, item, text: text || '', demo: 1 }); ls.set('pending', p.slice(-50)); return; }
    const body = new URLSearchParams();
    body.append(ENTRY.item, item);
    body.append(ENTRY.kind, kind);
    body.append(ENTRY.text, text || '');
    body.append(ENTRY.from, who());
    await fetch(FORM, { method: 'POST', mode: 'no-cors', body });
    const p = pending();
    p.push({ time: new Date().toISOString(), from: who(), kind, item, text: text || '' });
    ls.set('pending', p.slice(-50));
  }

  function parseCSV(s) {
    const rows = []; let row = [], cur = '', q = false;
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (q) { if (c === '"' && s[i + 1] === '"') { cur += '"'; i++; } else if (c === '"') q = false; else cur += c; }
      else if (c === '"') q = true;
      else if (c === ',') { row.push(cur); cur = ''; }
      else if (c === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; }
      else if (c !== '\r') cur += c;
    }
    if (cur || row.length) { row.push(cur); rows.push(row); }
    return rows;
  }

  // ?demo=1 shows sample edits from Megha and sends nothing, for previewing how feedback looks.
  const DEMO = new URLSearchParams(location.search).has('demo');
  const DEMO_ROWS = [
    { time: '2026-11-04T09:00:00Z', from: 'Megha', kind: 'Suggestion', item: 'c1-1 | About Megha', text: JSON.stringify({ text: 'Hello, I’m Megha. A little of who I am, and why coaching means so much to me. Welcome, I’m so glad you’re here.' }) },
    { time: '2026-11-04T09:02:00Z', from: 'Megha', kind: 'Approved', item: 'c1-2 | Words in the world', text: '' },
    { time: '2026-11-04T09:04:00Z', from: 'Megha', kind: 'Comment', item: 'c1-5 | Coaching, plainly', text: 'Could slide 2 feel a little warmer? Maybe a softer colour behind Coaching.' },
    { time: '2026-11-04T09:06:00Z', from: 'Megha', kind: 'Suggestion', item: 'c1-3 | The Within Question', text: JSON.stringify({ text: 'One question a week to sit with. You don’t need to answer it here. Just notice what comes up.' }) },
    { time: '2026-11-04T09:20:00Z', from: 'Mehr', kind: 'Accepted', item: 'c1-3 | The Within Question', text: '2026-11-04T09:06:00Z' },
  ];
  async function feed() {
    if (DEMO) return DEMO_ROWS.concat(pending().filter(p => p.demo));
    let rows = [];
    try {
      const res = await fetch(FEED + '&t=' + Date.now());
      rows = parseCSV(await res.text()).slice(1).filter(r => r[0])
        .map(([time, from, kind, item, text]) => ({ time, from, kind, item, text }));
    } catch (e) {}
    // Keep local entries the sheet has not picked up yet.
    const seen = new Set(rows.map(r => r.kind + r.item + r.text));
    const fresh = pending().filter(p => !seen.has(p.kind + p.item + p.text) && Date.now() - new Date(p.time) < 864e5);
    ls.set('pending', fresh);
    return expandVoice(rows.concat(fresh)).sort((a, b) => a.time.localeCompare(b.time));
  }

  // Voice feedback arrives as one entry from Megha's assistant, one line per post:
  //   03 | approve        01 | caption | new caption text        05 | note | comment
  // Each line becomes a normal approval, caption suggestion or comment on that post.
  function expandVoice(list) {
    const map = window.POSTMAP || {}, out = [];
    list.forEach(e => {
      if (e.kind !== 'Voice') return out.push(e);
      e.text.split(/\n+/).forEach((line, i) => {
        const [code, what, ...rest] = line.split('|').map(x => x.trim());
        if ((code || '').toLowerCase() === 'all' && /approve/i.test(what || '')) { Object.keys(map).filter(k => /^\d+$/.test(k)).forEach((k, j) => out.push({ time: new Date(new Date(e.time).getTime() + i * 50 + j + 1).toISOString(), from: e.from, kind: 'Approved', item: map[k] + ' | voice', text: '' })); return; }
        if ((code || '').toLowerCase() === 'idea' && what) return out.push({ time: new Date(new Date(e.time).getTime() + i + 1).toISOString(), from: e.from, kind: 'Idea', item: '', text: [what, ...rest].join(' | ') });
        const id = map[(code || '').toUpperCase().replace(/^(\d)$/, '0$1')] || map[code];
        if (!id || !what) return;
        const body = rest.join(' | '), t = new Date(new Date(e.time).getTime() + i + 1).toISOString(), item = id + ' | voice';
        const w = what.toLowerCase();
        if (w.startsWith('approve')) out.push({ time: t, from: e.from, kind: 'Approved', item, text: '' });
        else if (w.startsWith('caption')) out.push({ time: t, from: e.from, kind: 'Suggestion', item, text: JSON.stringify({ text: body.replace(/\\n/g, '\n') }) });
        else out.push({ time: t, from: e.from, kind: 'Comment', item, text: body || what });
      });
    });
    return out;
  }

  // Latest decision per calendar item id ("m1-3 | ...").
  function statusMap(entries) {
    const m = {};
    entries.filter(e => e.kind === 'Approved' || e.kind === 'Comment' || e.kind === 'Suggestion')
      .forEach(e => { const id = e.item.split(' | ')[0]; m[id] = e.kind === 'Approved' ? 'approved' : (m[id] === 'approved' ? 'approved' : 'comment'); });
    return m;
  }

  function ago(t) {
    const s = (Date.now() - new Date(t)) / 1000;
    if (s < 90) return 'just now';
    if (s < 3600) return Math.round(s / 60) + ' min ago';
    if (s < 86400) return Math.round(s / 3600) + ' h ago';
    return new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  }

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function picker(el, onChange) {
    const draw = () => {
      el.innerHTML = 'You are ' + PEOPLE.map(p => `<button class="who${p === who() ? ' on' : ''}" data-p="${p}">${p}</button>`).join('');
    };
    el.addEventListener('click', e => { if (e.target.dataset.p) { setWho(e.target.dataset.p); draw(); onChange && onChange(); } });
    draw();
  }

  return { who, send, feed, statusMap, ago, esc, picker };
})();
