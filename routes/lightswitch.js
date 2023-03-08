class Lightswitch {
    constructor(){
        this.maintenanceUri = "https://infinityfn.dev"
        this.application = require("express").Router()
        this.endpoints(this.application, this.maintenanceUri)
    }
    endpoints(application, maintenanceUri){
        this.application.get("/lightswitch/api/service/bulk/status", async (req,res) => {
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
                "banned": false,
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