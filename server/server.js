const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const DATA_FILE = path.join(__dirname, '../data/data.json');

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS sections (
      key TEXT PRIMARY KEY,
      data JSONB NOT NULL
    )
  `);

  const { rowCount } = await pool.query('SELECT 1 FROM sections LIMIT 1');
  if (rowCount === 0) {
    console.log('Importing data from data.json...');
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const data = JSON.parse(raw);
    for (const [key, value] of Object.entries(data)) {
      await pool.query(
        'INSERT INTO sections (key, data) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET data = $2',
        [key, JSON.stringify(value)]
      );
    }
    console.log('Data imported successfully');
  }
}

app.get('/api/page-data', async (req, res) => {
  try {
    const result = await pool.query('SELECT key, data FROM sections');
    const data = {};
    for (const row of result.rows) {
      data[row.key] = row.data;
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/page-data', async (req, res) => {
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

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Сервер на http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
