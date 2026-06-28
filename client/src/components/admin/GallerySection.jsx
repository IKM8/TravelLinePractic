import { s } from '../../utils/adminStyles';
import { Section, Label } from './Section';
import DraggableList from './DraggableList';

export default function GallerySection({ data, update }) {
  return (
    <Section title="Галерея">
      <Label>Фото и видео</Label>
      <DraggableList items={data.gallery.items} onReorder={arr => update(['gallery', 'items'], arr)}>
        {(item, i) => (
          <div style={s.card}>
            <div style={s.cardFields}>
              <input value={item.src} placeholder="Имя файла (images/gallery/)"
                onChange={e => {
                  const arr = [...data.gallery.items];
                  arr[i] = { ...arr[i], src: e.target.value };
                  update(['gallery', 'items'], arr);
                }}
                style={s.input} />
              <input value={item.text} placeholder="Подпись к фото"
                onChange={e => {
                  const arr = [...data.gallery.items];
                  arr[i] = { ...arr[i], text: e.target.value };
                  update(['gallery', 'items'], arr);
                }}
                style={s.input} />
            </div>
            <div style={s.cardActions}>
              <button onClick={() => {
                const arr = [...data.gallery.items];
                arr.splice(i, 1);
                update(['gallery', 'items'], arr);
              }} style={s.btnDanger}>Удалить</button>
            </div>
          </div>
        )}
      </DraggableList>
      <button onClick={() => {
        update(['gallery', 'items'], [...data.gallery.items, { src: '', text: '' }]);
      }} style={s.btnAdd}>+ Добавить фото</button>
    </Section>
  );
}
