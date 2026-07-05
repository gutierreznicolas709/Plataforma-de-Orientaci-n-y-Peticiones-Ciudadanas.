const express = require("express");
const users = require("../data/users.json");

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      ok: false,
      mensaje: "Correo y contraseña son obligatorios."
    });
  }

  const user = users.find(
    (item) => item.email === email && item.password === password
  );

  if (!user) {
    return res.status(401).json({
      ok: false,
      mensaje: "Credenciales incorrectas."
    });
  }

  return res.json({
    ok: true,
    mensaje: "Inicio de sesión correcto.",
    usuario: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol
    },
    tokenPractica: `token-practica-${user.id}-${user.rol}`
  });
});

router.get("/me", (req, res) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");

  if (!token.startsWith("token-practica-")) {
    return res.status(401).json({
      ok: false,
      mensaje: "No autorizado."
    });
  }

  return res.json({
    ok: true,
    mensaje: "Token de práctica reconocido.",
    token
  });
});

module.exports = router;