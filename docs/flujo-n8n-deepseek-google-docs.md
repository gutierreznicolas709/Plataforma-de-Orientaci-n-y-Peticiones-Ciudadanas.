# Flujo n8n - DeepSeek, Google Docs, Google Sheets y Telegram

## Objetivo

Recibir datos del formulario de derecho de petición, mejorar redacción con DeepSeek, crear documento editable, registrar seguimiento y enviar alerta no sensible.

## Flujo

1. Webhook recibe datos desde Node.js.
2. Validación básica de campos.
3. HTTP Request a DeepSeek.
4. Obtención del texto generado.
5. Creación de Google Docs editable.
6. Registro en Google Sheets.
7. Envío de mensaje no sensible por Telegram.
8. Respuesta a Node.js con estado y enlace.

## Webhook

- Método: POST
- Path: generar-peticion
- URL de prueba: configurar en `.env` local como `N8N_WEBHOOK_PETICION`

## Seguridad

- No subir `.env`.
- No pegar API keys en código.
- No enviar datos reales en clase.
- No enviar texto completo por Telegram.