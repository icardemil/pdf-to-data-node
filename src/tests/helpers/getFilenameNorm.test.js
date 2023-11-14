const { getFilenameNormalized } = require('../../helpers/getFilenameNorm');

const FILE_EXTENSION = '.pdf';
const FILENAME_MOCK1 = 'test_file.pdf';
const FILENAME_MOCK2 = 'a.pdf';

describe('getFilenameNorm tests', () => {
	it('should return filename without extension', () => {
		const filename = getFilenameNormalized(FILENAME_MOCK1);
		expect(filename.includes(FILE_EXTENSION)).toBeFalsy();
	});

	it('should return filename ', () => {
		const filename = getFilenameNormalized(FILENAME_MOCK2);
		expect(filename.length).toBeGreaterThan(0);
	});
});
