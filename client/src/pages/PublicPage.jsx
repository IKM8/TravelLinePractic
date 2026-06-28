import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Advantages from '../components/Advantages';
import Team from '../components/Team';
import Platform from '../components/Platform';
import Directions from '../components/Directions';
import Vacancies from '../components/Vacancies';
import Gallery from '../components/Gallery';
import Bonus from '../components/Bonus';
import Work from '../components/Work';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function PublicPage() {
  const [data, setData] = useState(null);
  const heroRef = useRef(null);
  const wrapperRef = useRef(null);
  const [mt, setMt] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    fetch('/api/page-data')
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(setData)
      .catch(() => setData({}));
  }, []);

  useLayoutEffect(() => {
    if (heroRef.current) {
      setMt(heroRef.current.offsetHeight);
    }
  }, [data]);

  useEffect(() => {
    setHeroVisible(true);
    const onScroll = () => setHeroVisible(window.scrollY < mt);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mt]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    let rafId;
    let transitionSet = false;
    let current = null;

    const check = () => {
      const gallery = document.getElementById('gallery');
      const work = document.getElementById('work');
      const contact = document.getElementById('contact-form');
      if (!gallery || !work || !contact) { rafId = requestAnimationFrame(check); return; }
      const sy = window.scrollY;
      const gt = gallery.getBoundingClientRect().top + sy - 100;
      const wt = work.getBoundingClientRect().top + sy - 300;
      const ct = contact.getBoundingClientRect().top + sy - 300;
      const isDark = (sy >= gt && sy < wt) || sy >= ct;
      const target = isDark ? '#12203b' : '#ffffff';
      if (target !== current) {
        current = target;
        if (!transitionSet) { el.style.transition = 'background-color .4s'; transitionSet = true; }
        el.style.backgroundColor = target;
      }
      rafId = requestAnimationFrame(check);
    };

    rafId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(rafId);
  }, [data, mt]);

  if (!data) {
    return <div className="tl-loading">Загрузка...</div>;
  }

  const contentStyle = { marginTop: mt, position: 'relative', backgroundColor: '#ffffff' };

  return (
    <div>
      <Header />
      <div className="tl-hero-fixed" ref={heroRef} style={{ visibility: heroVisible ? 'visible' : 'hidden' }}>
        <Hero data={data.hero} />
      </div>
      {mt > 0 && (
        <div style={contentStyle} ref={wrapperRef}>
          <Advantages data={data.hero} />
          <Team data={data.team} />
          <Platform data={data.platform} brands={data.brands} />
          <Directions data={data.directions} />
          <Vacancies data={data.vacancies} />
          <Gallery data={data.gallery}/>
          <Work data={data.work} />
          <Bonus data={data.bonus} />
          <Contact data={data.contact} />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default PublicPage;