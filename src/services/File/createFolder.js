const fs = require('fs');

const createFolder = path => {
	try {
		if (!fs.existsSync(path)) {
			fs.mkdirSync(path);
		}
		return {
			ok: true,
			msg: 'Folder created at ' + path,
		};
	} catch (error) {
		return {
			ok: false,
			msg: 'Something went wrong',
			error,
		};
	}
};

module.exports = {
	createFolder,
};
