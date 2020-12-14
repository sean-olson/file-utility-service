const {haveDirectory, deleteAllFiles, deleteDirectory, readDirectoryContents} = require('../lib/file/file-helpers');

const {fileDefinitions,
       cleanUp,
       generateFiles,
       haveDataFiles, 
       fetchDataFiles, 
       parseFiles} = require('../lib/file/file-api');
       
const {SORT_BY} = require('../lib/file/file-constants');

/**
 * verify that the generateFiles() method creates three files.
 */
test('data files have been created', async () => {
  deleteAllFiles();
  generateFiles();
  const generatedFiles = readDirectoryContents();
  expect(generatedFiles.length).toBe(3);
});


/**
 * verify that the fetchDataFiles() will return the three files when they exist.
 */
test('able to fetch data files when they exist', async () => {
  const haveFiles = haveDataFiles();
  const fetchedFiles = fetchDataFiles();
  
  expect(haveFiles && fetchedFiles.length === 3).toBe(true);
});

/**
 * verify that the fetchDataFiles() will auto generate the files if they don't exist.
 */
test('able to fetch data files when they exist', async () => {
  deleteAllFiles();
  const haveFiles = haveDataFiles()
  const fetchedFiles = fetchDataFiles();
  expect(haveFiles === false && fetchedFiles.length === 3).toBe(true);
});

/**
 * verify that the parseFiles() method will return an array of Person records with the expected count.
 */
test('fetched parsed data from files', async () => {
  generateFiles(18);
  const data = parseFiles();
  expect(Array.isArray(data) && data.length === 54).toBe(true);
});

/**
 * verify that the parseFiles() default sort method is by lastName in descending order.
 */
test('the default sort order is by name in descending order', async () => {
  generateFiles(20);
  const persons = parseFiles();
  let sortedByName = true;
  for(let i = 0; i < persons.length - 1; i++){
    if (persons[i].lastName < persons[i + 1].lastName){
      sortedByName = false;
    } else if (persons[i].lastName === persons[i + 1].lastName && persons[i].firstName < persons[i + 1].firstName){
      sortedByName = false;
    }
  }
  expect(sortedByName).toBe(true);
});

/**
 * verify that the parseFiles() default sort method is used (by lastName, then by firstName in descending order) when an invalid sort-by value is given.
 */
test('the default sort order (by name in descending order) is used when bad sort-by value used', async () => {
  generateFiles(20);
  const persons = parseFiles('BAD_TYPE');
  let sortedByName = true;
  for(let i = 0; i < persons.length - 1; i++){
    if (persons[i].lastName < persons[i + 1].lastName){
      sortedByName = false;
    } else if (persons[i].lastName === persons[i + 1].lastName && persons[i].firstName < persons[i + 1].firstName){
      sortedByName = false;
    }
  }
  expect(sortedByName).toBe(true);
});


/**
 * verify that the parseFiles() method passed sort-by name does sort by lastName, then by firstName in descending order.
 */
test('sort-by name sorts by lastName in descending order', async () => {
  generateFiles(20);
  const persons = parseFiles(SORT_BY.NAME);
  let sortedByName = true;
  for(let i = 0; i < persons.length - 1; i++){
    if (persons[i].lastName < persons[i + 1].lastName){
      sortedByName = false;
    } else if (persons[i].lastName === persons[i + 1].lastName && persons[i].firstName < persons[i + 1].firstName){
      sortedByName = false;
    }
  }
  expect(sortedByName).toBe(true);
});


/**
 * verify that the parseFiles() method passed sort-by gender does sort by gender (females first) then by lastName then by first name.
 */
test('fetched parsed data from files', async () => {

  generateFiles(10);
  const persons = parseFiles(SORT_BY.GENDER);
  const firstMale = persons.findIndex((person) => {person.gender === 'male'});
  const females = persons.slice(0, firstMale);
  const males = persons.slice(firstMale);

  femalesAreSorted = true;
  for (let i = 0; i < females; i++) {
    if(females[i].gender !== 'female') {
      femalesAreSorted = false;
    } else if(females[i].lastName < females[i + 1].lastName) {
      femalesAreSorted = false;
    } else if (females[i].lastName === females[i + 1].lastName && females[i].firstName < females[i + 1].firstName) {
      femalesAreSorted = false;
    }
  }

  malesAreSorted = true;
  for (let i = 0; i < females; i++) {
    if(males[i].gender !== 'male') {
      malesAreSorted = false;
    } 
    else if(males[i].lastName < males[i + 1].lastName) {
      malesAreSorted = false;
    } else if (males[i].lastName === males[i + 1].lastName && males[i].firstName < males[i + 1].firstName) {
      malesAreSorted = false;
    }
  }

  expect(femalesAreSorted && malesAreSorted).toBe(true);
});


/**
 * verify that the parseFiles() method passed sort-by birthDate does sort by the person\'s birthday in ascending order.
 */
test('sort-by name sorts by lastName in descending order', async () => {
  generateFiles(20);
  const persons = parseFiles(SORT_BY.BIRTH_DATE);
  let sortedByBirthDate = true;
  for(let i = 0; i < persons.length - 1; i++){
    if ( Date.parse(persons[i].birthDate) <= Date.parse(persons[i + 1].birthDate)){
      sortedByBirthDate = false;
    } 
  }
  expect(sortedByBirthDate).toBe(true);
});



/**
 * verify that the cleanUp method deletes the data-files directory along with all data files.
 */
test('verify that the cleanUp deletes all files and directories', () => {
  generateFiles(20);
  const hadDirectory = haveDirectory();
  const hadFiles = (readDirectoryContents().length > 0);
  cleanUp();
  expect(hadDirectory && hadFiles && !haveDirectory()).toBe(true);
});

/**
 * verify that the cleanUp will not throw an error if the data-files directory does not exist.
 */
test('verify that the cleanUp will not error is data-files directory does not exist', () => {
  if(haveDirectory()){
    deleteAllFiles();
    deleteDirectory();
  }
  const noDirectory = !haveDirectory();
  const noCleanUpError = cleanUp();
  expect(noDirectory && noCleanUpError).toBe(true);
});