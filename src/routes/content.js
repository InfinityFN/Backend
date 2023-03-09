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
                 "emergencynotice": {
      "news": {
        "_type": "Battle Royale News",
        "messages": [
          {
            "hidden": false,
            "_type": "CommonUI Simple Message Base",
            "title": fortnitecontentyay.emergencynotice.title,
            "body": fortnitecontentyay.emergencynotice.body,
            "spotlight": true
          }
        ]
      },
      "_title": "emergencynotice",
      "_noIndex": false,
      "alwaysShow": false,
      "_activeDate": "2018-08-06T19:00:26.217Z",
      "lastModified": "2019-10-29T22:32:52.686Z",
      "_locale": "en-US"
    },
    "emergencynoticev2": {
      "jcr:isCheckedOut": true,
      "_title": "emergencynoticev2",
      "_noIndex": false,
      "jcr:baseVersion": "a7ca237317f1e771e921e2-7f15-4485-b2e2-553b809fa363",
      "emergencynotices": {
        "_type": "Emergency Notices",
        "emergencynotices": [
          {
            "gamemodes": [],
            "hidden": false,
            "_type": "CommonUI Emergency Notice Base",
            "title": fortnitecontentyay.emergencynotice.title,
            "body": fortnitecontentyay.emergencynotice.body
          }
        ]
      },
      "_activeDate": "2018-08-06T19:00:26.217Z",
      "lastModified": "2021-12-01T15:55:56.012Z",
      "_locale": "en-US"
    },
    "battleroyalenews": {
      "news": {
        "platform_messages": [
          {
            "hidden": false,
            "_type": "CommonUI Simple Message Platform",
            "message": {
              "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/battleroyalenews/v11/v1101/11BR_EpicGamesAndroidLauncherAssets_MOTD-1024x512-18dd3ddb2b4297abde65e0d898244181f4581326.jpg",
              "hidden": false,
              "_type": "CommonUI Simple Message Base",
              "subgame": "br",
              "title": "Epic Games app",
              "body": "The Fortnite Installer on Android is now the Epic Games app!\nUse it to download Fortnite on Android and check out all that's new in #FortniteChapter2",
              "spotlight": false
            },
            "platform": "android"
          }
        ],
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
      "_title": "battleroyalenews",
      "header": "",
      "style": "SpecialEvent",
      "_noIndex": false,
      "alwaysShow": false,
      "_activeDate": "2018-08-17T16:00:00.000Z",
      "lastModified": "2019-10-31T20:29:39.334Z",
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
