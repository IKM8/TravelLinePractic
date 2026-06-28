# Мини-конструктор сайтов travelline.tech

Копия сайта travelline.tech с админкой, PostgreSQL, Docker.

## Запуск

```bash
git clone https://github.com/IKM8/TravelLinePractic.git
cd TravelLinePractic
cp .env.example .env
docker-compose up --build
```

Открыть http://localhost:5000

## Требования

- Docker и Docker Compose
- Git

## Команды

| Команда | Описание |
|---|---|
| `cp .env.example .env` | Создать файл с настройками |
| `docker-compose up --build` | Собрать и запустить |
| `docker-compose down` | Остановить |

## API

- `GET /api/page-data` — получить все секции
- `POST /api/page-data` — сохранить секции (тело: JSON-объект)

## Админка

Открыть http://localhost:5000/admin — редактирование контента сайта.

**Логин и пароль для входа** задаются в файле `.env` (переменные `ADMIN_EMAIL` и `ADMIN_PASSWORD`).  
После копирования из `.env.example` используются значения по умолчанию — их можно поменять перед запуском.