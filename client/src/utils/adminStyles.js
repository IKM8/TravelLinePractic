export const s = {
  loading: { padding: 40, fontFamily: 'Manrope, sans-serif', fontSize: 18, color: '#767e9b' },
  page: { fontFamily: 'Manrope, sans-serif', background: '#f5f6fa', minHeight: '100vh' },
  header: { background: '#fff', borderBottom: '1px solid #e0e3ed', position: 'sticky', top: 0, zIndex: 10 },
  headerInner: { maxWidth: 1200, margin: '0 auto', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 24, fontWeight: 600, color: '#323e59', margin: 0 },
  link: { color: '#507bce', textDecoration: 'none', fontSize: 15, fontWeight: 500 },
  main: { maxWidth: 1200, margin: '0 auto', padding: '40px' },
  section: { background: '#fff', borderRadius: 16, padding: 32, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
  sectionHeader: { display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', background: 'none', border: 'none', padding: 0, width: '100%', textAlign: 'left', marginBottom: 0 },
  sectionTitle: { fontSize: 18, fontWeight: 600, color: '#323e59', margin: 0, padding: 0, border: 'none' },
  label: { fontSize: 13, fontWeight: 600, color: '#767e9b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: {
    width: '100%', padding: '12px 16px', fontSize: 15,
    border: '1.5px solid #c8ccd8', borderRadius: 10, marginBottom: 12,
    boxSizing: 'border-box', fontFamily: 'Manrope, sans-serif',
    background: '#fff', outline: 'none',
    transition: 'border-color 0.15s',
  },
  card: {
    border: '1px solid #e0e3ed', borderRadius: 12, padding: 20, marginBottom: 12,
    background: '#f8f9fc', display: 'flex', gap: 16, alignItems: 'flex-start',
  },
  cardFields: { flex: 1, display: 'grid', gap: 8 },
  cardActions: { paddingTop: 4, display: 'flex', flexDirection: 'column', gap: 6 },
  btnDanger: {
    background: '#fff', color: '#c62828', border: '1.5px solid #ffd0d0',
    padding: '6px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontWeight: 500,
  },
  btnDangerSmall: {
    background: '#fff', color: '#c62828', border: '1.5px solid #ffd0d0',
    padding: '2px 8px', borderRadius: 6, fontSize: 14, cursor: 'pointer', fontWeight: 500, lineHeight: 1,
  },
  subCard: {
    border: '1px solid #e0e3ed', borderRadius: 10, padding: 16, marginBottom: 10,
    background: '#fff',
  },
  fieldRow: { marginBottom: 8 },
  iconPickerLabel: { fontSize: 12, fontWeight: 600, color: '#767e9b', marginBottom: 6 },
  iconGrid: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  iconOption: {
    width: 32, height: 32, borderRadius: 8, border: '2px solid #e0e3ed',
    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
  },
  colorOption: {
    width: 28, height: 28, borderRadius: '50%', cursor: 'pointer',
  },
  btnAddSmall: {
    background: 'none', color: '#507bce', border: '2px dashed #c8ccd8',
    padding: '8px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontWeight: 500, marginTop: 4, width: '100%',
  },
  btnAdd: {
    background: 'none', color: '#507bce', border: '2px dashed #c8ccd8',
    padding: '12px 20px', borderRadius: 10, fontSize: 14, cursor: 'pointer', fontWeight: 500, width: '100%', marginTop: 4,
  },
  saveBar: {
    display: 'flex', alignItems: 'center', gap: 16,
    background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  btnSave: { background: '#507bce', color: '#fff', border: 'none', padding: '14px 40px', borderRadius: 10, fontSize: 16, fontWeight: 500, cursor: 'pointer' },
  message: { fontSize: 15, fontWeight: 500 },
};
