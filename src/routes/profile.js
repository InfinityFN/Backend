const User = require("../services/modules/User")
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
        
                    //   console.log(profileID)
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
                    var ItemToSlot = req.body.itemToSlot;
                    await User.updateOne({ id: req.params.accountId }, { [`profile.profilerevision`]: AccountTemp.profile.profilerevision + 1 })
                    if (category == "ItemWrap" || category == "Dance") {
                        console.log(category)
                        if (ItemToSlot == "") {
                            await User.updateOne({ id: req.params.accountId }, { [`profile.${category.toString().toLowerCase()}.items`]: `` })
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
                } else if (command == "PurchaseCatalogEntry") {
                    const profileID = req.query.profileId;
        
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