import { useState } from 'react';
import { s } from '../../utils/adminStyles';

export function Section({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={s.section}>
      <button onClick={() => setOpen(!open)} style={s.sectionHeader}>
        <span style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: '0.2s' }}>▶</span>
        <h2 style={s.sectionTitle}>{title}</h2>
      </button>
      {open && children}
    </div>
  );
}

export function Label({ children }) {
  return <div style={s.label}>{children}</div>;
}
