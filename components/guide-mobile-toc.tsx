'use client';

import { useId, useState } from 'react';

type Item = readonly [string, string];

export function GuideMobileToc({ items }: { items: readonly Item[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <aside
      className={`guide-mobile-drawer${open ? ' is-open' : ''}`}
      aria-label="Bu rehberde"
    >
      <button
        type="button"
        className="guide-mobile-drawer-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
      >
        <span>Bu rehberde</span>
        <span aria-hidden="true">{open ? '×' : '‹'}</span>
      </button>
      <div className="guide-mobile-drawer-panel" id={panelId} hidden={!open}>
        <h2>Bu rehberde</h2>
        <ol>
          {items.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} onClick={() => setOpen(false)}>
                {label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
