# Plataforma de Orientación y Peticiones Ciudadanas

## Descripción

Proyecto pedagógico del Módulo 5 del programa Programadores para la Paz.

La plataforma permite:

- Login simple con usuarios de práctica.
- Formulario de derecho de petición.
- Orientación sobre rutas ciudadanas.
- Vista previa de borrador.
- Dashboard de seguimiento.
- Cambio de estado y observaciones.
- Preparación de documento editable.
- Descarga de Word `.docx`.
- Notificación Telegram no sensible documentada.

## Advertencia

El sistema genera borradores de práctica. No reemplaza asesoría jurídica, no radica documentos y no debe usarse con datos reales durante la clase.

## Instalación

```bash
npm install
npm start
````

## Rutas principales

* `/login.html`
* `/peticion.html`
* `/dashboard.html`
* `POST /api/peticiones/generar`
* `GET /api/dashboard/peticiones`
* `PATCH /api/dashboard/peticiones/:id/estado`
* `GET /api/documentos/peticiones/:id/word`

## Usuarios de práctica

* `ciudadano@example.com / 123456`
* `revisor@example.com / 123456`
* `admin@example.com / 123456`

## Seguridad

* No subir `.env`.
* No subir tokens.
* No usar datos reales.
* Telegram solo notifica.
* El Word se descarga desde la plataforma.