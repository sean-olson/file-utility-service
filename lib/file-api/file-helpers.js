"use strict";

const fs = require('fs');
const path = require('path');

// the calculated file path where the data files will be stored.
const filePath = (process.cwd() + path.sep + 'data-files' + path.sep).split(path.sep).join(path.posix.sep);

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

// verify that the data-files directory exists
const verifyDirectory = () => {
    if (!fs.existsSync(filePath)){
      fs.mkdirSync(filePath) 
    }
}

const fetchDirectoryInventory = () => {
    return fs.readdirSync(filePath);
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

exports.filePath = filePath;
exports.randomValues = randomValues;
exports.verifyDirectory = verifyDirectory;
exports.fetchDirectoryInventory = fetchDirectoryInventory;
exports.readFile = readFile;
exports.writeFile = writeFile;