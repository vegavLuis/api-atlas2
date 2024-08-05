import PDFDocument from "pdfkit";

export function buildPDF(dataCallback, endCallback) {
  const doc = new PDFDocument({ bufferPage: true });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  doc.text("asas");

  doc.end();
}
