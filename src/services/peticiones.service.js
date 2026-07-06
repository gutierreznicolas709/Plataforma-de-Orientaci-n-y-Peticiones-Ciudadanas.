const solicitudesMock = [
  {
    id: 1,
    fecha: "2026-06-08",
    entidad: "Entidad pública de ejemplo",
    asunto: "Solicitud de información pública",
    tipoPeticion: "informacion_publica",
    estado: "pendiente_revision",
    linkDocumento: null,
    observaciones: "Documento pendiente de generación en Google Docs."
  },
  {
    id: 2,
    fecha: "2026-06-08",
    entidad: "Inspección de Policía de ejemplo",
    asunto: "Orientación sobre ruta institucional",
    tipoPeticion: "orientacion_ruta",
    estado: "borrador_generado",
    linkDocumento: "https://docs.google.com/document/d/ejemplo",
    observaciones: "Documento de práctica. No contiene datos reales."
  },
  {
    id: 3,
    fecha: "2026-06-08",
    entidad: "Secretaría de ejemplo",
    asunto: "Solicitud de copias",
    tipoPeticion: "copias",
    estado: "requiere_ajuste",
    linkDocumento: null,
    observaciones: "Falta especificar qué documentos se solicitan."
  }
];

const estadosPermitidos = [
  "borrador_generado",
  "pendiente_revision",
  "requiere_ajuste",
  "revisado",
  "listo_para_envio",
  "enviado",
  "cerrado"
];

async function listarPeticiones() {
  return solicitudesMock;
}

async function cambiarEstadoPeticion(id, nuevoEstado, observaciones) {
  const idNumerico = Number(id);

  if (!estadosPermitidos.includes(nuevoEstado)) {
    return {
      ok: false,
      codigo: 400,
      mensaje: "Estado no permitido."
    };
  }

  const peticion = solicitudesMock.find((item) => item.id === idNumerico);

  if (!peticion) {
    return {
      ok: false,
      codigo: 404,
      mensaje: "Petición no encontrada."
    };
  }

  peticion.estado = nuevoEstado;
  peticion.observaciones = observaciones || peticion.observaciones;
  peticion.fechaActualizacion = new Date().toISOString();

  return {
    ok: true,
    codigo: 200,
    mensaje: "Estado actualizado correctamente.",
    peticion
  };
}

module.exports = {
  listarPeticiones,
  cambiarEstadoPeticion,
  estadosPermitidos
};