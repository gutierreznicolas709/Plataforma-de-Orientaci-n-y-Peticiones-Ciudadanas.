# Preparación para Google Docs y Word

## Objetivo

La plantilla de derecho de petición debe estar preparada para convertirse en un documento editable.

## Salida mínima obligatoria

El sistema debe generar un documento editable en Google Docs.

## Salida deseable

Si el flujo lo permite, el documento podrá exportarse o descargarse como archivo Word `.docx`.

## Estructura recomendada para el documento

- Título.
- Ciudad y fecha.
- Entidad destinataria.
- Asunto.
- Identificación del solicitante.
- Hechos.
- Solicitudes.
- Medio de notificación.
- Firma o cierre.
- Advertencia de revisión.

## Variables que usará el flujo n8n

- ciudad
- fecha
- entidad
- nombre
- tipoDocumento
- documento
- correo
- asunto
- hechos
- solicitud
- tipoPeticion
- anexos
- textoGenerado
- linkGoogleDoc
- linkWordDocx, si aplica

## Reglas

- No insertar tokens.
- No insertar API keys.
- No insertar datos sensibles innecesarios.
- No enviar el texto completo por Telegram.
- Guardar el enlace del documento en Google Sheets.
- Mantener el documento como editable para revisión.