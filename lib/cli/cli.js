"use strict";

const cliIo = require('./cli-io.js');
const { InputValidation, UserInput } = require('./cli-models.js');
const { buildHelpMenu, getOptionValue, isValidMethod, parseUserInput } = require('./cli-helpers');
const { generateFiles, parseFiles } = require('../file/file-api');

let menuDefinition = [];

const commands = {
    generateFiles: {
        method: (args) => {
			const spinner = cliIo.startSpinner('Generating Files...');
			try {
				const numberOfRecords = getOptionValue(args, '-n') || 10;
				const result = generateFiles(numberOfRecords);
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
        description: 'generates the sample files with 10 records unless -n is specified, constraint: 0 < n < 100.',
		usage: 'generateFiles [-n <number>]'
	},	
    getCommand: {
        method: async () => {
			try{
				const input = await cliIo.getUserInput();						
				const parsedInput = parseUserInput(input.userInput);			
				const inputValidation = isValidMethod(parsedInput, commands);
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
        description: 'displays the help menu for the cli',
		usage: 'help'
    },	
	launch: {
		method: () => {
			cliIo.printBanner();
			menuDefinition = buildHelpMenu(commands);
			commands.help.method();
			commands.promptUser.method();
		},
		validate: (args) => {
			return new InputValidation(false, 'No CLI method by the name launch');
		},		
		public: false,	
		description: '',
		usage: ''
	},
    parseFiles: {
        method: (args) => {
			const spinner = cliIo.startSpinner('Parsing Files...');
			const sortBy = getOptionValue(args, '-s');
			const results = parseFiles(sortBy);
			cliIo.printRecords(results);
			spinner.stop();
			return true;
		},
		validate: (args) => {
			return new InputValidation(true);
		},		
		public: true,	
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

				try {
					cmd.method(userInput.input.args);
					commands.promptUser.method();
				} catch (error){
					commands.printError.method(error);
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





