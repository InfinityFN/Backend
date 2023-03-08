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
    }
}

module.exports = new Api