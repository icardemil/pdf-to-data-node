const fs = require('fs');
const { createFiles } = require('../../../services/File');

const AMOUNT = 1;

jest.mock('fs');

describe('createFiles tests', () => {
	it('should create all files', () => {
		const filesResponse = createFiles('uploads/image', 'test', AMOUNT, 'test-content');
		expect(fs.writeFile).toHaveBeenCalledTimes(AMOUNT);
		expect(filesResponse.ok).toBeTruthy();
	});
});
