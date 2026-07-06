# Clase 53 - Revisión y cambio de estado

## Objetivo

Agregar al dashboard la capacidad de cambiar el estado de una petición y registrar observaciones de revisión.

## Tarjeta ClickUp

HU-10 - Cambiar estado de petición

## Archivos creados o modificados

- `src/services/peticiones.service.js`
- `src/routes/dashboard.routes.js`
- `public/dashboard.html`
- `public/js/dashboard.js`
- `docs/checklist-revision-revisor.md`

## Ruta creada

PATCH /api/dashboard/peticiones/:id/estado

## Estados disponibles

- borrador_generado
- pendiente_revision
- requiere_ajuste
- revisado
- listo_para_envio
- enviado
- cerrado

## Advertencia

Los cambios funcionan en modo mock. En una versión real se podrían sincronizar con Google Sheets mediante n8n.