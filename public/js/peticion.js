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

    let data = null;

    try {
      const texto = await response.text();
      data = texto ? JSON.parse(texto) : null;
    } catch (error) {
      data = null;
    }

    if (!response.ok) {
      resultado.textContent = data?.mensaje || data?.error || "Ocurrió un error al generar la petición.";
      return;
    }

    const mensaje = data?.mensaje || "Solicitud recibida correctamente.";

    resultado.innerHTML = `
      <p><strong>Respuesta:</strong> ${mensaje}</p>
      <p><strong>Modo:</strong> ${data?.modo || "n8n"}</p>
      ${
        data?.linkDocumento
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
document
  .getElementById("tipoPeticion")
  .addEventListener("change", actualizarAyudaTipoPeticion);
});
function mensajeAyudaPorTipo(tipo) {
  const mensajes = {
    derecho_peticion:
      "Use esta opción cuando necesita presentar una solicitud respetuosa ante una entidad o autoridad.",
    informacion_publica:
      "Use esta opción cuando quiere acceder a información pública o documentos de una entidad.",
    copias:
      "Use esta opción cuando necesita copia de documentos, respuestas, actos o expedientes.",
    estado_tramite:
      "Use esta opción cuando ya presentó una solicitud o trámite y necesita saber en qué va.",
    orientacion_ruta:
      "Use esta opción cuando no sabe qué entidad puede orientarle o recibir su solicitud.",
    querella_policiva:
      "Use esta opción solo como orientación cuando el asunto se relaciona con convivencia o una posible ruta ante autoridad de policía. No se genera una querella real en clase."
  };

  return mensajes[tipo] || "Seleccione un tipo de solicitud para ver una orientación inicial.";
}

function actualizarAyudaTipoPeticion() {
  const tipo = document.getElementById("tipoPeticion").value;
  const ayuda = document.getElementById("ayudaTipoPeticion");
  ayuda.textContent = mensajeAyudaPorTipo(tipo);
}