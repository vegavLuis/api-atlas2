import { Router } from "express";
import PDFDocument from "pdfkit";
import path from "path";
import fs from 'fs-extra'
const __dirname = path.resolve();


const router = Router();

router.get('/pdf', async(req, res)=> {
  const datos = req.body
  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    // "Content-Disposition": "filename=prueba.pdf",
  });
  
  async function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPage: true, autoFirstPage: false }
    );

    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    
    datos.data.forEach(element => {
      doc.addPage()
      doc.image(path.join(__dirname, 'images', 'flyer.png'), {
        name: 'flyer.png',
        type: 'image/png',
      });
      doc.text(element.nombre);
    });
      doc.pipe(fs.createWriteStream('prueba.pdf'))
    
    doc.end();
  }

  await buildPDF(
    (data) => stream.write(data),
    () => stream.end()
  );
  // res.send("creado");
});

export default router;
