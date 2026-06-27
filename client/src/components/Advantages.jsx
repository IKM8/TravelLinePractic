import { useState, useEffect, useRef } from 'react';

function Advantages({ data }) {
  const stats = data.stats || [];
  const itemsRef = useRef([]);
  const sectionRef = useRef(null);
  const prevInView = useRef(false);
  const prevIndex = useRef(-1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentStat, setCurrentStat] = useState('');
  const [prevStat, setPrevStat] = useState('');
  const [inView, setInView] = useState(false);
  const outTimer = useRef(null);

  useEffect(() => {
    if (stats.length === 0) return;
    const VPC = window.innerHeight / 2;
    let rafId;

    const check = () => {
      const section = sectionRef.current;
      if (!section) { rafId = requestAnimationFrame(check); return; }
      const rect = section.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight * 0.4 && rect.bottom > 0;

      if (isInView !== prevInView.current) {
        prevInView.current = isInView;
        setInView(isInView);
      }

      let minDist = Infinity;
      let closest = 0;

      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        if (!isInView) {
          el.style.opacity = '0';
          el.style.color = '';
          return;
        }
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2;
        const d = Math.abs(c - VPC);

        el.style.opacity = Math.max(0.02, 1 - d / 400);
        const ti = i / (stats.length - 1);
        const crIn = Math.round(232 + (123 - 232) * ti);
        const cgIn = Math.round(233 + (136 - 233) * ti);
        const cbIn = Math.round(237 + (161 - 237) * ti);
        el.style.color = `rgb(${crIn},${cgIn},${cbIn})`;

        if (d < minDist) { minDist = d; closest = i; }
      });

      if (isInView) {
        const closestEl = itemsRef.current[closest];
        if (closestEl) {
          const t = stats.length > 1 ? closest / (stats.length - 1) : 0;
          const cr = Math.round(181 + (50 - 181) * t);
          const cg = Math.round(185 + (62 - 185) * t);
          const cb = Math.round(195 + (89 - 195) * t);
          closestEl.style.color = `rgb(${cr},${cg},${cb})`;
        }

        if (closest !== prevIndex.current) {
          prevIndex.current = closest;
          setActiveIndex(closest);
        }
      }

      rafId = requestAnimationFrame(check);
    };

    rafId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(rafId);
  }, [stats]);

  useEffect(() => {
    const item = stats[activeIndex];
    const next = item && item.value ? item.value : '';
    if (next !== currentStat) {
      setPrevStat(currentStat);
      setCurrentStat(next);
      if (outTimer.current) clearTimeout(outTimer.current);
      outTimer.current = setTimeout(() => setPrevStat(''), 500);
    }
    return () => { if (outTimer.current) clearTimeout(outTimer.current); };
  }, [activeIndex, stats]);

  const showLogo = !currentStat && stats[activeIndex] && !stats[activeIndex].value;

  return (
    <section className="tl-advantages" id="advantages" ref={sectionRef}>
      <div className="tl-advantages__cols">
        <div className="tl-advantages__left">
          {showLogo ? (
            <span className="tl-advantages__value tl-advantages__value--logo" style={{
              opacity: inView ? 1 : 0
            }}>
              <img src="/tl-logo.svg" alt="tl-logo" width="80" height="80" />
            </span>
          ) : (
            <span key={currentStat} className={`tl-advantages__value ${inView ? 'tl-advantages__value--in' : ''}`} style={{
              opacity: inView && currentStat ? 1 : 0
            }}>
              {currentStat}
            </span>
          )}
          {prevStat && (
            <span key={`out-${prevStat}`} className="tl-advantages__value tl-advantages__value--out">
              {prevStat}
            </span>
          )}
        </div>
        <div className="tl-advantages__right">
          {stats.map((item, i) => (
            <div key={i}
              ref={el => itemsRef.current[i] = el}
              className="tl-advantages__item">
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Advantages;
