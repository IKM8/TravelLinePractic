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
  const [mt, setMt] = useState(0);

  useEffect(() => {
    fetch('/api/page-data')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Ошибка:', err));
  }, []);

  useLayoutEffect(() => {
    if (heroRef.current) {
      setMt(heroRef.current.offsetHeight);
    }
  }, [data]);

  if (!data) {
    return <div className="tl-loading">Загрузка...</div>;
  }

  const contentStyle = { marginTop: mt, position: 'relative', zIndex: 1, background: '#fff' };

  return (
    <div>
      <Header />
      <div className="tl-hero-fixed" ref={heroRef}>
        <Hero data={data.hero} />
      </div>
      {mt > 0 && (
        <div style={contentStyle}>
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