// Suggesting mode for captions, like tracked changes in Word.
// Megha suggests a new caption; it shows inline as deletions and insertions.
// Mehr accepts or rejects. The latest accepted suggestion becomes the live caption (and what the copy icon copies).
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
  function prefix(article) { return article.querySelector('.ig-cap') ? '<b>meghabhalla</b>' : ''; }

  function paint(entries) {
    const mehr = BRAIN.who() === 'Mehr';
    document.querySelectorAll('article.post-wrap').forEach(article => {
      const id = article.id, src = article.querySelector('.cap-src'), cap = capEl(article);
      if (!src || !cap || editing.has(id)) return;
      if (!src.dataset.original) src.dataset.original = src.value;
      const sugg = entries.filter(e => e.kind === 'Suggestion' && idOf(e) === id);
      const acc = new Set(entries.filter(e => e.kind === 'Accepted' && idOf(e) === id).map(e => e.text));
      const rej = new Set(entries.filter(e => e.kind === 'Rejected' && idOf(e) === id).map(e => e.text));
      // Live caption: the original, replaced by each accepted suggestion in turn.
      let live = src.dataset.original;
      sugg.filter(s => acc.has(s.time) && parse(s.text).text).forEach(s => { live = parse(s.text).text; });
      src.value = live;
      const open = sugg.filter(s => !acc.has(s.time) && !rej.has(s.time));
      const pending = open.length ? [open[open.length - 1]] : []; // a newer suggestion replaces an older one
      const latest = pending.filter(s => parse(s.text).text).pop();
      article.dataset.pending = latest ? parse(latest.text).text : '';
      if (latest) {
        cap.classList.remove('clip'); const more = cap.nextElementSibling; if (more && more.matches('.ig-more, .li-more')) more.remove();
        cap.innerHTML = prefix(article) + `<span class="tracked">${show(diff(live, parse(latest.text).text))}</span>`;
      } else {
        cap.innerHTML = prefix(article) + BRAIN.esc(live);
      }
      // Suggestion cards in the thread
      const box = article.querySelector('.sugg-list');
      if (box) box.innerHTML = sugg.filter(s => acc.has(s.time) || rej.has(s.time) || pending.includes(s)).reverse().map(s => {
        const state = acc.has(s.time) ? '<em class="tag">Accepted</em>' : rej.has(s.time) ? '<em class="tag no">Rejected</em>'
          : (mehr ? `<button class="pill" data-acc="${BRAIN.esc(s.time)}">Accept</button><button class="pill" data-rej="${BRAIN.esc(s.time)}">Reject</button>` : '<em class="tag wait">Waiting for Mehr</em>');
        const d = parse(s.text), what = d.text && d.note ? 'caption and a note' : d.text ? 'caption' : 'a note';
        return `<div class="sugg${acc.has(s.time) || rej.has(s.time) ? ' done' : ''}"><b>${BRAIN.esc(s.from)}</b> <span>suggested an edit (${what}) &middot; ${BRAIN.ago(s.time)}</span> ${state}${d.note ? `<p class="sg-quote">${BRAIN.esc(d.note)}</p>` : ''}</div>`;
      }).join('');
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
    article.querySelector('.sugg-box').classList.add('open');
    article.querySelector('.sg-note').value = '';
    ed.focus(); const r = document.createRange(); r.selectNodeContents(ed); r.collapse(false); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
    setHint(article, 'Editing. Click anywhere outside to save.');
  }
  function setHint(article, t) { const h = article.querySelector('.sugg-hint'); if (h) h.textContent = t; }

  async function save(article) {
    if (!editing.has(article.id)) return;
    const cap = capEl(article), ed = cap.querySelector('.edit'), src = article.querySelector('.cap-src');
    const text = (ed ? ed.innerText : '').replace(/\n{3,}/g, '\n\n').trim(), note = article.querySelector('.sg-note').value.trim();
    const before = (article.dataset.pending || src.value).trim();
    editing.delete(article.id);
    article.querySelector('.sugg-box').classList.remove('open');
    const changed = text && text !== before;
    if (!changed && !note) { setHint(article, ''); document.dispatchEvent(new Event('brain:refresh')); return; }
    setHint(article, 'Saving...');
    const review = article.querySelector('.review');
    try {
      await BRAIN.send('Suggestion', article.id + ' | ' + review.dataset.title, JSON.stringify(Object.assign(changed || article.dataset.pending ? { text: changed ? text : before } : {}, note ? { note } : {})));
      setHint(article, 'Saved');
      setTimeout(() => setHint(article, ''), 2500);
    } catch (err) { setHint(article, 'Not saved. Check your connection and try again.'); }
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
