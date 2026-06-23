function Advantages({ data }) {
  const stats = data.stats || [];

  return (
    <section className="tl-advantages" id="advantages">
      <div className="tl-advantages__inner">
        {stats.map((stat, i) => (
          <div className="tl-advantages__row" key={i}>
            {stat.value ? (
              <span className="tl-advantages__value">{stat.value}</span>
            ) : (
              <span className="tl-advantages__value tl-advantages__value--logo">
                <img src="/tl-logo.svg" alt="tl-logo" width="80" height="80" />
              </span>
            )}
            <span className="tl-advantages__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Advantages;
