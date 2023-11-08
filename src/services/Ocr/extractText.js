const path = require('path');
const { createWorker } = require('tesseract.js');
const { getFiles } = require('../Directory');

const extractText = async id => {
	const imagesPath = `uploads/images/${id}`;
	const directoryResponse = getFiles(imagesPath);
	if (!directoryResponse.ok) {
		console.log(directoryResponse.error);
		return {
			ok: directoryResponse.ok,
			msg: directoryResponse.msg,
			error: directoryResponse.error,
		};
	}
	const files = directoryResponse.data;
	try {
		const worker = await createWorker('spa');
		for (const file of files) {
			const ret = await worker.recognize(path.join(global.appRoot, imagesPath, file.id));
			console.log(ret.data.text);
		}
		await worker.terminate();
		return {
			ok: true,
			msg: 'All data has been extracted',
			data: 'a',
		};
	} catch (error) {
		return {
			ok: false,
			msg: 'Extract Text error',
			error,
		};
	}
};

module.exports = {
	extractText,
};
