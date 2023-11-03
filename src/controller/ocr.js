const path = require('path');
// const fs = require('fs')
const { convert } = require('pdf-img-convert');
const { getFilenameNormalized } = require('../helpers');
const { deleteFile, createFolder, createFiles } = require('../services/File');

const CONFIG_PAGE = {
	width: 780,
	height: 1027,
	page_numbers: [1, 2],
};

const handlePdf = async (req, res) => {
	try {
		const { path, filename } = req.file;
		const filenameNormalized = getFilenameNormalized(filename);
		const outputImages = await convert(path, CONFIG_PAGE);
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
	console.log({ __dirname, __filename });
	return res.json({
		path: __dirname,
		a: path.dirname(require.main.filename),
	});
};

module.exports = {
	handlePdf,
	getImagesDirectory,
};
