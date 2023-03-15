const User = require("../services/modules/User")

class Lightswitch {
    constructor(){
        this.maintenanceUri = "https://infinityfn.dev"
        this.application = require("express").Router()
        this.endpoints(this.application, this.maintenanceUri)
    }
    endpoints(application, maintenanceUri){
        this.application.get("/lightswitch/api/service/bulk/status", async (req,res) => {
            //console.log(req.user);
            console.log(req.headers.authorization);
            var isbanned = false;

            // bearer ctrlkohlNEEDD
            var p1 = req.headers.authorization.split(' ')[1];
            var p2 = p1.replace("NEEDD", '');
            console.log('Player name: ' + p2);

            const user = await User.findOne({ displayName: p2 }).lean();

            if(user.profile.banned == true || user.profile.banned == "true") {
                console.log('User is banned!');
                isbanned = true;
            }

            
            res.json(  [{
                "serviceInstanceId": "fortnite",
                "status": "UP",
                "message": "servers up.",
                "maintenanceUri": maintenanceUri,
                "overrideCatalogIds": [
                    "a7f138b2e51945ffbfdacc1af0541053"
                ],
                "allowedActions": [
                    "PLAY",
                    "DOWNLOAD"
                ],
                "banned": isbanned,
                "launcherInfoDTO": {
                    "appName": "Fortnite",
                    "catalogItemId": "4fe75bbc5a674f4f9b356b5c90567da5",
                    "namespace": "fn"
                }
            }])
        })
        
        this.application.get("/waitingroom/api/waitingroom", async (req,res) => {
            res.status(204).end()
        })
    }
}

module.exports = new Lightswitch;