import { s } from '../../utils/adminStyles';
import { Section, Label } from './Section';

export default function ContactSection({ data, update }) {
  return (
    <Section title="Напиши нам">
      <Label>Заголовок</Label>
      <input value={data.contact.title} placeholder="Заголовок"
        onChange={e => update(['contact', 'title'], e.target.value)}
        style={s.input} />
      <Label>Описание</Label>
      <textarea value={data.contact.description} placeholder="Описание" rows={3}
        onChange={e => update(['contact', 'description'], e.target.value)}
        style={s.input} />
      <Label>Текст кнопки</Label>
      <input value={data.contact.button_text || ''} placeholder="Отправить"
        onChange={e => update(['contact', 'button_text'], e.target.value)}
        style={s.input} />
    </Section>
  );
}
