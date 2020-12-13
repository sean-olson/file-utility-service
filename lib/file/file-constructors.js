"use strict";

// DISCLAIMER: I know that a JS class is the common way to implement entities in an es6+ code base; however,
// I think it's important to keep in touch the prototypical origins of the language.

// an es5 constructor used to represent each record
function Person(params) {
    this.lastName = params[0].trim() || 'unknown';
    this.firstName = params[1].trim() || 'unknown';
    this.gender = params[2].trim() || 'unknown';
    this.favoriteColor = params[3].trim() || 'unknown';
    this.birthDay = params[4].trim() || 'unknown';
}

Person.prototype.toArray = function(){
    return [this.lastName, this.firstName, this.gender, this.favoriteColor, this.birthDay];
};

Person.prototype.toObject = function(){
    return {lastName: this.lastName, firstName: this.firstName, gender: this.gender, favoriteColor: this.favoriteColor, birthDay: this.birthDay};
};

exports.Person = Person;