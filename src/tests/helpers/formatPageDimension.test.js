const { getPageDimension } = require('../../helpers');

const mockPage1 = { height: 900, width: 450, pageNumbers: 5 };
const mockPage2 = { height: 900, width: 450 };

describe('formatPageDimension tests', () => {
	it('should return page config dimension object', () => {
		const configPage = getPageDimension(mockPage1);
		expect(configPage.pages_numbers.length).toEqual(mockPage1.pageNumbers);
	});

	it(`should return zero if pageNumbers property doesn't exist`, () => {
		const configPage = getPageDimension(mockPage2);
		expect(configPage.pages_numbers.length).toEqual(0);
	});
});
