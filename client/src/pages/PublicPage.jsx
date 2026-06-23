import { useState, useEffect } from 'react';
import Hero from '../components/Hero';

function PublicPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/page-data')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Ошибка:', err));
  }, []);

  if (!data) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      {/* Передаем hero данные в компонент */}
      <Hero data={data.hero} />
    </div>
  );
}

export default PublicPage;