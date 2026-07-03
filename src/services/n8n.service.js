async function enviarPeticionAN8n(datos) {
  const webhookUrl = process.env.N8N_WEBHOOK_PETICION;
  const sharedSecret = process.env.N8N_SHARED_SECRET;

  if (!webhookUrl) {
    return {
      modo: "mock",
      mensaje: "n8n aún no está configurado. Se generó respuesta simulada.",
      linkDocumento: null,
      estado: "pendiente_configuracion_n8n"
    };
  }

  let response;
  try {
    response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-shared-secret": sharedSecret || ""
      },
      body: JSON.stringify(datos)
    });
  } catch (error) {
    throw new Error(`No fue posible contactar n8n: ${error.message}`);
  }

  const texto = await response.text();
  let respuestaJson = null;

  if (texto) {
    try {
      respuestaJson = JSON.parse(texto);
    } catch (error) {
      respuestaJson = null;
    }
  }

  if (!response.ok) {
    const detalle = respuestaJson?.mensaje || respuestaJson?.error || texto || "Respuesta vacía del flujo";
    throw new Error(`Error al conectar con n8n: ${response.status} - ${detalle}`);
  }

  if (!texto) {
    return {
      modo: "n8n",
      mensaje: "n8n respondió sin cuerpo.",
      linkDocumento: null,
      estado: "respuesta_vacia"
    };
  }

  return respuestaJson || { mensaje: texto };
}

module.exports = {
  enviarPeticionAN8n
};