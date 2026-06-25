import { useRef, useEffect } from 'react';

function Work({ data }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const maxXRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const update = () => {
      const vw = window.innerWidth;
      const text = track.querySelector('.tl-work__item--final');
      const extra = text ? Math.max(0, (vw - text.offsetWidth) / 2) : 0;
      const maxX = Math.max(0, track.scrollWidth - vw + extra);
      maxXRef.current = maxX;
      section.style.height = (maxX + window.innerHeight) + 'px';
    };

    update();
    window.addEventListener('resize', update);

    let prev = -1;
    const loop = () => {
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const h = rect.height - vh;
      if (h > 0) {
        const maxX = maxXRef.current;
        if (maxX > 0) {
          const p = Math.max(0, Math.min(1, -rect.top / h));
          if (p !== prev) {
            prev = p;
            track.style.transform = `translateX(-${p * maxX}px)`;
          }
        }
      }
      requestAnimationFrame(loop);
    };
    const id = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', update);
    };
  }, [data]);

  return (
    <section className="tl-work" id="work" ref={sectionRef}>
      <div className="tl-work__pin">
        <div className="tl-work__track" ref={trackRef}>
          <div className="tl-work__start">
            <h2 className="tl-work__title">{data.title}</h2>
            <p className="tl-work__slogan">{data.slogan}</p>
          </div>

          {data.items.map((item, i) => {
            if (item.type === 'image') {
              const imgItems = data.items.filter(it => it.type === 'image');
              const imgIdx = imgItems.indexOf(item);
              const cls = imgIdx % 2 === 0 ? 'tl-work__item--wide' : 'tl-work__item--narrow';
              return (
                <div key={i} className={`tl-work__item ${cls}`}>
                  <img
                    src={`/images/gallery/${item.src}`}
                    alt=""
                    width="800" height="525"
                  />
                </div>
              );
            }
            if (item.type === 'text') {
              return (
                <div key={i} className="tl-work__item tl-work__item--final">
                  <p>{item.text}</p>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
}

export default Work;
