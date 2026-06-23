import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Advantages from '../components/Advantages';
import Team from '../components/Team';

function PublicPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/page-data')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Ошибка:', err));
  }, []);

  if (!data) {
    return <div className="tl-loading">Загрузка...</div>;
  }

  return (
    <div>
      <Header />
      <Hero data={data.hero} />
      <Advantages data={data.hero} />
      <Team data={data.team} />
    </div>
  );
}

export default PublicPage;