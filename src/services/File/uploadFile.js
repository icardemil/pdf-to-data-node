const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const pathDir = './src/uploads/pdf';
		fs.mkdirSync(pathDir, { recursive: true });
		cb(null, pathDir);
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}}`);
	},
});

const uploadFile = multer({ storage });

module.exports = {
	uploadFile,
};
