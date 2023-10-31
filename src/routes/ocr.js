const express = require('express');
const router = express.Router();

const { upload, uploadPDF } = require('../controller/ocr');

router.post('/convert-pdf', upload.single('newFile'), uploadPDF);

module.exports = router;
