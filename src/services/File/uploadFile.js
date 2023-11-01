const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'temp/pdf');
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}}`);
	},
});

const uploadFile = multer({ storage });

module.exports = {
	uploadFile,
};
