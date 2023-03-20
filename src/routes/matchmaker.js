const uuid = require("uuid")

class Matchmaker {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
        //this.matchmakerIP = "127.0.0.1:442"
        this.matchmakerIP = "147.185.221.211:43634"
    }
    endpoints(application) {

        application.get("/fortnite/api/matchmaking/session/findPlayer/*", async (req, res) => {
            res.status(200);
            res.end();
        });

        application.get("/fortnite/api/game/v2/matchmakingservice/ticket/player/*", async (req, res) => {
            // console.log("no", req)
            //  console.log(yes)
            //  const yes = req.query.bucketId.split(':')[3]
            //  console.log(yes)
            res.cookie("buildUniqueId", req.query.bucketId.split(":")[0]);
            res.cookie("Playlist", req.query.bucketId.split(":")[3]);
            res.cookie("Region", req.query.bucketId.split(":")[2]);

            var canContinue = false;

            const servers = require('../services/resources/json/active-playlists.json');

            servers.forEach(server => {
                if(req.query.bucketId.split(":")[3].toLowerCase() == server.playlist.toLowerCase()) {
                    canContinue = true;
                }
            })

            if(canContinue != true) {
                return res.status(401).json({
                    errorCode: "This playlist is either not being hosted or is not available in your region. Try again later",
                    errorMessage: "Servers ded",
                    messageVars: undefined,
                    numericErrorCode: 12002,
                    originatingService: "fortnite",
                    intent: "prod"
                })
            }

            // TODO: Add Custom Matchmaking with (player.option.customKey)
            ///fortnite/api/game/v2/matchmakingservice/ticket/player/e17784bba4733a3183e859fbe4d5a671?partyPlayerIds=e17784bba4733a3183e859fbe4d5a671&bucketId=8371783:0:NAE:playlist_defaultsolo&player.platform=Windows&player.subregions=VA,OH&player.option.customKey=kohlisdaddy&player.option.crossplayOptOut=false&party.WIN=true&input.KBM=true&player.input=KBM&player.playerGroups=e17784bba4733a3183e859fbe4d5a671

            /*if(req.query['player.option.customKey'] == "" || req.query['player.option.customKey'] == undefined || req.query['player.option.customKey'] == null) {
                return res.status(401).json({
                    errorCode: "Public Matchmaking is currently disabled while Infinity world cup is in progress",
                    errorMessage: "Servers ded",
                    messageVars: undefined,
                    numericErrorCode: 12002,
                    originatingService: "fortnite",
                    intent: "prod"
                })
            }

            if(req.query['player.option.customKey'] != "InfinityWorldCup2023!@") {
                return res.status(401).json({
                    errorCode: "Public Matchmaking is currently disabled while Infinity world cup is in progress",
                    errorMessage: "Servers ded",
                    messageVars: undefined,
                    numericErrorCode: 12002,
                    originatingService: "fortnite",
                    intent: "prod"
                })
            }*/

            /*switch(req.query.bucketId.split(":")[3].toLowerCase()) {
                case "playlist_defaultsolo":
                    break;
                case "playlist_defaultduo":
                    break;
                default:
                    return res.status(401).json({
                        errorCode: "dev.infinity.servers.ded",
                        errorMessage: "Servers ded",
                        messageVars: undefined,
                        numericErrorCode: 12002,
                        originatingService: "fortnite",
                        intent: "prod"
                    }) 
        
            }*/

            // if player is not on 10.40 cancel out.
            if(req.query.bucketId.split(":")[0] != "8371783" || req.query.bucketId.split(":")[0] != 8371783) {
                return res.status(401).json({
                    errorCode: "dev.infinity.incompatible.version",
                    errorMessage: "Your version is incompatible with the Infinity Matchmaker. Please use 10.40 to play!",
                    messageVars: undefined,
                    numericErrorCode: 12002,
                    originatingService: "fortnite",
                    intent: "prod"
                })
            }

            res.json({
                "serviceUrl": `ws://147.185.221.181:10858`,
                "ticketType": "mms-player",
                "payload": "69=",
                "signature": "420=",

            });
            res.end();
        });

        application.get("/fortnite/api/game/v2/matchmaking/account/:accountId/session/:sessionId", async (req, res) => {

   
            //   console.log(req)
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
            console.log(req.cookies)


            try {
                var serverAddress = "127.0.0.1"
                var serverPort = 646433
 
                // ABOVE PUT PORT SERVER AND PORT ALWAYS WRONG
                console.log(req.cookies.Playlist)
                const servers = require('../services/resources/json/active-playlists.json');

                servers.forEach(server => {
                    if(req.cookies.Playlist.toLowerCase() == server.playlist.toLowerCase()) {
                        serverAddress = server.ServerIP;
                        serverPort = server.ServerPort;
                    }
                });

                if(serverPort == 646433) {
                    return res.status(401).json({
                        errorCode: "dev.infinity.servers.ded",
                        errorMessage: "Servers ded",
                        messageVars: undefined,
                        numericErrorCode: 12002,
                        originatingService: "fortnite",
                        intent: "prod"
                    })
                }

                /*switch(req.cookies.Playlist) {
                    case "playlist_defaultsolo":
                        serverAddress = "147.185.221.211";
                        serverPort = 44022;
                        break;
                    case "playlist_defaultduo":
                        serverAddress = "127.0.0.1";
                        serverPort = 69; //shouldnt connect
                        break;
                    default:
                        return res.status(401).json({
                            errorCode: "dev.infinity.servers.ded",
                            errorMessage: "Servers ded",
                            messageVars: undefined,
                            numericErrorCode: 12002,
                            originatingService: "fortnite",
                            intent: "prod"
                        })
            
                }*/
          
            
                console.log(serverAddress)
                console.log(serverPort)
            } catch (err) {
                console.log(err)
                return res.json({})
            }

            res.json({
                "id": req.params.session_id,
                "ownerId": uuid.v4().replace(/-/ig, "").toUpperCase(),
                "ownerName": "[DS]fortnite-liveeugcec1c2e30ubrcore0a-z8hj-1968",
                "serverName": "[DS]fortnite-liveeugcec1c2e30ubrcore0a-z8hj-1968",
                "serverAddress": serverAddress,
                "serverPort": serverPort,
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
            return res.json({
                errorCode: "dev.infinity.servers.ded",
                errorMessage: "Servers ded",
                messageVars: undefined,
                numericErrorCode: 1006,
                originatingService: "gameserver",
                intent: "prod"
            }).status(401)
            res.status(204);
            res.end();
        });

        application.post("/fortnite/api/matchmaking/session/matchMakingRequest", async (req, res) => {
            res.json([]);
        });
    }
}

module.exports = new Matchmaker