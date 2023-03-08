const fs = require('fs');
const path = require('path');
class Store {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {
        application.get("/fortnite/api/storefront/v2/catalog", async (req, res) => {

            const test = require('../services/resources/json/store.json');
            //res.json(this.getItemShop(fs.readFileSync(path.join(__dirname, '../services/resources/json/store.json')), fs.readFileSync(path.join(__dirname, '../services/resources/json/catalog_config.json'))));
        });

        // lazy <3
        application.get("/catalog/api/shared/bulk/offers", async (req, res) => {
            res.json({});
        });
    }

    getItemShop(catalog, catalogConfig) {
        const dailyStorefront = catalog.storefronts.find(storefront => storefront.name === "BRDailyStorefront");
        const weeklyStorefront = catalog.storefronts.find(storefront => storefront.name === "BRWeeklyStorefront");

        for (const [key, value] of Object.entries(catalogConfig)) {
            if (Array.isArray(value.itemGrants) && value.itemGrants.length > 0) {
                const catalogEntry = {
                    devName: "",
                    offerId: "",
                    fulfillmentIds: [],
                    dailyLimit: -1,
                    weeklyLimit: -1,
                    monthlyLimit: -1,
                    categories: [],
                    prices: [
                        {
                            currencyType: "MtxCurrency",
                            currencySubType: "",
                            regularPrice: 0,
                            finalPrice: 0,
                            saleExpiration: "9999-12-02T01:12:00Z",
                            basePrice: 0,
                        },
                    ],
                    matchFilter: "",
                    filterWeight: 0,
                    appStoreId: [],
                    requirements: [],
                    offerType: "StaticPrice",
                    giftInfo: {
                        bIsEnabled: false,
                        forcedGiftBoxTemplateId: "",
                        purchaseRequirements: [],
                        giftRecordIds: [],
                    },
                    refundable: true,
                    metaInfo: [],
                    displayAssetPath: "",
                    itemGrants: [],
                    sortPriority: 0,
                    catalogGroupPriority: 0,
                };

                for (const itemGrant of value.itemGrants) {
                    if (typeof itemGrant === "string" && itemGrant.length > 0) {
                        catalogEntry.devName = itemGrant;
                        catalogEntry.offerId = itemGrant;

                        catalogEntry.requirements.push({
                            requirementType: "DenyOnItemOwnership",
                            requiredId: itemGrant,
                            minQuantity: 1,
                        });
                        catalogEntry.itemGrants.push({ templateId: itemGrant, quantity: 1 });
                    }
                }

                catalogEntry.prices[0].basePrice = value.price;
                catalogEntry.prices[0].regularPrice = value.price;
                catalogEntry.prices[0].finalPrice = value.price;

                if (key.toLowerCase().startsWith("daily") && dailyStorefront) {
                    dailyStorefront.catalogEntries.push(catalogEntry);
                } else if (key.toLowerCase().startsWith("featured") && weeklyStorefront) {
                    weeklyStorefront.catalogEntries.push(catalogEntry);
                }
            }
        }

        return catalog;
    }
}

module.exports = new Store