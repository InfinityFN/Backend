class Epic {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {
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
        
        application.get("/fortnite/api/game/v2/enabled_features",  (req, res) => {
            res.json([])
        })
        
        application.get("/api/v1/events/Fortnite/download/*",  (req, res) => {
            res.json({})
        })

        application.get("/statsproxy/api/statsv2/account/:accountId", (req, res) => {
            res.json({
                "startTime": 0,
                "endTime": 0,
                "stats": {},
                "accountId": req.params.accountId
            });
        })
        
        application.get("/fortnite/api/stats/accountId/:accountId/bulk/window/alltime", (req, res) => {
            res.json({
                "startTime": 0,
                "endTime": 0,
                "stats": {},
                "accountId": req.params.accountId
            })
        })
        
        application.get("/fortnite/api/game/v2/twitch/*", (req, res) => {
            res.status(200);
            res.end();
        })

        // Thanks to Lawin Server for this
        application.post("/api/v1/assets/Fortnite/*/*", async (req, res) => {
            if (req.body.hasOwnProperty("FortCreativeDiscoverySurface") && req.body.FortCreativeDiscoverySurface == 0) {
                const discovery_api_assets = require("./../responses/discovery/discovery_api_assets.json");
                res.json(discovery_api_assets)
            }
            else {
                res.json({
                    "FortCreativeDiscoverySurface": {
                        "meta": {
                            "promotion": req.body.FortCreativeDiscoverySurface || 0
                        },
                        "assets": {}
                    }
                })
            }
        })

        application.get("/eulatracking/api/shared/agreements/fn*", (req, res) => {
            res.json({})
        })

        application.get("/fortnite/api/game/v2/friendcodes/*/epic", (req,res) => {
            res.json([]);
        });
    }
}