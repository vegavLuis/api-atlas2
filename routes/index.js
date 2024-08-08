import { Router } from "express";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs-extra";
import qr from "qr-image";
import odbc from 'odbc'

const __dirname = path.resolve();
const fullPath = 'DRIVER={IBM INFORMIX ODBC DRIVER (64-bit)};SERVER=ol_siisa;DATABASE=atlas_bis;HOST=jupiter_ids.segatlas.com.mx;SERVICE=1530;UID=luivegva;PWD=Lui-&#4579;'

const router = Router();

router.post("/pdf", async (req, res) => {
  const sucursalk = req.body.sucursalk
  const cve_linea = req.body.cve_linea
  const cve_prod = req.body.cve_prod
  const polizak = req.body.polizak
  const endosok = req.body.endosok
  const a_emisionk = req.body.a_emisionk
  const no_reexpedicionk = req.body.no_reexpedicionk

  odbc.connect(fullPath, (err, connection) => {
    if (err) {
      console.error('Error al conectar la DB:', err);
      return;
    }
    const sqlQuery = `select * from s4_polizas where sucursalk = "${sucursalk}" and cve_linea = ${cve_linea} and cve_prod = ${cve_prod} and polizak = ${polizak} and endosok = ${endosok} and a_emisionk = ${a_emisionk} and no_reexpedicionk = ${no_reexpedicionk}`;
    const sqlQuery2 = `select * from s4_polizas where sucursalk = "${sucursalk}" and cve_linea = ${cve_linea} and cve_prod = ${cve_prod} and polizak = ${polizak} and endosok = ${endosok} and a_emisionk = ${a_emisionk} and no_reexpedicionk = ${no_reexpedicionk}`;
    connection.query((sqlQuery, sqlQuery2), async(queryError, result, result2) => {
      if (queryError) {
        console.error('El query es:', queryError);
      } else {
        console.log('esta es la primera',result, result2)
        // res.status(200).send({
        //   data: result
        // })
      }
      connection.close((closeError) => {
        if (closeError) {
          console.error('Error al cerrar la DB:', closeError);
        } else {
          console.log('Se cerro la DB.');
        }
      });
    });
  });
  
  // const datos = req.body;
  // const stream = res.writeHead(200, {
  //   "Content-Type": "application/pdf",
  //   // "Content-Disposition": "filename=prueba.pdf",
  // });

  // async function buildPDF(dataCallback, endCallback) {
  //   const doc = new PDFDocument({ bufferPage: true, autoFirstPage: false });

  //   doc.on("data", dataCallback);
  //   doc.on("end", endCallback);

  //   datos.data.forEach((element) => {
  //     doc.addPage();
  //     doc.image(
  //       path.join(__dirname, "images", "flyers_seg_atlas.png"),
  //       120,
  //       28,
  //       { width: 400, align: "center", valign: "center" },
  //       {
  //         name: "flyers_seg_atlas.png",
  //         type: "image/png",
  //       }
  //     );
  //     const qr_code = qr.imageSync(
  //       `https://www.google.com/search?q=${element.nombre}`,
  //       {
  //         type: "png",
  //       }
  //     );
  //     doc.image(qr_code, 410, 525, { width: 100 });
  //     const contratante = "Este es el contratante"
  //     const name =
  //       element.nombre + " " + element.apPaterno + " " + element.apMaterno;
  //     doc.fontSize(12)
  //     doc.font('Times-Roman')
  //     doc.text(contratante.toUpperCase(), 120, 630);
  //     doc.text(name.toUpperCase(), 120, 645);
  //     doc.text(element.poliza, 200, 664);
  //     doc.text(element.codigoCliente, 425, 625);
  //     doc.text(
  //       "Descarga la tarjeta inteligente consultando el link:",
  //       120,
  //       680
  //     );
  //     doc.text(
  //       `https://hyperion.segurosatlas.com.mx/Portales/Pges/QR/IdentificacionDigital.html?uid_incio=${element.codigoCliente}`,
  //       120,
  //       692,
  //       {
  //         link: `https://hyperion.segurosatlas.com.mx/Portales/Pges/QR/IdentificacionDigital.html?uid_incio=${element.codigoCliente}`,
  //       }
  //     );
  //   });

  //   doc.pipe(fs.createWriteStream("prueba.pdf"));
  //   doc.end();
  // }

  // await buildPDF(
  //   (data) => stream.write(data),
  //   () => stream.end()
  // );
  // // res.send("creado");
});

export default router;
