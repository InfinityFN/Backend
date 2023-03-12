const express = require("express")
const fs = require("fs");
const cookieParser = require("cookie-parser");
const User = require("./services/modules/User")
// PROD

class Server {
    constructor() {
        this.application = express();
        this.port = require("./config.json").port
        this.mongodb = require("./config.json").mongodb
        this.logger = require("./services/Logger").Logger
        this.Use();
        this.Routing(this.application, this.logger);
        this.Init();
        process.on('warning', e => console.warn(e.stack));
        this.application.use(function(req, res, next) {
         //  console.log(req.url)
            next()
        })
    }
    Use() {
        this.application.use(express.json())
        this.application.use(express.urlencoded({ extended: true }))
        this.application.use(cookieParser());
    }
    Routing(application, logger) {
        fs.readdirSync(`${__dirname}/routes`).filter(async function (mainFiles) {
            if (mainFiles.endsWith(".js")) {
               // try {
                    await application.use(require(`./routes/${mainFiles}`).application)
                   
               // } catch (err) {
                    
                   // logger.error(`Sorry, ${mainFiles} Failed To Load, Err: ${err}`)
              //  }
            }else{
                logger.error(`Sorry, ${mainFiles} Failed To Load Please make sure it ends with .js`)
            }
        })
    }
    Init() {
        if (!this.port) return console.log("PORT NOT SET!")
        this.application.listen(this.port || process.env.port, async () => {
            this.logger.log(`[Server] Running on port ${this.port || process.env.port}`)
            await require("./services/Mongodb").MongoDB.Connect(this.mongodb, this.logger)
 
            require("./services/matchmaker").matchmaker;
           require("./services/xmpp").xmpp;
          
          //  this.application.get("*", function (req,res) {
               // res.json({ "eh": "Your one of thoses people ;) skidder..."})
          //  })
        })
        
    }
}
module.exports.Server = new Server;