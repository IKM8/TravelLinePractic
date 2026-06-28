import { s } from '../../utils/adminStyles';

export default function SaveBar({ saving, message, onSave }) {
  return (
    <div style={s.saveBar}>
      <button onClick={onSave} disabled={saving} style={{
        ...s.btnSave,
        opacity: saving ? 0.6 : 1,
      }}>
        {saving ? 'Сохранение...' : 'Сохранить'}
      </button>
      {message.text && (
        <span style={{ ...s.message, color: message.ok ? '#2e7d32' : '#c62828' }}>{message.text}</span>
      )}
    </div>
  );
}
