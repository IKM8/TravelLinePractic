import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

function Team({ data }) {
  return (
    <section className="tl-team" id="team">
      <div className="tl-team__decor">
        <svg width="116" height="102" viewBox="0 0 116 102" fill="none">
          <circle cx="16" cy="2" r="2" fill="white"/>
          <circle cx="30" cy="2" r="2" fill="white"/>
          <circle cx="86" cy="2" r="2" fill="white"/>
          <circle cx="100" cy="2" r="2" fill="white"/>
          <circle cx="2" cy="16" r="2" fill="white"/>
          <circle cx="16" cy="16" r="2" fill="white"/>
          <circle cx="30" cy="16" r="2" fill="white"/>
          <circle cx="44" cy="16" r="2" fill="white"/>
          <circle cx="72" cy="16" r="2" fill="white"/>
          <circle cx="86" cy="16" r="2" fill="white"/>
          <circle cx="100" cy="16" r="2" fill="white"/>
          <circle cx="114" cy="16" r="2" fill="white"/>
          <circle cx="2" cy="30" r="2" fill="white"/>
          <circle cx="16" cy="30" r="2" fill="white"/>
          <circle cx="30" cy="30" r="2" fill="white"/>
          <circle cx="44" cy="30" r="2" fill="white"/>
          <circle cx="58" cy="30" r="2" fill="white"/>
          <circle cx="72" cy="30" r="2" fill="white"/>
          <circle cx="86" cy="30" r="2" fill="white"/>
          <circle cx="100" cy="30" r="2" fill="white"/>
          <circle cx="114" cy="30" r="2" fill="white"/>
          <circle cx="2" cy="44" r="2" fill="white"/>
          <circle cx="16" cy="44" r="2" fill="white"/>
          <circle cx="30" cy="44" r="2" fill="white"/>
          <circle cx="44" cy="44" r="2" fill="white"/>
          <circle cx="58" cy="44" r="2" fill="white"/>
          <circle cx="72" cy="44" r="2" fill="white"/>
          <circle cx="86" cy="44" r="2" fill="white"/>
          <circle cx="100" cy="44" r="2" fill="white"/>
          <circle cx="114" cy="44" r="2" fill="white"/>
          <circle cx="16" cy="58" r="2" fill="white"/>
          <circle cx="30" cy="58" r="2" fill="white"/>
          <circle cx="44" cy="58" r="2" fill="white"/>
          <circle cx="58" cy="58" r="2" fill="white"/>
          <circle cx="72" cy="58" r="2" fill="white"/>
          <circle cx="86" cy="58" r="2" fill="white"/>
          <circle cx="100" cy="58" r="2" fill="white"/>
          <circle cx="30" cy="72" r="2" fill="white"/>
          <circle cx="44" cy="72" r="2" fill="white"/>
          <circle cx="58" cy="72" r="2" fill="white"/>
          <circle cx="72" cy="72" r="2" fill="white"/>
          <circle cx="86" cy="72" r="2" fill="white"/>
          <circle cx="44" cy="86" r="2" fill="white"/>
          <circle cx="58" cy="86" r="2" fill="white"/>
          <circle cx="72" cy="86" r="2" fill="white"/>
          <circle cx="58" cy="100" r="2" fill="white"/>
        </svg>
      </div>
      <div className="tl-team__header-wrapper">
        <div className="tl-team__header">
          <h2 className="tl-team__title">Любим и бережем свою команду</h2>
          <p className="tl-team__subtitle">300+ человек, которые вдохновляют своими достижениями</p>
        </div>
      </div>
      <div className="tl-team__slider-wrapper">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            stopOnLastSlide: false,
          }}
          speed={10000}
          slidesPerView="auto"
          spaceBetween={20}
          className="tl-team__slider"
          allowTouchMove={false}
        >
          {data.map((member, i) => (
            <SwiperSlide key={member.id || i} className="tl-team__slide">
              <div className="tl-team__card">
                <div className="tl-team__card-image">
                  <img src={member.photo_url} alt={member.name} />
                  <div className="tl-team__card-overlay">
                    <span className="tl-team__card-name">{member.name}</span>
                    <span className="tl-team__card-position">{member.position}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Team;
