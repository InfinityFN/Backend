
class FortniteGame {
    constructor(){
        this.application = require("express").Router()
        this.endpoints(this.application)
    }
    endpoints(application){
        application.get(["/content/api/pages/fortnite-game", "/content/app/pages/"], (req,res) => {
            res.json(require("../services/resources/json/content.json"))
        })
    }
}

module.exports = new FortniteGame