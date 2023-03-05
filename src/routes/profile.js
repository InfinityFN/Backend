const User = require("../services/modules/User")

class Profile {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }
    endpoints(application) {
        application.all("/fortnite/api/game/v2/profile/:accountId/*/:command", async (req, res) => {
            const command = req.params.command
            const profileID = req.query.profileId;
            const accountId = req.params.accountId;
            const rvn = req.query.rvn;
            var retJSON = {
                profileRevision: rvn + 1,
                profileId: profileID,
                profileChangesBaseRevision: 1,
                profileChanges: [],
                profileCommandRevision: 1,
                serverTime: new Date(),
                responseVersion: 1
            }
            res.json(retJSON)
        })
    }
}

module.exports = new Profile