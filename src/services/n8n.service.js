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

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-shared-secret": sharedSecret || ""
    },
    body: JSON.stringify(datos)
  });

  if (!response.ok) {
    throw new Error(`Error al conectar con n8n: ${response.status}`);
  }

  return response.json();
}

module.exports = {
  enviarPeticionAN8n
};