"use strict";

// an es5 constructor used to represent each record
function Person(params) {
    this.lastName = params[0].trim() || 'unknown';
    this.firstName = params[1].trim() || 'unknown';
    this.gender = params[2].trim() || 'unknown';
    this.favoriteColor = params[3].trim() || 'unknown';
    this.birthDay = params[4].trim() || 'unknown';
}

exports.Person = Person;