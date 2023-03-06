class Store {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {
        application.get("/fortnite/api/storefront/v2/catalog", async (req, res) => {
            const catalog = require('../services/resources/json/store.json');
            res.json(catalog);
        });
        
        // lazy <3
        application.get("/catalog/api/shared/bulk/offers", async (req, res) => {
            res.json({});
        });
    }
}

module.exports = new Store