import { useState } from 'react';
import { s } from '../../utils/adminStyles';
import techIcons from '../../utils/techIcons';

export function DirectionCard({ item, i, data, update, techIconsList, addTechIcon }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={s.card}>
      <div style={{ width: '100%' }}>
        <button onClick={() => setOpen(!open)} style={{
          display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
          background: 'none', border: 'none', padding: 0, width: '100%', textAlign: 'left',
        }}>
          <span style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: '0.2s', fontSize: 13, flexShrink: 0 }}>▶</span>
          <input value={item.title} placeholder="Название направления"
            onChange={e => {
              const arr = [...data.directions.items];
              arr[i] = { ...arr[i], title: e.target.value };
              update(['directions', 'items'], arr);
            }}
            onClick={e => e.stopPropagation()}
            style={{ ...s.input, margin: 0, padding: '4px 10px', fontSize: 15, fontWeight: 600, flex: 1 }} />
          <button onClick={e => {
            e.stopPropagation();
            const arr = [...data.directions.items];
            arr.splice(i, 1);
            update(['directions', 'items'], arr);
          }} style={{ ...s.btnDanger, flexShrink: 0 }}>Удалить</button>
        </button>
        {open && (
          <div style={{ marginTop: 16 }}>
            <div style={s.label}>Технологии</div>
            {(item.techs || []).map((tech, j) => {
              const name = typeof tech === 'string' ? tech : (tech.name || '');
              const icon = typeof tech === 'string' ? (techIcons[tech] || '') : (tech.icon || '');
              return (
                <div key={j} style={{ border: '1px dashed #d0d4e0', borderRadius: 8, padding: 8, marginBottom: 8, background: '#fff' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                    <img src={`/images/tech/${icon || 'hz'}.png`} alt={name}
                      style={{ width: 24, height: 24, flexShrink: 0, objectFit: 'contain' }}
                      onError={e => { e.target.style.display = 'none' }} />
                    <input value={name}
                      onChange={e => {
                        const arr = [...data.directions.items];
                        const techs = [...(arr[i].techs || [])];
                        const t = typeof techs[j] === 'string' ? {} : { ...techs[j] };
                        t.name = e.target.value;
                        techs[j] = t;
                        arr[i] = { ...arr[i], techs };
                        update(['directions', 'items'], arr);
                      }}
                      style={{ ...s.input, margin: 0, flex: 1, minWidth: 120 }} />
                    <input value={icon}
                      onChange={e => {
                        const arr = [...data.directions.items];
                        const techs = [...(arr[i].techs || [])];
                        const t = typeof techs[j] === 'string' ? { name: techs[j] } : { ...techs[j] };
                        t.icon = e.target.value;
                        techs[j] = t;
                        arr[i] = { ...arr[i], techs };
                        update(['directions', 'items'], arr);
                      }}
                      placeholder="иконка"
                      style={{ ...s.input, margin: 0, width: 80, fontSize: 12 }} />
                    <button onClick={() => {
                      const arr = [...data.directions.items];
                      const techs = [...(arr[i].techs || [])];
                      techs.splice(j, 1);
                      arr[i] = { ...arr[i], techs };
                      update(['directions', 'items'], arr);
                    }} style={{ ...s.btnDanger, flexShrink: 0, padding: '4px 10px' }}>×</button>
                  </div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
                    {techIconsList.map(ic => (
                      <div key={ic} onClick={() => {
                        const arr = [...data.directions.items];
                        const techs = [...(arr[i].techs || [])];
                        const t = typeof techs[j] === 'string' ? { name: techs[j] } : { ...techs[j] };
                        t.icon = ic;
                        techs[j] = t;
                        arr[i] = { ...arr[i], techs };
                        update(['directions', 'items'], arr);
                      }}
                        style={{
                          width: 26, height: 26, borderRadius: 5, border: '1.5px solid #e0e3ed',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                          background: icon === ic ? '#eef3ff' : '#fff',
                          borderColor: icon === ic ? '#507bce' : '#e0e3ed',
                        }}>
                        <img src={`/images/tech/${ic}.png`} alt="" style={{ width: 14, height: 14 }}
                          onError={e => { e.target.style.display = 'none' }} />
                      </div>
                    ))}
                    <AddIconButton addTechIcon={addTechIcon} />
                  </div>
                </div>
              );
            })}
            <button onClick={() => {
              const arr = [...data.directions.items];
              arr[i] = { ...arr[i], techs: [...(arr[i].techs || []), { name: '', icon: '' }] };
              update(['directions', 'items'], arr);
            }} style={{ ...s.btnAddSmall, marginBottom: 12 }}>+ Технология</button>

            <textarea value={item.content || ''} placeholder="HTML контент"
              onChange={e => {
                const arr = [...data.directions.items];
                arr[i] = { ...arr[i], content: e.target.value };
                update(['directions', 'items'], arr);
              }}
              style={{ ...s.input, minHeight: 80, resize: 'vertical' }} />
          </div>
        )}
      </div>
    </div>
  );
}

function AddIconButton({ addTechIcon }) {
  const [adding, setAdding] = useState(false);
  const [val, setVal] = useState('');
  if (!adding) {
    return (
      <div onClick={() => setAdding(true)}
        style={{ width: 26, height: 26, borderRadius: 5, border: '1.5px dashed #c8ccd8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16, color: '#767e9b', userSelect: 'none' }}>
        +
      </div>
    );
  }
  return (
    <input autoFocus value={val} placeholder="имя"
      onChange={e => setVal(e.target.value)}
      onKeyDown={e => {
        if (e.key === 'Enter' && val.trim()) {
          addTechIcon(val.trim());
          setVal('');
          setAdding(false);
        }
        if (e.key === 'Escape') { setAdding(false); setVal(''); }
      }}
      onBlur={() => { setAdding(false); setVal(''); }}
      style={{ width: 60, padding: '3px 6px', fontSize: 11, border: '1px solid #507bce', borderRadius: 4, outline: 'none' }} />
  );
}
