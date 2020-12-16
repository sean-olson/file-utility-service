"use strict";

const fs = require('fs');
const path = require('path');

/**
 * the calculated file path where the data files will be stored.
 */
const filePath = (process.cwd() + path.sep + 'data-files' + path.sep).split(path.sep).join(path.posix.sep);

/**
 * random value ranges and generators used to create records for the data files.
 */
const randomValues = {
    
    /**
     * a range of last names
     */
    lastName: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor'],
    
    /**
     * a range of first names
     */
    firstName: ['Charlie', 'Finley', 'Skyler', 'Justice', 'Royal', 'Lennon', 'Oakley', 'Armani', 'Landry', 'Frankie', 'Sidney', 'Denver', 'Robin', 'Salem', 'Murphy', 'Hollis'],
    
    /**
     * a range of genders
     */
    gender: ['female', 'male'],
    
    /**
     * a range of colors
     */
    favoriteColor: ['RebeccaPurple', 'Red', 'Orange', 'Yellow', 'Green', 'Blue'],

    /**
     * random value denerator
     * @param {stirng} type: legal types => lastName | firstName | gender | favoriteColor
     */
    getRandomValue: (type) => {
        const ix = Math.floor(Math.random() * randomValues[type].length);
        return randomValues[type][ix];
    },

    /**
     * random date generator
     */
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

/**
 * verify that the data-files directory exists
 */
const haveDirectory = () => {
    return fs.existsSync(`${filePath}`);
}

/**
 * creates the data-files directory
 */
const createDirectory = () => {
    if(!fs.existsSync(filePath)){
        fs.mkdirSync(filePath);
        return fs.existsSync(filePath);
    }
    return true;
}

/**
 * fetches the names of files in the data-file directory 
 */
const readDirectoryContents = () => {
    return fs.readdirSync(filePath);
}

/**
 * delete the data-files directory
 */
const deleteDirectory = () => {
    if (fs.existsSync(filePath)){
        const files = fs.readdirSync(filePath);;
        for (let i = 0; i < files.length; i++){
            fs.unlinkSync(`${filePath}${files[i]}`);
        }
        fs.rmdirSync(filePath);
    }
    return !fs.existsSync(filePath);
}

/**
 * verifys that a file exists in the data-files directory
 * @param {string} fileName 
 */
const haveFile = (fileName) => {
    return fs.existsSync(`${filePath}${fileName}`);
};

/**
 * write a file to data-files directory
 * @param {string} content 
 * @param {string} fileName 
 */
const writeFile = (content, fileName) => {
    if (!fs.existsSync(`${filePath}`)){
        fs.mkdirSync(filePath);
    }
    fs.writeFileSync(`${filePath}${fileName}`, content); 
    return fs.existsSync(`${filePath}${fileName}`);
};

/**
 * appends a person record to the selected file
 * @param {string} fileName 
 * @param {string} record 
 */
const appendRecordToFile = (fileName, record) => {
    if (!fs.existsSync(`${filePath}${fileName}`)){
        return false;
    }    
    fs.appendFileSync(`${filePath}${fileName}`, record);
    return true;
}

/**
 * read a file from data-files directory
 * @param {string} fileName 
 */
const readFile = (fileName) => {
    if (!fs.existsSync(`${filePath}`)){
        return false;
    }    
    return fs.readFileSync(`${filePath}${fileName}`, {encoding: "utf8"});
};

/**
 * delete a named file from the data-files directory
 * @param {string} fileName 
 */
const deleteFile = (fileName) => {
    if(fs.existsSync(`${filePath}${fileName}`)) {
        fs.unlinkSync(`${filePath}${fileName}`);
    }
    return !fs.existsSync(`${filePath}${fileName}`);
};

/**
 * delete all files in the data-files directory
 */
const deleteAllFiles = () => {
    if (fs.existsSync(filePath)){
        const files = fs.readdirSync(filePath);;
        for (let i = 0; i < files.length; i++){
            fs.unlinkSync(`${filePath}${files[i]}`);
        }
        return (fs.readdirSync(filePath).length === 0);
    }
    return true; 
};

exports.filePath = filePath;
exports.randomValues = randomValues;
exports.haveDirectory = haveDirectory;
exports.createDirectory = createDirectory;
exports.readDirectoryContents = readDirectoryContents;
exports.deleteDirectory = deleteDirectory;
exports.haveFile = haveFile;
exports.writeFile = writeFile;
exports.appendRecordToFile = appendRecordToFile;
exports.readFile = readFile;
exports.deleteFile = deleteFile;
exports.deleteAllFiles = deleteAllFiles;