import { Router } from "express";
import PDFDocument from "pdfkit";
// import { buildPDF } from "../libs/pdfkit.js";

const router = Router();

router.get("/pdf", (req, res) => {
  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=prueba.pdf",
  });

  function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPage: true });

    doc.on("data", dataCallback);
    doc.on("end", endCallback);

    doc.text(req.body.url);

    doc.end();
  }

  buildPDF(
    (data) => stream.write(data),
    () => stream.end()
  );
  res.send("creado");
});

export default router;
