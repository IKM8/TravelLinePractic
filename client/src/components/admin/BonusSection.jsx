import { s } from '../../utils/adminStyles';
import { Section, Label } from './Section';
import DraggableList from './DraggableList';

export default function BonusSection({ data, update }) {
  return (
    <Section title="Плюшки и все такое">
      <Label>Заголовок</Label>
      <input value={data.bonus.title} placeholder="Заголовок"
        onChange={e => update(['bonus', 'title'], e.target.value)}
        style={s.input} />
      <Label>Элементы</Label>
      <DraggableList items={data.bonus.items} onReorder={arr => update(['bonus', 'items'], arr)}>
        {(item, i) => (
          <div style={s.card}>
            <div style={s.cardFields}>
              <input value={item.title} placeholder="Название"
                onChange={e => {
                  const arr = [...data.bonus.items];
                  arr[i] = { ...arr[i], title: e.target.value };
                  update(['bonus', 'items'], arr);
                }}
                style={s.input} />
              <textarea value={item.text || ''} placeholder="Описание" rows={3}
                onChange={e => {
                  const arr = [...data.bonus.items];
                  arr[i] = { ...arr[i], text: e.target.value };
                  update(['bonus', 'items'], arr);
                }}
                style={s.input} />
            </div>
            <div style={s.cardActions}>
              <button onClick={() => {
                const arr = [...data.bonus.items];
                arr.splice(i, 1);
                update(['bonus', 'items'], arr);
              }} style={s.btnDanger}>Удалить</button>
            </div>
          </div>
        )}
      </DraggableList>
      <button onClick={() => {
        update(['bonus', 'items'], [...data.bonus.items, { title: '', text: '' }]);
      }} style={s.btnAdd}>+ Добавить бонус</button>
    </Section>
  );
}
