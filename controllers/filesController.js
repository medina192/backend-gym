const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const connection = require('../database/database');
const path = require('path');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);


const fileUpload = require('express-fileupload');

const PdfPrinter = require('pdfmake');
const fs = require('fs-extra');

const { v4: uuidv4 } = require('uuid');


//const { content } = require('../pdf/pdfContent');
//const styles = require('../pdf/styles');

//const serverURL = 'http://192.168.0.9:3002';
const serverURL = 'https://aux-gym-room.herokuapp.com';

const uploadImage = async(req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No files were uploaded. 1');
      return;
    }
  
    const { file } = req.files;
    console.log('file', file);
    //uploadPath = path.join(__dirname, '../uploads/', file.name);


    const { tempFilePath } = file;

    try {
      const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
      res.json({
        url: secure_url
    });
    } catch (error) {
      console.log('error', error);
    }
  
    /*
    file.mv(uploadPath, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
  
      res.json({
          message: `fileeeeeee ${uploadPath}`
      });
    });
    */
}


const uploadVideo = async(req, res) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded. 1');
    return;
  }

  const { file } = req.files;
  console.log('jo', file);

  const { tempFilePath } = file;

  try {

    const resp = await cloudinary.uploader.upload(tempFilePath, {resource_type: "video"});
    console.log('resp', resp);
    res.json({
      resp
    });

    //console.log('resp', resp);
    
  } catch (error) {
    console.log('error', error);
  }

}



const saveImage = async(req, res) => {

  //console.log('req',req.body.formData._parts[0]['f]);


  console.log('reqaaaaa',req.files);

  const bodyObject = JSON.parse(req.headers['body']);
  console.log('asd',bodyObject);
  
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded. 1');
    return;
  }

  const date = new Date();
  const isoDate = date.toISOString().slice(0,10)+'-'+date.toISOString().slice(17,19);



  const { file } = req.files;

  const positionDot = file.name.search(/\./);
  const extension = file.name.substr(positionDot, file.name.length-1);

  const nameImage = bodyObject.nameImage + '___'+isoDate+extension;
  uploadPath = path.join(__dirname, '../public/images', nameImage);
       
  try {
    const resp = await file.mv(uploadPath, function(err) {
      if (err) {
        console.log('12', err);
        return res.status(500).send(err);
      }
      console.log('---------------------- file loaded');
    });
  } catch (error) {
    console.log('error saving file', error);
    return res.status(400).json({
        ok: false,
        message: 'error saving file server',
        sqlMessage: error.sqlMessage
    });
  }

  let showInPerfil = bodyObject.ShowInPerfil ? 1 : 0;
  let publicImage = bodyObject.publicImage ? 1 : 0;

  const body = {
    nombreDocumento: nameImage,
    idEntrenador: bodyObject.idTrainer,
    nombreEntrenador: bodyObject.trainerName,
    apellidoEntrenador: bodyObject.trainerLastName,
    url: `${serverURL}/images/${nameImage}`,
    public: publicImage,
    mostrarEnPerfil: showInPerfil,
    tipo: 'image',
  }

  try {
    const sqlRegister = `INSERT INTO documentos SET ?`;

    connection.query(sqlRegister,body, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error register user',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            console.log('registerNewUser', resp);
            return res.json({
                message: 'file saved',
                resp
            });
        }
    });
  } catch (error) {
    
  }



  //uploadPath = path.join(__dirname, '../public/images', 'yuju');



  /*
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded. 1');
    return;
  }

  const { file } = req.files;
  console.log('file', file);
  //uploadPath = path.join(__dirname, '../uploads/', file.name);


  const { tempFilePath } = file;

  try {
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    res.json({
      url: secure_url
  });
  } catch (error) {
    console.log('error', error);
  }

  /*
  file.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({
        message: `fileeeeeee ${uploadPath}`
    });
  });
  */
}


const saveVideo = async(req, res) => {

  //console.log('req',req.body.formData._parts[0]['f]);


  console.log('reqaaaaa',req.files);



  const bodyObject = JSON.parse(req.headers['body']);
  console.log('asd',bodyObject);
  
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded. 1');
    return;
  }

  const date = new Date();
  const isoDate = date.toISOString().slice(0,10)+'-'+date.toISOString().slice(17,19);



  const { file } = req.files;

  const positionDot = file.name.search(/\./);
  const extension = file.name.substr(positionDot, file.name.length-1);

  const nameVideo = bodyObject.nameVideo + '___'+isoDate+extension;
  uploadPath = path.join(__dirname, '../public/videos', nameVideo);
       
  try {
    const resp = await file.mv(uploadPath, function(err) {
      if (err) {
        console.log('12', err);
        return res.status(500).send(err);
      }
      console.log('---------------------- file loaded');
    });
  } catch (error) {
    console.log('error saving file', error);
    return res.status(400).json({
        ok: false,
        message: 'error saving file server',
        sqlMessage: error.sqlMessage
    });
  }

  let showInPerfil = bodyObject.ShowInPerfil ? 1 : 0;
  let publicVideo = bodyObject.publicVideo ? 1 : 0;

  const body = {
    nombreDocumento: nameVideo,
    idEntrenador: bodyObject.idTrainer,
    nombreEntrenador: bodyObject.trainerName,
    apellidoEntrenador: bodyObject.trainerLastName,
    url: `${serverURL}/videos/${nameVideo}`,
    public: publicVideo,
    mostrarEnPerfil: showInPerfil,
    tipo: 'video',
  }

  try {
    const sqlRegister = `INSERT INTO documentos SET ?`;

    connection.query(sqlRegister,body, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error register user',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            console.log('registerNewUser', resp);
            return res.json({
                message: 'file saved',
                resp
            });
        }
    });
  } catch (error) {
    
  }



  //uploadPath = path.join(__dirname, '../public/images', 'yuju');



  /*
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded. 1');
    return;
  }

  const { file } = req.files;
  console.log('file', file);
  //uploadPath = path.join(__dirname, '../uploads/', file.name);


  const { tempFilePath } = file;

  try {
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    res.json({
      url: secure_url
  });
  } catch (error) {
    console.log('error', error);
  }

  /*
  file.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({
        message: `fileeeeeee ${uploadPath}`
    });
  });
  */
}


const saveFile = async(req, res) => {

  
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded. 1');
    return;
  }

  console.log('file', req.files);

  const { file } = req.files;
  console.log('file', file);
  uploadPath = path.join(__dirname, '../uploads/', 'jabbbbb.pdf');


  const { tempFilePath } = file;

  try {
    //const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  } catch (error) {
    console.log('error', error);
  }


  
  file.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({
        message: `fileeeeeee ${uploadPath}`
    });
  });
  
  
}


const savePdf = async(req, res) => {

  
 //console.log('req',req.body.formData._parts[0]['f]);


 const bodyObject = JSON.parse(req.headers['body']);
 console.log('asd',bodyObject);
 
 if (!req.files || Object.keys(req.files).length === 0) {
   res.status(400).send('No files were uploaded. 1');
   return;
 }

 const date = new Date();
 const isoDate = date.toISOString().slice(0,10)+'-'+date.toISOString().slice(11,13)+'-'+date.toISOString().slice(14,16)+'-'+date.toISOString().slice(17,19);


 const { file } = req.files;
 console.log('qwe', file);


 //const positionDot = file.name.search(/\./);
 //const extension = file.name.substr(positionDot, file.name.length-1);

 const namePdf = bodyObject.namePdf + '___'+isoDate+ '.pdf';
 uploadPath = path.join(__dirname, '../public/pdfs', namePdf);
      
 try {
   const resp = await file.mv(uploadPath, function(err) {
     if (err) {
       console.log('12', err);
       return res.status(500).send(err);
     }
     console.log('---------------------- file loaded');
   });
 } catch (error) {
   console.log('error saving file', error);
   return res.status(400).json({
       ok: false,
       message: 'error saving file server',
       sqlMessage: error.sqlMessage
   });
 }


  
  let ShowInPerfil = bodyObject.ShowInPerfil ? 1 : 0;
  let publicPDF = bodyObject.publicPdf ? 1 : 0;

  const body = {
    nombreDocumento: bodyObject.namePdf,
    idEntrenador: bodyObject.idTrainer,
    nombreEntrenador: bodyObject.trainerName,
    apellidoEntrenador: bodyObject.trainerLastName,
    url: `${serverURL}/pdfs/${namePdf}`,
    public: publicPDF,
    mostrarEnPerfil: ShowInPerfil,
    tipo: 'pdf',
  }



    try {
      const sqlRegister = `INSERT INTO documentos SET ?`;

      connection.query(sqlRegister,body, (error, resp) => {
          if(error)
          {   
              console.log(error.sqlMessage);
              return res.status(400).json({
                  ok: false,
                  message: 'error register user',
                  sqlMessage: error.sqlMessage
              });
          }
          else{
              console.log('registerNewUser', resp);
              return res.json({
                  message: 'file saved',
                  resp
              });
          }
      });
    } catch (error) {
      console.log('error pdf saving', error);
    }


}




/*
const createPDF = async(req, res) => {

  const { text, fontSize, fontWeight, color } = req.body; 

  console.log(' ', text, ' ', fontSize, ' ', fontWeight, ' ', color);

  let booleanBold = false;

  if(fontWeight === 'bold')
  {
    booleanBold = true;
  }

  const styles = {
    header: { bold: booleanBold, fontsize: fontSize, alignment: 'center', color },
    label: { color: '#00ff00', fontsize: 16 }
  }

  const content =  [
    {text, style: "header"},
    //{text: "Second Paragraph", style: "label"},
  ];

    console.log('content', content);
    console.log('styles', styles);

  let fonts = {
    Roboto: {
      normal: 'fonts/Roboto-Regular.ttf',
      bold: 'fonts/Roboto-Medium.ttf',
      italics: 'fonts/Roboto-Italic.ttf',
      bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
  };

  let docDefinition = {
    content,
    styles
  };


  const printer = new PdfPrinter(fonts);

  let pdfDoc = printer.createPdfKitDocument(docDefinition);
  //pdfDoc.pipe(fs.createWriteStream("pdf/pdfs/dieta.pdf"));
  pdfDoc.pipe(fs.createWriteStream("public/pdf/dieta.pdf"));
  pdfDoc.end();


  res.json({
    message: 'hola'
  });
}
*/

const createPDF = async(req, res) => {

  
  const {
    paragraphs,
    idTrainer,
    nameFile,
    trainerName,
    trainerLastName,
    publicPdf,
    showInPerfil } = req.body;
  
    const date = new Date();
    const isoDate = date.toISOString().slice(0,10)+'-'+date.toISOString().slice(17,19);
    const namePdf = nameFile + '___'+isoDate+'.pdf';

    let content = [];

    let booleanBold = false;
  
    for(let i = 0; i< paragraphs.length; i++)
    {
  
      if(paragraphs[i].fontWeight === 'bold')
      {
        booleanBold = true;
      }
      else{
        booleanBold = false;
      }
  
      content[i] = { text: paragraphs[i].text, style: {
                                                        bold: booleanBold, 
                                                        fontsize: paragraphs[i].fontSize,
                                                        color: paragraphs[i].color,
                                                        alignment: 'center',
                                                        }};
  
      }
  
      console.log('content', content);
  
    let fonts = {
      Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
      }
    };
  
    let docDefinition = {
      content
    };
  
  
    const printer = new PdfPrinter(fonts);
  
    let pdfDoc = printer.createPdfKitDocument(docDefinition);
    //pdfDoc.pipe(fs.createWriteStream("pdf/pdfs/dieta.pdf"));
    pdfDoc.pipe(fs.createWriteStream(`public/pdfs/${namePdf}`));
    pdfDoc.end();


    let ShowInPerfil = showInPerfil ? 1 : 0;
    let publicPDF = publicPdf ? 1 : 0;
  
    const body = {
      nombreDocumento: namePdf,
      idEntrenador: idTrainer,
      nombreEntrenador: trainerName,
      apellidoEntrenador: trainerLastName,
      url: `${serverURL}/pdfs/${namePdf}`,
      public: publicPDF,
      mostrarEnPerfil: ShowInPerfil,
      tipo: 'pdf',
    }


  
    try {
      const sqlRegister = `INSERT INTO documentos SET ?`;
  
      connection.query(sqlRegister,body, (error, resp) => {
          if(error)
          {   
              console.log(error.sqlMessage);
              return res.status(400).json({
                  ok: false,
                  message: 'error register user',
                  sqlMessage: error.sqlMessage
              });
          }
          else{
              console.log('registerNewUser', resp);
              return res.json({
                  message: 'file saved',
                  resp
              });
          }
      });
    } catch (error) {
      
    }



  /*

  console.log('re', req.body);

  const {
    paragraphs, 
    nameFile,
    nameTrainer,
    lastNameTrainer,
    public,
    showInPerfil,
    idTrainer } = req.body;

  const Id = uuidv4(); 

  let content = [];

  let booleanBold = false;

  for(let i = 0; i< paragraphs.length; i++)
  {

    if(paragraphs[i].fontWeight === 'bold')
    {
      booleanBold = true;
    }
    else{
      booleanBold = false;
    }

    content[i] = { text: paragraphs[i].text, style: {
                                                      bold: booleanBold, 
                                                      fontsize: paragraphs[i].fontSize,
                                                      color: paragraphs[i].color,
                                                      alignment: 'center',
                                                      }};

    }

    console.log('content', content);

  let fonts = {
    Roboto: {
      normal: 'fonts/Roboto-Regular.ttf',
      bold: 'fonts/Roboto-Medium.ttf',
      italics: 'fonts/Roboto-Italic.ttf',
      bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
  };

  let docDefinition = {
    content
  };

  const namePDF = nameFile+'___'+Id;

  const printer = new PdfPrinter(fonts);

  let pdfDoc = printer.createPdfKitDocument(docDefinition);
  //pdfDoc.pipe(fs.createWriteStream("pdf/pdfs/dieta.pdf"));
  pdfDoc.pipe(fs.createWriteStream(`public/pdf/${namePDF}.pdf`));
  pdfDoc.end();

  const body = {
    nombreDocumento,
    idEntrenador: idTrainer,
    nombreEntrenador: nameTrainer,
    apellidoEntrenador: lastNameTrainer,
    url: `${serverURL+namePDF}.pdf`,
    public,
    mostrarEnPerfil: showInPerfil,
    tipo: 'pdf'
  }

  const sqlRegister = `INSERT INTO documentos SET ?`;

  connection.query(sqlRegister,body, (error, resp) => {
      if(error)
      {   
          console.log(error.sqlMessage);
          return res.status(400).json({
              ok: false,
              message: 'error register pdf',
              sqlMessage: error.sqlMessage
          });
      }
      else{
          console.log('registerNewUser', resp);
          return res.json({
              message: 'pdf registered',
              resp
          });
      }
  });


  res.json({
    namePDF
  });
  */
}


const getDocuments = async(req, res) => {

  const idEntrenador = req.body.idEntrenador;

  try {
    const sqlRegister = `SELECT * FROM documentos WHERE idEntrenador = ${idEntrenador}`;

    connection.query(sqlRegister, (error, resp) => {
        if(error)
        {   
            console.log(error.sqlMessage);
            return res.status(400).json({
                ok: false,
                message: 'error register user',
                sqlMessage: error.sqlMessage
            });
        }
        else{
            console.log('registerNewUser', resp);
            return res.json({
                message: 'file saved',
                resp
            });
        }
    });
  } catch (error) {
    
  }

}


const downloadFile = async(req, res) => {

  //console.log(req.body);
  //const url = req.body.urlInServer;
  res.download('./uploads/ERC-001.jpg');
  //res.download(`./public/${url}`);

}



module.exports = {
    uploadImage,
    uploadVideo,
    saveFile,
    downloadFile,
    createPDF, 
    saveImage,
    saveVideo,
    getDocuments,
    savePdf,
}
