import { useState, useEffect } from 'react';
import { updateData } from '../utils/updateData';
import presetIcons from '../utils/icons';

const API = '/api/page-data';

let nextId = 100;

function AdminPanel() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', ok: false });

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(setData)
      .catch(() => setMessage({ text: 'Ошибка загрузки', ok: false }));
  }, []);

  const save = async () => {
    setSaving(true);
    setMessage({ text: '', ok: false });
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setMessage({ text: result.success ? 'Сохранено!' : 'Ошибка при сохранении', ok: result.success });
    } catch {
      setMessage({ text: 'Ошибка соединения с сервером', ok: false });
    }
    setSaving(false);
  };

  const update = (path, value) => {
    setData(prev => updateData(prev, path, value));
  };

  if (!data) {
    return <div style={s.loading}>Загрузка...</div>;
  }

  return (
    <div style={s.page}>
      <header style={s.header}>
        <div style={s.headerInner}>
          <h1 style={s.title}>Админ-панель</h1>
          <a href="/" style={s.link}>На сайт</a>
        </div>
      </header>

      <main style={s.main}>
        {/* -------------------- HERO -------------------- */}
        <Section title="Блок-герой">
          <Label>Заголовок (3 строки)</Label>
          {data.hero.title.map((line, i) => (
            <input key={i} value={line} placeholder={`Строка ${i + 1}`}
              onChange={e => {
                const t = [...data.hero.title];
                t[i] = e.target.value;
                update(['hero', 'title'], t);
              }}
              style={s.input} />
          ))}

          <Label>Подзаголовок</Label>
          <input value={data.hero.subtitle || ''}
            onChange={e => update(['hero', 'subtitle'], e.target.value)}
            style={s.input} />

          <Label>Видео URL</Label>
          <input value={data.hero.video_url}
            onChange={e => update(['hero', 'video_url'], e.target.value)}
            style={s.input} />
        </Section>

        {/* -------------------- STATS -------------------- */}
        <Section title="Статистика">
          {data.hero.stats.map((stat, i) => (
            <div key={i} style={s.card}>
              <div style={s.cardFields}>
                <input value={stat.value} placeholder="Значение"
                  onChange={e => {
                    const arr = [...data.hero.stats];
                    arr[i] = { ...arr[i], value: e.target.value };
                    update(['hero', 'stats'], arr);
                  }}
                  style={s.input} />
                <input value={stat.label} placeholder="Описание"
                  onChange={e => {
                    const arr = [...data.hero.stats];
                    arr[i] = { ...arr[i], label: e.target.value };
                    update(['hero', 'stats'], arr);
                  }}
                  style={s.input} />
              </div>
              <div style={s.cardActions}>
                <button onClick={() => {
                  const arr = [...data.hero.stats];
                  arr.splice(i, 1);
                  update(['hero', 'stats'], arr);
                }} style={s.btnDanger}>Удалить</button>
              </div>
            </div>
          ))}
          <button onClick={() => {
            update(['hero', 'stats'], [...data.hero.stats, { value: '', label: '' }]);
          }} style={s.btnAdd}>+ Добавить</button>
        </Section>

        {/* -------------------- TEAM -------------------- */}
        <Section title="Команда">
          {data.team.map((member, i) => (
            <div key={member.id} style={s.card}>
              <div style={s.cardFields}>
                <input value={member.name} placeholder="Имя"
                  onChange={e => {
                    const arr = [...data.team];
                    arr[i] = { ...arr[i], name: e.target.value };
                    update(['team'], arr);
                  }}
                  style={s.input} />
                <input value={member.position} placeholder="Должность"
                  onChange={e => {
                    const arr = [...data.team];
                    arr[i] = { ...arr[i], position: e.target.value };
                    update(['team'], arr);
                  }}
                  style={s.input} />
                <input value={member.photo_url} placeholder="Фото (путь)"
                  onChange={e => {
                    const arr = [...data.team];
                    arr[i] = { ...arr[i], photo_url: e.target.value };
                    update(['team'], arr);
                  }}
                  style={s.input} />
              </div>
              <div style={s.cardActions}>
                <button onClick={() => {
                  const arr = [...data.team];
                  arr.splice(i, 1);
                  update(['team'], arr);
                }} style={s.btnDanger}>Удалить</button>
              </div>
            </div>
          ))}
          <button onClick={() => {
            update(['team'], [...data.team, { id: nextId++, name: '', position: '', photo_url: '', links: [] }]);
          }} style={s.btnAdd}>+ Добавить сотрудника</button>
        </Section>

        {/* -------------------- PLATFORM -------------------- */}
        <Section title={`Платформа`}>
          {data.platform.map((group, gi) => (
            <YearBlock key={gi} group={group} gi={gi} data={data} update={update} />
          ))}
          <button onClick={() => {
            update(['platform'], [...data.platform, { year: '', entries: [{ title: '', description: '', icon: 'founding', iconColor: '#507bce' }] }]);
          }} style={s.btnAdd}>+ Добавить год</button>
        </Section>

        {/* -------------------- SAVE -------------------- */}
        <div style={s.saveBar}>
          <button onClick={save} disabled={saving} style={{
            ...s.btnSave,
            opacity: saving ? 0.6 : 1,
          }}>
            {saving ? 'Сохранение...' : 'Сохранить'}
          </button>
          {message.text && (
            <span style={{ ...s.message, color: message.ok ? '#2e7d32' : '#c62828' }}>{message.text}</span>
          )}
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={s.section}>
      <button onClick={() => setOpen(!open)} style={s.sectionHeader}>
        <span style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: '0.2s' }}>▶</span>
        <h2 style={s.sectionTitle}>{title}</h2>
      </button>
      {open && children}
    </div>
  );
}

function Label({ children }) {
  return <div style={s.label}>{children}</div>;
}

function YearBlock({ group, gi, data, update }) {
  const [open, setOpen] = useState(false);
  const count = group.entries.length;
  return (
    <div style={{ ...s.card, flexDirection: 'column' }}>
      <button onClick={() => setOpen(!open)} style={{
        ...s.sectionHeader, display: 'flex', alignItems: 'center', gap: 10,
        width: '100%', cursor: 'pointer', background: 'none', border: 'none', padding: 0,
      }}>
        <span style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: '0.2s', fontSize: 13, flexShrink: 0 }}>▶</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
          <input value={group.year} placeholder="Год"
            onChange={e => {
              const arr = [...data.platform];
              arr[gi] = { ...arr[gi], year: e.target.value };
              update(['platform'], arr);
            }}
            onClick={e => e.stopPropagation()}
            style={{ ...s.input, maxWidth: 100, margin: 0, padding: '4px 10px', fontSize: 15, fontWeight: 600 }} />
          <span style={{ fontSize: 13, color: '#767e9b' }}>{count} {count === 1 ? 'продукт' : 'продуктов'}</span>
        </div>
        <button onClick={e => {
          e.stopPropagation();
          const arr = [...data.platform];
          arr.splice(gi, 1);
          update(['platform'], arr);
        }} style={{ ...s.btnDanger, marginLeft: 'auto', flexShrink: 0 }}>Удалить</button>
      </button>
      {open && (
        <div style={{ marginTop: 16 }}>
          {group.entries.map((entry, ei) => (
            <PlatformEntry key={ei} entry={entry} ei={ei} gi={gi} data={data} update={update} />
          ))}
          <button onClick={() => {
            const arr = [...data.platform];
            const entries = [...arr[gi].entries, { title: '', description: '', icon: 'star', iconColor: '#507bce' }];
            arr[gi] = { ...arr[gi], entries };
            update(['platform'], arr);
          }} style={s.btnAddSmall}>+ Продукт</button>
        </div>
      )}
    </div>
  );
}

function PlatformEntry({ entry, ei, gi, data, update }) {
  return (
    <div style={s.subCard}>
      <div style={s.fieldRow}>
        <input value={entry.title} placeholder="Название"
          onChange={e => {
            const arr = [...data.platform];
            const entries = [...arr[gi].entries];
            entries[ei] = { ...entries[ei], title: e.target.value };
            arr[gi] = { ...arr[gi], entries };
            update(['platform'], arr);
          }}
          style={s.input} />
      </div>
      <div style={s.fieldRow}>
        <input value={entry.description || ''} placeholder="Краткое описание"
          onChange={e => {
            const arr = [...data.platform];
            const entries = [...arr[gi].entries];
            entries[ei] = { ...entries[ei], description: e.target.value };
            arr[gi] = { ...arr[gi], entries };
            update(['platform'], arr);
          }}
          style={s.input} />
      </div>
      <div style={s.fieldRow}>
        <textarea value={entry['extra-description'] || ''} placeholder="Подробное описание"
          onChange={e => {
            const arr = [...data.platform];
            const entries = [...arr[gi].entries];
            entries[ei] = { ...entries[ei], 'extra-description': e.target.value };
            arr[gi] = { ...arr[gi], entries };
            update(['platform'], arr);
          }}
          style={{ ...s.input, minHeight: 60, resize: 'vertical' }} />
      </div>
      <div style={s.fieldRow}>
        <div style={s.iconPickerLabel}>Иконка:</div>
        <div style={s.iconGrid}>
          {presetIcons.map(ic => (
            <div key={ic.id}
              onClick={() => {
                const arr = [...data.platform];
                const entries = [...arr[gi].entries];
                entries[ei] = { ...entries[ei], icon: ic.id };
                arr[gi] = { ...arr[gi], entries };
                update(['platform'], arr);
              }}
              style={{
                ...s.iconOption,
                borderColor: entry.icon === ic.id ? '#507bce' : '#e0e3ed',
                background: entry.icon === ic.id ? '#eef3ff' : '#fff',
              }}>
              <svg viewBox={ic.vb || '0 0 24 24'} fill="none" stroke="#507bce" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                {[ic.path, ic.extra, ic.extra2, ic.extra3, ic.extra4, ic.extra5, ic.extra6, ic.extra7, ic.extra8, ic.extra9].filter(Boolean).map((d, k) => {
                  const p = ic.pathProps?.[k];
                  return <path key={k} d={d} fill={p?.fill || 'none'} stroke={p?.stroke || '#507bce'} strokeWidth={p?.strokeWidth ?? 2.5} fillRule={p?.fillRule} />;
                })}
                {ic.circles && ic.circles.map((c, i) => <circle key={'c'+i} cx={c.cx} cy={c.cy} r={c.r} fill={c.fill || 'none'} />)}
                {ic.rects && ic.rects.map((r, i) => <rect key={'r'+i} x={r.x} y={r.y} width={r.w} height={r.h} rx={r.rx || 0} fill={r.fill || 'none'} stroke="#507bce" strokeWidth="2.5" />)}
              </svg>
            </div>
          ))}
        </div>
      </div>
      <div style={s.fieldRow}>
        <div style={s.iconPickerLabel}>Цвет:</div>
        <div style={s.iconGrid}>
          {['#507bce','#227bdd','#a456c3','#48af45','#eb4836','#6667d4','#20a781','#b9d950','#00a2bc','#d86ab3'].map(c => (
            <div key={c} onClick={() => {
              const arr = [...data.platform];
              const entries = [...arr[gi].entries];
              entries[ei] = { ...entries[ei], iconColor: c };
              arr[gi] = { ...arr[gi], entries };
              update(['platform'], arr);
            }}
              style={{
                ...s.colorOption,
                background: c,
                outline: entry.iconColor === c || (!entry.iconColor && c === '#507bce') ? '3px solid #323e59' : 'none',
                outlineOffset: 2,
              }} />
          ))}
        </div>
      </div>
      <div style={s.cardActions}>
        <button onClick={() => {
          const arr = [...data.platform];
          const entries = [...arr[gi].entries];
          entries.splice(ei, 1);
          arr[gi] = { ...arr[gi], entries };
          update(['platform'], arr);
        }} style={s.btnDanger}>Удалить продукт</button>
      </div>
    </div>
  );
}

const s = {
  loading: { padding: 40, fontFamily: 'Manrope, sans-serif', fontSize: 18, color: '#767e9b' },
  page: { fontFamily: 'Manrope, sans-serif', background: '#f5f6fa', minHeight: '100vh' },
  header: { background: '#fff', borderBottom: '1px solid #e0e3ed', position: 'sticky', top: 0, zIndex: 10 },
  headerInner: { maxWidth: 1200, margin: '0 auto', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 24, fontWeight: 600, color: '#323e59', margin: 0 },
  link: { color: '#507bce', textDecoration: 'none', fontSize: 15, fontWeight: 500 },
  main: { maxWidth: 1200, margin: '0 auto', padding: '40px' },
  section: { background: '#fff', borderRadius: 16, padding: 32, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
  sectionHeader: { display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', background: 'none', border: 'none', padding: 0, width: '100%', textAlign: 'left', marginBottom: 0 },
  sectionTitle: { fontSize: 18, fontWeight: 600, color: '#323e59', margin: 0, padding: 0, border: 'none' },
  label: { fontSize: 13, fontWeight: 600, color: '#767e9b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: {
    width: '100%', padding: '12px 16px', fontSize: 15,
    border: '1.5px solid #c8ccd8', borderRadius: 10, marginBottom: 12,
    boxSizing: 'border-box', fontFamily: 'Manrope, sans-serif',
    background: '#fff', outline: 'none',
    transition: 'border-color 0.15s',
  },
  card: {
    border: '1px solid #e0e3ed', borderRadius: 12, padding: 20, marginBottom: 12,
    background: '#f8f9fc', display: 'flex', gap: 16, alignItems: 'flex-start',
  },
  cardFields: { flex: 1, display: 'grid', gap: 8 },
  cardActions: { paddingTop: 4, display: 'flex', flexDirection: 'column', gap: 6 },
  btnDanger: {
    background: '#fff', color: '#c62828', border: '1.5px solid #ffd0d0',
    padding: '6px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontWeight: 500,
  },
  subCard: {
    border: '1px solid #e0e3ed', borderRadius: 10, padding: 16, marginBottom: 10,
    background: '#fff',
  },
  fieldRow: { marginBottom: 8 },
  iconPickerLabel: { fontSize: 12, fontWeight: 600, color: '#767e9b', marginBottom: 6 },
  iconGrid: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  iconOption: {
    width: 32, height: 32, borderRadius: 8, border: '2px solid #e0e3ed',
    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
  },
  colorOption: {
    width: 28, height: 28, borderRadius: '50%', cursor: 'pointer',
  },
  btnAddSmall: {
    background: 'none', color: '#507bce', border: '2px dashed #c8ccd8',
    padding: '8px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontWeight: 500, marginTop: 4, width: '100%',
  },
  btnAdd: {
    background: 'none', color: '#507bce',     border: '2px dashed #c8ccd8',
    padding: '12px 20px', borderRadius: 10, fontSize: 14, cursor: 'pointer', fontWeight: 500, width: '100%', marginTop: 4,
  },
  saveBar: {
    display: 'flex', alignItems: 'center', gap: 16,
    background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  btnSave: { background: '#507bce', color: '#fff', border: 'none', padding: '14px 40px', borderRadius: 10, fontSize: 16, fontWeight: 500, cursor: 'pointer' },
  message: { fontSize: 15, fontWeight: 500 },
};

export default AdminPanel;
