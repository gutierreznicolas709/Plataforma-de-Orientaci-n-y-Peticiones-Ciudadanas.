require("dotenv").config();

const peticionesRoutes = require("./src/routes/peticiones.routes");
const express = require("express");
const path = require("path");
const authRoutes = require("./src/routes/auth.routes");
const app = express();
const dashboardRoutes = require("./src/routes/dashboard.routes");

const PORT = process.env.PORT || 3000;
const APP_NAME =
  process.env.APP_NAME || "Plataforma de Orientación y Peticiones Ciudadanas";
const APP_ENV = process.env.APP_ENV || "development";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/peticiones", peticionesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send(`
    <h1>${APP_NAME}</h1>
    <p>Proyecto final - Módulo 5</p>
    <p>Estado: aplicación base activa</p>
    <ul>
      <li><a href="/estado">Ver estado</a></li>
      <li><a href="/peticion.html">Formulario de petición - Próxima clase</a></li>
    </ul>
  `);
});

app.get("/estado", (req, res) => {
  res.json({
    estado: "activo",
    app: APP_NAME,
    entorno: APP_ENV,
    modulo: 5,
    semana: 10,
    clase: 46,
    mensaje: "Base del proyecto creada correctamente"
  });
});

app.use((req, res) => {

  res.status(404).json({
    error: "Ruta no encontrada",
    mensaje: "La ruta solicitada aún no existe o no ha sido creada."
  });
});

app.listen(PORT, () => {
  console.log("Servidor iniciado correctamente");
  console.log(`Aplicación: ${APP_NAME}`);
  console.log(`Entorno: ${APP_ENV}`);
  console.log(`Puerto: ${PORT}`);
});