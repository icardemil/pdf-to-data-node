const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'tmp/pdf');
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
