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
                            "special_border": "None",
            "_type": "FortPlaylistInfo"
          },
          {
            "playlist_name": "Playlist_Trios",
            "hidden": false,
            "_type": "FortPlaylistInfo"
          },
          {
            "image": "https://i.imgur.com/YA4ssMv.jpg",
            "playlist_name": "Playlist_DefaultSquad",
            "hidden": false,
            "special_border": "None",
            "_type": "FortPlaylistInfo"
          }
        ]
      },
      "_noIndex": false,
      "_activeDate": "2018-04-25T15:05:39.956Z",
      "lastModified": "2019-10-29T14:05:17.030Z",
      "_locale": "en-US"
    },
    "tournamentinformation": {
      "tournament_info": {
        "tournaments": [
          {

          }
        ],
        "_type": "Tournaments Info"
      },
      "_title": "tournamentinformation",
      "_noIndex": false,
      "_activeDate": "2018-11-13T22:32:47.734Z",
      "lastModified": "2019-11-01T17:33:35.346Z",
      "_locale": "en-US"
    },
   
    "koreancafe": {
      "_title": "KoreanCafe",
      "cafe_info": {
        "cafes": [
          {
            "korean_cafe": "PCB.Partner.Neowiz",
            "korean_cafe_description": "ON",
            "_type": "PCB Info",
            "korean_cafe_header": "PC CAFE BENEFITS"
          },
          {
            "korean_cafe": "PCB.Partner.Other",
            "korean_cafe_description": "ON",
            "_type": "PCB Info",
            "korean_cafe_header": "PC CAFE BENEFITS"
          }
        ],
        "_type": "PCBs"
      },
      "_activeDate": "2018-10-25T18:35:49.659Z",
      "lastModified": "2018-11-07T06:37:42.201Z",
      "_locale": "en-US"
    },
    "creativeAds": {
      "ad_info": {
        "ads": [],
        "_type": "Creative Ad Info"
      },
      "_title": "creative-ads",
      "_activeDate": "2018-11-09T20:00:42.300Z",
      "lastModified": "2019-09-25T15:55:44.830Z",
      "_locale": "en-US"
    }, 
    "creativeFeatures": {
      "ad_info": {
        "_type": "Creative Ad Info"
      },
      "_title": "Creative Features",
      "_activeDate": "2019-03-27T14:47:20.426Z",
      "lastModified": "2019-06-20T22:06:24.590Z",
      "_locale": "en-US"
    },
    "specialoffervideo": {
      "_activeDate": "2021-08-14T23:58:00.000Z",
      "_locale": "pl",
      "_noIndex": false,
      "_title": "specialoffervideo",
      "bSpecialOfferEnabled": false,
      "jcr:baseVersion": "a7ca237317f1e78e4627c4-c68f-4a12-9480-066c92dd14e5",
      "jcr:isCheckedOut": true,
      "lastModified": "2021-07-12T16:08:40.485Z",
      "specialoffervideo": {
        "_type": "SpecialOfferVideoConfig",
        "bCheckAutoPlay": true,
        "bStreamingEnabled": true,
        "videoString": "",
        "videoUID": ""
      }
    },
    "subgameinfo": {
      "battleroyale": {
        "image": "",
        "color": "1164c1",
        "_type": "Subgame Info",
        "description": {
          "de": "100 Spieler PvP",
          "ru": "PVP-режим на 100 игроков",
          "ko": "100인 플레이어 PvP",
          "en": "100 Player PvP",
          "it": "PvP a 100 giocatori",
          "fr": "JcJ à 100 joueurs",
          "es": "JcJ de 100 jugadores",
          "ar": "100 لاعب ضد لاعب",
          "ja": "プレイヤー100人によるPvP",
          "pl": "PvP dla 100 graczy",
          "es-419": "JcJ de 100 jugadores",
          "tr": "100 Oyunculu PVP"
        },
        "subgame": "battleroyale",
        "standardMessageLine2": "",
        "title": {
          "de": "Battle Royale",
          "ru": "Battle Royale",
          "ko": "Battle Royale",
          "en": "Battle Royale",
          "it": "Battaglia reale",
          "fr": "Battle Royale",
          "es": "Battle Royale",
          "ar": "Battle Royale",
          "ja": "Battle Royale",
          "pl": "Battle Royale",
          "es-419": "Batalla campal",
          "tr": "Battle Royale"
        },
        "standardMessageLine1": ""
      },
      "savetheworld": {
        "image": "",
        "color": "7615E9FF",
        "specialMessage": "",
        "_type": "Subgame Info",
        "description": {
          "de": "Kooperatives PvE-Abenteuer!",
          "ru": "Совместное сражение с Бурей!",
          "ko": "협동 PvE 어드벤처!",
          "en": "Cooperative PvE Adventure",
          "it": "Avventura cooperativa PvE!",
          "fr": "Aventure en JcE coopératif !",
          "es": "¡Aventura cooperativa JcE!",
          "ar": "مشروع تعاوني للاعب ضد البيئة!",
          "ja": "協力プレイが楽しめるPvE！",
          "pl": "Kooperacyjne zmagania PvE z pustakami!",
          "es-419": "¡Aventura de JcE cooperativa!",
          "tr": "Diğer oyuncularla birlikte PvE macerası!"
        },
        "subgame": "savetheworld",
        "title": {
          "de": "Rette die Welt",
          "ru": "Сражениес Бурей",
          "ko": "세이브 더 월드",
          "en": "Save The World",
          "it": "Salva il mondo",
          "fr": "Sauver le monde",
          "es": "Salvar elmundo",
          "ar": "Save The World",
          "ja": "世界を救え",
          "pl": "Ratowanie Świata",
          "es-419": "Salva el mundo",
          "tr": "Dünyayı Kurtar"
        }
      },
      "_title": "SubgameInfo",
      "_noIndex": false,
      "creative": {
        "image": "",
        "color": "13BDA1FF",
        "_type": "Subgame Info",
        "description": {
          "de": "Deine Inseln. Deine Freunde. Deine Regeln.",
          "ru": "Ваши острова. Ваши друзья. Ваши правила.",
          "ko": "나의 섬. 나의 친구. 나의 규칙.",
          "en": "Your Islands. Your Friends. Your Rules.",
          "it": "Le tue isole. I tuoi amici. Le tue regole.",
          "fr": "Vos îles, vos amis, vos règles.",
          "es": "Tus islas. Tus amigos. Tus reglas.",
          "ar": "جزرك. أصدقاؤك. قواعدك.",
          "ja": "自分の島。自分のフレンド。自分のルール。",
          "pl": "Twoje wyspa, twoi znajomi, twoje zasady.",
          "es-419": "Tus islas. Tus amigos. Tus reglas.",
          "tr": "Senin Adaların. Senin Dostların. Senin Kuralların."
        },
        "subgame": "creative",
        "title": {
          "de": "Kreativmodus",
          "ru": "Творческийрежим",
          "ko": "포크리",
          "en": "Creative",
          "it": "Modalità creativa",
          "fr": "Mode Créatif",
          "es": "Modo Creativo",
          "ar": "Creative",
          "ja": "クリエイティブ",
          "pl": "Tryb kreatywny",
          "es-419": "Modo Creativo",
          "tr": "Kreatif"
        },
        "standardMessageLine1": ""
      },
      "_activeDate": "2019-05-02T16:48:47.429Z",
      "lastModified": "2019-10-29T12:44:06.577Z",
      "_locale": "en-US"
    },
    "lobby": {
      "backgroundimage": "https://cdn.discordapp.com/attachments/927739901540188200/930883349831118878/Fortnite_fortnite-game_lobby_T_Lobby_SeasonX-2048x1024-24e02780ed533da8001016f4e6fb14dd15e2f860.png",
      "stage": "seasonx",
      "_title": "lobby",
      "_activeDate": "2019-05-31T21:24:39.892Z",
      "lastModified": "2019-07-31T21:24:17.119Z",
      "_locale": "en-US"
    },
    "dynamicbackgrounds": {
      "backgrounds": {
        "backgrounds": [
          {
            "stage": "fortnitemares",
            "_type": "DynamicBackground",
            "key": "lobby"
          },
          {
            "stage": "fortnitemares",
            "_type": "DynamicBackground",
            "key": "vault"
          }
        ],
        "_type": "DynamicBackgroundList"
      },
      "_title": "dynamicbackgrounds",
      "_noIndex": false,
      "_activeDate": "2019-08-21T15:59:59.342Z",
      "lastModified": "2019-10-29T13:07:27.936Z",
      "_locale": "en-US"
    },
    "_suggestedPrefetch": []
  
            })
        })
    }
}

module.exports = new FortniteGame
