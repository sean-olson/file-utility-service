const fs = require('fs');
const path = require('path');
const files = require('../lib/fs/files');

test('files have been created', async () => {
  const filePath = (process.cwd() + path.sep + 'data-files' + path.sep).split(path.sep).join(path.posix.sep);
  await files.generateFiles();
  const generatedFiles = fs.readdirSync(filePath);
  expect(generatedFiles.length).toBe(3);
});