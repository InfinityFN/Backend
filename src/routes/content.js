
class FortniteGame {
    constructor(){
        this.application = require("express").Router()
        this.endpoints(this.application)
    }
    endpoints(application){
        application.get(["/content/api/pages/fortnite-game", "/content/app/pages/"], (req,res) => {
            res.json({
 "_title": "Fortnite Game",
    "_activeDate": "2017-08-30T03:20:48.050Z",
    "lastModified": "2019-11-01T17:33:35.346Z",
    "_locale": "en-US",
            })
        })
    }
}

module.exports = new FortniteGame
