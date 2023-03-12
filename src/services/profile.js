const User = require("./modules/User")
const axios = require("axios")
const OMG = require("./xmpp")
const AthenaProfile = require("./mcp/profile")
class Profile {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }
    endpoints(application) {
        application.post("/fortnite/api/game/v2/profile/:accountId/*/EquipBattleRoyaleCustomization", async (req, res) => {
      
            try {
                const profileID = req.query.profileId;
                const rvn = req.query.rvn;
                const accountId = req.params.accountId
                var category = req.body.slotName;
                var Athena = await User.findOne({ id: accountId })
                var Profile = Athena.profile
                var ItemToSlot = req.body.itemToSlot;
              
               
                let WHATTOUPDATE = {}
                if (category == "ItemWrap" || category == "Dance") {
                    if (ItemToSlot == "") {
                     //   Athena.profile
                        Profile = { [`profile.${category.toString().toLowerCase()}.items`]: `` }
                    }else{
                        WHATTOUPDATE = { [`profile.${category.toString().toLowerCase()}.items.${req.body.indexWithinSlot}`]: `${ItemToSlot.split(":")[0]}:${ItemToSlot.split(":")[1]}` }
                    }
                } else {
                    if (ItemToSlot == "") {
                        WHATTOUPDATE = { [`profile.${category.toString().toLowerCase()}.items`]: `` }
                    }else{
                        Profile.character.items = `${ItemToSlot.split(":")[0]}:${ItemToSlot.split(":")[1].toLowerCase()}`
                      //  WHATTOUPDATE = { [`profile.${category.toString().toLowerCase()}.items`]: `${ItemToSlot.split(":")[0]}:${ItemToSlot.split(":")[1].toLowerCase()}` }
                      console.log("TEST")
                      await User.updateOne({id: accountId},  { $set: { [`profile.${category.toString().toLowerCase()}.items`]: `${ItemToSlot.split(":")[0]}:${ItemToSlot.split(":")[1].toLowerCase()}` }} )
                      console.log("TEST2")
                    }
                }
                console.log(WHATTOUPDATE)
               
              
                // VARIANTS AT SOME POINT!
            
            
              //   
       
                console.log(rvn)
                res.json({
                    "profileRevision": Athena.profile.profilerevision + 1,
                    "profileId": "athena",
                    "profileChangesBaseRevision": Athena.profile.profilerevision + 1,
                    "profileChanges": [{
                        "changeType": "statModified",
                        "name": `favorite_${category.toLowerCase()}`,
                        "value": ItemToSlot
                    }],
                    "profileCommandRevision": Athena.profile.profilerevision + 1,
                    "serverTime": new Date().toISOString(),
                    "responseVersion": 1
                });
      
                await User.updateOne({ id: accountId }, { [`profile.profilerevision`]: Athena.profile.profilerevision + 1 })
            }catch(err){
                console.log(err)
                var retJSON = {
                    profileRevision: 1,
                    profileId: "athena",
                    profileChangesBaseRevision: 1,
                    profileChanges: [],
                    profileCommandRevision: 1,
                    serverTime: new Date(),
                    responseVersion: 1
                }
                res.json(retJSON)
            }
        })

        application.all("/fortnite/api/game/v2/profile/:accountId/*/QueryProfile", async (req, res) => {
            try {
                const profileID = req.query.profileId;
                const accountId = req.params.accountId
                var Athena = await User.findOne({ id: accountId }).lean().catch(e => next(e))
                if(profileID == "athena"){
                    res.json(await AthenaProfile.GrabUserAccount(accountId, profileID, Athena))
                    res.status(200)
                }else if(profileID == "common_core"){
                    //
                }else{
                    //unsuported
                }


                  
          
            }catch(err){
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

        application.all("/fortnite/api/game/v2/profile/:accountId/*/:command", async (req, res) => {
            const rvn = req.query.rvn;
            const profileID = req.query.profileId;
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