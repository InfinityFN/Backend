const User = require("../services/modules/User")
const axios = require("axios")
const OMG = require("../services/xmpp")
const fs = require("fs")
const path = require("path")
//const AthenaProfile = require("../services/mcp/profile")
class Profile {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }
    endpoints(application) {
        application.all("/fortnite/api/game/v2/profile/:accountId/*/:command", async (req, res) => {
            const command = req.params.command
            const profileID = req.query.profileId;
            const accountId = req.params.accountId
            const rvn = req.query.rvn;
            const profile = require("../services/mcp/profile")
            const common_core69 = require("../services/mcp/common_core69")
            var useragent = req.headers["user-agent"];
            console.log(useragent)
            var season
            if (useragent) {
                try {
                    season = useragent.split("-")[1].split(".")[0]
                } catch {
                    season = 1;
                }
            } else {
                season = 1;
            }
            try {
                if (command == "QueryProfile" && profileID == "athena") {

                    console.log(accountId, profileID, season)
                    const athenaData = await profile.GrabUserAccount(accountId, profileID, season)

                    res.json(athenaData)
                    res.status(200)
                    res.end()
                } else if (command == "QueryProfile" && profileID == "common_core" || profileID == "common_public") {
                    const athenaData = await common_core69.GrabUserAccount(accountId, profileID)

                    res.json(athenaData)
                    res.status(200)
                    res.end()
                } else if (command == "SetCosmeticLockerSlot") {
                    var category = req.body.category;
                    var ItemToSlot = req.body.itemToSlot;
                    if (category == undefined || category == undefined) {
                        return
                    }
                    var AccountTemp = await User.findOne({ id: req.params.accountId }).lean().catch(error => next(e))
                    await User.updateOne({ id: req.params.accountId }, { [`profile.profilerevision`]: AccountTemp.profile.profilerevision + 1 })
                    if (category == "ItemWrap" || category == "Dance") {
                        console.log(category)
                        if (ItemToSlot == "") {
                            await User.updateOne({ id: req.params.accountId }, { [`profile.${category.toString().toLowerCase()}.items`]: `` })
                        } else {
                            await User.updateOne({ id: req.params.accountId }, { [`profile.${category.toString().toLowerCase()}.items.${req.body.slotIndex}`]: `${req.body.itemToSlot.split(":")[0]}:${req.body.itemToSlot.split(":")[1]}` })
                        }
                    } else {
                        if (ItemToSlot == "") {
                            await User.updateOne({ id: req.params.accountId }, { [`profile.${category.toString().toLowerCase()}.items`]: `` })
                        } else {
                            console.log(category)
                            await User.updateOne({ id: req.params.accountId }, { [`profile.${category.toString().toLowerCase()}.items`]: `${ItemToSlot.split(":")[0]}:${ItemToSlot.split(":")[1].toLowerCase()}` })
                        }
                    }
                    console.log(req.body.variantUpdates)
                    if (req.body.variantUpdates.length != 0) {
                        await User.updateOne({ id: req.params.accountId }, { [`profile.${category.toString().toLowerCase()}.activeVariants`]: req.body.variantUpdates })
                    }

                    var AccountNew = await User.findOne({ id: req.params.accountId }).lean().catch(error => next(e))

                    res.json({
                        "profileId": "athena",
                        "profileChangesBaseRevision": AccountNew.profile.profilerevision,
                        "profileChanges": [{
                            "changeType": "statModified",
                            "name": `favorite_${category.toString().toLowerCase()}`,
                            "value": req.body.itemToSlot
                        }],
                        "profileCommandRevision": AccountNew.profile.profilerevision,
                        "serverTime": new Date(),
                        "responseVersion": 1
                    });
                    res.end();
                } else if (command == "EquipBattleRoyaleCustomization") {
                    var category = req.body.slotName;
                    var AccountTemp = await User.findOne({ id: req.params.accountId }).lean().catch(error => next(e))
                    if (!AccountTemp) return
                    var ItemToSlot = req.body.itemToSlot;
                    await User.updateOne({ id: req.params.accountId }, { [`profile.profilerevision`]: AccountTemp.profile.profilerevision + 1 })
                    if (category == "ItemWrap" || category == "Dance") {
                        console.log(category)
                        if (ItemToSlot == "") {
                            //console.log(`profile.${category.toString().toLowerCase()}.items.${req.body.indexWithinSlot}`)
                            await User.updateOne({ id: req.params.accountId }, { [`profile.${category.toString().toLowerCase()}.items.${req.body.indexWithinSlot}`]: `` })
                        } else {
                            await User.updateOne({ id: req.params.accountId }, { [`profile.${category.toString().toLowerCase()}.items.${req.body.indexWithinSlot}`]: `${ItemToSlot.split(":")[0]}:${ItemToSlot.split(":")[1]}` })
                        }
                    } else {
                        if (ItemToSlot == "") {
                            await User.updateOne({ id: req.params.accountId }, { [`profile.${category.toString().toLowerCase()}.items`]: `` })
                        } else {
                            await User.updateOne({ id: req.params.accountId }, { [`profile.${category.toString().toLowerCase()}.items`]: `${ItemToSlot.split(":")[0]}:${ItemToSlot.split(":")[1].toLowerCase()}` })
                        }
                    }

                    console.log(req.body.variantUpdates)
                    if (req.body.variantUpdates?.length != 0) {
                        // AccountNew = await User.findOne({ id: req.params.accountId }).lean().catch(error => next(e))
                        // AccountNew.profile.ItemShopPurchases[ItemToSlot].attributes.variants = req.body.variantUpdates
                        // console.log(ItemToSlot)
                        //  console.log(AccountNew.profile.ItemShopPurchases[ItemToSlot].attributes.variants)
                        await User.updateOne({ id: req.params.accountId }, { [`profile.ItemShopPurchases.${ItemToSlot}.attributes.variants`]: req.body.variantUpdates })
                        await User.updateOne({ id: req.params.accountId }, { [`profile.${category.toString().toLowerCase()}.activeVariants`]: req.body.variantUpdates })
                    }
                    var AccountNew = await User.findOne({ id: req.params.accountId }).lean().catch(error => next(e))
                    console.log(rvn)
                    res.json({
                        "profileRevision": AccountNew.profilerevision,
                        "profileId": "athena",
                        "profileChangesBaseRevision": AccountNew.profilerevision,
                        "profileChanges": [{
                            "changeType": "statModified",
                            "name": `favorite_${category.toLowerCase()}`,
                            "value": req.body.itemToSlot
                        }],
                        "profileCommandRevision": AccountNew.profilerevision,
                        "serverTime": new Date(),
                        "responseVersion": 2
                    });
                    res.end();
                } else if (command == "SetBattleRoyaleBanner") {
                    var category = req.body.slotName;
                    var AccountTemp = await User.findOne({ id: req.params.accountId }).lean().catch(error => next(e))
                    console.log(req.body.homebaseBannerIconId)
                    await User.updateOne({ id: req.params.accountId }, { [`profile.profilerevision`]: AccountTemp.profile.profilerevision + 1 })



                    await User.updateOne({ id: req.params.accountId }, { [`profile.banner.banner_icon`]: `${req.body.homebaseBannerIconId}` }).catch(error => next(e))
                    await User.updateOne({ id: req.params.accountId }, { [`profile.banner.banner_color`]: `${req.body.homebaseBannerColorId}` })

                    var AccountNew = await User.findOne({ id: req.params.accountId }).lean().catch(error => next(e))
                    //   console.log(rvn)
                    res.json({
                        "profileRevision": AccountNew.profilerevision,
                        "profileId": "athena",
                        "profileChangesBaseRevision": AccountNew.profilerevision,
                        "profileChanges": [{
                            "changeType": "statModified",
                            "name": `banner_icon`,
                            "value": req.body.homebaseBannerIconId
                        },
                        {
                            "changeType": "statModified",
                            "name": `banner_color`,
                            "value": req.body.homebaseBannerColorId
                        }],
                        "profileCommandRevision": AccountNew.profilerevision,
                        "serverTime": new Date(),
                        "responseVersion": 2
                    });
                    res.end();
                } else if (command == "SetCosmeticLockerBanner") {
                    var AccountTemp = await Account.findOne({ id: req.params.accountId }).lean().catch(error => next(e))
                    console.log(req.body.bannerColorTemplateName)
                    await User.updateOne({ id: req.params.accountId }, { [`profile.profilerevision`]: AccountTemp.profile.profilerevision + 1 })

                    await User.updateOne({ id: req.params.accountId }, { [`profile.banner.banner_icon`]: `${req.body.bannerIconTemplateName}` }).catch(error => next(e))
                    await User.updateOne({ id: req.params.accountId }, { [`profile.banner.banner_color`]: `${req.body.bannerColorTemplateName}` })
                    var AccountNew = await User.findOne({ id: req.params.accountId }).lean().catch(error => next(e))
                    res.json({
                        "profileRevision": AccountNew.profilerevision,
                        "profileId": "athena",
                        "profileChangesBaseRevision": AccountNew.profilerevision,
                        "profileChanges": [{
                            "changeType": "itemAttrChanged",
                            "itemId": req.body.lockerItem,
                            "attributeName": "banner_icon_template",
                            "attributeValue": req.body.bannerIconTemplateName
                        },
                        {
                            "changeType": "itemAttrChanged",
                            "itemId": req.body.lockerItem,
                            "attributeName": "banner_color_template",
                            "attributeValue": req.body.bannerColorTemplateName
                        }],
                        "profileCommandRevision": AccountNew.profilerevision,
                        "serverTime": new Date(),
                        "responseVersion": 2
                    });
                    res.end();
                } else if (command == "GiftCatalogEntry") {
                    console.log(req.body.receiverAccountIds[0])
                    var friends = await User.findOne({ id: req.body.receiverAccountIds[0] }).lean().catch(e => next(e))
                    let allgifts = []
                    let Epic1 = []
                    const accountId = req.params.accountId

                    let Epic3 = []
                    //var shop = (await axios.get("http://localhost:6969/fortnite/api/storefront/v2/catalog")).data;
                    var templateIdIG
                    var finalPriceIG
                    var CatalogPurchaseID = null

                    var account = await User.findOne({ id: accountId }).lean().catch(e => next(e))

                    if (!account) return;


                    for (const storefront of shop.storefronts) {
                        for (const storefrontSIR of storefront.catalogEntries) {
                            if (storefrontSIR.offerId == req.body.offerId) {
                                CatalogPurchaseID = storefrontSIR;
                                console.log(storefrontSIR.itemGrants[0].templateId)
                                templateIdIG = storefrontSIR.itemGrants[0].templateId
                                finalPriceIG = storefrontSIR["prices"][0]["finalPrice"]
                                var Epic = `{
                                    "${storefrontSIR.itemGrants[0].templateId}": {
                                        "templateId": "${storefrontSIR.itemGrants[0].templateId}",
                                        "attributes": {
                                            "favorite": false,
                                            "item_seen": true,
                                            "level": 1,
                                            "max_level_bonus": 0,
                                            "rnd_sel_cnt": 0,
                                            "variants": [],
                                            "xp": 0
                                        },
                                        "quantity": 1
                                    }
                                }`
                                var test2 = Object.assign({}, friends.profile.ItemShopPurchases, JSON.parse(Epic))

                            }
                        }
                    }

                    if (account) {
                        var vbucks = account.profile.vbucks
                        /// console.log(vbucks)
                        ///   console.log(finalPriceIG)
                        if (vbucks > finalPriceIG) {
                            vbucks = vbucks - finalPriceIG
                            // console.log(vbucks)
                            await User.updateOne({ id: accountId }, { [`profile.vbucks`]: vbucks })

                        }
                    }




                    //
                    //storefrontSIR["prices"][0]["finalPrice"]

                    // friends.profile.ItemShopPurchases.forEach(player => {
                    //     Epic1.push(player)
                    //   })


                    // console.log("TEST", test2)
                    //  Epic1.push(test2)


                    //   var test = Object.assign({}, JSON.parse(Epic2))


                    //  console.log(test)
                    //console.log(Epic2)

                    console.log(CatalogPurchaseID["itemGrants"])
                    for (const idk of friends["profile"]["gifts"]) {
                        allgifts.push({
                            giftbox: idk.giftbox || "GiftBox:gb_default",
                            personsend: accountId,
                            giftedAt: idk.giftedAt,
                            message: idk.message || "Have A Nice Day :)",
                            itemGuid: idk.itemGuid,
                            items: idk.items
                        })
                    }
                    let ItemGifts = []
                    for (const idk of CatalogPurchaseID["itemGrants"]) {
                        ItemGifts.push({
                            templateId: idk.templateId,
                            profileId: profileID,
                            quantity: idk.quantity
                        })
                    }

                    allgifts.push({
                        giftbox: req.body.giftWrapTemplateId || "GiftBox:gb_default",
                        personsend: accountId,
                        giftedAt: new Date().toISOString(),
                        message: req.body.personalMessage || "Have A Nice Day :)",
                        itemGuid: req.body.offerId,
                        items: ItemGifts
                    })


                    if (account) {
                        var vbucks = account.profile.vbucks
                        /// console.log(vbucks)
                        ///   console.log(finalPriceIG)
                        if (vbucks > finalPriceIG) {
                            vbucks = vbucks - finalPriceIG
                            // console.log(vbucks)
                            // await User.updateOne({ id: accountId }, { [`profile.vbucks`]: vbucks })
                            console.log(req.body.receiverAccountIds[0])
                            await User.updateOne({ id: req.body.receiverAccountIds[0] }, { [`profile.gifts`]: allgifts })
                            await User.updateOne({ id: req.body.receiverAccountIds[0] }, { [`profile.ItemShopPurchases`]: test2 })
                            //  await User.updateOne({ id: req.body.receiverAccountIds[0] }, { [`profile.mtx_purchase_history`]: Epic3 })
                        } else {
                            return res.json("THIS IS TOO MUCH!") // they bypassed it
                        }
                    }

                    OMG.sendXmppMessageToId({
                        "payload": {},
                        "type": "com.epicgames.gift.received",
                        "timestamp": new Date().toISOString()
                    }, req.body.receiverAccountIds[0]);


                    //   console.log(allgifts)
                    // await User.updateOne({ id: req.body.receiverAccountIds[0] }, { [`profile.gifts`]: allgifts })

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
                } else if (command == "ExchangeGameCurrencyForBattlePassOffer") {
                    const E = req.body.offerItemIdList
                    // console.log(E)

                    var retJSON = {
                        profileRevision: rvn + 1 || 1,
                        profileId: profileID,
                        profileChangesBaseRevision: 1,
                        profileChanges: [{
                            changeTyp: "fullProfileUpdate",
                            _id: "RANDOM",
                            profile: {
                                _id: "RANDOM",
                                Update: "",
                                Created: "2021-03-07T16:33:28.462Z",
                                updated: "2021-05-20T14:57:29.907Z",
                                rvn: 0,
                                wipeNumber: 1,
                                accountId: "",
                                profileId: profileID,
                                version: "no_version",
                                items: {},
                                stats: {
                                    attributes: {}
                                },
                                commandRevision: 5
                            }
                        }
                        ],
                        profileCommandRevision: 1,
                        serverTime: new Date(),
                        responseVersion: 1
                    }
                    retJSON['profileChanges'][0]['profile']['items'] = await common_core69.grabItems(accountId) // this better be epic
                    retJSON['profileChanges'][0]['profile']['stats']['attributes'] = await common_core69.attributes(accountId)
                    res.json(retJSON)

                } else if (command == "PurchaseCatalogEntry") {
                    console.log(req.headers);
                    console.log(req.body.offerId);
                    console.log(req.query);
                    console.log(req.params);
                    //  checkValidProfileID("common_core");
                    const shop = require('../services/resources/json/store.json');
                    var account = await User.findOne({ id: accountId }).lean().catch(e => next(e))
                    let catalogEntryToPurchase = null;
                    var test123;
                    var finalPriceIG

                    for (const storefront of shop.storefronts) {
                        if (storefront.name.includes("BRSeason")) {
 				    if (!Number.isNaN(Number(storefront.name.split("BRSeason")[1]))) {
                           	 console.log("Battle Pass?")
				    }
                        } else {
                            for (const catalogEntry of storefront.catalogEntries) {

                                if (catalogEntry.offerId == req.body.offerId) {

                                    catalogEntryToPurchase = catalogEntry;
                                    finalPriceIG = catalogEntry["prices"][0]["finalPrice"]
                                    // console.log(catalogEntry)
                                }
                            }
                        }
                    }

                    if (catalogEntryToPurchase == null) {
                        return res.json({})
                        //  throw next(new ApiException(errors.com.epicgames.modules.gamesubcatalog.catalog_out_of_date).with(req.body.offerId));
                    }


                    var grantProfile = await profile.GrabUserAccount(accountId, "athena", season);
                    grantProfile = grantProfile['profileChanges'][0]['profile']
                    const lootResult = [];

                    if (account) {
                        var vbucks = account.profile.vbucks
                        /// console.log(vbucks)
                        ///   console.log(finalPriceIG)
                        if (vbucks > finalPriceIG) {
                            vbucks = vbucks - finalPriceIG
                            // console.log(vbucks)
                            await User.updateOne({ id: accountId }, { [`profile.vbucks`]: vbucks })

                        }
                    }



                    for (const itemGrant of catalogEntryToPurchase.itemGrants) {



                        lootResult.push({
                            "itemType": itemGrant.templateId,
                            "itemGuid": itemGrant.templateId,
                            "itemProfile": "athena",
                            "quantity": itemGrant.quantity
                        });
                    }


                    for (const lootResultEntry of lootResult) {
                        account = await User.findOne({ id: accountId }).lean().catch(e => next(e))
                        var Epic = `{
                            "${lootResultEntry.itemType}": {
                                "templateId": "${lootResultEntry.itemType}",
                                "attributes": {
                                    "favorite": false,
                                    "item_seen": false,
                                    "level": 1,
                                    "max_level_bonus": 0,
                                    "rnd_sel_cnt": 0,
                                    "variants": [],
                                    "creation_time": "${new Date().toISOString()}",
                                    "xp": 0
                                },
                                "quantity": ${lootResultEntry.quantity}
                            }
                        }`

                        //  console.log(lootResultEntry)


                        var test2 = Object.assign({}, account.profile.ItemShopPurchases, JSON.parse(Epic))

                        await User.updateOne({ id: req.params.accountId }, { [`profile.ItemShopPurchases`]: test2 })

                    }

                    grantProfile = await profile.GrabUserAccount(accountId, "athena", season);
                    grantProfile = grantProfile['profileChanges'][0]['profile']

                    var grantProfile2 = await common_core69.GrabUserAccount(accountId, "common_core");

                    grantProfile2 = grantProfile2['profileChanges'][0]['profile']
                    // need to add it to the mtx one as well at some point

                    //   console.log(lootResult)



                    await User.updateOne({ id: req.params.accountId }, { [`profile.profilerevision`]: account.profile.profilerevision + 1 })
                    var accoun2t = await User.findOne({ id: accountId }).lean().catch(e => next(e))



                    //console.log(grantProfile)
                    res.json({
                        "profileRevision": accoun2t.profile.profilerevision,
                        "profileId": "common_core",
                        "profileChangesBaseRevision": 1,
                        "profileChanges": [],
                        "responseVersion": 1,
                        "serverTime": new Date().toISOString(),
                        "profileCommandRevision": accoun2t.profile.profilerevision,
                        "notifications": [{
                            "type": "CatalogPurchase",
                            "primary": true,
                            "lootResult": {
                                "items": lootResult
                            }
                        }],
                        "multiUpdate": [{
                            "profileRevision": accoun2t.profile.profilerevision,
                            "profileId": "athena",
                            "profileChangesBaseRevision": accoun2t.profile.profilerevision,
                            "profileChanges": [{
                                changeType: "fullProfileUpdate",
                                profile: grantProfile
                            }],
                            "serverTime": new Date().toISOString(),
                            "profileCommandRevision": accoun2t.profile.profilerevision,
                            "responseVersion": 1
                        },
                        {
                            "profileRevision": accoun2t.profile.profilerevision,
                            "profileId": "common_core",
                            "profileChangesBaseRevision": accoun2t.profile.profilerevision,
                            "profileChanges": [{
                                changeType: "fullProfileUpdate",
                                profile: grantProfile2
                            }],
                            "serverTime": new Date().toISOString(),
                            "profileCommandRevision": accoun2t.profile.profilerevision,
                            "responseVersion": 1
                        }]

                    })
                    // res.end();
                } /*else if (command == "PurchaseCatalogEntry") {
                    console.log(req.headers);
                    console.log(req.body.offerId);
                    //console.log(req.query);
                    //console.log(req.params);
                    //  checkValidProfileID("common_core");
                    const shop = require('../services/resources/json/store.json');
                    var account = await User.findOne({ id: accountId }).lean().catch(e => next(e))
                    let catalogEntryToPurchase = null;
                    var test123;
                    var finalPriceIG

                    for (const storefront of shop.storefronts) {
                        for (const catalogEntry of storefront.catalogEntries) {
                            if (catalogEntry.offerId == req.body.offerId) {
                                catalogEntryToPurchase = catalogEntry;
                                finalPriceIG = catalogEntry["prices"][0]["finalPrice"]
                               // console.log(catalogEntry)
                            }
                        }
                    }

                    if (catalogEntryToPurchase == null) {
                        return res.json({})
                        //  throw next(new ApiException(errors.com.epicgames.modules.gamesubcatalog.catalog_out_of_date).with(req.body.offerId));
                    }


                    var grantProfile = await profile.GrabUserAccount(accountId, "athena", season);
                    grantProfile = grantProfile['profileChanges'][0]['profile']
                    const lootResult = [];

                    if (account) {
                        var vbucks = account.profile.vbucks
                        /// console.log(vbucks)
                        ///   console.log(finalPriceIG)
                        if (vbucks > finalPriceIG) {
                            vbucks = vbucks - finalPriceIG
                            // console.log(vbucks)
                            await User.updateOne({ id: accountId }, { [`profile.vbucks`]: vbucks })

                        }
                    }



                    for (const itemGrant of catalogEntryToPurchase.itemGrants) {



                        lootResult.push({
                            "itemType": itemGrant.templateId,
                            "itemGuid": itemGrant.templateId,
                            "itemProfile": "athena",
                            "quantity": itemGrant.quantity
                        });
                    }


                    for (const lootResultEntry of lootResult) {
                        account = await User.findOne({ id: accountId }).lean().catch(e => next(e))
                        var Epic = `{
                            "${lootResultEntry.itemType}": {
                                "templateId": "${lootResultEntry.itemType}",
                                "attributes": {
                                    "favorite": false,
                                    "item_seen": false,
                                    "level": 1,
                                    "max_level_bonus": 0,
                                    "rnd_sel_cnt": 0,
                                    "variants": [],
                                    "creation_time": "${new Date().toISOString()}",
                                    "xp": 0
                                },
                                "quantity": ${lootResultEntry.quantity}
                            }
                        }`

                      //  console.log(lootResultEntry)


                        var test2 = Object.assign({}, account.profile.ItemShopPurchases, JSON.parse(Epic))

                        await User.updateOne({ id: req.params.accountId }, { [`profile.ItemShopPurchases`]: test2 })

                    }

                    grantProfile = await profile.GrabUserAccount(accountId, "athena", season);
                    grantProfile = grantProfile['profileChanges'][0]['profile']

                    var grantProfile2 = await common_core69.GrabUserAccount(accountId, "common_core");

                    grantProfile2 = grantProfile2['profileChanges'][0]['profile']
                    // need to add it to the mtx one as well at some point

                 //   console.log(lootResult)



                    await User.updateOne({ id: req.params.accountId }, { [`profile.profilerevision`]: account.profile.profilerevision + 1 })
                    var accoun2t = await User.findOne({ id: accountId }).lean().catch(e => next(e))



                    //console.log(grantProfile)
                    res.json({
                        "profileRevision": accoun2t.profile.profilerevision,
                        "profileId": "common_core",
                        "profileChangesBaseRevision": 1,
                        "profileChanges": [],
                        "responseVersion": 1,
                        "serverTime": new Date().toISOString(),
                        "profileCommandRevision": accoun2t.profile.profilerevision,
                        "notifications": [{
                            "type": "CatalogPurchase",
                            "primary": true,
                            "lootResult": {
                                "items": lootResult
                            }
                        }],
                        "multiUpdate": [{
                            "profileRevision": accoun2t.profile.profilerevision,
                            "profileId": "athena",
                            "profileChangesBaseRevision": accoun2t.profile.profilerevision,
                            "profileChanges": [{
                                changeType: "fullProfileUpdate",
                                profile: grantProfile
                            }],
                            "serverTime": new Date().toISOString(),
                            "profileCommandRevision": accoun2t.profile.profilerevision,
                            "responseVersion": 1
                        },
                        {
                            "profileRevision": accoun2t.profile.profilerevision,
                            "profileId": "common_core",
                            "profileChangesBaseRevision": accoun2t.profile.profilerevision,
                            "profileChanges": [{
                                changeType: "fullProfileUpdate",
                                profile: grantProfile2
                            }],
                            "serverTime": new Date().toISOString(),
                            "profileCommandRevision": accoun2t.profile.profilerevision,
                            "responseVersion": 1
                        }]

                    })
                    // res.end();
                }*/ else if (command == "RemoveGiftBox") {

                    var AccountTemp = await User.findOne({ id: req.params.accountId }).lean().catch(error => next(e))
                    //let remove = []
                    if (!AccountTemp) return res.json({})
                    console.log(res.headers)
                    //   await User.updateOne({ id: req.params.accountId }, { [`profile.profilerevision`]: AccountTemp.profile.profilerevision + 1 })
                    AccountTemp.profile.gifts.forEach(async gift => {
                        console.log(gift.giftbox)
                        if (req.body.giftBoxItemId.includes(`GiftBox:${gift.giftbox.split(":")[1]}`)) {


                            // remove.push(gift.personsend)
                            await User.updateOne({ id: req.params.accountId }, { $pull: { ["profile.gifts"]: { giftedAt: gift.giftedAt } } })

                        }
                    })


                    await User.updateOne({ id: req.params.accountId }, { [`profile.profilerevision`]: AccountTemp.profile.profilerevision + 1 })
                    // if(req.query.profileId == "common_core"){
                    grantProfile2 = await common_core69.GrabUserAccount(accountId, "common_core");
                    grantProfile2 = grantProfile2['profileChanges'][0]['profile']
                    // }else{
                    grantProfile = await profile.GrabUserAccount(accountId, "athena", 10);
                    grantProfile = grantProfile['profileChanges'][0]['profile']

                    AccountTemp = await User.findOne({ id: req.params.accountId }).lean().catch(error => next(e))
                    //}

                    res.json({
                        "profileRevision": profile.rvn || 0,
                        "profileId": req.query.profileId || "athena",
                        "profileChangesBaseRevision": 1,
                        "profileChanges": [],
                        "multiUpdate": [{
                            "profileRevision": AccountTemp.profile.profilerevision,
                            "profileId": "athena",
                            "profileChangesBaseRevision": AccountTemp.profile.profilerevision,
                            "profileChanges": [{
                                changeType: "fullProfileUpdate",
                                profile: grantProfile
                            }],
                            "serverTime": new Date().toISOString(),
                            "profileCommandRevision": AccountTemp.profile.profilerevision,
                            "responseVersion": 1
                        },
                        {
                            "profileRevision": AccountTemp.profile.profilerevision,
                            "profileId": "common_core",
                            "profileChangesBaseRevision": AccountTemp.profile.profilerevision,
                            "profileChanges": [{
                                changeType: "fullProfileUpdate",
                                profile: grantProfile2
                            }],
                            "serverTime": new Date().toISOString(),
                            "profileCommandRevision": AccountTemp.profile.profilerevision,
                            "responseVersion": 1
                        }],
                        "responseVersion": 1,
                        "serverTime": new Date().toISOString(),
                    })
                } else if (command == "BulkEquipBattleRoyaleCustomization") {
                    const athenaData = await profile.GrabUserAccount(accountId, profileID, season)
                    var username = req.headers.cookie.split('=')[1];
                    console.log(username);

                    var userJSON = await User.findOne({ displayName: username }).lean();

                    if (userJSON) {
                        if (userJSON.profile.mtx_affiliate != "") {
                            const sac = require('../services/resources/json/sac.json');
                            sac.forEach(async (sac) => {
                                if (userJSON.profile.mtx_affiliate == sac.id) {
                                    sac.points++;
                                }
                            });
                            console.log(sac);
                            fs.writeFileSync(path.join(__dirname, '../services/resources/json/sac.json'), JSON.stringify(sac, null, 2));
                            console.log('successfully given point');
                        } else {
                            console.log('invalid sac, skipping');
                        }
                    }

                    res.json(athenaData)
                    res.status(200)
                    res.end()
                } else {
                    console.log("TES")
                    var retJSON = {
                        profileRevision: rvn + 1 || 1,
                        profileId: profileID,
                        profileChangesBaseRevision: 1,
                        profileChanges: [],
                        profileCommandRevision: 1,
                        serverTime: new Date(),
                        responseVersion: 1
                    }
                    res.json(retJSON)
                }
            } catch (err) {
                console.log(err)
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
            }
        })
    }
}

module.exports = new Profile