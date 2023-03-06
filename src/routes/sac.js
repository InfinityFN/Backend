class SAC { 
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {
        application.get("/affiliate/api/public/affiliates/slug/:slug", async (req,res) => {
            const creators = require('../services/resources/json/sac.json');
            creators.forEach(creator => {
                if(req.params.slug == creator) {
                    return res.json({"id": creator, "slug": creator, "displayName": creator, "status": "ACTIVE", "verified": false});
                }
            });
            //res.json({});
        });
    }
}

module.exports = new SAC;