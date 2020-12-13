const fs = require('fs');
const path = require('path');
const files = require('../lib/fs/files');

test('data files have been created', async () => {
  const filePath = (process.cwd() + path.sep + 'data-files' + path.sep).split(path.sep).join(path.posix.sep);
  await files.generateFiles();
  const generatedFiles = fs.readdirSync(filePath);
  expect(generatedFiles.length).toBe(3);
});

test('data-file contents have been retrieved', async () => {
  const fetchedFiles = await files.fetchFiles();
  const fileCount = fetchedFiles.length;
  let haveStrings = true;
  fetchedFiles.forEach((file) => {
    if(typeof file !== 'string'){
      haveStrings = false;
    }
  });
  expect(fileCount === 3 && haveStrings).toBe(true);
});

test.todo('parse files');