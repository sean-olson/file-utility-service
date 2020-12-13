const fs = require('fs');
const path = require('path');

const {generateFiles, 
       fetchFiles, 
       parseFiles} = require('../lib/file/file-api');
       
const {SORT_BY} = require('../lib/file/file-constants');

test('data files have been created', async () => {
  const filePath = (process.cwd() + path.sep + 'data-files' + path.sep).split(path.sep).join(path.posix.sep);
  await generateFiles();
  const generatedFiles = fs.readdirSync(filePath);
  expect(generatedFiles.length).toBe(3);
});

test('fetched data file contents', async () => {
  const fetchedFiles = await fetchFiles();
  const fileCount = fetchedFiles.length;
  let haveStrings = true;
  fetchedFiles.forEach((file) => {
    if(typeof file !== 'string'){
      haveStrings = false;
    }
  });
  expect(fileCount === 3 && haveStrings).toBe(true);
});

test('fetched parsed data from files', async () => {
  await generateFiles(18);
  const data = await parseFiles(SORT_BY.GENDER);
  expect(Array.isArray(data) && data.length === 54).toBe(true);
});

test.todo('verify sortBy lastName');
test.todo('verify sortBy gender');
test.todo('verify sortBy birthDate');