# Documento editable Google Docs / Word

## Objetivo

Permitir que el derecho de petición generado por la plataforma pueda revisarse y editarse antes de ser usado.

## Salida mínima

Google Docs editable.

## Salida deseable

Exportación o descarga como archivo Word `.docx`.

## Flujo esperado

1. El usuario llena el formulario.
2. Node.js recibe los datos.
3. n8n procesa la solicitud.
4. DeepSeek mejora redacción si está configurado.
5. Google Docs crea el documento editable.
6. Google Sheets registra el enlace.
7. El dashboard muestra el enlace.
8. Si se habilita, el documento puede exportarse a Word.

## Variables sugeridas

- `GOOGLE_DOCS_FOLDER_ID`
- `GOOGLE_DOCS_TEMPLATE_ID`
- `EXPORT_WORD_ENABLED`

## Reglas

- No usar datos reales en clase.
- No compartir públicamente documentos con datos sensibles.
- No enviar el texto completo por Telegram.
- Mantener advertencia legal.
- El documento es borrador editable.