const fs = require('fs');
const path = require('path');
const files = require('../lib/fs/files');

const filePath = (process.cwd() + path.sep + 'data-files' + path.sep).split(path.sep).join(path.posix.sep);

test('files have been created', async () => {
  await files.generateFiles();
  const generatedFiles = fs.readdirSync(filePath);
  expect(generatedFiles.length).toBe(3);
});


test('files have been retrieved', async () => {
  const files = await files.fetchFiles();
  const fileCount = files.length;
  let haveStrings = true;
  files.forEach((file) => {
    if(typeof file !== 'string'){
      haveStrings = false;
    }
  });
  expect(fileCount === 3 && haveStrings).toBe(true);
});

test.todo('parse files');