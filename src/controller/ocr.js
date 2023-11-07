const { convert } = require('pdf-img-convert');
const { createWorker } = require('tesseract.js');
const path = require('path');

const { getFilenameNormalized } = require('../helpers');
const { deleteFile, createFolder, createFiles } = require('../services/File');
const { getFiles } = require('../services/Directory');

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
	const directoryResponse = getFiles('uploads/images');

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
		data: directoryResponse.files,
	});
};

const getData = async (req, res) => {
	try {
		const worker = await createWorker('spa');
		const ret = await worker.recognize(path.join(global.appRoot, 'path de archivo en la carpeta images'));
		console.log(ret.data.text);
		await worker.terminate();
		return res.json({
			ok: true,
		});
	} catch (error) {
		return res.status(400).json({
			ok: false,
			error,
		});
	}
	// try {
	// 	const worker = await getWorker();

	// 	(await worker).load();
	// 	const {
	// 		data: { text },
	// 	} = (await worker).recognize(
	// 		path.join(
	// 			global.appRoot,
	// 			'uploads/images/1698972438411-2Â°TraspadoProcesoNormalJulio2023b/1698972438411-2Â°TraspadoProcesoNormalJulio2023b-output0.png',
	// 		),
	// 	);
	// 	console.log(text);
	// 	return res.json({
	// 		ok: true,
	// 		msg: 'Data',
	// 	});
	// } catch (error) {}
};

module.exports = {
	handlePdf,
	getImagesDirectory,
	getData,
};
