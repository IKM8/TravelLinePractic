import { s } from '../../utils/adminStyles';
import { Section, Label } from './Section';
import DraggableList from './DraggableList';

export default function VacanciesSection({ data, update }) {
  return (
    <Section title="Вакансии">
      <Label>Вакансии</Label>
      <DraggableList items={data.vacancies.items} onReorder={arr => update(['vacancies', 'items'], arr)}>
        {(item, i) => (
          <div style={s.card}>
            <div style={s.cardFields}>
              <input value={item.title} placeholder="Название вакансии"
                onChange={e => {
                  const arr = [...data.vacancies.items];
                  arr[i] = { ...arr[i], title: e.target.value };
                  update(['vacancies', 'items'], arr);
                }}
                style={s.input} />
              <input value={item.location} placeholder="Формат (удаленно / Йошмар-Ола)"
                onChange={e => {
                  const arr = [...data.vacancies.items];
                  arr[i] = { ...arr[i], location: e.target.value };
                  update(['vacancies', 'items'], arr);
                }}
                style={s.input} />
              <input value={item.link} placeholder="Ссылка на hh.ru"
                onChange={e => {
                  const arr = [...data.vacancies.items];
                  arr[i] = { ...arr[i], link: e.target.value };
                  update(['vacancies', 'items'], arr);
                }}
                style={s.input} />
            </div>
            <div style={s.cardActions}>
              <button onClick={() => {
                const arr = [...data.vacancies.items];
                arr.splice(i, 1);
                update(['vacancies', 'items'], arr);
              }} style={s.btnDanger}>Удалить</button>
            </div>
          </div>
        )}
      </DraggableList>
      <button onClick={() => {
        update(['vacancies', 'items'], [...data.vacancies.items, { title: '', location: '', link: '' }]);
      }} style={s.btnAdd}>+ Добавить вакансию</button>

      <Label>Текст кнопки «ещё»</Label>
      <input value={data.vacancies.moreText}
        onChange={e => update(['vacancies', 'moreText'], e.target.value)}
        style={s.input} />

      <Label>Ссылка «ещё»</Label>
      <input value={data.vacancies.moreLink}
        onChange={e => update(['vacancies', 'moreLink'], e.target.value)}
        style={s.input} />
    </Section>
  );
}
