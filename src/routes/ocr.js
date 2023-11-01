const express = require('express');
const router = express.Router();

const { uploadFile } = require('../services/uploadFile');
const { handlePdf } = require('../controller/ocr');

router.post('/convert-pdf', uploadFile.single('newFile'), handlePdf);

module.exports = router;
