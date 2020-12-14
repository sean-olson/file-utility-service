"use strict";

const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const Table = require('cli-table');
const clear = require('clear');
var clui = require('clui');

module.exports = {
    clearTerminal: () => {
        clear();
    },
    getUserInput: () => {
        return new Promise((resolve, reject) => {
            const questions = [
                {
                    name: 'userInput',
                    type: 'input',
                    message: 'Enter Command:',
                    validate: function(value) {
                        if (value.length) {
                            return true;
                        } else {
                            console.log(chalk.red('Please enter a command. Type quit to exit. Type help for available commands.'))
                            return 'Enter Command:';
                        }
                    }
                }
            ];
            const pm = inquirer.prompt(questions);
            pm.then((userInput) => {resolve(userInput);})

        });

    },
    printBanner: () => {
        clear();
        console.log(
            chalk.greenBright(
                figlet.textSync('File-Utility CLI', {horizontalLayout: 'full'})
                )
        ); 
        console.log('\n');     
    },   
    printError: (error) => {
        console.log(chalk.red(error));
    },
    printHelp: (menuDefinition) => {
        
        console.log(chalk.red('>>> HELP!'));

        const table = new Table({
            head: ['Command', 'Usage', 'Description'],
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                   , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                   , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                   , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
          });
          
        menuDefinition.forEach((row) => {
            table.push(row);
        });        
          
        console.log(table.toString());     
        console.log('\n');

    },
    printMessage: (str) => {
        console.log(str);
    },    
    printNewLines: (num = 1) => {
        let ix = 0;
        while (ix < num && ix < 10){
            console.log('\n');
            ix++;
        }
    },
    printRecords: (records) => {

        console.log('\n');
        console.log(chalk.green(`>>> RESULTS: SHOWING ${records.length} RECORDS:`));

        const table = new Table({
            head: ['Last Name', 'First Name', 'Gender', 'Favorite Color', 'Birth Date'],
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                   , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                   , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                   , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
          });
          
          records.forEach((record) => {
            table.push(record.toArray());
        });        
          
        console.log(table.toString());     
        console.log('\n');        

    },
    startSpinner: (statusMessage) => {
        const Spinner = clui.Spinner;
        var spinner = new Spinner(statusMessage, ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);
        spinner.start();
        return spinner;
    }      
}