import { s } from '../../utils/adminStyles';
import { Section, Label } from './Section';
import DraggableList from './DraggableList';

export default function StatsSection({ data, update }) {
  return (
    <Section title="О TravelLine (статистика)">
      <Label>Статистика</Label>
      <DraggableList items={data.hero.stats} onReorder={arr => update(['hero', 'stats'], arr)}>
        {(stat, i) => (
          <div style={s.card}>
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
        )}
      </DraggableList>
      <button onClick={() => {
        update(['hero', 'stats'], [...data.hero.stats, { value: '', label: '' }]);
      }} style={s.btnAdd}>+ Добавить</button>
    </Section>
  );
}
