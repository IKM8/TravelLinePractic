import { useState } from 'react';
import { s } from '../../utils/adminStyles';
import presetIcons from '../../utils/icons';
import DraggableList from './DraggableList';

export function YearBlock({ group, gi, data, update }) {
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
          <DraggableList items={group.entries} onReorder={(entries) => {
            const arr = [...data.platform];
            arr[gi] = { ...arr[gi], entries };
            update(['platform'], arr);
          }}>
            {(entry, ei) => <PlatformEntry entry={entry} ei={ei} gi={gi} data={data} update={update} />}
          </DraggableList>
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
                background: c,
                width: 28, height: 28, borderRadius: '50%', cursor: 'pointer',
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
