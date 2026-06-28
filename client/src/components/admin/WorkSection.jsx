import { s } from '../../utils/adminStyles';
import { Section, Label } from './Section';
import DraggableList from './DraggableList';

export default function WorkSection({ data, update }) {
  return (
    <Section title="Работай как удобно">
      <Label>Заголовок</Label>
      <input value={data.work.title} placeholder="Заголовок"
        onChange={e => update(['work', 'title'], e.target.value)}
        style={s.input} />
      <Label>Слоган</Label>
      <textarea value={data.work.slogan} placeholder="Слоган" rows={3}
        onChange={e => update(['work', 'slogan'], e.target.value)}
        style={s.input} />
      <Label>Элементы</Label>
      <DraggableList items={data.work.items} onReorder={arr => update(['work', 'items'], arr)}>
        {(item, i) => (
          <div style={s.card}>
            <div style={s.cardFields}>
              <select value={item.type}
                onChange={e => {
                  const arr = [...data.work.items];
                  arr[i] = { ...arr[i], type: e.target.value };
                  update(['work', 'items'], arr);
                }}
                style={s.input}>
                <option value="image">Изображение</option>
                <option value="text">Текст</option>
              </select>
              {item.type === 'image' && (
                <>
                  <input value={item.city || ''} placeholder="Город"
                    onChange={e => {
                      const arr = [...data.work.items];
                      arr[i] = { ...arr[i], city: e.target.value };
                      update(['work', 'items'], arr);
                    }}
                    style={s.input} />
                  <input value={item.src || ''} placeholder="Имя файла (gallery/)"
                    onChange={e => {
                      const arr = [...data.work.items];
                      arr[i] = { ...arr[i], src: e.target.value };
                      update(['work', 'items'], arr);
                    }}
                    style={s.input} />
                </>
              )}
              {item.type === 'text' && (
                <textarea value={item.text || ''} placeholder="Текст" rows={3}
                  onChange={e => {
                    const arr = [...data.work.items];
                    arr[i] = { ...arr[i], text: e.target.value };
                    update(['work', 'items'], arr);
                  }}
                  style={s.input} />
              )}
            </div>
            <div style={s.cardActions}>
              <button onClick={() => {
                const arr = [...data.work.items];
                arr.splice(i, 1);
                update(['work', 'items'], arr);
              }} style={s.btnDanger}>Удалить</button>
            </div>
          </div>
        )}
      </DraggableList>
      <button onClick={() => {
        update(['work', 'items'], [...data.work.items, { type: 'image', src: '', city: '' }]);
      }} style={s.btnAdd}>+ Добавить элемент</button>
    </Section>
  );
}
