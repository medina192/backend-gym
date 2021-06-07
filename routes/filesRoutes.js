//  /files/

const { Router } =require('express');
const { 
    uploadImage,
    uploadVideo,
    saveFile,
    downloadFile,
    createPDF,
    saveImage,
    saveVideo,
    getDocuments,
    savePdf,
} = require('../controllers/filesController');

const router = Router();

router.post('/uploadImage', uploadImage);
router.post('/uploadvideo', uploadVideo);
router.post('/savefile', saveFile);
router.get('/downloadfile', downloadFile);
router.post('/createpdf', createPDF);
router.post('/saveimage', saveImage);
router.post('/savevideo', saveVideo);
router.post('/getdocuments', getDocuments);
router.post('/savepdf', savePdf);

module.exports = router;