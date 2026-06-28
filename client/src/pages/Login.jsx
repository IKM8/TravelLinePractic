import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const styles = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a1a', color: '#fff' },
  card: { background: '#14142a', padding: '40px', borderRadius: '12px', width: '360px', display: 'flex', flexDirection: 'column', gap: '16px' },
  title: { fontSize: '24px', fontWeight: 700, textAlign: 'center', margin: 0 },
  input: { padding: '12px 16px', borderRadius: '8px', border: '1px solid #2a2a4a', background: '#1a1a3a', color: '#fff', fontSize: '16px', outline: 'none' },
  btn: { padding: '12px', borderRadius: '8px', border: 'none', background: '#507bce', color: '#fff', fontSize: '16px', fontWeight: 600, cursor: 'pointer' },
  error: { color: '#ef5350', fontSize: '14px', textAlign: 'center', margin: 0 },
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка входа');
      login(data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h1 style={styles.title}>Вход в админ-панель</h1>
        <input style={styles.input} type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} required />
        <input style={styles.input} type="password" placeholder="Пароль" value={password}
          onChange={e => setPassword(e.target.value)} required />
        {error && <p style={styles.error}>{error}</p>}
        <button style={styles.btn} type="submit">Войти</button>
      </form>
    </div>
  );
}
