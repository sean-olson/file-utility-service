
const {haveDirectory,
       createDirectory,
       readDirectoryContents,
       deleteDirectory,
       haveFile,
       writeFile,
       readFile,
       deleteFile,
       deleteAllFiles} = require('../lib/file/file-helpers');


/**
 * verify that file-helper method can create the data-files directory
 */
test('can create the data-files directory', () => {
       createDirectory();
       expect(haveDirectory()).toBe(true);  
});

/**
 * verify that file-helper method can detect when the data-files directory exists
 */
test('detect that data-files directory exists', () => {
       expect(haveDirectory()).toBe(true);
});

/**
 * verify that file-helper method can delete the data-files directory
 */
test('can delete the data-files directory', () => {
       deleteDirectory();
       expect(haveDirectory()).toBe(false);  
});

/**
 * verify that file-helper method can detect when the data-files directory does not exist
 */
test('detect that the data-files directory does not exist', () => {
       expect(haveDirectory()).toBe(false);
}); 

/**
 * verify that file-helper method can create a file when the data-files directory exists
 */
test('able to create and find a file when the data-files directory exists', () => {
       if (!haveDirectory()){
              createDirectory();
       }
       writeFile('INDEXABLE FILE', 'indexable-file.txt');
       expect(haveFile('indexable-file.txt')).toBe(true);
});

/**
 * verify that file-helper method can detect that a file exists in the data-files directory
 */
test('able to create and find a file when the data-files directory exists', () => {
       if (!haveDirectory()){
              createDirectory();
       }
       writeFile('FINDABLE FILE', 'findable-file.txt');
       expect(haveFile('findable-file.txt')).toBe(true);
});

/**
 * verify that file-helper method can delete a file from the data-files directory
 */
test('delete a file when it exists', () => {
       if (!haveDirectory()){
              createDirectory();
       }       
       writeFile('DELETABLE FILE', 'deletable-file.txt');
       const fileExisted = haveFile('deletable-file.txt');
       deleteFile('deletable-file.txt');
       expect(fileExisted && deleteFile('deletable-file.txt')).toBe(true);
}); 

/**
 * verify that file-helper method will not throw and error when attempting to delete a file that does not exist
 */
test('no error when trying to delete a file that does not exist', () => {
       if (!haveDirectory()){
              createDirectory();
       }   
       const fileExisted = haveFile('some-random-file.txt');
       deleteFile('some-random-file.txt');
       expect(fileExisted === false && deleteFile('some-random-file.txt')).toBe(true);
}); 


/**
 * verify that file-helper method can create a file when the data-files directory does not exist by first creating the directory
 */
test('able to create a file when the data-files directory does not exist', () => {
       deleteDirectory();
       const directoryDeleted = !haveDirectory();
       writeFile('INDEXABLE FILE', 'indexable-file.txt');
       expect(directoryDeleted && haveDirectory() && haveFile('indexable-file.txt')).toBe(true);
});


/**
 * verify that file-helper method can delete all files in the data-files directory 
 */
test('delete all files none exist', () => {
       writeFile('DELETABLE FILE', 'deletable-file-1.txt');
       writeFile('DELETABLE FILE', 'deletable-file-2.txt');
       deleteAllFiles();
       expect(readDirectoryContents().length === 0).toBe(true);
});   


/**
 *  verify that file-helper method can read the contents of a file
 */    
test('test reading the contents the data-files directory when files exist', () => {
       writeFile('READABLE FILE', 'readable-file.txt');
       expect(readFile('readable-file.txt')).toBe('READABLE FILE');
       deleteDirectory();

});




       
  

  

