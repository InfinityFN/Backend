class Logger{
    error(msg){
        console.error(`\x1b[31m${msg}\x1b[0m`)
    }
    log(msg){
        console.log(`\x1b[35m${msg}\x1b[0m`)
    }
    warn(msg){
        console.warn(`\x1b[33m${msg}\x1b[0m`)
    }
}

module.exports.Logger = new Logger();