const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set');
  process.exit(1);
}

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const DATA_FILE = path.join(__dirname, '../data/data.json');

function readDataFromFile() {
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(raw);
}

async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sections (
        key TEXT PRIMARY KEY,
        data JSONB NOT NULL
      )
    `);

    const { rowCount } = await pool.query('SELECT 1 FROM sections LIMIT 1');
    if (rowCount === 0) {
      console.log('Importing data from data.json...');
      const data = readDataFromFile();
      for (const [key, value] of Object.entries(data)) {
        await pool.query(
          'INSERT INTO sections (key, data) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET data = $2',
          [key, JSON.stringify(value)]
        );
      }
      console.log('Data imported successfully');
    }
  } catch (err) {
    console.warn('PostgreSQL недоступен, данные из файла:', err.message);
  }
}

app.get('/api/page-data', async (req, res) => {
  if (process.env.DEV_MODE) {
    try {
      return res.json(readDataFromFile());
    } catch { /* fall through */ }
  }
  try {
    const result = await pool.query('SELECT key, data FROM sections');
    const data = {};
    for (const row of result.rows) {
      data[row.key] = row.data;
    }
    res.json(data);
  } catch {
    try {
      res.json(readDataFromFile());
    } catch {
      res.status(500).json({ error: 'Ошибка загрузки данных' });
    }
  }
});

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    req.user = jwt.verify(auth.slice(7), JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token });
  }
  return res.status(401).json({ error: 'Неверный email или пароль' });
});

app.get('/api/me', authMiddleware, (req, res) => {
  res.json({ email: req.user.email });
});

app.post('/api/page-data', authMiddleware, async (req, res) => {
  try {
    const data = req.body;
    for (const [key, value] of Object.entries(data)) {
      await pool.query(
        'INSERT INTO sections (key, data) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET data = $2',
        [key, JSON.stringify(value)]
      );
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

if (!process.env.DEV_MODE) {
  const staticDir = path.join(__dirname, '../client/dist');
  if (fs.existsSync(staticDir)) {
    app.use(express.static(staticDir));
    app.use((req, res, next) => {
      if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(staticDir, 'index.html'));
      } else {
        next();
      }
    });
  }
}

initDB();
app.listen(PORT, () => {
  console.log(`Сервер на http://localhost:${PORT}`);
});
