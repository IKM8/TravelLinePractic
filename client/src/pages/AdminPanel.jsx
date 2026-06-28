import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateData } from '../utils/updateData';
import { s } from '../utils/adminStyles';
import HeroSection from '../components/admin/HeroSection';
import StatsSection from '../components/admin/StatsSection';
import TeamSection from '../components/admin/TeamSection';
import PlatformSection from '../components/admin/PlatformSection';
import BrandsSection from '../components/admin/BrandsSection';
import DirectionsSection from '../components/admin/DirectionsSection';
import VacanciesSection from '../components/admin/VacanciesSection';
import GallerySection from '../components/admin/GallerySection';
import WorkSection from '../components/admin/WorkSection';
import BonusSection from '../components/admin/BonusSection';
import ContactSection from '../components/admin/ContactSection';
import SaveBar from '../components/admin/SaveBar';

const API = '/api/page-data';

function AdminPanel() {
  const { token, logout } = useAuth();
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', ok: false });
  const [techIconsList, setTechIconsList] = useState([
    'hz','tarantool','cs','sql','redis','postgresql','clickhouse','net',
    'react','typescript','webpack','vite','jest','testing-library','sass',
    'swagger','git','java','selenium','testng','testit','fiddler','jenkins','postman','stack',
    'figma','python','mssql',
  ]);

  const addTechIcon = name => setTechIconsList(prev => prev.includes(name) ? prev : [...prev, name]);

  const authHeaders = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(setData)
      .catch(() => setMessage({ text: 'Ошибка загрузки', ok: false }));
  }, []);

  const save = async () => {
    setSaving(true);
    setMessage({ text: '', ok: false });
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(data),
      });
      if (res.status === 401) { logout(); return; }
      const result = await res.json();
      setMessage({ text: result.success ? 'Сохранено!' : 'Ошибка при сохранении', ok: result.success });
    } catch {
      setMessage({ text: 'Ошибка соединения с сервером', ok: false });
    }
    setSaving(false);
  };

  const update = (path, value) => setData(prev => updateData(prev, path, value));

  if (!data) return <div style={s.loading}>Загрузка...</div>;

  return (
    <div style={s.page}>
      <header style={s.header}>
        <div style={s.headerInner}>
          <h1 style={s.title}>Админ-панель</h1>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <a href="/" style={s.link}>На сайт</a>
            <button onClick={logout} style={{ ...s.link, border: 'none', background: 'none', cursor: 'pointer' }}>Выйти</button>
          </div>
        </div>
      </header>
      <main style={s.main}>
        <HeroSection data={data} update={update} />
        <StatsSection data={data} update={update} />
        <TeamSection data={data} update={update} />
        <PlatformSection data={data} update={update} />
        <BrandsSection data={data} update={update} />
        <DirectionsSection data={data} update={update} techIconsList={techIconsList} addTechIcon={addTechIcon} />
        <VacanciesSection data={data} update={update} />
        <GallerySection data={data} update={update} />
        <WorkSection data={data} update={update} />
        <BonusSection data={data} update={update} />
        <ContactSection data={data} update={update} />
        <SaveBar saving={saving} message={message} onSave={save} />
      </main>
    </div>
  );
}

export default AdminPanel;
