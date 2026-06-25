const TITLE_COLORS = ['#a456c3','#48af45','#eb4836','#6667d4','#d86ab3','#00a2bc','#20a781','#00a2bc'];

function Bonus({ data }) {
  if (!data || !data.items) return null;

  return (
    <section className="tl-bonus" id="bonus">
      <div className="tl-bonus__inner">
        <h2 className="tl-bonus__title">
          {data.title}
          <svg width="116" height="102" viewBox="0 0 116 102" fill="none">
            <circle cx="16" cy="2" r="2" fill="#507BCE"/>
            <circle cx="30" cy="2" r="2" fill="#507BCE"/>
            <circle cx="86" cy="2" r="2" fill="#507BCE"/>
            <circle cx="100" cy="2" r="2" fill="#507BCE"/>
            <circle cx="2" cy="16" r="2" fill="#507BCE"/>
            <circle cx="16" cy="16" r="2" fill="#507BCE"/>
            <circle cx="30" cy="16" r="2" fill="#507BCE"/>
            <circle cx="44" cy="16" r="2" fill="#507BCE"/>
            <circle cx="72" cy="16" r="2" fill="#507BCE"/>
            <circle cx="86" cy="16" r="2" fill="#507BCE"/>
            <circle cx="100" cy="16" r="2" fill="#507BCE"/>
            <circle cx="114" cy="16" r="2" fill="#507BCE"/>
            <circle cx="2" cy="30" r="2" fill="#507BCE"/>
            <circle cx="16" cy="30" r="2" fill="#507BCE"/>
            <circle cx="30" cy="30" r="2" fill="#507BCE"/>
            <circle cx="44" cy="30" r="2" fill="#507BCE"/>
            <circle cx="58" cy="30" r="2" fill="#507BCE"/>
            <circle cx="72" cy="30" r="2" fill="#507BCE"/>
            <circle cx="86" cy="30" r="2" fill="#507BCE"/>
            <circle cx="100" cy="30" r="2" fill="#507BCE"/>
            <circle cx="114" cy="30" r="2" fill="#507BCE"/>
            <circle cx="2" cy="44" r="2" fill="#507BCE"/>
            <circle cx="16" cy="44" r="2" fill="#507BCE"/>
            <circle cx="30" cy="44" r="2" fill="#507BCE"/>
            <circle cx="44" cy="44" r="2" fill="#507BCE"/>
            <circle cx="58" cy="44" r="2" fill="#507BCE"/>
            <circle cx="72" cy="44" r="2" fill="#507BCE"/>
            <circle cx="86" cy="44" r="2" fill="#507BCE"/>
            <circle cx="100" cy="44" r="2" fill="#507BCE"/>
            <circle cx="114" cy="44" r="2" fill="#507BCE"/>
            <circle cx="16" cy="58" r="2" fill="#507BCE"/>
            <circle cx="30" cy="58" r="2" fill="#507BCE"/>
            <circle cx="44" cy="58" r="2" fill="#507BCE"/>
            <circle cx="58" cy="58" r="2" fill="#507BCE"/>
            <circle cx="72" cy="58" r="2" fill="#507BCE"/>
            <circle cx="86" cy="58" r="2" fill="#507BCE"/>
            <circle cx="100" cy="58" r="2" fill="#507BCE"/>
            <circle cx="30" cy="72" r="2" fill="#507BCE"/>
            <circle cx="44" cy="72" r="2" fill="#507BCE"/>
            <circle cx="58" cy="72" r="2" fill="#507BCE"/>
            <circle cx="72" cy="72" r="2" fill="#507BCE"/>
            <circle cx="86" cy="72" r="2" fill="#507BCE"/>
            <circle cx="44" cy="86" r="2" fill="#507BCE"/>
            <circle cx="58" cy="86" r="2" fill="#507BCE"/>
            <circle cx="72" cy="86" r="2" fill="#507BCE"/>
            <circle cx="58" cy="100" r="2" fill="#507BCE"/>
          </svg>
        </h2>

        <div className="tl-bonus__list">
          {data.items.map((item, i) => (
            <article key={i} className="tl-bonus__item" style={i < 8 ? { gridArea: `item-${i + 1}` } : undefined}>
              <h3 className="tl-bonus__item-title" style={{ color: TITLE_COLORS[i % TITLE_COLORS.length] }}>
                {item.title}
              </h3>
              <p className="tl-bonus__item-text">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Bonus;
