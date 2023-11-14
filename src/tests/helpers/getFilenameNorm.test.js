const { getFilenameNormalized } = require('../../helpers/getFilenameNorm');

const FILE_EXTENSION = '.pdf';
const FILE_MOCK1 = 'test_file.pdf';
const FILE_MOCK2 = 'a.pdf';

describe('getFilenameNorm tests', () => {
	it('should return filename without extension', () => {
		const filename = getFilenameNormalized(FILE_MOCK1);
		expect(filename.includes(FILE_EXTENSION)).toBeFalsy();
	});

	/**
	 * TODO: fix this 😒
	 */
	it('should return filename ', () => {
		const filename = getFilenameNormalized(FILE_MOCK2);
		expect(filename.length).toBeGreaterThan(0);
	});
});
