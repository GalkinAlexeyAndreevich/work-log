# Work Log

Тестовое задание - fullstack-проект для ведения журнала работ.

## Стек

### Frontend
- React + TypeScript + Vite
- Mantine
- React Query
- react-hook-form + zod

Выбран для быстрой разработки, типобезопасности и удобной работы с UI, формами и серверными данными.

### Backend
- NestJS + TypeScript
- Prisma

Выбран из-за модульной архитектуры, удобной организации API и типизированной работы с базой данных.

### Database
- MySQL 8.4

Надежная реляционная база данных для хранения связанных данных и работы со сложными запросами.

### Infrastructure
- Docker Compose

Используется для быстрого запуска всех сервисов проекта в едином окружении.

## Быстрый запуск (рекомендуемый)

Требования:
- установлен Docker Desktop
- свободны порты `5175`, `8000`, `3307`

В корне проекта:

```bash
docker compose up --build
```

После старта:
- Frontend: [http://localhost:5175](http://localhost:5175)
- Backend: [http://localhost:8000](http://localhost:8000)

Остановка:

```bash
docker compose down
```

Остановка с удалением volume БД:

```bash
docker compose down -v
```

## Что поднимает compose

- `mysql` на `3307`
- `backend` на `8000`
- `frontend` на `5175`

## Полезные команды

Просмотр логов:

```bash
docker compose logs -f
```

Перезапуск одного сервиса:

```bash
docker compose restart backend
docker compose restart frontend
```
