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
		const imageFolder = `./temp/images/${filenameNormalized}`;
		const { msg: folderMsg, ok: folderOk, error: folderError } = createFolder(imageFolder);
		if (!folderOk) {
			return res.status(400).json({
				ok: folderOk,
				msg: folderMsg,
				error: folderError,
			});
		}
		console.log(folderMsg);
		const { msg: fileMsg, ok: fileOk, error: fileError } = createFiles(imageFolder, filenameNormalized, outputImages.length, outputImages);
		if (!fileOk) {
			return res.status(400).json({
				ok: fileOk,
				msg: fileMsg,
				error: fileError,
			});
		}
		console.log(fileMsg);
		deleteFile(path);
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

module.exports = {
	handlePdf,
};
