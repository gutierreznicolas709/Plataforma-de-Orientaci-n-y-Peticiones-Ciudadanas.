const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { listarPeticiones } = require("../services/peticiones.service");

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

module.exports = router;