const { TestScheduler } = require('jest');
const { Person } = require('../lib/file/file-constructors');

/**
 * verify that the constructor Person can be instanced
 */
test('verify Person constructor works', ()=>{
    const person = new Person(['Rogers', 'Will', 'male', 'Green', '11/4/1879']);
    expect(person instanceof Person).toBe(true);
});

/**
 * verify that a new Person passed no parameters will use default values
 */
test('verify sue of default parameters no params given ', ()=>{
    const person = new Person();
    let itIsWill = true;

    itIsWill = person.lastName === 'Rogers' ? itIsWill : false;
    itIsWill = person.firstName === 'Will' ? itIsWill : false;
    itIsWill = person.gender === 'male' ? itIsWill : false;
    itIsWill = person.favoriteColor=== 'Green' ? itIsWill : false;
    itIsWill = person.birthDate === '11/4/1879' ? itIsWill : false;

    expect(itIsWill).toBe(true);
});

/**
 * verify that a new Person passed partial parameters will use default values for missing values
 */
test('verify sue of default parameters when partial params given', ()=>{
    const person = new Person(['Olson', 'Sean', '', '', '7/4/1976']);
    let itIsWill = true;

    itIsWill = person.lastName === 'Olson' ? itIsWill : false;
    itIsWill = person.firstName === 'Sean' ? itIsWill : false;
    itIsWill = person.gender === 'male' ? itIsWill : false;
    itIsWill = person.favoriteColor=== 'Green' ? itIsWill : false;
    itIsWill = person.birthDate === '7/4/1976' ? itIsWill : false;

    expect(itIsWill).toBe(true);
});

/**
 * verify that the constructor's toArray method returns an array with five elements with the correct values'
 */
test('verify Person.toArray method works', ()=>{
    const person = new Person(['Rogers', 'Will', 'male', 'Green', '11/4/1879']);
    let arrayIsCorrect = true;

    const personArray = person.toArray();
    arrayIsCorrect = Array.isArray(personArray) ? arrayIsCorrect : false;
    arrayIsCorrect = personArray.length === 5 ? arrayIsCorrect : false;
    arrayIsCorrect = arrayIsCorrect && personArray[0] === 'Rogers' ? arrayIsCorrect : false;
    arrayIsCorrect = arrayIsCorrect && personArray[1] === 'Will' ? arrayIsCorrect : false;
    arrayIsCorrect = arrayIsCorrect && personArray[2] === 'male' ? arrayIsCorrect : false;
    arrayIsCorrect = arrayIsCorrect && personArray[3] === 'Green' ? arrayIsCorrect : false;
    arrayIsCorrect = arrayIsCorrect && personArray[4] === '11/4/1879' ? arrayIsCorrect : false;

    expect(arrayIsCorrect).toBe(true);
});

/**
 * verify that the constructor's toObject method returns an object with the five correct properties with the correct values'
 */
test('verify Person.toArray method works', ()=>{
    const person = new Person(['Rogers', 'Will', 'male', 'Green', '11/4/1879']);
    let objectIsCorrect = true;

    const personObject = person.toObject();
    objectIsCorrect = (typeof personObject === 'object') ? objectIsCorrect : false;
    objectIsCorrect = (Object.keys(personObject).length === 5) ? objectIsCorrect : false;
    objectIsCorrect = (personObject.hasOwnProperty('lastName') && personObject.lastName === 'Rogers') ? objectIsCorrect : false;
    objectIsCorrect = (personObject.hasOwnProperty('firstName') && personObject.firstName === 'Will') ? objectIsCorrect : false;
    objectIsCorrect = (personObject.hasOwnProperty('gender') && personObject.gender === 'male') ? objectIsCorrect : false;
    objectIsCorrect = (personObject.hasOwnProperty('favoriteColor') && personObject.favoriteColor === 'Green') ? objectIsCorrect : false;
    objectIsCorrect = (personObject.hasOwnProperty('birthDate') && personObject.birthDate === '11/4/1879') ? objectIsCorrect : false;

    expect(objectIsCorrect).toBe(true);
});