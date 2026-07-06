function generarBorradorLocal(datos) {
  const orientacion = mensajeAyudaPorTipo(datos.tipoPeticion);

  return `${datos.ciudad}, ${datos.fecha}

Señores
${datos.entidad}

Asunto: ${datos.asunto}

Tipo de solicitud o ruta: ${datos.tipoPeticion}

Orientación inicial:
${orientacion}

Yo, ${datos.nombre}, identificado(a) con ${datos.tipoDocumento} No. ${datos.documento}, respetuosamente presento la siguiente solicitud u orientación inicial.

1. Hechos o contexto

${datos.hechos}

2. Solicitud u orientación requerida

${datos.solicitud}

3. Finalidad

La presente solicitud se formula con fines de participación ciudadana, transparencia, control social, acceso a información pública u orientación institucional, según corresponda al caso.

4. Medio de notificación

Agradezco remitir la respuesta al siguiente correo electrónico:

${datos.correo}

5. Anexos

${datos.anexos || "No se indican anexos."}

Atentamente,

${datos.nombre}
${datos.tipoDocumento} ${datos.documento}
${datos.correo}

Advertencia: Este documento es un borrador editable de apoyo pedagógico. Debe ser revisado antes de radicarse o usarse. La plataforma orienta, pero no reemplaza asesoría jurídica ni decisión de autoridad competente.`;
}