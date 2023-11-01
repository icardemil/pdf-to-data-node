const { convert } = require('pdf-img-convert');
const fs = require('fs');
const { getFilenameNormalized } = require('../helpers');

const handlePdf = async (req, res) => {
	try {
		const { path, filename } = req.file;
		const filenameNormalized = getFilenameNormalized(filename);
		const outputImages = await convert(path, {
			width: 780,
			height: 1027,
			page_numbers: [1, 2],
		});

		const imageFolder = `./temp/images/${filenameNormalized}`;
		try {
			if (!fs.existsSync(imageFolder)) {
				fs.mkdirSync(imageFolder);
			}
		} catch (error) {
			console.log(error);
			return res.status(400).json({
				ok: false,
				error,
			});
		}
		for (let i = 0; i < outputImages.length; i++) {
			fs.writeFile(
				`${imageFolder}/${filenameNormalized}-output` + i + '.png',
				outputImages[i],
				error => {
					if (error) {
						console.log('Error: ' + error);
					}
				},
			);
		}
		console.log('File converted');
		fs.unlink(path, err => {
			if (err) {
				console.log('Error deleting file');
			}
			console.log('Delete file successfully');
		});
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
