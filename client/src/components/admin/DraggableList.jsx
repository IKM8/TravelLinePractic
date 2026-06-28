import { useState } from 'react';

export default function DraggableList({ items, onReorder, children }) {
  const [dragIdx, setDragIdx] = useState(null);

  return items.map((item, i) => (
    <div
      key={item.id ?? item.key ?? i}
      draggable
      onDragStart={() => setDragIdx(i)}
      onDragOver={(e) => { e.preventDefault(); }}
      onDrop={() => {
        if (dragIdx === null || dragIdx === i) { setDragIdx(null); return; }
        const arr = [...items];
        const [m] = arr.splice(dragIdx, 1);
        arr.splice(i, 0, m);
        onReorder(arr);
        setDragIdx(null);
      }}
      onDragEnd={() => setDragIdx(null)}
      style={{ opacity: dragIdx === i ? 0.3 : 1, transition: 'opacity 0.15s' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, color: '#b0b4c4', fontSize: 13, userSelect: 'none', cursor: 'grab' }}>
        <span style={{ fontSize: 16, lineHeight: '1' }}>⠿</span>
        <span style={{ fontSize: 11 }}>перетащить</span>
      </div>
      {children(item, i)}
    </div>
  ));
}
