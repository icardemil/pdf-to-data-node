const path = require('path');
const fs = require('fs');

const { getFormatDate } = require('../../helpers');

const getFiles = directoryPath => {
	const fullPath = path.join(global.appRoot, directoryPath);
	const directoryFiles = [];
	try {
		const files = fs.readdirSync(fullPath);
		for (const file of files) {
			const [date, filename] = file.split('-');
			const formatDate = getFormatDate(date);
			const fileInfo = {
				id: file,
				name: filename,
				createdAt: date,
				formatDate,
			};
			directoryFiles.push(fileInfo);
		}
		return {
			ok: true,
			data: directoryFiles,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			msg: 'GetFiles error',
			error,
		};
	}
};

module.exports = {
	getFiles,
};
