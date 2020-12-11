const { TestScheduler } = require('jest');
const cli = require('../lib/cli/cli');
const cliIo = require('../lib/cli/cli-io');
const cliMethods = require('../lib/cli/cli-methods');


//tests the return of the cli command array from cli-methods
test('getCliCommands() returns an string array of some length', () => {
    expect(cliMethods.getCliCommands()).toBe(true)
});