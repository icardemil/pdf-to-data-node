const getFilenameNormalized = filename => {
	const filenameNoSpaces = filename.replace(/\s/g, '');
	return filenameNoSpaces.substring(0, filenameNoSpaces.length - 5);
};

module.exports = {
	getFilenameNormalized,
};
