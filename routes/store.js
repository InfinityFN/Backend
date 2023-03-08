const axios = require("axios")
class Store {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {
        application.all("/fortnite/api/storefront/v2/gift/check_eligibility/recipient/:friendID/offer/:offerID", async (req,res) => {
            var shop = (await axios.get("http://localhost:6969/fortnite/api/storefront/v2/catalog")).data;
            var OfferID = decodeURI(req.params.offerID)
        
            var CatalogPurchaseID = null
        
            for (const storefront of shop.storefronts) {
                for (const storefrontSIR of storefront.catalogEntries) {
                    if(storefrontSIR.offerId == OfferID){
                        CatalogPurchaseID = storefrontSIR;
                    }
                }
            }
            //console.log(CatalogPurchaseID)
        
        
        
            res.json({
                "price": {
                  "currencyType": "MtxCurrency",
                  "currencySubType": "",
                  "regularPrice": CatalogPurchaseID["regularPrice"],
                  "dynamicRegularPrice": CatalogPurchaseID["dynamicRegularPrice"],
                  "finalPrice": CatalogPurchaseID["finalPrice"],
                  "saleExpiration": "9999-12-31T23:59:59.999Z",
                  "basePrice": CatalogPurchaseID["basePrice"]
                },
                "items": CatalogPurchaseID["itemGrants"]
              })
        })

        application.all("/fortnite/api/storefront/v2/catalog", async (req, res) => {
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