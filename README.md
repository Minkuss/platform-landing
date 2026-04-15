## Landing (Next.js)

Проект настроен для деплоя в GitHub Pages через GitHub Actions.

## Локальный запуск

```bash
npm run dev
```

## Деплой в GitHub Pages (Actions)

1. Запушить изменения в `main` (или `master`).
2. В GitHub открыть `Settings` -> `Pages`.
3. В блоке `Build and deployment` выбрать `Source: GitHub Actions`.
4. После этого workflow `.github/workflows/deploy-pages.yml` будет автоматически публиковать сайт.

## Как это работает

- Для Pages используется статический экспорт Next.js (`output: "export"`).
- В Actions автоматически вычисляется `BASE_PATH`:
  - для репозитория вида `username.github.io` -> без префикса;
  - для обычного репозитория -> `/<repo-name>`.
- Артефакт деплоя берется из папки `out/`.

## Команды

```bash
npm run dev
npm run build
npm run lint
```
