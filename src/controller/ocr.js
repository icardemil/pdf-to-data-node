const { convert } = require('pdf-img-convert');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'temp/pdf');
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}}`);
	},
});

const upload = multer({ storage });

const uploadPDF = async (req, res) => {
	try {
		const { path, filename } = req.file;
		const filenameNoSpaces = filename.replace(/\s/g, '');
		const filenameNormalized = filenameNoSpaces.substring(
			0,
			filenameNoSpaces.length - 4,
		);
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
	upload,
	uploadPDF,
};
