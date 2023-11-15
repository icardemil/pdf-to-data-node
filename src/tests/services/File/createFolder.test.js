const fs = require('fs');
const { createFolder } = require('../../../services/File');

jest.mock('fs');

describe('createFolder tests', () => {
	it(`should not create a new folder if one already exists`, () => {
		fs.existsSync.mockReturnValue(true);
		createFolder('uploads/pdf');
		expect(fs.mkdirSync).not.toHaveBeenCalled();
	});

	it(`should create a new folder if one doesn't already exist`, () => {
		fs.existsSync.mockReturnValue(false);
		const folderResponse = createFolder('uploads/pdf/a');
		expect(fs.mkdirSync).toHaveBeenCalled();
		expect(folderResponse.ok).toBeTruthy();
	});
});
