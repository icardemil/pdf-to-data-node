const fs = require('fs');

const deleteFile = (path, type) => {
	fs.unlink(path, error => {
		if (error) {
			return {
				ok: false,
				msg: 'Something went wrong',
				error,
			};
		}
	});
	return {
		ok: true,
		msg: `${type} files has been deleted successfully`,
	};
};

module.exports = {
	deleteFile,
};
