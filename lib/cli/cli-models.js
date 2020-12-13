class InputValidation {
	constructor(valid, error = ''){
		this._isValid = valid;
		this._errorMessage = typeof error === 'string' ? error : error.hasOwnProperty('message') ? error.message : JSON.stringify(error);
	}
	get isValid() {
		return this._isValid;
	}
	get errorMessage(){
		return this._errorMessage;
	}
}

class UserInput {
	constructor (input, validation){
		this._input = input;
		this._validation = validation;
	}
	get input() {
		return this._input;
	}
	get validation() {
		return this._validation;
	}	
}

exports.InputValidation = InputValidation;
exports.UserInput = UserInput;