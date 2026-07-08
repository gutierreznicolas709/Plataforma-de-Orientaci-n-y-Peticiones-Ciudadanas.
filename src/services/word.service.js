const fs = require("fs");
const path = require("path");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel
} = require("docx");

async function generarWordPeticion(peticion) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: "Borrador de Derecho de Petición",
            heading: HeadingLevel.TITLE
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Advertencia: ",
                bold: true
              }),
              new TextRun(
                "Este documento es un borrador editable de apoyo pedagógico. Debe ser revisado antes de presentarse ante cualquier autoridad. No reemplaza asesoría jurídica ni garantiza el resultado de un trámite."
              )
            ]
          }),

          new Paragraph(""),

          new Paragraph(`${peticion.ciudad || "Bogotá D.C."}, ${peticion.fecha || "2026-06-08"}`),

          new Paragraph(""),

          new Paragraph("Señores"),
          new Paragraph(peticion.entidad || "Entidad pública de ejemplo"),

          new Paragraph(""),

          new Paragraph({
            children: [
              new TextRun({ text: "Asunto: ", bold: true }),
              new TextRun(peticion.asunto || "Solicitud de información pública")
            ]
          }),

          new Paragraph(""),

          new Paragraph(
            `Yo, ${peticion.nombre || "Ciudadano de práctica"}, identificado(a) con ${peticion.tipoDocumento || "PRACTICA"} No. ${peticion.documento || "0000000000"}, respetuosamente presento el siguiente borrador de solicitud.`
          ),

          new Paragraph({
            text: "1. Hechos o contexto",
            heading: HeadingLevel.HEADING_1
          }),
          new Paragraph(peticion.hechos || "Hechos de práctica sin datos reales."),

          new Paragraph({
            text: "2. Solicitud",
            heading: HeadingLevel.HEADING_1
          }),
          new Paragraph(peticion.solicitud || "Solicitud de práctica para fines pedagógicos."),

          new Paragraph({
            text: "3. Medio de notificación",
            heading: HeadingLevel.HEADING_1
          }),
          new Paragraph(`Correo: ${peticion.correo || "correo_prueba@example.com"}`),

          new Paragraph({
            text: "4. Anexos",
            heading: HeadingLevel.HEADING_1
          }),
          new Paragraph(peticion.anexos || "No se indican anexos."),

          new Paragraph(""),

          new Paragraph("Atentamente,"),

          new Paragraph(""),

          new Paragraph(peticion.nombre || "Ciudadano de práctica"),
          new Paragraph(`${peticion.tipoDocumento || "PRACTICA"} ${peticion.documento || "0000000000"}`),
          new Paragraph(peticion.correo || "correo_prueba@example.com")
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);

  const tmpDir = path.join(process.cwd(), "tmp");
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  const fileName = `peticion-${peticion.id || "demo"}.docx`;
  const filePath = path.join(tmpDir, fileName);

  fs.writeFileSync(filePath, buffer);

  return {
    fileName,
    filePath
  };
}

module.exports = {
  generarWordPeticion
};