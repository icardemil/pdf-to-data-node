const fs = require('fs');

const SUBSTRING = '-output';
const EXTENSION = '.png';

const createFiles = (path, name, amount, data) => {
	for (let i = 0; i < amount; i++) {
		fs.writeFile(
			`${path}/${name}${SUBSTRING}` + i + EXTENSION,
			data[i],
			error => {
				if (error) {
					return {
						ok: false,
						msg: 'Something went wrong',
						error,
					};
				}
			},
		);
	}
	return {
		ok: true,
		msg: 'File created successfully',
	};
};

module.exports = {
	createFiles,
};
