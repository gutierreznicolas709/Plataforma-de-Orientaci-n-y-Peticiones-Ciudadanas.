function construirContenidoDocumento(datos) {
  return {
    titulo: `Derecho de petición - ${datos.asunto}`,
    contenido: `${datos.ciudad}, ${datos.fecha}

Señores
${datos.entidad}

Asunto: ${datos.asunto}

Tipo de solicitud o ruta: ${datos.tipoPeticion}

Yo, ${datos.nombre}, identificado(a) con ${datos.tipoDocumento} No. ${datos.documento}, respetuosamente presento el siguiente borrador de solicitud.

1. Hechos o contexto

${datos.hechos}

2. Solicitud u orientación requerida

${datos.solicitud}

3. Medio de notificación

Solicito que la respuesta sea enviada al correo:

${datos.correo}

4. Anexos

${datos.anexos || "No se indican anexos."}

Atentamente,

${datos.nombre}
${datos.tipoDocumento} ${datos.documento}
${datos.correo}

Advertencia:
Este documento es un borrador editable de apoyo pedagógico. Debe ser revisado antes de presentarse ante cualquier autoridad. No reemplaza asesoría jurídica ni garantiza el resultado de un trámite.`
  };
}

async function prepararDocumentoEditable(datos) {
  const documento = construirContenidoDocumento(datos);

  return {
    modo: "mock",
    mensaje: "Documento editable preparado en modo mock. Pendiente integración real con Google Docs.",
    titulo: documento.titulo,
    contenido: documento.contenido,
    linkGoogleDoc: null,
    linkWordDocx: null
  };
}

module.exports = {
  construirContenidoDocumento,
  prepararDocumentoEditable
};