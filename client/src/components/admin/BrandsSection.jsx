import { s } from '../../utils/adminStyles';
import { Section, Label } from './Section';
import DraggableList from './DraggableList';

let nextId = 200;

export default function BrandsSection({ data, update }) {
  return (
    <Section title="Бренды">
      <Label>Логотипы клиентов</Label>
      <DraggableList items={data.brands} onReorder={arr => update(['brands'], arr)}>
        {(brand, i) => (
          <div style={s.card}>
            <div style={s.cardFields}>
              <input value={brand.name} placeholder="Название"
                onChange={e => {
                  const arr = [...data.brands];
                  arr[i] = { ...arr[i], name: e.target.value };
                  update(['brands'], arr);
                }}
                style={s.input} />
              <input value={brand.logo} placeholder="Путь к логотипу"
                onChange={e => {
                  const arr = [...data.brands];
                  arr[i] = { ...arr[i], logo: e.target.value };
                  update(['brands'], arr);
                }}
                style={s.input} />
            </div>
            <div style={s.cardActions}>
              <button onClick={() => {
                const arr = [...data.brands];
                arr.splice(i, 1);
                update(['brands'], arr);
              }} style={s.btnDanger}>Удалить</button>
            </div>
          </div>
        )}
      </DraggableList>
      <button onClick={() => {
        update(['brands'], [...data.brands, { id: nextId++, name: '', logo: '' }]);
      }} style={s.btnAdd}>+ Добавить бренд</button>
    </Section>
  );
}
