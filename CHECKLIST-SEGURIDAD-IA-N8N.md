# Checklist de Seguridad IA/n8n - Semana 10

## Variables y secretos

- [ ] `.env` no está en GitHub.
- [ ] `.gitignore` contiene `.env`.
- [ ] No se subieron API keys.
- [ ] No se subieron tokens de Telegram.
- [ ] No se subieron claves compartidas.
- [ ] Las credenciales se guardan en n8n o entorno seguro.

## IA

- [ ] No se envían datos reales a DeepSeek.
- [ ] No se envían datos sensibles.
- [ ] El prompt prohíbe inventar hechos.
- [ ] El prompt prohíbe inventar pruebas.
- [ ] El texto generado se considera borrador.

## n8n

- [ ] Webhook documentado.
- [ ] URL de prueba no se publica con datos sensibles.
- [ ] URL de producción queda pendiente o protegida.
- [ ] Se usa clave compartida si aplica.
- [ ] Se documentan bloqueos.

## Google

- [ ] Google Docs no se comparte públicamente con datos reales.
- [ ] Google Sheets no guarda secretos.
- [ ] Solo se usan datos de práctica.

## Telegram

- [ ] El mensaje es no sensible.
- [ ] No se envía texto completo.
- [ ] No se envían documentos de identidad.
- [ ] No se envían hechos delicados