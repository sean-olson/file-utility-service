"use strict";

const { filePath, 
        randomValues, 
        verifyDirectory,
        fetchDirectoryInventory, 
        readFile, 
        writeFile } = require('./file-helpers'); //file-api helper functions
const { SORT_BY } = require('./file-constants'); // constants to determine sort field of records
const { Person } = require('./file-constructors'); // an es5 constructor used to represent each record

// file definitions used to auto generate the data files
const fileDefinitions = [
    {fileName: "pipe-delimited-files.txt", separator: " | "},
    {fileName: "comma-delimited-files.txt", separator: ", "},
    {fileName: "space-delimited-files.txt", separator: " "}
];

// sort functions used for recordsets
const getSortFunction = (sortBy) => {
    switch(sortBy){
        case SORT_BY.NAME:
            return function(a, b){ 
                if(a.lastName > b.lastName){
                    return -1
                } else if (a.lastName === b.lastName){
                    return a.firstName > b.firstName ? -1 : 1;
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
        case SORT_BY.DOB:
            return function(a, b){ 
                return Date.parse(a.birthDay) < Date.parse(b.birthDay) ? -1 : 1;
            };
        default:
            return function(a, b){ 
                return a.lastName > b.lastName ? -1 : 1;
            }; 
    }
};

const fileMethods = {
    generateFiles: async (num = 10) => {

        const records = num > 0 && num < 100 ? num : 10;
        verifyDirectory();
        
        for (let i = 0; i < fileDefinitions.length; i++){
           const file =  fileDefinitions[i];
           let fileContent = "";
           for (let i = 0; i < records; i++) {
               fileContent += `${randomValues.getRandomRecord(file.separator)}\n`;
           }
           await writeFile(fileContent, file.fileName);
        }

        return `Data files created in ${filePath}`;
    },
    fetchFiles: async () => {
        const fileNames = fetchDirectoryInventory();
        const dataFiles = [];
        for(let i = 0; i < fileNames.length; i++) {
            dataFiles.push(await readFile(fileNames[i]));
        }
        return dataFiles;
    },
    parseFiles: async (sortBy) => {
        const data = await fileMethods.fetchFiles();
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
        const sortFunction = getSortFunction(sortBy);
        records.sort(sortFunction);
        return records;
    }
}

module.exports = fileMethods;