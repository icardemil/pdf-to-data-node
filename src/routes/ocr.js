const express = require('express');
const router = express.Router();

const { uploadFile } = require('../services/File');
const { handlePdf, getImagesDirectory } = require('../controller/ocr');

router.post('/upload-pdf', uploadFile.single('newFile'), handlePdf);
router.get('/get-documents', getImagesDirectory);

module.exports = router;
