function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");

  if (!token || !token.startsWith("token-practica-")) {
    return res.status(401).json({
      ok: false,
      mensaje: "Acceso no autorizado. Debe iniciar sesión."
    });
  }

  req.usuarioPractica = {
    token
  };

  next();
}

module.exports = authMiddleware;