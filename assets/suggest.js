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
      if (!src || !cap) return;
      if (!src.dataset.original) src.dataset.original = src.value;
      const sugg = entries.filter(e => e.kind === 'Suggestion' && idOf(e) === id);
      const acc = new Set(entries.filter(e => e.kind === 'Accepted' && idOf(e) === id).map(e => e.text));
      const rej = new Set(entries.filter(e => e.kind === 'Rejected' && idOf(e) === id).map(e => e.text));
      // Live caption: the original, replaced by each accepted suggestion in turn.
      let live = src.dataset.original;
      sugg.filter(s => acc.has(s.time)).forEach(s => { live = parse(s.text).text; });
      src.value = live;
      const pending = sugg.filter(s => !acc.has(s.time) && !rej.has(s.time));
      const latest = pending[pending.length - 1];
      if (latest) {
        cap.classList.remove('clip'); const more = cap.nextElementSibling; if (more && more.matches('.ig-more, .li-more')) more.remove();
        cap.innerHTML = prefix(article) + `<span class="tracked">${show(diff(live, parse(latest.text).text))}</span>`;
      } else {
        cap.innerHTML = prefix(article) + BRAIN.esc(live);
      }
      // Suggestion cards in the thread
      const box = article.querySelector('.sugg-list');
      if (box) box.innerHTML = sugg.slice().reverse().map(s => {
        const state = acc.has(s.time) ? '<em class="tag">Accepted</em>' : rej.has(s.time) ? '<em class="tag no">Rejected</em>'
          : (mehr ? `<button class="pill" data-acc="${BRAIN.esc(s.time)}">Accept</button><button class="pill" data-rej="${BRAIN.esc(s.time)}">Reject</button>` : '<em class="tag wait">Waiting for Mehr</em>');
        return `<div class="sugg${acc.has(s.time) || rej.has(s.time) ? ' done' : ''}"><b>${BRAIN.esc(s.from)}</b> <span>suggested an edit &middot; ${BRAIN.ago(s.time)}</span> ${state}</div>`;
      }).join('');
    });
  }

  // Clicks: open the editor, send a suggestion, accept or reject.
  document.addEventListener('click', async e => {
    const t = e.target, article = t.closest && t.closest('article.post-wrap');
    if (!article) return;
    const review = article.querySelector('.review'), title = review.dataset.title, id = article.id;
    if (t.dataset.a === 'suggest') {
      const ed = article.querySelector('.sugg-box');
      ed.classList.toggle('open');
      if (ed.classList.contains('open')) { const ta = ed.querySelector('textarea'); ta.value = article.querySelector('.cap-src').value; ta.focus(); }
      return;
    }
    let kind, text;
    if (t.dataset.a === 'send-sugg') {
      const ta = article.querySelector('.sugg-box textarea'), base = article.querySelector('.cap-src').value;
      if (!ta.value.trim() || ta.value.trim() === base.trim()) { ta.focus(); return; }
      kind = 'Suggestion'; text = JSON.stringify({ text: ta.value.trim() });
    } else if (t.dataset.acc) { kind = 'Accepted'; text = t.dataset.acc; }
    else if (t.dataset.rej) { kind = 'Rejected'; text = t.dataset.rej; }
    else return;
    t.disabled = true; const label = t.textContent; t.textContent = 'Saving...';
    try {
      await BRAIN.send(kind, id + ' | ' + title, text);
      if (kind === 'Suggestion') article.querySelector('.sugg-box').classList.remove('open');
      document.dispatchEvent(new Event('brain:refresh'));
    } catch (err) { t.textContent = 'Not sent, try again'; setTimeout(() => { t.textContent = label; }, 2000); }
    t.disabled = false; if (t.textContent === 'Saving...') t.textContent = label;
  });

  return { paint, diff };
})();
