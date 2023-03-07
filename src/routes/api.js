const User = require("../services/modules/User")


class Api {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }
    endpoints(application) {


        application.get("/fortnite/api/v2/versioncheck/*", (req, res) => {
            res.json({
                "type": "NO_UPDATE"
            })
        })

        application.get("/account/api/public/account/:accountId", async (req, res) => {
            var Eh = await User.findOne({ id: req.params.accountId }).lean();
            if (Eh) {
                res.json({
                    "id": Eh.id,
                    "displayName": Eh.displayName,
                    "name": Eh.displayName,
                    "email": Eh.email,
                    "failedLoginAttempts": 0,
                    "lastLogin": new Date().toISOString(),
                    "numberOfDisplayNameChanges": 0,
                    "ageGroup": "UNKNOWN",
                    "headless": false,
                    "country": "US",
                    "lastName": "User",
                    "links": {},
                    "preferredLanguage": "en",
                    "canUpdateDisplayName": false,
                    "tfaEnabled": true,
                    "emailVerified": true,
                    "minorVerified": true,
                    "minorExpected": true,
                    "minorStatus": "UNKNOWN"
                })
            } else {
                res.json({ "err": "CUM ON MAN!" })
            }
        })

        application.all("/account/api/public/account", async (req, res) => {
            const accountId = req.query.accountId

            var Data = []
            if(Array.isArray(accountId)) {
                for(const index of accountId){
                    var Accounts = await User.findOne({ id: index }).lean();
                    if(Accounts){
                        Data.push({
                            "id": index,
                            "displayName": Accounts.displayName,
                            "externalAuths": {}
                        })
                    }else{

                    }
                }
            }else{
                var Accounts = await User.findOne({ id: accountId}).lean();
                if(Accounts){
                    Data.push({
                        "id": Accounts.id,
                        "links": {},
                        "displayName": Accounts.displayName,
                        "cabinedMode": false,
                        "externalAuths": {}
                    })
                }
            }

            res.json(Data)
        })

        application.all('/fortnite/api/game/v2/tryPlayOnPlatform/account/*', (req, res) => {
            res.setHeader('Content-Type', 'text/plain').send(true).end();
        })

        application.get("/fortnite/api/game/v2/enabled_features", (req, res) => {
            res.json([])
        })

        application.post("/fortnite/api/game/v2/grant_access/*", (req, res) => {
            res.json({}).status(204).end();
        })

        application.get("/fortnite/api/storefront/v2/keychain", (req, res) => {
            // when your lazy
            res.json(require("../services/resources/json/keychain.json"))
            res.status(200);
        })
        
        application.get("/account/api/epicdomains/ssodomains", (req, res) => {
            res.json(["unrealengine.com","unrealtournament.com","fortnite.com","epicgames.com"])
        })

        application.get("/sdk/v1/*", (req,res) => {
            res.json(require('../services/resources/json/sdk.json'));
        })

        application.all("/v1/epic-settings/public/users/*/values", (req, res) => {
            res.json({})
        })

        // Credits to Lawin Server for this
        application.get("/region",  (req, res) => {
            res.json({
                "continent": {
                    "code": "EU",
                    "geoname_id": 6255148,
                    "names": {
                        "de": "Europa",
                        "en": "Europe",
                        "es": "Europa",
                        "fr": "Europe",
                        "ja": "ヨーロッパ",
                        "pt-BR": "Europa",
                        "ru": "Европа",
                        "zh-CN": "欧洲"
                    }
                },
                "country": {
                    "geoname_id": 2635167,
                    "is_in_european_union": false,
                    "iso_code": "GB",
                    "names": {
                        "de": "UK",
                        "en": "United Kingdom",
                        "es": "RU",
                        "fr": "Royaume Uni",
                        "ja": "英国",
                        "pt-BR": "Reino Unido",
                        "ru": "Британия",
                        "zh-CN": "英国"
                    }
                },
                "subdivisions": [
                    {
                        "geoname_id": 6269131,
                        "iso_code": "ENG",
                        "names": {
                            "de": "England",
                            "en": "England",
                            "es": "Inglaterra",
                            "fr": "Angleterre",
                            "ja": "イングランド",
                            "pt-BR": "Inglaterra",
                            "ru": "Англия",
                            "zh-CN": "英格兰"
                        }
                    },
                    {
                        "geoname_id": 3333157,
                        "iso_code": "KEC",
                        "names": {
                            "en": "Royal Kensington and Chelsea"
                        }
                    }
                ]
            })
        })

        application.post("/datarouter/api/v1/public/data", (req, res) => {
            res.status(204);
            res.end();
        })

        application.get("/fortnite/api/game/v2/homebase/allowed-name-chars", (req, res) => {
            res.json({
                "ranges": [
                    48,
                    57,
                    65,
                    90,
                    97,
                    122,
                    192,
                    255,
                    260,
                    265,
                    280,
                    281,
                    286,
                    287,
                    304,
                    305,
                    321,
                    324,
                    346,
                    347,
                    350,
                    351,
                    377,
                    380,
                    1024,
                    1279,
                    1536,
                    1791,
                    4352,
                    4607,
                    11904,
                    12031,
                    12288,
                    12351,
                    12352,
                    12543,
                    12592,
                    12687,
                    12800,
                    13055,
                    13056,
                    13311,
                    13312,
                    19903,
                    19968,
                    40959,
                    43360,
                    43391,
                    44032,
                    55215,
                    55216,
                    55295,
                    63744,
                    64255,
                    65072,
                    65103,
                    65281,
                    65470,
                    131072,
                    173791,
                    194560,
                    195103
                ],
                "singlePoints": [
                    32,
                    39,
                    45,
                    46,
                    95,
                    126
                ],
                "excludedPoints": [
                    208,
                    215,
                    222,
                    247
                ]
            })
        })

        application.post("/fortnite/api/game/v2/chat/*/*/*/pc", (req, res) => {
            res.json({ "GlobalChatRooms": [{"roomName":"infinityglobal"}] })
        })

        application.post("/fortnite/api/game/v2/chat/*/recommendGeneralChatRooms/pc", (req, res) => {
            res.json({})
        })

        application.get("/presence/api/v1/_/*/last-online", (req, res) => {
            res.json({})
        })

        application.get("/fortnite/api/receipts/v1/account/*/receipts", (req, res) => {
            res.json([])
        })

        application.get("/fortnite/api/game/v2/leaderboards/cohort/*", (req, res) => {
            res.json([])
        })

        application.post("/fortnite/api/feedback/*",  (req, res) => {
            res.status(200);
            res.end();
        })
        
        application.post("/fortnite/api/statsv2/query",  (req, res) => {
            res.json([]);
        })
        
        application.post("/statsproxy/api/statsv2/query",  (req, res) => {
            res.json([]);
        })
        
        application.post("/fortnite/api/game/v2/events/v2/setSubgroup/*",  (req, res) => {
            res.status(204);
            res.end();
        })
    }
}

module.exports = new Api
