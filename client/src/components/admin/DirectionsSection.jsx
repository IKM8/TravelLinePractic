import { s } from '../../utils/adminStyles';
import { Section } from './Section';
import DraggableList from './DraggableList';
import { DirectionCard } from './DirectionAdmin';

export default function DirectionsSection({ data, update, techIconsList, addTechIcon }) {
  return (
    <Section title="Направления">
      <DraggableList items={data.directions.items} onReorder={arr => update(['directions', 'items'], arr)}>
        {(item, i) => <DirectionCard item={item} i={i} data={data} update={update} techIconsList={techIconsList} addTechIcon={addTechIcon} />}
      </DraggableList>
      <button onClick={() => {
        update(['directions', 'items'], [...data.directions.items, { title: '', techs: [], content: '' }]);
      }} style={s.btnAdd}>+ Добавить направление</button>
    </Section>
  );
}
