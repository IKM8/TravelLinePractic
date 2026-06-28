import { s } from '../../utils/adminStyles';
import { Section, Label } from './Section';
import DraggableList from './DraggableList';

let nextId = 100;

export default function TeamSection({ data, update }) {
  return (
    <Section title="Команда">
      <Label>Сотрудники</Label>
      <DraggableList items={data.team} onReorder={arr => update(['team'], arr)}>
        {(member, i) => (
          <div style={s.card}>
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
              {(member.links || []).map((link, li) => (
                <div key={li} style={{ display:'flex', gap:6, alignItems:'center' }}>
                  <input value={link.url} placeholder="Ссылка на соцсеть"
                    onChange={e => {
                      const arr = [...data.team];
                      arr[i].links = [...(arr[i].links || [])];
                      arr[i].links[li] = { ...arr[i].links[li], url: e.target.value };
                      update(['team'], arr);
                    }}
                    style={{ ...s.input, flex:1 }} />
                  <button onClick={() => {
                    const arr = [...data.team];
                    arr[i].links = (arr[i].links || []).filter((_,k) => k !== li);
                    update(['team'], arr);
                  }} style={s.btnDangerSmall}>×</button>
                </div>
              ))}
              <button onClick={() => {
                const arr = [...data.team];
                arr[i] = { ...arr[i], links: [...(arr[i].links || []), { url: '' }] };
                update(['team'], arr);
              }} style={{ ...s.btnAdd, fontSize:12, padding:'4px 10px' }}>+ Ссылка</button>
            </div>
            <div style={s.cardActions}>
              <button onClick={() => {
                const arr = [...data.team];
                arr.splice(i, 1);
                update(['team'], arr);
              }} style={s.btnDanger}>Удалить</button>
            </div>
          </div>
        )}
      </DraggableList>
      <button onClick={() => {
        update(['team'], [...data.team, { id: nextId++, name: '', position: '', photo_url: '', links: [] }]);
      }} style={s.btnAdd}>+ Добавить сотрудника</button>
    </Section>
  );
}
