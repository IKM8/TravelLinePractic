function Vacancies({ data }) {
  if (!data || !data.items) return null;

  const subtitleParts = data.subtitle ? data.subtitle.split(' и ') : [];

  return (
    <section className="tl-vacancies" id="vacancies">
      <div className="tl-vacancies__inner">
        <h2 className="tl-vacancies__title">
          {data.title}
          <span className="tl-vacancies__title-icon">
            <img src="/tl-logo.svg" alt="TL" width="22" height="22" />
          </span>
          <span className="tl-vacancies__title-brand">TravelLine</span>
        </h2>
        {subtitleParts.length > 0 && (
          <div className="tl-vacancies__subtitle-wrap">
            <p className="tl-vacancies__subtitle">{subtitleParts[0]}</p>
            {subtitleParts[1] && <p className="tl-vacancies__subtitle">и {subtitleParts[1]}</p>}
          </div>
        )}
        {data.listTitle && (
          <h3 className="tl-vacancies__list-title">
            <span className="tl-vacancies__dot" />
            {data.listTitle}
          </h3>
        )}

        <div className="tl-vacancies__list">
          {data.items.map((item, i) => (
            <a
              key={i}
              href={item.link || data.moreLink}
              className="tl-vacancies__item"
              target="_blank"
              rel="noopener noreferrer"
              role="article"
            >
              <h3 className="tl-vacancies__item-title">{item.title}</h3>
              <div className="tl-vacancies__item-footer">
                <p className="tl-vacancies__item-address">{item.location}</p>
                <div className="tl-vacancies__item-hh">
                  <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="24" fill="#E53935"/>
                    <text x="24" y="25" textAnchor="middle" dominantBaseline="central" fill="white" fontFamily="Arial,Helvetica,sans-serif" fontWeight="600" fontSize="24" letterSpacing="-1">hh</text>
                  </svg>
                </div>
              </div>
            </a>
          ))}

          <a
            href={data.moreLink}
            className="tl-vacancies__item tl-vacancies__item--more"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="tl-vacancies__more-inner">
              <span className="tl-vacancies__more-text">
                {data.moreText.split(' на ')[0]}<br />на {data.moreText.split(' на ')[1]}
                <svg className="tl-vacancies__more-icon" width="28" height="28" viewBox="0 0 60 60" fill="none">
                  <circle cx="10" cy="10" r="4" fill="currentColor"/>
                  <circle cx="24" cy="20" r="4" fill="currentColor"/>
                  <circle cx="38" cy="30" r="4" fill="currentColor"/>
                  <circle cx="24" cy="40" r="4" fill="currentColor"/>
                  <circle cx="10" cy="50" r="4" fill="currentColor"/>
                </svg>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Vacancies;
