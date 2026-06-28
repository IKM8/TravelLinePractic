import { s } from '../../utils/adminStyles';
import { Section, Label } from './Section';

export default function HeroSection({ data, update }) {
  return (
    <Section title="Блок-герой">
      <Label>Заголовок (3 строки)</Label>
      {data.hero.title.map((line, i) => (
        <input key={i} value={line} placeholder={`Строка ${i + 1}`}
          onChange={e => {
            const t = [...data.hero.title];
            t[i] = e.target.value;
            update(['hero', 'title'], t);
          }}
          style={s.input} />
      ))}
      <Label>Подзаголовок</Label>
      <input value={data.hero.subtitle || ''}
        onChange={e => update(['hero', 'subtitle'], e.target.value)}
        style={s.input} />
      <Label>Видео URL</Label>
      <input value={data.hero.video_url}
        onChange={e => update(['hero', 'video_url'], e.target.value)}
        style={s.input} />
    </Section>
  );
}
