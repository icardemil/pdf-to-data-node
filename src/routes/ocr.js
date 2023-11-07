const express = require('express');
const router = express.Router();

const { uploadFile } = require('../services/File');
const { handlePdf, getImagesDirectory, getData } = require('../controller/ocr');

router.post('/upload-pdf', uploadFile.single('newFile'), handlePdf);
router.get('/get-documents', getImagesDirectory);
router.get('/get-data/:id', getData);

module.exports = router;
