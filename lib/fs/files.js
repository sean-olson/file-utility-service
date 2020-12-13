"use strict";

const fs = require('fs');
const path = require('path');
const { SORT_BY } = require('./files-constants'); // constants to determine sort field of records
const { Person } = require('./files-constructors'); // an es5 constructor used to represent each record

// file definitions used to auto generate the data files
const fileDefinitions = [
    {fileName: "pipe-delimited-files.txt", separator: " | "},
    {fileName: "comma-delimited-files.txt", separator: ", "},
    {fileName: "space-delimited-files.txt", separator: " "}
];

// random value ranges and generators used to create records for the data files.
const randomValues = {
    lastName: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor'],
    firstName: ['Charlie', 'Finley', 'Skyler', 'Justice', 'Royal', 'Lennon', 'Oakley', 'Armani', 'Landry', 'Frankie', 'Sidney', 'Denver', 'Robin', 'Salem', 'Murphy', 'Hollis'],
    gender: ['female', 'male'],
    favoriteColor: ['RebeccaPurple', 'Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    getRandomValue: (type) => {
        const ix = Math.floor(Math.random() * randomValues[type].length);
        return randomValues[type][ix];
    },
    getRandomDate:() => {
        const year =  (new Date(Date.now()).getFullYear()) - Math.ceil(Math.random() * 82);
        const month = Math.ceil(Math.random() * 12);
        let day;
        switch(month){
            case 2:
                if(year % 4 == 0 && (year % 100 !== 0 || year % 400 === 0))
                    {day = Math.ceil(Math.random() * 29);} 
                else 
                    {day = Math.ceil(Math.random() * 28);}
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                day = Math.ceil(Math.random() * 30);
                break;
            default:
                day = Math.ceil(Math.random() * 31);
        }
        return `${month}/${day}/${year}`;
    },
    getRandomRecord(seperator){
        return `${randomValues.getRandomValue('lastName')}${seperator}${randomValues.getRandomValue('firstName')}${seperator}${randomValues.getRandomValue('gender')}${seperator}${randomValues.getRandomValue('favoriteColor')}${seperator}${randomValues.getRandomDate()}`;
    }
}

// the calculated file path where the data files will be stored.
const filePath = (process.cwd() + path.sep + 'data-files' + path.sep).split(path.sep).join(path.posix.sep);

// verify that the data-files directory exists
const verifyDirectory = () => {
    if (!fs.existsSync(filePath)){
      fs.mkdirSync(filePath) 
    }
}

// read a file from disk
const readFile = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(`${filePath}${fileName}`, {encoding: "utf8"}, function(error, data) {
            if (error) {
                reject(error);
                return;
            }
            resolve(data); 
          });        
    });
};

// write a file to disk
const writeFile = (content, fileName) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${filePath}${fileName}`, content, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(); 
        }); 
    });
};

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
        const fileNames = fs.readdirSync(filePath);
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