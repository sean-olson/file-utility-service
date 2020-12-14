"use strict";

// DISCLAIMER: I know that a JS class is the common way to implement entities in an es6+ code base; however,
// I think it's important to keep in touch the prototypical origins of the language.

// an es5 constructor used to represent each record
function Person(params = ['Rogers', 'Will', 'male', 'Green', '11/4/1879']) {

    this.lastName = params[0] ? params[0].toString().trim() : 'Rogers';
    this.firstName = params[1] ? params[1].toString().trim() : 'Will';
    this.gender = params[2] ? params[2].toString().trim(): 'male';
    this.favoriteColor = params[3] ? params[3].toString().trim() : 'Green';
    this.birthDate = params[4] ? params[4].toString().trim() : '11/4/1879';
}

Person.prototype.toArray = function(){
    return [this.lastName, this.firstName, this.gender, this.favoriteColor, this.birthDate];
};

Person.prototype.toObject = function(){
    return {lastName: this.lastName, firstName: this.firstName, gender: this.gender, favoriteColor: this.favoriteColor, birthDate: this.birthDate};
};

exports.Person = Person;
