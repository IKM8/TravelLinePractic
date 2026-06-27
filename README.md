# Мини-конструктор сайтов travelline.tech

Копия сайта travelline.tech с админкой, PostgreSQL, Docker.

## Запуск

```bash
git clone https://github.com/IKM8/TravelLinePractic.git
cd TravelLinePractic
docker-compose up --build
```

Открыть http://localhost:5000

## Требования

- Docker и Docker Compose
- Git

## Команды

| Команда | Описание |
|---|---|
| `docker-compose up --build` | Собрать и запустить |
| `docker-compose down` | Остановить |
## API

- `GET /api/page-data` — получить все секции
- `POST /api/page-data` — сохранить секции (тело: JSON-объект)

## Админка

Открыть http://localhost:5000/admin — редактирование контента сайта