# Clase 48 - Formulario funcional y conexión inicial con Node.js

## Objetivo

Crear el formulario funcional de derecho de petición, generar vista previa local, copiar borrador y enviar datos al backend Node.js.

## Tarjetas ClickUp

- HU-03 - Crear formulario de derecho de petición
- HU-04 - Conectar Node.js con n8n

## Archivos modificados

- `public/peticion.html`
- `public/js/peticion.js`
- `public/css/styles.css`
- `src/routes/peticiones.routes.js`
- `src/services/n8n.service.js`
- `server.js`
- `.env.example`

## Ruta creada

POST /api/peticiones/generar

## Modo actual

La conexión con n8n funciona en modo mock si no existe N8N_WEBHOOK_PETICION.

## Próxima clase

Configurar n8n, DeepSeek, Google Docs, Google Sheets y Telegram.