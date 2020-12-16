
/**
 * wrapper class for node's environment variables
 */

class Environment{
    get title(){
        return process.env.TITLE;
    }
    get version(){
        return process.env.VERSION;
    }
    get httpPort(){
        return process.env.HTTP_PORT;
    }            
}

const env = new Environment();
exports.env = env;