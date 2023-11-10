const getPageDimension = configPage => {
	const pageDimension = { height: configPage.height, width: configPage.width };
	const pagesNumbers = Array.from({ length: configPage.pageNumbers }, (_, i) => i + 1);

	return { ...pageDimension, pages_numbers: pagesNumbers };
};

module.exports = {
	getPageDimension,
};
