"use strict";

const {randomValues,
       filePath,
       haveDirectory,
       createDirectory,
       deleteDirectory,
       haveFile,
       writeFile,
       appendRecordToFile,
       readFile,
       deleteAllFiles} = require('./file-helpers'); //file-api helper functions

const { SORT_BY } = require('./file-constants'); // constants to determine sort field of records
const { Person } = require('./file-constructors'); // an es5 constructor used to represent each record

/**
 * file definitions used in file generation and parsing methods
 */
const fileDefinitions = [
    {fileName: "pipe-delimited-files.txt", separator: " | "},
    {fileName: "comma-delimited-files.txt", separator: ", "},
    {fileName: "space-delimited-files.txt", separator: " "}
];

/**
 * returns the appropriate sort function for a given sortBy field
 * @param {string} sortBy : a sortBy constant
 */
const getSortFunction = (sortBy) => {
    switch(sortBy){
        case SORT_BY.NAME:
            return function(a, b){ 
                if (a.lastName === b.lastName){
                    if(a.firstName > b.firstName){

                        return -1;
                    } else {
                        return 1;
                    }
                } else if(a.lastName > b.lastName){
                        return -1                    
                } else {
                    return 1;
                }
            };
        case SORT_BY.GENDER:
            return function(a, b) { 
                if(a.gender === 'female'){
                    if(b.gender === 'female'){
                        if(a.lastName > b.lastName){
                            return -1
                        } else if (a.lastName === b.lastName){
                            return a.firstName > b.firstName ? -1 : 1;
                        } else {
                            return 1;
                        }
                    } else {
                        return -1;
                    }
                }
                else if(b.gender === 'female') {
                    return 1;
                } else {
                    if(a.lastName > b.lastName){
                        return -1
                    } else if (a.lastName === b.lastName){
                        return a.firstName > b.firstName ? -1 : 1;
                    } else {
                        return 1;
                    } 
                }
            };
        case SORT_BY.BIRTH_DATE:
            return function(a, b){ 
                return Date.parse(a.birthDate) < Date.parse(b.birthDate) ? -1 : 1;
            };
        default:
            return function(a, b){ 
                if (a.lastName === b.lastName){
                    if(a.firstName > b.firstName){

                        return -1;
                    } else {
                        return 1;
                    }
                } else if(a.lastName > b.lastName){
                        return -1                    
                } else {
                    return 1;
                }
            };
    }
};

/**
 * cleans up the disk, deleting the data files and directory
 */
const cleanUp = () => {
    deleteAllFiles();
    deleteDirectory();
    return true;
}

/**
 * generates the data files ad defined
 * @param {number} num : the number of records to produce for each data file.
 */
const generateFiles = (num = 10) => {

    const records = num > 0 && num < 100 ? num : 10;
    if (!haveDirectory()){
        createDirectory();
    }
    
    for (let i = 0; i < fileDefinitions.length; i++){
       const file =  fileDefinitions[i];
       let fileContent = "";
       for (let i = 0; i < records; i++) {
           fileContent += `${randomValues.getRandomRecord(file.separator)}\n`;
       }
       writeFile(fileContent, file.fileName);
    }

    return `SUCCESS: ${records * 3} new records created across 3 data files in ${filePath}`;
};

/**
 * verifies that the defined data files exist
 */
const haveDataFiles = () => {
    for(let fileDefinition of fileDefinitions){
        if(! haveFile(fileDefinition.fileName)){
            return false;
        }
    }
    return true;
}

/**
 * returns the contents of the data files as an array of strings.
 */
const fetchDataFiles = () => {

    if(!haveDataFiles()){
        generateFiles();
    }
    const dataFiles = [];
    for(let i = 0; i < fileDefinitions.length; i++) {
        dataFiles.push(readFile(fileDefinitions[i].fileName));
    }
    return dataFiles;
};

/**
 * returns the parsed and sorted records as an array of Person instances
 * @param {string} sortBy : a string constant that represents the sortBy field
 */
const parseFiles = (sortBy) => {
    const data = fetchDataFiles();
    const records = [];
    data.forEach((recordSet) => {
        const seperator =  recordSet.indexOf('|') > -1 ? '|' : recordSet.indexOf(',') > -1 ? ',' : ' ';
        const recordBuffer = recordSet.split('\n');
        recordBuffer.forEach((record) => { 
            if(record !== '') {
                const params = record.split(seperator);                
                records.push(new Person(record.split(seperator)));
            }
        });
    });
    const sortFunction = getSortFunction(sortBy || SORT_BY.NAME);
    records.sort(sortFunction);
    return records;
};

/**
 * appends a person record to a data file
 * @param {string[]} person 
 */
const appendRecord = (person) => {
    if(!haveDataFiles()){
        generateFiles();
    }
    const fileDef = fileDefinitions[0];
    let record = `${person.join(fileDef.separator)}\n`;
    return appendRecordToFile(fileDef.fileName, record);
};


exports.fileDefinitions = fileDefinitions;
exports.appendRecord = appendRecord;
exports.cleanUp = cleanUp;
exports.generateFiles = generateFiles;
exports.haveDataFiles = haveDataFiles;
exports.fetchDataFiles = fetchDataFiles;
exports.parseFiles = parseFiles;