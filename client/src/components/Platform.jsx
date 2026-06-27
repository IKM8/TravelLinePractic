import icons from '../utils/icons.js';

function renderIcon(iconId) {
  const ic = icons.find(x => x.id === iconId);
  if (!ic) return null;
  const paths = [ic.path, ic.extra, ic.extra2, ic.extra3, ic.extra4, ic.extra5, ic.extra6, ic.extra7, ic.extra8, ic.extra9].filter(Boolean);
  return (
    <svg viewBox={ic.vb || '0 0 24 24'} fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 40 }}>
      {paths.map((d, i) => {
        const p = ic.pathProps?.[i];
        return <path key={'p'+i} d={d} fill={p?.fill || 'none'} stroke={p?.stroke || '#fff'} strokeWidth={p?.strokeWidth ?? 3} fillRule={p?.fillRule} />;
      })}
      {ic.circles && ic.circles.map((c, i) => <circle key={'c'+i} cx={c.cx} cy={c.cy} r={c.r} fill={c.fill || 'none'} />)}
      {ic.rects && ic.rects.map((r, i) => <rect key={'r'+i} x={r.x} y={r.y} width={r.w} height={r.h} rx={r.rx || 0} fill={r.fill || 'none'} />)}
    </svg>
  );
}

const heights = {
  '2008': 137, '2009': 329, '2011': 256, '2012': 332,
  '2013': 292, '2014': 433, '2016': 511, '2017': 605,
  '2018': 457, '2020': 360, '2021': 605, '2024': 501,
};

function calcMinHeight(n) {
  const card = 80 + 6 + 17;
  const gap = 24;
  const year = 50;
  const buf = 20;
  return n * card + (n - 1) * gap + year + buf;
}

function Platform({ data, brands }) {

  if (!data || data.length === 0) return null;

  return (
    <section className="tl-platform" id="platform">
      <div className="tl-platform__inner">
        <div className="tl-platform__header">
          <h2 className="tl-platform__title">Развиваем платформу</h2>
        </div>
      </div>

      <div className="tl-platform__chart">
        {data.map((group, i) => {
            const fallback = [200, 300, 400, 480, 550];
            const base = heights[group.year] || fallback[Math.min(group.entries.length, 4)];
            const h = Math.max(base, calcMinHeight(group.entries.length));

            return (
              <div key={i} className="tl-platform__col" style={{ height: h }}>
                <div className="tl-platform__col-items">
                  {group.entries.map((entry, j) => (
                      <div key={j} className="tl-platform__card">
                        <div
                          className="tl-platform__card-icon"
                          style={{ background: entry.iconColor || '#507bce' }}>
                          {renderIcon(entry.icon)}
                        </div>
                        {(entry.description || entry['extra-description']) && (
                          <div className="tl-platform__card-body" style={{ background: entry.iconColor || '#507bce' }}>
                            <div className="tl-platform__card-body-inner">
                              {entry.description && <div className="tl-platform__card-expand-text">{entry.description}</div>}
                              {entry['extra-description'] && <div className="tl-platform__card-expand-extra">{entry['extra-description']}</div>}
                            </div>
                          </div>
                        )}
                        <div className="tl-platform__card-text" style={entry.title && entry.title.length < 25 ? {whiteSpace:'nowrap'} : undefined}>{entry.title}</div>
                      </div>
                  ))}
                </div>
                <div className="tl-platform__col-year">{group.year}</div>
              </div>
            );
          })}
      </div>

      {brands && brands.length > 0 && (
        <div className="tl-platform__brands">
          <div className="tl-brands__track">
            {brands.map((brand) => (
              <div key={brand.id} className="tl-brands__item">
                <img src={brand.logo} alt={brand.name} />
              </div>
            ))}
            {brands.map((brand) => (
              <div key={'dup-'+brand.id} className="tl-brands__item">
                <img src={brand.logo} alt={brand.name} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Platform;
