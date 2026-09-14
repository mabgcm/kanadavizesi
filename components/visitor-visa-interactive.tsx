'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { GuideFaq } from './guide-faq';

export function VisitorFaq({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <GuideFaq
      initiallyExpanded
      items={items.map((item) => ({ ...item, answer: <p>{item.answer}</p> }))}
    />
  );
}
const checklistKey = 'visitor-checklist-v1';
let memorySnapshot = '[]';
function subscribeChecklist(notify: () => void) {
  window.addEventListener('storage', notify);
  window.addEventListener('visitor-checklist-change', notify);
  return () => {
    window.removeEventListener('storage', notify);
    window.removeEventListener('visitor-checklist-change', notify);
  };
}
function checklistSnapshot() {
  try {
    return localStorage.getItem(checklistKey) || memorySnapshot;
  } catch {
    return memorySnapshot;
  }
}
function saveChecklist(next: number[]) {
  memorySnapshot = JSON.stringify(next);
  try {
    localStorage.setItem(checklistKey, memorySnapshot);
  } catch {
    /* Remain usable when storage is unavailable. */
  }
  window.dispatchEvent(new Event('visitor-checklist-change'));
}
export function VisitorChecklist({ items }: { items: string[] }) {
  const snapshot = useSyncExternalStore(
    subscribeChecklist,
    checklistSnapshot,
    () => '[]',
  );
  let checked: number[] = [];
  try {
    const value: unknown = JSON.parse(snapshot);
    if (Array.isArray(value))
      checked = value.filter(
        (n): n is number => Number.isInteger(n) && n >= 0 && n < items.length,
      );
  } catch {
    /* Ignore invalid saved data. */
  }
  function toggle(index: number) {
    const next = checked.includes(index)
      ? checked.filter((n) => n !== index)
      : [...checked, index];
    saveChecklist(next);
  }
  return (
    <div>
      <p>İşaretlemeler yalnızca bu cihazda saklanır; sunucuya gönderilmez.</p>
      <output aria-live="polite">
        {checked.length} / {items.length} madde tamamlandı
      </output>
      <ul className="visitor-checklist">
        {items.map((item, i) => (
          <li key={item}>
            <label>
              <input
                type="checkbox"
                checked={checked.includes(i)}
                onChange={() => toggle(i)}
              />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
export function VisitorToc({
  items,
}: {
  items: { id: string; title: string }[];
}) {
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    function update() {
      let current = items[0]?.id || '';
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 160) current = item.id;
      }
      setActive(current);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [items]);
  const links = (
    <ol>
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={active === item.id ? 'location' : undefined}
            onClick={() => setOpen(false)}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ol>
  );
  return (
    <>
      <aside className="guide-toc visitor-desktop-toc">
        <h2>Bu rehberde</h2>
        {links}
      </aside>
      <nav className="visitor-mobile-toc" aria-label="Bu rehberde">
        <button
          aria-expanded={open}
          aria-controls="visitor-toc-list"
          onClick={() => setOpen(!open)}
        >
          Bu rehberde <span aria-hidden="true">{open ? '−' : '+'}</span>
        </button>
        <div id="visitor-toc-list" hidden={!open}>
          {links}
        </div>
      </nav>
    </>
  );
}
