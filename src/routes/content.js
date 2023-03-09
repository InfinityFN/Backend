
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
                    "creativenews": {
      "news": {
        "_type": "Battle Royale News",
        "messages": [
          {
            "image": "https://i.pinimg.com/originals/d0/a3/c3/d0a3c3ffade9804fad4075b13323d31d.png",
            "hidden": false,
            "_type": "CommonUI Simple Message Base",
            "adspace": "JOIN OUR COMMUNITY!",
            "title": "Join my discord server!",
            "body": "https://discord.gg/gtxWefsyfv",
            "spotlight": false
          },
          {
            "image": "https://media.discordapp.net/attachments/1080368888342130829/1080370749044432917/image.png?width=1201&height=671",
            "hidden": false,
            "_type": "CommonUI Simple Message Base",
            "adspace": "BETA!",
            "title": "Infinity",
            "body": "Welcome to Infinity!",
            "spotlight": false
          }
        ]
      },
      "_title": "Creativenews",
      "header": "",
      "style": "None",
      "_noIndex": false,
      "alwaysShow": false,
      "_activeDate": "2018-08-17T16:00:00.000Z",
      "lastModified": "2019-10-31T20:35:52.569Z",
      "_locale": "en-US"
    },
    "_suggestedPrefetch": []
  
            })
        })
    }
}

module.exports = new FortniteGame
