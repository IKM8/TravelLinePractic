import { s } from '../../utils/adminStyles';
import { Section } from './Section';
import DraggableList from './DraggableList';
import { YearBlock } from './PlatformAdmin';

export default function PlatformSection({ data, update }) {
  return (
    <Section title="Платформа">
      <DraggableList items={data.platform} onReorder={arr => update(['platform'], arr)}>
        {(group, gi) => <YearBlock group={group} gi={gi} data={data} update={update} />}
      </DraggableList>
      <button onClick={() => {
        update(['platform'], [...data.platform, { year: '', entries: [{ title: '', description: '', icon: 'founding', iconColor: '#507bce' }] }]);
      }} style={s.btnAdd}>+ Добавить год</button>
    </Section>
  );
}
