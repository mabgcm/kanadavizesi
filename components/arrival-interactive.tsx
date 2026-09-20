'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { arrivalPeriods } from '@/lib/arrival';
const options = [
  ['all', 'Tümünü göster'],
  ['pr', 'Daimi oturum sahibi'],
  ['worker', 'Çalışma izni sahibi'],
  ['student', 'Uluslararası öğrenci'],
  ['visitor', 'Ziyaretçi'],
  ['before', 'Henüz Kanada’ya gelmedim'],
];
const startingPoints: Record<string, { summary: string; links: [string, string][] }> = {
  pr: {
    summary: 'Giriş belgeleri ve adres işlemlerinden başlayın; ardından temel kayıtları ve yerleşim adımlarını inceleyin.',
    links: [['ilk-48-saat', 'Giriş belgeleri ve adres'], ['ilk-2-hafta', 'SIN, banka ve sağlık uygunluğu'], ['ilk-30-gun', 'Konut, okul ve ulaşım']],
  },
  worker: {
    summary: 'İzin belgenizi kontrol edin; temel kayıtlarla birlikte çalışma yetkiniz ve mesleğinizle ilgili koşulları inceleyin.',
    links: [['ilk-48-saat', 'Giriş ve izin belgeleri'], ['ilk-2-hafta', 'Temel kayıtlar'], ['gun-31-60', 'Çalışma yetkisi ve mesleki hazırlık']],
  },
  student: {
    summary: 'Öğrenim belgenizden ve temel kayıtlardan başlayın. Çalışma ve hizmet uygunluğunu ayrıca kontrol edin.',
    links: [['ilk-48-saat', 'Giriş ve öğrenim belgeleri'], ['ilk-2-hafta', 'Banka, telefon ve sağlık'], ['statuye-gore', 'Öğrenci statüsüne göre koşullar']],
  },
  visitor: {
    summary: 'Giriş belgeleri, konaklama ve iletişimden başlayın; diğer işlemleri ziyaretçi statüsüne göre karşılaştırın.',
    links: [['ilk-48-saat', 'Giriş ve geçici adres'], ['ilk-2-hafta', 'Banka, telefon ve sağlık koşulları'], ['statuye-gore', 'Ziyaretçi statüsüne göre koşullar']],
  },
  before: {
    summary: 'Önce belge dosyanızı hazırlayın, ardından varış gününüzü planlayın. Henüz gelmemiş olmak bir göçmenlik statüsü değildir; görevler bu seçimde grileştirilmez.',
    links: [['hazirlik', 'Gelmeden önce belge hazırlığı'], ['ilk-48-saat', 'Varış günü planı'], ['kontrol-listesi', '90 günlük kontrol listesi']],
  },
};
const Status = createContext('all');
const statusKey = 'arrival-status-v1';
const checklistKey = 'arrival-checklist-v1';
const memory: Record<string, string> = {};
function subscribe(notify: () => void) {
  window.addEventListener('storage', notify);
  window.addEventListener('arrival-storage', notify);
  return () => {
    window.removeEventListener('storage', notify);
    window.removeEventListener('arrival-storage', notify);
  };
}
function snapshot(key: string, fallback: string) {
  try {
    return localStorage.getItem(key) || memory[key] || fallback;
  } catch {
    return memory[key] || fallback;
  }
}
function save(key: string, value: unknown) {
  memory[key] = JSON.stringify(value);
  try {
    localStorage.setItem(key, memory[key]);
  } catch {
    /* Remain usable without storage. */
  }
  window.dispatchEvent(new Event('arrival-storage'));
}
export function ArrivalStatusProvider({ children }: { children: ReactNode }) {
  const saved = useSyncExternalStore(
    subscribe,
    () => snapshot(statusKey, '"all"'),
    () => '"all"',
  );
  let status = 'all';
  try {
    const value: unknown = JSON.parse(saved);
    if (typeof value === 'string' && options.some(([id]) => id === value))
      status = value;
  } catch {
    /* Ignore invalid saved data. */
  }
  return (
    <Status.Provider value={status}>
      <fieldset className="arrival-filter">
        <legend>Size uygun adımları gösterin</legend>
        <p>Durumunuzu seçin; başlangıç bağlantıları aşağıda görünsün. Rehberin tamamı ve kontrol listesi görünür kalır.</p>
        <div>
          {options.map(([id, label]) => (
            <button
              type="button"
              key={id}
              aria-pressed={status === id}
              onClick={() => {
                save(statusKey, id);
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="arrival-starting-plan" aria-live="polite" aria-atomic="true">
          {status === 'all' ? (
            <p>Tüm adımlar gösteriliyor. Başlangıç planı için yukarıdan durumunuzu seçin.</p>
          ) : (
            <div>
              <h3>{options.find(([id]) => id === status)?.[1]} için başlangıç</h3>
              <p>{startingPoints[status].summary}</p>
              <ul>
                {startingPoints[status].links.map(([id, label]) => (
                  <li key={id}><a href={`#${id}`}>{label} →</a></li>
                ))}
              </ul>
              {status !== 'before' && <p className="arrival-label">Aşağıda bazı görevler statünüze göre işaretlenir; karşılaştırma tablosunda seçtiğiniz sütun vurgulanır. Bu seçim tek başına hizmet veya çalışma uygunluğu belirlemez.</p>}
            </div>
          )}
        </div>
        <small>Seçiminiz yalnızca bu cihazda saklanır.</small>
      </fieldset>
      {children}
    </Status.Provider>
  );
}
export function ArrivalTask({
  statuses = [],
  label = 'Herkes için',
  children,
}: {
  statuses?: string[];
  label?: string;
  children: ReactNode;
}) {
  const status = useContext(Status);
  const muted =
    status !== 'all' && status !== 'before' && statuses.length > 0 && !statuses.includes(status);
  return (
    <div className={`arrival-task${muted ? ' is-muted' : ''}`}>
      <p className="arrival-label">
        {label}
        {muted && ' · Statünüze uygulanmayabilir'}
      </p>
      {children}
    </div>
  );
}
export function NinetyDayTimeline() {
  const [active, setActive] = useState('');
  useEffect(() => {
    const update = () => {
      let current = '';
      for (const p of arrivalPeriods) {
        const el = document.getElementById(p.id);
        if (el && el.getBoundingClientRect().top <= 180) current = p.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <nav aria-label="90 günlük zaman çizelgesi">
      <ol className="arrival-timeline">
        {arrivalPeriods.map((p) => (
          <li key={p.id} data-active={active === p.id}>
            <h3>
              {p.title}: {p.priority}
            </h3>
            <p>{p.summary}</p>
            <span>{p.count} kontrol listesi görevi · </span>
            <a
              href={`#${p.id}`}
              aria-current={active === p.id ? 'step' : undefined}
            >
              {p.title} bölümüne git →
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
export function ArrivalChecklist({
  groups,
}: {
  groups: { title: string; items: string[] }[];
}) {
  const valid = groups.flatMap((g, i) => g.items.map((_, j) => `${i}-${j}`));
  const saved = useSyncExternalStore(
    subscribe,
    () => snapshot(checklistKey, '[]'),
    () => '[]',
  );
  let checked: string[] = [];
  try {
    const value: unknown = JSON.parse(saved);
    if (Array.isArray(value))
      checked = [
        ...new Set(
          value.filter(
            (v): v is string => typeof v === 'string' && valid.includes(v),
          ),
        ),
      ];
  } catch {
    /* Ignore invalid saved data. */
  }
  function update(next: string[]) {
    save(checklistKey, next);
  }
  return (
    <div className="arrival-checklist">
      <p>
        İşaretler yalnızca bu cihazda saklanır. İlerleme bir yerleşim başarısı
        veya hukuki uygunluk puanı değildir.
      </p>
      <output aria-live="polite">
        {checked.length} / {valid.length} görev işaretlendi (%
        {Math.round((checked.length / valid.length) * 100)})
      </output>
      {groups.map((g, i) => (
        <fieldset key={g.title}>
          <legend>{g.title}</legend>
          {g.items.map((item, j) => {
            const id = `${i}-${j}`;
            return (
              <label key={id}>
                <input
                  type="checkbox"
                  checked={checked.includes(id)}
                  onChange={() =>
                    update(
                      checked.includes(id)
                        ? checked.filter((v) => v !== id)
                        : [...checked, id],
                    )
                  }
                />
                <span>{item}</span>
              </label>
            );
          })}
        </fieldset>
      ))}
      <div className="arrival-actions">
        <button
          type="button"
          onClick={() => {
            if (
              window.confirm(
                'Kontrol listesindeki bütün işaretler silinsin mi?',
              )
            )
              update([]);
          }}
        >
          Listeyi sıfırla
        </button>
        <button type="button" onClick={() => window.print()}>
          Yazdır/PDF olarak kaydet
        </button>
      </div>
    </div>
  );
}
export function ArrivalComparisonTable({ rows }: { rows: string[][] }) {
  const status = useContext(Status);
  const column = ['all', 'pr', 'worker', 'student', 'visitor'].indexOf(status);
  const [head, ...body] = rows;
  return (
    <div>
      <p className="arrival-table-hint" id="arrival-table-help">
        Tabloyu görmek için yatay kaydırın; klavyede ok tuşlarını
        kullanabilirsiniz.
      </p>
      <section
        className="arrival-table"
        aria-label="Statüye göre görev karşılaştırması"
        aria-describedby="arrival-table-help"
        // Keyboard focus lets keyboard users scroll this overflow region.
        // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        <table>
          <caption>
            Görevlerin göçmenlik statüsüne göre genel uygulanabilirliği
          </caption>
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={h} scope="col" data-selected={i > 0 && i === column}>
                  {h}
                  {i > 0 && i === column && (
                    <span className="arrival-column-label">Seçili statü</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) =>
                  i === 0 ? (
                    <th key={i} scope="row">
                      {cell}
                    </th>
                  ) : (
                    <td key={i} data-selected={i === column}>
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
