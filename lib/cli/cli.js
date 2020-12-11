const UTL = require('./cli-utilities');
const cliIo = require('./cli-io.js');
const files = require('../files');

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


function isValidMethod(input){
	if(commands.hasOwnProperty(input.method)){
		return commands[input.method].validate(input.args);
	} else {
		return {valid: false, errorMessage: `No CLI method by the name '${input.method}'`}
	} 
}

const commands = {
    generateFiles: {
        method: async () => {
			return true;
		},
		validate: (args) => {
			return new InputValidation(true);
		},		
		public: true,
		isAsync: true,
        description: '',
		usage: ''
	},	
    getCommand: {
        method: async () => {
			try{
				const input = await cliIo.getUserInput();						
				parsedInput = UTL.parseUserInput(input.userInput);			
				const inputValidation = isValidMethod(parsedInput);
				return new UserInput(parsedInput, inputValidation);			
			}
			catch(err){
				return err
			}
		},
		validate: (args) => {
			return new InputValidation(false, 'No CLI method by the name getCommand');
		},		
		public: false,
		isAsync: true,				
        description: '',
		usage: ''
    },
    help: {
        method: () => {
			cliIo.printHelp();
			
		},
		validate: (args) => {
			return new InputValidation(true);
		},	
		public: true, 
		isAsync: false,
        description: 'prints out help',
		usage: ''
    },	
	launch: {
		method: async () => {
			cliIo.printBanner();
			commands.help.method();
			commands.promptUser.method();
		},
		validate: (args) => {
			return new InputValidation(false, 'No CLI method by the name launch');
		},		
		public: false,
		isAsync: false,		
		description: '',
		usage: ''
	},
    parseFiles: {
        method: async (args) => {


		},
		validate: (args) => {
			return new InputValidation(true);
		},		
		public: true,
		isAsync: true,		
        description: '',
		usage: ''
	},
	printError: {
		method: (errorMessage) => {
			cliIo.printError(`ERROR: ${errorMessage}`);
		},
		validate: (args) => {
			return new InputValidation(false, 'No CLI method by the name printError');			
		},		
		public: false,
		isAsync: false,		
		description: '',
		usage: ''
	},
	promptUser: {
		method: async () => {
			const userInput = await commands.getCommand.method();
		
			if (typeof userInput.validation !== 'undefined' && userInput.validation.isValid) {
				
				const cmd = commands[userInput.input.method];
				if(cmd.isAsync){
					const result = await cmd.method(userInput.input.args);
					commands.promptUser();
				} else {
					cmd.method(userInput.input.args);
					commands.promptUser.method();
				}

			} else {

				if(typeof userInput.validation !== 'undefined'){
					commands.printError.method(userInput.validation.errorMessage);
				} else {
					commands.printError.method(JSON.stringify(userInput));
				}
				
				cliIo.printNewLines(1);
				commands.help.method();
				cliIo.printNewLines(1);
				commands.promptUser.method();

			}
			return false;
		},
		validate: (args) => {
			return new InputValidation(false, 'No CLI method by the name promptUser');
		},		
		public: false,
		isAsync: true,		
		description: '',
		usage: ''		
	},
	quit: {
        method: () => {
			process.exit(0);
		},
		validate: (args) => {
			return new InputValidation(true);
		},
		public: true, 
		isAsync: false,
		description: 'exit the cli',
		usage: ''
    }	  
}

commands.launch.method();



