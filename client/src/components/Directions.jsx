import { useState } from 'react';
import techIcons from '../utils/techIcons';

function Directions({ data }) {
  const [openIdx, setOpenIdx] = useState(null);

  if (!data || !data.items) return null;

  const toggle = (idx) => setOpenIdx(openIdx === idx ? null : idx);

  return (
    <section className="tl-directions tl-section--rounded-right tl-section--over" id="directions">
      <div className="tl-directions__inner">
        <h2 className="tl-directions__title">{data.title}</h2>

        <div className="tl-directions__list">
          {data.items.map((item, i) => (
            <article
              key={i}
              className={`tl-accordion ${openIdx === i ? 'tl-accordion--open' : ''}`}
            >
              <div className="tl-accordion__title" onClick={() => toggle(i)}>
                <span className="tl-accordion__title-text">
                  {item.title}
                </span>

                {item.techs && item.techs.length > 0 && (
                  <div className="tl-accordion__tech-list">
                    {item.techs.map((tech, j) => {
                      const name = typeof tech === 'string' ? tech : tech.name;
                      const icon = typeof tech === 'string' ? (techIcons[tech] || tech.toLowerCase()) : (tech.icon || techIcons[tech.name] || tech.name.toLowerCase());
                      return (
                        <div className="tl-accordion__tech-item" key={j}>
                          {icon && <img src={`/images/tech/${icon}.png`} alt={name} />}
                          {name}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="tl-accordion__toggle">
                  <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
                    <circle cx="2" cy="2" r="2" fill="#507BCE"/>
                    <circle cx="7" cy="7" r="2" fill="#507BCE"/>
                    <circle cx="12" cy="12" r="2" fill="#507BCE"/>
                    <circle cx="17" cy="7" r="2" fill="#507BCE"/>
                    <circle cx="22" cy="2" r="2" fill="#507BCE"/>
                  </svg>
                </div>
              </div>

              <div className="tl-accordion__body">
                <div
                  className="tl-accordion__content"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Directions;
