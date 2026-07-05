async function iniciarSesion(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const resultado = document.getElementById("resultadoLogin");

  if (!email || !password) {
    resultado.textContent = "Correo y contraseña son obligatorios.";
    return;
  }

  resultado.textContent = "Validando credenciales...";

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      resultado.textContent = data.mensaje || "No fue posible iniciar sesión.";
      return;
    }

    localStorage.setItem("tokenPractica", data.tokenPractica);
    localStorage.setItem("usuarioPractica", JSON.stringify(data.usuario));

    resultado.innerHTML = `
      <p><strong>${data.mensaje}</strong></p>
      <p>Usuario: ${data.usuario.nombre}</p>
      <p>Rol: ${data.usuario.rol}</p>
      <p>Token de práctica guardado en el navegador.</p>
      <p><a href="/zona-protegida.html">Ir a zona protegida</a></p>
    `;
  } catch (error) {
    resultado.textContent = "Error al conectar con el servidor.";
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("formLogin").addEventListener("submit", iniciarSesion);
});