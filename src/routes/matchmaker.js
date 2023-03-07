const uuid = require("uuid")

class Matchmaker {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
        this.matchmakerIP = "127.0.0.1:433"
    }
    endpoints(application) {

        application.get("/fortnite/api/matchmaking/session/findPlayer/*", async (req, res) => {
            res.status(200);
            res.end();
        });

        application.get("/fortnite/api/game/v2/matchmakingservice/ticket/player/*", async (req, res) => {
            // console.log("no", req)
            //  console.log(yes)
            const yes = req.query.bucketId.split(':')[3]
            //  console.log(yes)
            res.cookie("buildUniqueId", req.query.bucketId.split(":")[0]);

            res.json({
                "serviceUrl": `ws://${this.matchmakerIP}`,
                "ticketType": "mms-player",
                "payload": "69=",
                "signature": "420=",

            });
            res.end();
        });

        application.get("/fortnite/api/game/v2/matchmaking/account/:accountId/session/:sessionId", async (req, res) => {
            console.log(req)
            res.json({
                "accountId": req.params.accountId,
                "sessionId": req.params.sessionId,
                "key": "AOJEv8uTFmUh7XM2328kq9rlAzeQ5xzWzPIiyKn2s7s="
            });
        });

        application.get("/fortnite/api/matchmaking/session/:session_id", async (req, res) => {
            // console.log(req.headers)
            // console.log("e", req.headers)
            // console.log("s", res.body)
            //   console.log("no", req)
            let gameServerInfo = {
                serverAddress: "127.0.0.1",
                serverPort: 7777
            }

            try {
                let calculateIp = this.matchmakerIP.split(":")[0];
                let calculatePort = Number(this.matchmakerIP.split(":")[1]);

                if (calculateIp) gameServerInfo.serverAddress = calculateIp;
                if (Number.isNaN(calculatePort) || !calculatePort) throw new Error("Invalid port.");

                gameServerInfo.serverPort = calculatePort;
            } catch { }

            res.json({
                "id": req.params.session_id,
                "ownerId": uuid.v4().replace(/-/ig, "").toUpperCase(),
                "ownerName": "[DS]fortnite-liveeugcec1c2e30ubrcore0a-z8hj-1968",
                "serverName": "[DS]fortnite-liveeugcec1c2e30ubrcore0a-z8hj-1968",
                "serverAddress": gameServerInfo.serverAddress,
                "serverPort": gameServerInfo.serverPort,
                "maxPublicPlayers": 220,
                "openPublicPlayers": 175,
                "maxPrivatePlayers": 0,
                "openPrivatePlayers": 0,
                "attributes": {
                    "REGION_s": "EU",
                    "GAMEMODE_s": "FORTATHENA",
                    "ALLOWBROADCASTING_b": true,
                    "SUBREGION_s": "GB",
                    "DCID_s": "FORTNITE-LIVEEUGCEC1C2E30UBRCORE0A-14840880",
                    "tenant_s": "Fortnite",
                    "MATCHMAKINGPOOL_s": "Any",
                    "STORMSHIELDDEFENSETYPE_i": 0,
                    "HOTFIXVERSION_i": 0,
                    "PLAYLISTNAME_s": "Playlist_DefaultSolo",
                    "SESSIONKEY_s": uuid.v4().replace(/-/ig, "").toUpperCase(),
                    "TENANT_s": "Fortnite",
                    "BEACONPORT_i": 15009
                },
                "publicPlayers": [],
                "privatePlayers": [],
                "totalPlayers": 45,
                "allowJoinInProgress": false,
                "shouldAdvertise": false,
                "isDedicated": false,
                "usesStats": false,
                "allowInvites": false,
                "usesPresence": false,
                "allowJoinViaPresence": true,
                "allowJoinViaPresenceFriendsOnly": false,
                "buildUniqueId": req.cookies.buildUniqueId || "0",
                "lastUpdated": new Date().toISOString(),
                "started": false
            });
        });

        application.post("/fortnite/api/matchmaking/session/*/join", async (req, res) => {
            res.status(204);
            res.end();
        });

        application.post("/fortnite/api/matchmaking/session/matchMakingRequest", async (req, res) => {
            res.json([]);
        });
    }
}

module.exports = new Matchmaker