import { useState, useEffect, useRef } from 'react';

function Advantages({ data }) {
  const stats = data.stats || [];
  const itemsRef = useRef([]);
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentStat, setCurrentStat] = useState('');
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (stats.length === 0) return;
    const VPC = window.innerHeight / 2;
    let rafId;

    const check = () => {
      const section = sectionRef.current;
      if (!section) { rafId = requestAnimationFrame(check); return; }
      const rect = section.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.4 && rect.bottom > 0) {
        setInView(true);

        let minDist = Infinity;
        let closest = 0;
        itemsRef.current.forEach((el, i) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const c = r.top + r.height / 2;
          const d = Math.abs(c - VPC);
          if (d < minDist) { minDist = d; closest = i; }
        });
        setActiveIndex(closest);
      } else {
        setInView(false);
      }

      rafId = requestAnimationFrame(check);
    };

    rafId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(rafId);
  }, [stats]);

  useEffect(() => {
    const item = stats[activeIndex];
    setCurrentStat(item && item.value ? item.value : '');
  }, [activeIndex, stats]);

  const showLogo = !currentStat && stats[activeIndex] && !stats[activeIndex].value;

  return (
    <section className="tl-advantages" id="advantages" ref={sectionRef}>
      <div className="tl-advantages__cols">
        <div className="tl-advantages__left">
          {showLogo ? (
            <span className="tl-advantages__value tl-advantages__value--logo" style={{
              opacity: inView ? 1 : 0,
              visibility: inView ? 'visible' : 'hidden',
            }}>
              <img src="/tl-logo.svg" alt="tl-logo" width="80" height="80" />
            </span>
          ) : (
            <span className="tl-advantages__value" style={{
              opacity: inView && currentStat ? 1 : 0,
              visibility: inView ? 'visible' : 'hidden',
            }}>
              {currentStat}
            </span>
          )}
        </div>
        <div className="tl-advantages__right">
          {stats.map((item, i) => {
            const dist = Math.abs(i - activeIndex);
            const opacity = dist === 0 ? 1 : Math.max(0.02, 1 - dist * 0.25);
            return (
              <div key={i} ref={el => itemsRef.current[i] = el}
                className={`tl-advantages__item ${i === activeIndex ? 'active' : ''}`}
                style={{ opacity }}>
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Advantages;
