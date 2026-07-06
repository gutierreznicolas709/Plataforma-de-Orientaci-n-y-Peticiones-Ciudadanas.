function obtenerSesion() {
  const token = localStorage.getItem("tokenPractica");
  const usuarioTexto = localStorage.getItem("usuarioPractica");

  if (!token || !usuarioTexto) {
    return null;
  }

  try {
    return {
      token,
      usuario: JSON.parse(usuarioTexto)
    };
  } catch (error) {
    return null;
  }
}

function cerrarSesion() {
  localStorage.removeItem("tokenPractica");
  localStorage.removeItem("usuarioPractica");
  window.location.href = "/login.html";
}

function pintarUsuario(usuario) {
  const contenedor = document.getElementById("usuarioActual");

  contenedor.innerHTML = `
    <p><strong>Nombre:</strong> ${usuario.nombre}</p>
    <p><strong>Correo:</strong> ${usuario.email}</p>
    <p><strong>Rol:</strong> ${usuario.rol}</p>
  `;
}

function opcionesEstado(estadoActual) {
  const estados = [
    "borrador_generado",
    "pendiente_revision",
    "requiere_ajuste",
    "revisado",
    "listo_para_envio",
    "enviado",
    "cerrado"
  ];

  return estados
    .map((estado) => {
      const selected = estado === estadoActual ? "selected" : "";
      return `<option value="${estado}" ${selected}>${estado}</option>`;
    })
    .join("");
}

function pintarPeticiones(peticiones) {
  const tbody = document.querySelector("#tablaPeticiones tbody");

  if (!peticiones.length) {
    tbody.innerHTML = `<tr><td colspan="9">No hay solicitudes registradas.</td></tr>`;
    return;
  }

  tbody.innerHTML = peticiones
    .map((item) => {
      const documento = item.linkDocumento
        ? `<a href="${item.linkDocumento}" target="_blank">Abrir documento</a>`
        : `<span class="sin-documento">Pendiente</span>`;

      return `
        <tr>
          <td>${item.id}</td>
          <td>${item.fecha}</td>
          <td>${item.entidad}</td>
          <td>${item.asunto}</td>
          <td>${item.tipoPeticion}</td>
          <td>
            <select id="estado-${item.id}">
              ${opcionesEstado(item.estado)}
            </select>
          </td>
          <td>${documento}</td>
          <td>
            <textarea id="observaciones-${item.id}" rows="3">${item.observaciones || ""}</textarea>
          </td>
          <td>
            <button type="button" onclick="guardarEstado(${item.id})">Guardar</button>
          </td>
        </tr>
      `;
    })
    .join("");
}

async function cargarDashboard() {
  const sesion = obtenerSesion();

  if (!sesion) {
    window.location.href = "/login.html";
    return;
  }

  pintarUsuario(sesion.usuario);

  const resumen = document.getElementById("resumenDashboard");
  resumen.textContent = "Consultando solicitudes...";

  try {
    const response = await fetch("/api/dashboard/peticiones", {
      headers: {
        Authorization: `Bearer ${sesion.token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      resumen.textContent = data.mensaje || "No fue posible consultar las solicitudes.";
      return;
    }

    resumen.textContent = `Total de solicitudes: ${data.total}. Modo: ${data.modo}.`;
    pintarPeticiones(data.peticiones);
  } catch (error) {
    resumen.textContent = "Error al conectar con el backend.";
    console.error(error);
  }
}

async function guardarEstado(id) {
  const sesion = obtenerSesion();

  if (!sesion) {
    window.location.href = "/login.html";
    return;
  }

  const estado = document.getElementById(`estado-${id}`).value;
  const observaciones = document.getElementById(`observaciones-${id}`).value.trim();

  try {
    const response = await fetch(`/api/dashboard/peticiones/${id}/estado`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sesion.token}`
      },
      body: JSON.stringify({
        estado,
        observaciones
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.mensaje || "No fue posible actualizar el estado.");
      return;
    }

    alert(data.mensaje);
    cargarDashboard();
  } catch (error) {
    alert("Error al conectar con el backend.");
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cargarDashboard();
  document.getElementById("btnCerrarSesion").addEventListener("click", cerrarSesion);
});
