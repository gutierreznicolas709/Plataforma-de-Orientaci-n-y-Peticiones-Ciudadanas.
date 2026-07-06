const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  listarPeticiones,
  cambiarEstadoPeticion
} = require("../services/peticiones.service");

const router = express.Router();

router.get("/peticiones", authMiddleware, async (req, res) => {
  try {
    const peticiones = await listarPeticiones();

    return res.json({
      ok: true,
      modo: "mock",
      total: peticiones.length,
      peticiones
    });
  } catch (error) {
    console.error("Error al listar peticiones:", error.message);

    return res.status(500).json({
      ok: false,
      mensaje: "No fue posible consultar las peticiones."
    });
  }
});

router.patch("/peticiones/:id/estado", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, observaciones } = req.body;

    if (!estado) {
      return res.status(400).json({
        ok: false,
        mensaje: "El estado es obligatorio."
      });
    }

    const resultado = await cambiarEstadoPeticion(id, estado, observaciones);

    if (!resultado.ok) {
      return res.status(resultado.codigo).json({
        ok: false,
        mensaje: resultado.mensaje
      });
    }

    return res.json({
      ok: true,
      mensaje: resultado.mensaje,
      modo: "mock",
      peticion: resultado.peticion
    });
  } catch (error) {
    console.error("Error al cambiar estado:", error.message);

    return res.status(500).json({
      ok: false,
      mensaje: "No fue posible actualizar el estado."
    });
  }
});

module.exports = router;