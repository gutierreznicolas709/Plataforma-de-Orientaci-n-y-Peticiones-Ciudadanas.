async function validarAcceso() {
  const token = localStorage.getItem("tokenPractica");
  const usuario = localStorage.getItem("usuarioPractica");

  const usuarioActual = document.getElementById("usuarioActual");
  const validacionBackend = document.getElementById("validacionBackend");

  if (!token || !usuario) {
    usuarioActual.textContent = "No hay sesión de práctica.";
    validacionBackend.textContent = "Debe iniciar sesión.";
    return;
  }

  usuarioActual.textContent = usuario;

  try {
    const response = await fetch("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      validacionBackend.textContent = data.mensaje || "No autorizado.";
      return;
    }

    validacionBackend.textContent = data.mensaje;
  } catch (error) {
    validacionBackend.textContent = "Error al validar acceso.";
    console.error(error);
  }
}

function cerrarSesion() {
  localStorage.removeItem("tokenPractica");
  localStorage.removeItem("usuarioPractica");
  window.location.href = "/login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  validarAcceso();
  document.getElementById("btnCerrarSesion").addEventListener("click", cerrarSesion);
});