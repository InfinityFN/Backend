class Timeline {
    constructor() {
        this.season = 0
        this.useragent = "";
        this.application = require("express").Router()
        this.endpoints(this.application, this.maintenanceUri, this.useragent)
    }
    endpoints(application, maintenanceUri, useragent) {
        application.get("/fortnite/api/calendar/v1/timeline", (req, res) => {
            this.useragent = req.headers["user-agent"]

            if (this.useragent) {
                try {
                    this.season = this.useragent.split("-")[1].split(".")[0]
                } catch {
                    this.season = 2
                }
            } else {
                this.season = 2
            }

            res.json({
                "channels": {
                    "standalone-store": {
                        "states": [
                            {
                                "validFrom": "9999-10-23T12:30:37.146Z",
                                "activeEvents": [],
                                "state": {
                                    "activePurchaseLimitingEventIds": [],
                                    "storefront": {},
                                    "rmtPromotionConfig": [],
                                    "storeEnd": "0001-01-01T00:00:00.000Z"
                                },
                            }
                        ],
                        "cacheExpire": "9999-10-23T14:30:37.146Z"
                    },
                    "client-matchmaking": {
                        "states": [],
                        "cacheExpire": "9999-10-23T14:30:37.146Z"
                    },
                    "tk": {},
                    "featured-islands": {},
                    "community-votes": {},
                    "client-events": {
                        "states": [{
                            "validFrom": "2019-05-21T18:36:38.383Z",
                            "activeEvents": [
                                {
                                    "eventType": `EventFlag.LobbySeason${this.season}`,
                                    "activeUntil": "9999-12-31T23:59:59.999Z",
                                    "activeSince": "2019-12-31T23:59:59.999Z"
                                }
                            ],
                            "state": {
                                "activeStorefronts": [],
                                "eventNamedWeights": {},
                                "activeEvents": [],
                                "seasonNumber": this.season,
                                "seasonTemplateId": `AthenaSeason:athenaseason${this.season}`,
                                "matchXpBonusPoints": 9999,
                                "eventPunchCardTemplateId": "",
                                "seasonBegin": "9999-12-31T23:59:59.999Z",
                                "seasonEnd": "9999-12-31T23:59:59.999Z",
                                "seasonDisplayedEnd": "9999-12-31T23:59:59.999Z",
                                "weeklyStoreEnd": "2023-03-15T16:54:19.101Z",
                                "stwEventStoreEnd": "2023-03-15T16:54:19.101Z",
                                "stwWeeklyStoreEnd": "2023-03-15T16:54:19.101Z",
                                "dailyStoreEnd": "2023-03-15T16:54:19.101Z"
                            }
                        }],
                        "cacheExpire": "9999-12-31T23:59:59.999Z"
                    }
                },
                "cacheIntervalMins": 15,
                "currentTime": new Date()
            })
        })
    }
}

module.exports = new Timeline;