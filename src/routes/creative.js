class Creative {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {
        application.get('/fortnite/api/game/v2/creative/favorites/:accountId', (req, res) => {
            res.json({
                "results": [],
                "hasMore": false
            })
        })

        application.get('/fortnite/api/game/v2/creative/history/:accountId', (req, res) => {
            res.json({
                "results": [],
                "hasMore": false
            })
        })

        application.get('/links/api/fn/mnemonic/:playlist', (req, res) => {
            res.json({
                "namespace": "fn",
                "accountId": "epic",
                "creatorName": "Epic",
                "mnemonic": req.params.playlist,
                "linkType": "BR:Playlist",
                "metadata": {
                    "matchmaking": {
                        "override_playlist": req.params.playlist
                    }
                },
                "version": 93,
                "active": true,
                "disabled": false,
                "created": "2021-08-16T16:43:18.268Z",
                "published": "2021-08-03T15:27:17.540Z",
                "descriptionTags": [

                ]
            })
        })
    }
}

module.exports = new Creative