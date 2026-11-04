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
    return ls.get('who3') || 'Megha';
  }
  function setWho(name) { ls.set('who3', name); }

  // Entries sent from this browser, shown at once while the sheet catches up.
  function pending() { return ls.get('pending') || []; }

  async function send(kind, item, text) {
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

  async function feed() {
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
    return rows.concat(fresh).sort((a, b) => a.time.localeCompare(b.time));
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
