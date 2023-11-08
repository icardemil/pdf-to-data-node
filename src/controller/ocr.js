const { convert } = require('pdf-img-convert');
// const { createWorker } = require('tesseract.js');
// const path = require('path');

const { getFilenameNormalized } = require('../helpers');
const { deleteFile, createFolder, createFiles } = require('../services/File');
const { getFiles } = require('../services/Directory');
const { extractText } = require('../services/Ocr');

const CONFIG_PAGE = {
	width: 780,
	height: 1027,
	page_numbers: [1, 2, 3],
};

const handlePdf = async (req, res) => {
	try {
		const { path, filename } = req.file;
		const filenameNormalized = getFilenameNormalized(filename);
		const imageFolder = `./src/uploads/images/${filenameNormalized}`;

		const folderResponse = createFolder(imageFolder);
		if (!folderResponse.ok) {
			console(folderResponse.error);
			return res.status(400).json({
				ok: folderResponse.ok,
				msg: folderResponse.msg,
				step: 'folder',
			});
		}
		console.log(folderResponse.msg);

		const outputImages = await convert(path, CONFIG_PAGE);
		const filesResponse = createFiles(imageFolder, filenameNormalized, outputImages.length, outputImages);
		if (!filesResponse.ok) {
			console.log(filesResponse.error);
			return res.status(400).json({
				ok: filesResponse.ok,
				msg: filesResponse.msg,
				step: 'file',
			});
		}
		console.log(filesResponse.msg);

		const deleteResponse = deleteFile(path, 'pdf');
		if (!deleteResponse.ok) {
			console.log(deleteResponse.error);
			return res.status(400).json({
				ok: deleteResponse.ok,
				msg: deleteResponse.msg,
				step: 'delete',
			});
		}
		console.log(deleteResponse.msg);

		return res.json({
			ok: true,
			filenameNormalized,
			path,
		});
	} catch (error) {
		return res.status(400).json({
			ok: false,
			error,
		});
	}
};

const getImagesDirectory = (req, res) => {
	const directoryResponse = getFiles('uploads/images/');

	if (!directoryResponse.ok) {
		console.log(directoryResponse.error);
		return res.status(400).json({
			ok: directoryResponse.ok,
			msg: 'Something went wrong',
			step: 'getDirectory',
		});
	}

	return res.json({
		ok: directoryResponse.ok,
		data: directoryResponse.data,
	});
};

const getData = async (req, res) => {
	const { id } = req.params;
	const extractResponse = await extractText(id);

	if (!extractResponse.ok) {
		console.log(extractResponse.error);
		return res.status(400).json({
			ok: extractResponse.ok,
			msg: 'Something went wrong',
			step: 'extractText',
		});
	}

	return res.json({
		ok: extractResponse.ok,
		data: extractResponse.data,
	});
};

module.exports = {
	handlePdf,
	getImagesDirectory,
	getData,
};
