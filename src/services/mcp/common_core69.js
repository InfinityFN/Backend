const Account = require("../modules/User")
const commoncore = require("../resources/json/common_core.json")

async function GrabUserAccount(accountId, profileID){
    try {
        var Athena = await Account.findOne({ id: accountId }).lean().catch(e => next(e))
        var AthenaData = {
            "profileRevision": Athena.profile.profilerevision,
            "profileId": profileID,
            "profileChangesBaseRevision": Athena.profile.profilerevision,
            "profileChanges": [
                {
                    "changeType": "fullProfileUpdate",
                    "_id": "RANDOM",
                    "profile": {
                        "_id": "RANDOM",
                        "Update": "",
                        "Created": "2021-03-07T16:33:28.462Z",
                        "updated": "2021-05-20T14:57:29.907Z",
                        "rvn": 0,
                        "wipeNumber": 1,
                        "accountId": "",
                        "profileId": profileID,
                        "version": "no_version",
                        "items": {},
                        "stats": {
                            "attributes": {}
                        },
                        "commandRevision": 5
                    }
                }
            ],
            "serverTime": new Date().toISOString(),
            "profileCommandRevision": Athena.profile.profilerevision,
            "responseVersion": 1
        }
   //     console.log(profileID)
        if (profileID == "common_core" || profileID == "common_public") {
            AthenaData['profileChanges'][0]['profile']['items'] = await grabItems(accountId) // this better be epic
            AthenaData['profileChanges'][0]['profile']['stats']['attributes'] = await attributes(accountId)
            return AthenaData;
        }
        return AthenaData;
   
    } catch (err) {
        console.log(err)
    }
}

async function grabItems(accountId){
    var Athena = await Account.findOne({ id: accountId }).lean().catch(e => next(e))
	//commoncore
		var AthenaData = {
			"Currency": {
				"templateId": "Currency:MtxPurchased",
				"attributes": {
					"platform": "EpicPC"
				},
				"quantity": Athena.profile.vbucks,
			},
		}

	 return Object.assign({}, AthenaData, commoncore)
}

async function attributes(accountId){
    var Athena = await Account.findOne({ id: accountId }).lean().catch(e => next(e))
		var AthenaData = {
			"survey_data": {},
      "personal_offers": {},
      "intro_game_played": true,
      "import_friends_claimed": {},
			"mtx_affiliate": "",
			"undo_cooldowns": [],
      "mtx_affiliate_set_time": "",
      "inventory_limit_bonus": 0,
      "current_mtx_platform": "EpicPC",
			"mtx_purchase_history": {
				"refundsUsed": 0,
        "refundCredits": 3,
        "purchases": Athena.profile.ItemShopPurchases
			},
			"weekly_purchases": {},
      "daily_purchases": {},
      "ban_history": {},
      "in_app_purchases": {},
      "permissions": [],
      "undo_timeout": "min",
      "monthly_purchases": {},
      "allowed_to_send_gifts": true,
      "mfa_enabled": true,
      "allowed_to_receive_gifts": true,
      "gift_history": {}
		}
		return AthenaData
}

module.exports = {
    GrabUserAccount: GrabUserAccount
}