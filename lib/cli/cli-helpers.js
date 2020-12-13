"use strict";

const isValidMethod = (input, commands) => {
	if(commands.hasOwnProperty(input.method)){
		return commands[input.method].validate(input.args);
	} else {
		return {valid: false, errorMessage: `No CLI method by the name '${input.method}'`}
	} 
}

const buildHelpMenu = (commands) => {
    const menu = []
	for (const command in commands) {
		if (commands[command].public){
			menu.push([command, commands[command].usage, commands[command].description]);
		}
    }
    return menu;
};


const parseUserInput = (inputString) => {

    const buffer = inputString.split(' ');
    let ix = 1;
    const args = [];

    while(ix < buffer.length) {
        if (buffer[ix].match(/^-/ ) !== null) {
            const arg = {flag: '', option: ''};
            arg.flag = buffer[ix].trim();
            if (buffer[ix + 1] && buffer[ix + 1].match(/-/g ) === null) {
                ix++;
                arg.option = buffer[ix].trim();  
            }
            args.push(arg);
        }
        ix++;
    }

    return {
        input: inputString,
        method: buffer[0].trim(),
        args
    }
};


exports.isValidMethod = isValidMethod; 
exports.buildHelpMenu = buildHelpMenu; 
exports.parseUserInput = parseUserInput; 