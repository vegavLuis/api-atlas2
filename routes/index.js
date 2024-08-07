import { Router } from "express";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs-extra";
import qr from "qr-image";
const __dirname = path.resolve();

const router = Router();

router.get("/pdf", async (req, res) => {
  const datos = req.body;
  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    // "Content-Disposition": "filename=prueba.pdf",
  });

  async function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPage: true, autoFirstPage: false });

    doc.on("data", dataCallback);
    doc.on("end", endCallback);

    datos.data.forEach((element) => {
      doc.addPage();
      doc.image(
        path.join(__dirname, "images", "flyers_seg_atlas.png"),
        120,
        28,
        { width: 400, align: "center", valign: "center" },
        {
          name: "flyers_seg_atlas.png",
          type: "image/png",
        }
      );
      const qr_code = qr.imageSync(
        `https://www.google.com/search?q=${element.nombre}`,
        {
          type: "png",
        }
      );
      doc.image(qr_code, 410, 525, { width: 100 });
      const contratante = "Este es el contratante"
      const name =
        element.nombre + " " + element.apPaterno + " " + element.apMaterno;
      doc.fontSize(12)
      doc.font('Times-Roman')
      doc.text(contratante.toUpperCase(), 120, 630);
      doc.text(name.toUpperCase(), 120, 645);
      doc.text(element.poliza, 200, 664);
      doc.text(element.codigoCliente, 425, 625);
      doc.text(
        "Descarga la tarjeta inteligente consultando el link:",
        120,
        680
      );
      doc.text(
        `https://hyperion.segurosatlas.com.mx/Portales/Pges/QR/IdentificacionDigital.html?uid_incio=${element.codigoCliente}`,
        120,
        692,
        {
          link: `https://hyperion.segurosatlas.com.mx/Portales/Pges/QR/IdentificacionDigital.html?uid_incio=${element.codigoCliente}`,
        }
      );
    });

    doc.pipe(fs.createWriteStream("prueba.pdf"));
    doc.end();
  }

  await buildPDF(
    (data) => stream.write(data),
    () => stream.end()
  );
  // res.send("creado");
});

export default router;
