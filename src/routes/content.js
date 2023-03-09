const AdminMod = require("../services/modules/Admin")
class FortniteGame {
    constructor(){
        this.application = require("express").Router()
        this.endpoints(this.application)
    }
    endpoints(application){
        application.get(["/content/api/pages/fortnite-game", "/content/app/pages/"], async (req,res) => {
             const fortnitecontentyay = await AdminMod.findOne({ _id: new ObjectId("6408cefd0e072e39fd5d7ebf") }).lean().catch(e => next(e))
            res.json({
 "_title": "Fortnite Game",
    "_activeDate": "2017-08-30T03:20:48.050Z",
    "lastModified": "2019-11-01T17:33:35.346Z",
    "_locale": "en-US",
                   "loginmessage": {
      "_title": "LoginMessage",
      "loginmessage": {
        "_type": "CommonUI Simple Message",
        "message": {
          "_type": "CommonUI Simple Message Base",
          "title": "Infinity",
          "body": "Welcome to the Infinity Beta\nDiscord: https://discord.gg/gtxWefsyfv"
        }
      },
      "_activeDate": "2017-07-19T13:14:04.490Z",
      "lastModified": "2018-03-15T07:10:22.222Z",
      "_locale": "en-US"
    },
                    "savetheworldnews": {
      "news": {
        "_type": "Battle Royale News",
        "messages": [
          {
            "image": fortnitecontentyay.news.news1.image,
            "hidden": false,
            "_type": "CommonUI Simple Message Base",
            "adspace": fortnitecontentyay.news.news1.adspace,
            "title": fortnitecontentyay.news.news1.title,
            "body": fortnitecontentyay.news.news1.body,
            "spotlight": false
          },
          {
            "image": fortnitecontentyay.news.news2.image,
            "hidden": false,
            "_type": "CommonUI Simple Message Base",
            "adspace": fortnitecontentyay.news.news2.adspace,
            "title": fortnitecontentyay.news.news2.title,
            "body": fortnitecontentyay.news.news2.body,
            "spotlight": false
          }
        ]
      },
      "_title": "SaveTheWorldNews",
      "_noIndex": false,
      "alwaysShow": false,
      "_activeDate": "2018-08-06T18:25:46.770Z",
      "lastModified": "2019-10-30T20:17:48.789Z",
      "_locale": "en-US"
    },
                    "creativenews": {
      "news": {
        "_type": "Battle Royale News",
        "messages": [
          {
            "image": fortnitecontentyay.news.news1.image,
            "hidden": false,
            "_type": "CommonUI Simple Message Base",
            "adspace": fortnitecontentyay.news.news1.adspace,
            "title": fortnitecontentyay.news.news1.title,
            "body": fortnitecontentyay.news.news1.body,
            "spotlight": false
          },
          {
            "image": fortnitecontentyay.news.news2.image,
            "hidden": false,
            "_type": "CommonUI Simple Message Base",
            "adspace": fortnitecontentyay.news.news2.adspace,
            "title": fortnitecontentyay.news.news2.title,
            "body": fortnitecontentyay.news.news2.body,
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
