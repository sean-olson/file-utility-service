"use strict";

const UTL = require('./cli-utilities');
const cliIo = require('./cli-io.js');
const files = require('../file-api/file');

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

let menuDefinition = [];

const commands = {
    generateFiles: {
        method: async () => {
			const spinner = cliIo.startSpinner('Generating Files...');
			try {

				const result = await files.generateFiles();
				spinner.stop();	

				cliIo.printNewLines();
				cliIo.printMessage(result);
				cliIo.printNewLines();
				
			} catch (error) {
				spinner.stop();	
				throw error	
			}
		},
		validate: (args) => {
			return new InputValidation(true);
		},		
		public: true,
		isAsync: true,
        description: 'generates the sample files with 10 records unless -n is specified, constraint: 0 < n < 100.',
		usage: 'generateFiles [-n <number>]'
	},	
    getCommand: {
        method: async () => {
			try{
				const input = await cliIo.getUserInput();						
				const parsedInput = UTL.parseUserInput(input.userInput);			
				const inputValidation = isValidMethod(parsedInput);
				return new UserInput(parsedInput, inputValidation);			
			}
			catch(error){
				throw error
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
			cliIo.printHelp(menuDefinition);
			cliIo.printNewLines();
		},
		validate: (args) => {
			return new InputValidation(true);
		},	
		public: true, 
		isAsync: false,
        description: 'displays the help menu for the cli',
		usage: 'help'
    },	
	launch: {
		method: () => {
			cliIo.printBanner();
			buildHelpMenu();
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
			const spinner = cliIo.startSpinner('Parsing Files...');
			const result = await files.generateFiles();
			spinner.stop();
			return true;
		},
		validate: (args) => {
			return new InputValidation(true);
		},		
		public: true,
		isAsync: true,		
        description: 'parses and displays the test files in the order specified, name by default',
		usage: 'parseFiles [-s gender|birth|name]'
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

			//get the user input
			const userInput = await commands.getCommand.method();
		
			// user input is valid
			if (typeof userInput.validation !== 'undefined' && userInput.validation.isValid) {

				const cmd = commands[userInput.input.method];

				// if the command is for an asynchronous method
				if(cmd.isAsync){
					const result = await cmd.method(userInput.input.args)
						.catch((error) => {
							commands.printError.method(error);
						});
					commands.promptUser.method();

				//if the command is for a synchronous method
				} else {

					cmd.method(userInput.input.args);
					commands.promptUser.method();

				}

			// user input is invalid
			} else {
				
				//print the error message and show the help menu
				if(typeof userInput.validation !== 'undefined'){
					commands.printError.method(userInput.validation.errorMessage);
				} else {
					commands.printError.method(JSON.stringify(userInput));
				}
				
				cliIo.printNewLines();
				commands.help.method();
				cliIo.printNewLines();
				commands.promptUser.method();

			}

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
			cliIo.clearTerminal();
			process.exit(0);
		},
		validate: (args) => {
			return new InputValidation(true);
		},
		public: true, 
		isAsync: false,
		description: 'exits the cli',
		usage: 'exit'
    }	  
}

commands.launch.method();

function isValidMethod(input) {
	if(commands.hasOwnProperty(input.method)){
		return commands[input.method].validate(input.args);
	} else {
		return {valid: false, errorMessage: `No CLI method by the name '${input.method}'`}
	} 
}

function buildHelpMenu() {
	for (const command in commands) {
		if (commands[command].public){
			menuDefinition.push([command, commands[command].usage, commands[command].description]);
		}
	}
};



