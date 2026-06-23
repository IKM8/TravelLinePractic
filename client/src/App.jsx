import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicPage from './pages/PublicPage';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;