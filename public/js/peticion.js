function obtenerDatosFormulario() {
  return {
    ciudad: document.getElementById("ciudad").value.trim(),
    fecha: document.getElementById("fecha").value,
    entidad: document.getElementById("entidad").value.trim(),
    nombre: document.getElementById("nombre").value.trim(),
    tipoDocumento: document.getElementById("tipoDocumento").value,
    documento: document.getElementById("documento").value.trim(),
    correo: document.getElementById("correo").value.trim(),
    tipoPeticion: document.getElementById("tipoPeticion").value,
    asunto: document.getElementById("asunto").value.trim(),
    hechos: document.getElementById("hechos").value.trim(),
    solicitud: document.getElementById("solicitud").value.trim(),
    anexos: document.getElementById("anexos").value.trim(),
    aceptaRevision: document.getElementById("aceptaRevision").checked
  };
}

function validarDatos(datos) {
  const camposObligatorios = [
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

  for (const campo of camposObligatorios) {
    if (!datos[campo]) {
      return `El campo ${campo} es obligatorio.`;
    }
  }

  if (!datos.aceptaRevision) {
    return "Debe aceptar que el documento es un borrador revisable.";
  }

  return null;
}

function generarBorradorLocal(datos) {
  return `${datos.ciudad}, ${datos.fecha}

Señores
${datos.entidad}

Asunto: Derecho de petición - ${datos.asunto}

Yo, ${datos.nombre}, identificado(a) con ${datos.tipoDocumento} No. ${datos.documento}, actuando en ejercicio del derecho fundamental de petición, respetuosamente presento la siguiente solicitud.

1. Hechos o contexto

${datos.hechos}

2. Solicitud

${datos.solicitud}

3. Finalidad

La presente solicitud se formula con fines de participación ciudadana, transparencia, control social o acceso a información pública, según corresponda al caso.

4. Medio de notificación

Agradezco remitir la respuesta al siguiente correo electrónico:

${datos.correo}

5. Anexos

${datos.anexos || "No se indican anexos."}

Atentamente,

${datos.nombre}
${datos.tipoDocumento} ${datos.documento}
${datos.correo}

Advertencia: Este documento es un borrador editable de apoyo pedagógico y debe ser revisado antes de radicarse.`;
}

function mostrarVistaPrevia() {
  const datos = obtenerDatosFormulario();
  const error = validarDatos(datos);

  if (error) {
    alert(error);
    return;
  }

  const borrador = generarBorradorLocal(datos);
  document.getElementById("vistaPrevia").textContent = borrador;
}

async function copiarBorrador() {
  const texto = document.getElementById("vistaPrevia").textContent;

  if (!texto || texto.includes("Complete el formulario")) {
    alert("Primero genere la vista previa.");
    return;
  }

  await navigator.clipboard.writeText(texto);
  alert("Borrador copiado al portapapeles.");
}

async function enviarAlBackend(event) {
  event.preventDefault();

  const datos = obtenerDatosFormulario();
  const error = validarDatos(datos);

  if (error) {
    alert(error);
    return;
  }

  const resultado = document.getElementById("resultadoBackend");
  resultado.textContent = "Enviando solicitud al backend...";

  try {
    const response = await fetch("/api/peticiones/generar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos)
    });

    const data = await response.json();

    if (!response.ok) {
      resultado.textContent = data.mensaje || "Ocurrió un error al generar la petición.";
      return;
    }

    resultado.innerHTML = `
      <p><strong>Respuesta:</strong> ${data.mensaje}</p>
      <p><strong>Modo:</strong> ${data.modo}</p>
      ${
        data.linkDocumento
          ? `<p><a href="${data.linkDocumento}" target="_blank">Abrir documento generado</a></p>`
          : "<p>Documento editable pendiente para la integración con n8n y Google Docs.</p>"
      }
    `;
  } catch (error) {
    resultado.textContent = "No fue posible conectar con el backend.";
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const fecha = document.getElementById("fecha");
  fecha.value = new Date().toISOString().split("T")[0];

  document.getElementById("btnVistaPrevia").addEventListener("click", mostrarVistaPrevia);
  document.getElementById("btnCopiar").addEventListener("click", copiarBorrador);
  document.getElementById("formPeticion").addEventListener("submit", enviarAlBackend);
});