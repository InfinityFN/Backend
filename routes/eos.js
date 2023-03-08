class EOS {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {
        application.get('/epic/id/v2/sdk/accounts', (req, res) => {
            res.send([
                {
                    "accountId": req.query.accountId,
                    "displayName": req.query.accountId,
                    "preferredLanguage": "en",
                    "linkedAccounts": [],
                    "cabinedMode": false,
                    "empty": false
                }
            ]);
        })
    }
}

module.exports = new EOS