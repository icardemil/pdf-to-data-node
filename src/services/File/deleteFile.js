const fs = require('fs');

const deleteFile = path => {
	fs.unlink(path, err => {
		if (err) {
			return false;
		}
		return true;
	});
};

module.exports = {
	deleteFile,
};
