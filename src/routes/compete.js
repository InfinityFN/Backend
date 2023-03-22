class Compete {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {
        /*application.get("/api/v1/events/Fortnite/download/*", async (req, res) => res.json({
            "player": {
                "gameId": "Fortnite",
                "accountId": "9c5065110c7a4d7095862da5ee815962",
                "tokens": [
                    "ARENA_S20_Division1",
                    "BLUECHEESEARENA_S18_Division1",
                    "BLUECHEESEARENA_S18_Division2",
                    "BLUECHEESEARENA_S18_Division3",
                    "GroupIdentity_GeoIdentity_fortnite",
                    "S15_Dreamhack_January_Heats"
                ],
                "teams": {},
                "pendingPayouts": [
                    "epicgames_Arena_S20_Duos:Arena_S20_Division1_Duos"
                ],
                "pendingPenalties": {},
                "persistentScores": {
                    "Bluecheese_Hype_S18_P": 555,
                    "Hype_S12": 1770
                },
                "groupIdentity": {
                    "GeoIdentity": "fortnite"
                }
            },
            "events": [
                {
                    "gameId": "Fortnite",
                    "eventId": "epicgames_S4_1_RenegadeCup",
                    "regions": [
                        "EU"
                    ],
                    "regionMappings": {},
                    "platforms": [
                        "XboxOneGDK",
                        "PS4",
                        "XboxOne",
                        "XSX",
                        "Android",
                        "PS5",
                        "GFN",
                        "Switch",
                        "GFNMOBILE",
                        "Windows"
                    ],
                    "platformMappings": {},
                    "displayDataId": "s4_1_RenegadeCup",
                    "eventGroup": "Season41RenegadeCup",
                    "announcementTime": "2019-01-29T08:00:00.000Z",
                    "appId": null,
                    "environment": null,
                    "link": null,
                    "metadata": {
                        "AccountLockType": "Window",
                        "TeamLockType": "None",
                        "DisqualifyType": "Window",
                        "minimumAccountLevel": 50
                    },
                    "eventWindows": [
                        {
                            "eventWindowId": "S4_1_RenegadeCup",
                            "eventTemplateId": "EventTemplate_S4_1_RenegadeCup",
                            "countdownBeginTime": "2022-05-26T15:00:00.000Z",
                            "beginTime": "2022-05-31T17:00:00.000Z",
                            "endTime": "2022-06-01T19:00:00.000Z",
                            "blackoutPeriods": [],
                            "round": 0,
                            "payoutDelay": 30,
                            "isTBD": false,
                            "canLiveSpectate": false,
                            "scoreLocations": [
                                {
                                    "scoreMode": "winsow",
                                    "leaderboardId": "Fortnite_EU",
                                    "useIndividualScores": false
                                }
                            ],
                            "visibility": "public",
                            "requireAllTokens": [],
                            "requireAnyTokens": [],
                            "requireNoneTokensCaller": [],
                            "requireAllTokensCaller": [],
                            "requireAnyTokensCaller": [],
                            "additionalRequirements": [
                                "mfa",
                                "eula:s19_lc_rules"
                            ],
                            "teammateEligibility": "all",
                            "regionMappings": null,
                            "metadata": {
                                "ServerReplays": true,
                                "RoundType": "Qualifiers"
                            }
                        }
                    ],
                    "beginTime": "2022-04-26T17:00:00.000Z",
                    "endTime": "2022-04-26T19:00:00.000Z"
                }
            ],
            "scores": []
        }))*/
    }
}

module.exports = new Compete