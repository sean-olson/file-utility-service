
/**
 * wrapper class for node's environment variables
 */

class Environment{
    get httpPort(){
        return process.env.HTTP_PORT;
    }
}

const env = new Environment();
exports.env = env;