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

async function listarPeticiones() {
  return solicitudesMock;
}

module.exports = {
  listarPeticiones
};