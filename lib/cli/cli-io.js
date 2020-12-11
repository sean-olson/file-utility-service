const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');

module.exports = {
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
        console.log(
            chalk.greenBright(
                figlet.textSync('File Utility CLI', {horizontalLayout: 'full'})
                )
        );      
    },   
    printError: (error) => {
        console.log(chalk.red(error));
    },
    printHelp: () => {
        console.log(chalk.yellow('HELP IS COMING'));
    },
    printLine: (str) => {
        console.log(str);
    },    
    printNewLines: (num = 1) => {
        let ix = 0;
        while (ix < num && ix < 10){
            console.log('\n');
            ix++;
        }
    }       
}