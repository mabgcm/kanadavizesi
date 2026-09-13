'use client';

import { useId, useState } from 'react';

export type GuideFaqItem = { question: string; answer: React.ReactNode };

export function GuideFaq({ items }: { items: GuideFaqItem[] }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <div className="guide-faq">
      {items.map((item, index) => {
        const panelId = `${baseId}-${index}`;
        const expanded = open === index;
        return (
          <section key={item.question}>
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? -1 : index)}
              >
                {item.question}
                <span aria-hidden="true">{expanded ? '−' : '+'}</span>
              </button>
            </h3>
            <div id={panelId} hidden={!expanded}>
              {item.answer}
            </div>
          </section>
        );
      })}
    </div>
  );
}
