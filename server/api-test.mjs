const BASE = 'http://localhost:5000';

const ok = (msg) => console.log(`  ✓ ${msg}`);
const fail = (msg, err) => { console.log(`  ✗ ${msg}: ${err.message}`); process.exit(1); };

async function test() {
  console.log('API smoke test\n');

  // GET /api/page-data — должна вернуть все секции
  const res1 = await fetch(`${BASE}/api/page-data`);
  if (res1.status !== 200) fail('GET /api/page-data', new Error(`status ${res1.status}`));
  const data = await res1.json();
  const keys = Object.keys(data);
  const expected = ['hero', 'platform', 'brands', 'team', 'directions', 'vacancies', 'gallery', 'work', 'bonus', 'contact'];
  for (const k of expected) {
    if (!keys.includes(k)) fail(`секция "${k}" отсутствует`, new Error('missing key'));
  }
  ok(`все ${expected.length} секций на месте: ${keys.join(', ')}`);

  // Логин для получения токена
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD env vars required');
  const loginRes = await fetch(`${BASE}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: adminEmail, password: adminPassword }),
  });
  if (loginRes.status !== 200) fail('POST /api/login', new Error(`status ${loginRes.status}`));
  const { token } = await loginRes.json();
  ok('получен токен');

  // POST /api/page-data — сохраняет данные
  data.hero.title = ['Новый заголовок', 'тест'];
  const res2 = await fetch(`${BASE}/api/page-data`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (res2.status !== 200) fail('POST /api/page-data', new Error(`status ${res2.status}`));
  ok('данные сохранены');

  // Проверить что сохранилось
  const res3 = await fetch(`${BASE}/api/page-data`);
  const saved = await res3.json();
  if (saved.hero.title[0] !== 'Новый заголовок') fail('данные не применились', new Error('mismatch'));
  ok('данные прочитаны обратно — совпадают');

  // Вернуть как было
  saved.hero.title = ['Стабильно растем', 'и принимаем новые вызовы', 'TravelTech индустрии'];
  await fetch(`${BASE}/api/page-data`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(saved),
  });
  ok('оригинальные данные восстановлены');

  console.log(`\n✓ Все ${expected.length} проверок пройдены`);
}

test().catch(e => { fail('общая ошибка', e); });
