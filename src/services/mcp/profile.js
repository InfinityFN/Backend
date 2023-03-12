const User = require("../modules/User")
const athena = require("../resources/json/athena.json")
const fs = require("fs")
const path = require("path")
async function GrabUserAccount(accountId, profileID, season = 2) {
    try {
        var Athena = await User.findOne({ id: accountId }).lean().catch(e => next(e))


        // todo add account id to this without it breaking fortnite Athena.id
        if (Athena) {
            var AthenaData = {
                "profileRevision": Athena.profile.profilerevision,
                "profileId": profileID,
                "profileChangesBaseRevision": Athena.profile.profilerevision,
                "profileChanges": [
                    {
                        "changeType": "fullProfileUpdate",
                        "_id": "RANDOM",
                        "profile": {
                            "_id": Athena.id,
                            "Update": "",
                            "Created": "2021-03-07T16:33:28.462Z",
                            "updated": new Date().toISOString(),
                            "rvn": Athena.profile.profilerevision,
                            "wipeNumber": 1,
                            "accountId": Athena.id,
                            "profileId": profileID,
                            "version": "no_version",
                            "items": {},
                            "stats": {
                                "attributes": {}
                            },
                            "commandRevision": Athena.profile.profilerevision
                        }
                    }
                ],
                "serverTime": new Date().toISOString(),
                "profileCommandRevision": Athena.profile.profilerevision,
                "responseVersion": 1
            }
            //     console.log(profileID)
            if (profileID == "athena") {
                AthenaData['profileChanges'][0]['profile']['items'] = await grabItems(accountId) // this better be epic
                AthenaData['profileChanges'][0]['profile']['stats']['attributes'] = await attributes(accountId, season)
                return AthenaData;
            }
            return AthenaData;
        } else {
            var AthenaData = {
                "errorCode": "errors.com.epicgames.page.not_found",
                "message": "Looks Like That Isnt A Account Or The Accont Is Deleted"
            }
            return AthenaData
        }


    } catch (err) {
        console.log(err)
    }
}

async function GrabUserAccount3(accountId, profileID, season = 2) {
    try {
        var Athena = await User.findOne({ id: accountId }).lean().catch(e => next(e))

        // todo add account id to this without it breaking fortnite Athena.id
        if (Athena) {
            var AthenaData = {

                "_id": Athena.id,
                "Update": "",
                "Created": "2021-03-07T16:33:28.462Z",
                "updated": new Date().toISOString(),
                "rvn": Athena.profile.profilerevision,
                "wipeNumber": 1,
                "accountId": Athena.id,
                "profileId": profileID,
                "version": "no_version",
                "items": {},
                "stats": {
                    "attributes": {}
                },
                "commandRevision": 5
            }
            //     console.log(profileID)
            if (profileID == "athena") {
                AthenaData['items'] = await grabItems(accountId) // this better be epic
                AthenaData['stats']['attributes'] = await attributes(accountId, season)
                return AthenaData;
            }
            return AthenaData;
        } else {
            var AthenaData = {
                "errorCode": "errors.com.epicgames.page.not_found",
                "message": "Looks Like That Isnt A Account Or The Accont Is Deleted"
            }
            return AthenaData
        }


    } catch (err) {
        console.log(err)
    }
}

async function grabItems(accountId) {
    var Athena = await User.findOne({ id: accountId }).lean().catch(e => next(e))
    var alr = {
        "sandbox_loadout": {
            "templateId": "CosmeticLocker:cosmeticlocker_athena",
            "attributes": {
                "locker_slots_data": {
                    "slots": {
                        "MusicPack": {
                            "items": [
                                Athena.profile.musicpack.items
                            ]
                        },
                        "Character": {
                            "items": [
                                Athena.profile.character.items
                            ],
                            "activeVariants": [
                                {
                                    "variants": Athena.profile.character.activeVariants
                                }
                            ]
                        },
                        "Backpack": {
                            "items": [
                                Athena.profile.backpack.items
                            ],
                            "activeVariants": [
                                {
                                    "variants": Athena.profile.backpack.activeVariants
                                }
                            ]
                        },
                        "SkyDiveContrail": {
                            "items": [
                                Athena.profile.skydivecontrail.items
                            ],
                            "activeVariants": [
                                {
                                    "variants": Athena.profile.skydivecontrail.activeVariants
                                }
                            ]
                        },
                        "Dance": {
                            "items": Athena.profile.dance.items
                        },
                        "LoadingScreen": {
                            "items": [
                                Athena.profile.loadingscreen.items
                            ]
                        },
                        "Pickaxe": {
                            "items": [
                                Athena.profile.pickaxe.items
                            ],
                            "activeVariants": [
                                {
                                    "variants": Athena.profile.pickaxe.activeVariants
                                }
                            ]
                        },
                        "Glider": {
                            "items": [
                                Athena.profile.glider.items
                            ],
                            "activeVariants": [
                                {
                                    "variants": Athena.profile.glider.activeVariants
                                }
                            ]
                        },
                        "ItemWrap": {
                            "items": Athena.profile.itemwrap.items,
                            "activeVariants": [
                                {
                                    "variants": Athena.profile.itemwrap.activeVariants
                                }
                            ]
                        }
                    }
                },
                "use_count": 0,
                "banner_icon_template": Athena.profile.banner.banner_icon,
                "banner_color_template": Athena.profile.banner.banner_color,
                "locker_name": "U",
                "item_seen": false,
                "favorite": false
            },
            "quantity": 1
        },
    }
    //	var iKDTBHHELLP =  Object.assign({}, Athena.profile.mtx_purchase_history)

    //console.log(iKDTBHHELLP)
    console.log(Athena.profile.ItemShopPurchases)
    var test = Athena.profile.ItemShopPurchases;

    // for(const index of Athena.profile.mtx_purchase_history){
    //	console.log(index)
    //test.push(index)

    //	}// JSON.stringify(test)
    var HELPME = fs.readFileSync(path.join(__dirname, "..", "resources/json/athena.json"), "utf8")

    console.log(test)
    let test69 = []

    //   console.log(",", test69)
    ///console.log(HELPME + JSON.stringify(test))
    // var TESTyidk =Athena.profile.mtx_purchase_history
    /*	var IDK = []
    //var E = ""
    /*	for(const index2 of Athena.profile.mtx_purchase_history){
            console.log(index2)
    	
                for(const index in Athena.profile.mtx_purchase_history){
                    //console.log(Athena.profile.mtx_purchase_history[index])
                //	IDK.push(Object.assign([],Athena.profile.mtx_purchase_history[index]))
                //	E = Object.assign({},Athena.profile.mtx_purchase_history[index])
        //			E = JSON.stringify(Athena.profile.mtx_purchase_history[index])
                //	E = E.replace("[", "")
                    //E = E.replace("]", "")
        //			console.log(index)
                    //var EASports = []
                    //const EACCCCCCCCCCCCCCCCCCCCCCCCCCCC = Object.assign([],index2)
                    //console.log(JSON.parse(E))
                //	console.log(index.toString())
                //	console.log(EACCCCCCCCCCCCCCCCCCCCCCCCCCCC)
                    IDK.push(index)
                //	console.log(JSON.parse(E))
      //  TESTyidk = TESTyidk.replace("]", "}")
                }
        //}*/
    //	console.log(IDK)
    //var e = IDK.toString()
    //	e = JSON.parse(e)
    //console.log(e)
    //		console.log(Object.assign([], Athena.profile.mtx_purchase_history[index]))
    //IDK.push(index["0"])
    //	console.log(JSON.parse(Epic))
    //	}

    //		console.log(IDK)
    //       var TESTyidk = IDK
    //  TESTyidk = Object.assign({}, TESTyidk)
    // TESTyidk = TESTyidk.replace("[", "{")
    //  TESTyidk = TESTyidk.replace("]", "}")
    ///	console.log(TESTyidk)
    // TESTyidk = Object.assign(athena, JSON.parse(TESTyidk))
    //console.log(TESTyidk)
    //console.log(IDK)
    /*	for(const index in Athena.profile.mtx_purchase_history){
        //	/Athena.profile.mtx_purchase_history.forEach(e =>{
              var EAHIdohfdisofhdsiofhsdiof = JSON.stringify(Athena.profile.mtx_purchase_history[index])
              EAHIdohfdisofhdsiofhsdiof = "[" + EAHIdohfdisofhdsiofhsdiof + "]"
              EAHIdohfdisofhdsiofhsdiof = JSON.parse(EAHIdohfdisofhdsiofhsdiof)
                console.log(Object.assign([], EAHIdohfdisofhdsiofhsdiof))
        //		console.log("e", Object.assign(index, Athena.profile.mtx_purchase_history[index]))
            //	Athena.profile.mtx_purchase_history[e]
        //	})
        }
        var AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH = []
        for(const index in Athena.profile.mtx_purchase_history){
                  var EAHIdohfdisofhdsiofhsdiof = JSON.stringify(Athena.profile.mtx_purchase_history[index])
              EAHIdohfdisofhdsiofhsdiof = "[" + EAHIdohfdisofhdsiofhsdiof + "]"
              EAHIdohfdisofhdsiofhsdiof = JSON.parse(EAHIdohfdisofhdsiofhsdiof)
                console.log(Object.assign([], EAHIdohfdisofhdsiofhsdiof))
                AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH.push(Object.assign([], EAHIdohfdisofhdsiofhsdiof))
            }
        var A = []
        for(const index of AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH){
            var EAEAEAEEAEA = JSON.stringify(index)
            EAEAEAEEAEA = index[0]
            console.log(EAEAEAEEAEA)
                A.push(index)
            }
        console.log(A)*/
    //var fsfsdfsdfdsgdsgdsg = Object.assign({},Athena.profile.mtx_purchase_history)
    //	console.log(JSON.parse(Athena.profile.mtx_purchase_history)[0]["Athena"]) // JSON.parse(HELPME)
    //JSON.parse(Athena.profile.mtx_purchase_history)[0]["Athena"]

    // console.log(test69)
    return Object.assign({}, alr, JSON.parse(HELPME), test)
}


async function ClientGrabattributes(accountId, season) {
    var Athena = await User.findOne({ id: accountId }).lean().catch(e => next(e))

    var ohnu = {
        "use_random_loadout": false,
        "past_seasons": [],
        "season_match_boost": 0,
        "loadouts": [
            "sandbox_loadout",
            "loadout_1"
        ],
        "mfa_reward_claimed": true,
        "rested_xp_overflow": 0,
        "last_xp_interaction": "2022-12-10T22:14:37.647Z",
        "quest_manager": {
            "dailyLoginInterval": "2022-12-10T13:51:03.840Z",
            "dailyQuestRerolls": 1
        },
        "book_level": 24,
        "season_num": 23,
        "book_xp": 30950,
        "creative_dynamic_xp": {
            "timespan": 317.2308349609375,
            "bucketXp": 0,
            "bankXp": 0,
            "bankXpMult": 1,
            "boosterBucketXp": 0,
            "boosterXpMult": 0,
            "dailyExcessXpMult": 1,
            "currentDayXp": 6196,
            "currentDay": 68
        },
        "season": {
            "numWins": 3,
            "numHighBracket": 7,
            "numLowBracket": 19
        },
        "battlestars": Athena.profile.battlestars,
        "vote_data": {},
        "battlestars_season_total": Athena.profile.battlestars,
        "alien_style_points": 0,
        "lifetime_wins": 294,
        "party_assist_quest": "d9b6bc03-12af-4c23-8ccd-8a5b98cb90fc",
        "book_purchased": true,
        "rested_xp_exchange": 1,
        "level": Athena.profile.level,
        "rested_xp": 2500,
        "rested_xp_mult": 4.4,
        "accountLevel": 1914,
        "rested_xp_cumulative": 52500,
        "xp": 34243565325235,
        "season_friend_match_boost": 0,
        "purchased_bp_offers": [],
        "last_match_end_datetime": "2022-12-10T14:19:14.282Z",
        "last_stw_accolade_transfer_datetime": "2022-12-10T22:14:37.650Z",
        "mtx_purchase_history_copy": [],
        "favorite_musicpack": Athena.profile.musicpack.items,
        "banner_icon": Athena.profile.banner.banner_icon,
        "favorite_itemwraps": Athena.profile.itemwrap.items,
        "favorite_skydivecontrail": "",
        "favorite_pickaxe": Athena.profile.pickaxe.items,
        "favorite_glider": Athena.profile.glider.items,
        "favorite_backpack": Athena.profile.backpack.items,
        "favorite_dance": Athena.profile.dance.items,
        "favorite_loadingscreen": Athena.profile.loadingscreen.items,
        "banner_color": Athena.profile.banner.banner_color
    }

    return ohnu
}


async function attributes(accountId, season) {
    var Athena = await User.findOne({ id: accountId }).lean().catch(e => next(e))

    if (Athena) {
        var Number = await User.findOne({ ["profile.purchased_season"]: season }).lean().catch(e => next(e))
        if (Number) {

        } else {
            //	var TESTONG
            //	var TEST = await Account.updateOne({ id: req.params.accountId }, { ["profile.purchased_season"]:  })
            console.log("NOE")
        }
    }
    console.log(season)

    var AthenaData = {
        "use_random_loadout": false,
        "past_seasons": [],
        "season_match_boost": 999999999,
        "loadouts": [
            "sandbox_loadout",
            "loadout_1"
        ],
        "favorite_victorypose": "",
        "mfa_reward_claimed": true,
        "rested_xp_overflow": 0,
        "quest_manager": {
            "dailyLoginInterval": "2020-01-01T17:22:28.023Z",
            "dailyQuestRerolls": 1
        },
        "book_level": 70,
        "season_num": 2,
        "favorite_consumableemote": "",
        "banner_color": Athena.profile.banner.banner_color,
        "favorite_callingcard": "",
        "favorite_character": Athena.profile.character.items,
        "favorite_spray": [],
        "book_xp": 100,
        "favorite_loadingscreen": Athena.profile.loadingscreen.items,
        "book_purchased": true,
        "lifetime_wins": 100,
        "favorite_hat": "",
        "level": Athena.profile.level,
        "battlestars_season_total": Athena.profile.battlestars,
        "battlestars": Athena.profile.battlestars,
        "favorite_battlebus": "",
        "favorite_mapmarker": "",
        "favorite_vehicledeco": "",
        "accountLevel": 100,
        "favorite_backpack": Athena.profile.backpack.items,
        "favorite_dance": Athena.profile.dance.items,
        "inventory_limit_bonus": 0,
        "last_applied_loadout": "",
        "favorite_skydivecontrail": "",
        "favorite_pickaxe": Athena.profile.pickaxe.items,
        "favorite_glider": Athena.profile.glider.items,
        "daily_rewards": {},
        "xp": 999,
        "season_friend_match_boost": 999999999,
        "active_loadout_index": 0,
        "favorite_musicpack": Athena.profile.musicpack.items,
        "banner_icon": Athena.profile.banner.banner_icon,
        "favorite_itemwraps": Athena.profile.itemwrap.items
    }
    return AthenaData
}

module.exports = {
    GrabUserAccount: GrabUserAccount,
    grabItems: grabItems,
    attributes: attributes,
    ClientGrabattributes: ClientGrabattributes,
    GrabUserAccount3: GrabUserAccount3
}