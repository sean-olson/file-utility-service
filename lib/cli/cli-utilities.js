"use strict";

module.exports = {
    parseUserInput: (inputString) => {

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

    },
}