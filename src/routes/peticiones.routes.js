const express = require("express");
const { enviarPeticionAN8n } = require("../services/n8n.service");
const { prepararDocumentoEditable } = require("../services/documento.service");
const router = express.Router();

function validarPeticion(datos) {
  const campos = [
    "ciudad",
    "fecha",
    "entidad",
    "nombre",
    "tipoDocumento",
    "documento",
    "correo",
    "tipoPeticion",
    "asunto",
    "hechos",
    "solicitud"
  ];

  for (const campo of campos) {
    if (!datos[campo]) {
      return `El campo ${campo} es obligatorio.`;
    }
  }

  return null;
}

router.post("/generar", async (req, res) => {
  try {
    const datos = req.body;
    const error = validarPeticion(datos);
const documentoEditable = await prepararDocumentoEditable(datos);
    
   if (error) {
      return res.status(400).json({
        ok: false,
        mensaje: error
      });
    }

    const resultadoN8n = await enviarPeticionAN8n({
      ...datos,
      origen: "nodejs",
      clase: 48,
      modulo: 5,
      fechaRecepcion: new Date().toISOString()
    });

    return res.json({
  ok: true,
  mensaje: "Solicitud recibida correctamente.",
  modo: resultadoN8n.modo || "n8n",
  estado: resultadoN8n.estado || "recibida",
  linkDocumento: resultadoN8n.linkDocumento || documentoEditable.linkGoogleDoc || null,
  documentoEditable
});
  } catch (error) {
    console.error("Error al generar petición:", error.message);

    return res.status(500).json({
      ok: false,
      mensaje: error.message.includes("Error al conectar con n8n")
        ? error.message
        : "No fue posible generar la petición en este momento."
    });
  }
});

module.exports = router;
