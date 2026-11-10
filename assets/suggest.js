// Suggesting mode for captions, like tracked changes in Word.
// Megha suggests a new caption; it shows inline as deletions and insertions.
// Her edits apply directly (Mehr, 7 Nov: no red and green). The applied caption is what the copy icon copies.
const SUGGEST = (() => {
  const idOf = e => e.item.split(' | ')[0];
  const parse = t => { try { return JSON.parse(t); } catch (e) { return { text: t }; } };

  // Word-level diff (longest common subsequence), returns [['=', w] | ['-', w] | ['+', w]].
  function diff(a, b) {
    const A = a.split(/(\s+)/), B = b.split(/(\s+)/), n = A.length, m = B.length;
    const L = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = A[i] === B[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    const out = []; let i = 0, j = 0;
    while (i < n && j < m) { if (A[i] === B[j]) { out.push(['=', A[i]]); i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) out.push(['-', A[i++]]); else out.push(['+', B[j++]]); }
    while (i < n) out.push(['-', A[i++]]); while (j < m) out.push(['+', B[j++]]);
    return out;
  }
  const show = parts => parts.map(([k, w]) => k === '=' ? BRAIN.esc(w) : k === '-' ? `<del>${BRAIN.esc(w)}</del>` : `<ins>${BRAIN.esc(w)}</ins>`).join('');

  function capEl(article) { return article.querySelector('.ig-cap, .li-text'); }
  function prefix(article) { return article.querySelector('.ig-cap') ? '<b>megha.withinworks</b>' : ''; }

  function paint(entries) {
    const mehr = BRAIN.who() === 'Mehr';
    document.querySelectorAll('article.post-wrap').forEach(article => {
      const id = article.id, src = article.querySelector('.cap-src'), cap = capEl(article);
      if (!src || !cap || editing.has(id)) return;
      if (!src.dataset.original) src.dataset.original = src.value;
      const sugg = entries.filter(e => e.kind === 'Suggestion' && idOf(e) === id);
      const acc = new Set(entries.filter(e => e.kind === 'Accepted' && idOf(e) === id).map(e => e.text));
      const rej = new Set(entries.filter(e => e.kind === 'Rejected' && idOf(e) === id).map(e => e.text));
      // Megha's caption edits are applied straight away, no tracked changes. When the built caption already carries
      // her edit (we bake it in, with light polish), the built caption wins; otherwise her latest text is shown as is.
      const norm = t => t.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
      const close = (a, b) => { const A = norm(a), B = norm(b); if (!A || !B) return false; const d = diff(A, B), same = d.filter(([k, w]) => k === '=' && w.trim()).length;
        return same / Math.max(A.split(' ').length, B.split(' ').length) >= 0.8; };
      const live_s = sugg.filter(s => !rej.has(s.time) && parse(s.text).text);
      const latest = live_s[live_s.length - 1];
      let live = src.dataset.original;
      // a revision made on or after her edit already carries it (with any later changes), so the built caption wins
      const rev = (article.querySelector('.review') || { dataset: {} }).dataset.rev || '';
      const handled = latest && rev && latest.time.slice(0, 10) <= rev;
      if (latest && !handled && !close(live, parse(latest.text).text)) live = parse(latest.text).text;
      src.value = live; article.dataset.pending = '';
      cap.innerHTML = prefix(article) + BRAIN.esc(live);
      // Suggestion cards in the thread: a quiet record that her edit went in
      const box = article.querySelector('.sugg-list');
      if (box) box.innerHTML = sugg.slice().reverse().map(s => {
        const d = parse(s.text), state = rej.has(s.time) ? '<em class="tag no">Not used</em>' : '<em class="tag">Applied</em>';
        return `<div class="sugg done"><b>${BRAIN.esc(s.from)}</b> <span>edited the ${d.text ? 'caption' : 'post'} &middot; ${BRAIN.ago(s.time)}</span> ${state}${d.note ? `<p class="sg-quote">${BRAIN.esc(d.note)}</p>` : ''}</div>`;
      }).join('');
      const pending = [];
      const st = article.querySelector('.review .status');
      if (st && !st.dataset.busy && sugg.length && !pending.length && !/^Approved/.test(st.textContent)) st.textContent = 'Updated';
    });
  }

  // Editing works like a Word doc: tap Suggest edit, type in the caption itself, click away and it saves.
  const editing = new Set();
  function startEdit(article) {
    const cap = capEl(article), src = article.querySelector('.cap-src');
    if (!cap || editing.has(article.id)) return;
    editing.add(article.id);
    const pend = article.dataset.pending || src.value;
    cap.classList.remove('clip'); const more = cap.nextElementSibling; if (more && more.matches('.ig-more, .li-more')) more.remove();
    cap.innerHTML = prefix(article) + `<span class="edit" contenteditable="true" spellcheck="true"></span>`;
    const ed = cap.querySelector('.edit'); ed.innerText = pend;
    const btn = article.querySelector('[data-a="suggest"]'); if (btn) btn.textContent = 'Save';
    ed.focus(); const r = document.createRange(); r.selectNodeContents(ed); r.collapse(false); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
  }
  function setHint(article, t) { const h = article.querySelector('.sugg-hint'); if (h) h.textContent = t; }

  async function save(article) {
    if (!editing.has(article.id)) return;
    const cap = capEl(article), ed = cap.querySelector('.edit'), src = article.querySelector('.cap-src');
    const text = (ed ? ed.innerText : '').replace(/\n{3,}/g, '\n\n').trim(), note = '';
    const before = (article.dataset.pending || src.value).trim();
    editing.delete(article.id);
    const btn = article.querySelector('[data-a="suggest"]'); if (btn) btn.textContent = 'Suggest edit';
    const changed = text && text !== before;
    if (!changed && !note) { document.dispatchEvent(new Event('brain:refresh')); return; }
    
    const review = article.querySelector('.review');
    try {
      await BRAIN.send('Suggestion', article.id + ' | ' + review.dataset.title, JSON.stringify(Object.assign(changed || article.dataset.pending ? { text: changed ? text : before } : {}, note ? { note } : {})));
    } catch (err) { alert('That did not save. Please check your connection and try again.'); }
    document.dispatchEvent(new Event('brain:refresh'));
  }

  // Save when focus leaves the caption and its note
  document.addEventListener('focusout', e => {
    const article = e.target.closest && e.target.closest('article.post-wrap');
    if (!article || !editing.has(article.id)) return;
    setTimeout(() => { if (!article.contains(document.activeElement)) save(article); }, 250);
  });

  document.addEventListener('click', async e => {
    const t = e.target, article = t.closest && t.closest('article.post-wrap');
    if (!article) return;
    if (t.dataset.a === 'suggest') { editing.has(article.id) ? save(article) : startEdit(article); return; }
    let kind, text;
    if (t.dataset.acc) { kind = 'Accepted'; text = t.dataset.acc; }
    else if (t.dataset.rej) { kind = 'Rejected'; text = t.dataset.rej; }
    else return;
    t.disabled = true; t.textContent = 'Saving...';
    try { await BRAIN.send(kind, article.id + ' | ' + article.querySelector('.review').dataset.title, text); }
    catch (err) { t.disabled = false; t.textContent = 'Try again'; return; }
    document.dispatchEvent(new Event('brain:refresh'));
  });

  return { paint, diff };
})();
