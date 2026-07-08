const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { generarWordPeticion } = require("../services/word.service");

const router = express.Router();

router.get("/peticiones/:id/word", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const peticionDemo = {
      id,
      ciudad: "Bogotá D.C.",
      fecha: "2026-06-08",
      entidad: "Entidad pública de ejemplo",
      asunto: "Solicitud de información pública",
      nombre: "Ciudadano de práctica",
      tipoDocumento: "PRACTICA",
      documento: "0000000000",
      correo: "correo_prueba@example.com",
      hechos: "Este es un caso de práctica. No contiene datos reales.",
      solicitud: "Solicito información pública de práctica para efectos pedagógicos.",
      anexos: "No se anexan documentos."
    };

    const { fileName, filePath } = await generarWordPeticion(peticionDemo);

    return res.download(filePath, fileName);
  } catch (error) {
    console.error("Error al generar Word:", error.message);

    return res.status(500).json({
      ok: false,
      mensaje: "No fue posible generar el documento Word."
    });
  }
});

module.exports = router;