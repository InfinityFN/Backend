const crypto = require("crypto");
const WebSocket = require("ws").Server;
const express = require("express")
const { createServer } = require('http')
const GameServer = require('./modules/Gameserver');
var application = express()
const wss = new WebSocket({ server: application.listen(442, () => console.log(`Matchmaker 3.0 started listening on port 442`)) });

let players = 0;
var online = false; // Is Servers Online?
const HEARTBEAT_INTERVAL = 3000; // 3 seconds in ms

async function Connecting(ws, ticketId, sessionId, matchId) {
    //await ILikeBigBootyHoles();
    async function WsSend() {
        try {
            players++;
            if (players == -1) {
                players = players + 2;
            }
            await GameServer.updateOne({ name: "NA" }, { $set: { playerCount: players } });
            await WatchNA(ws, ticketId, sessionId, matchId);
            console.log(`new players: ${players}`);
        } catch (error) {
            console.error(`Error occurred while updating player count: ${error}`);
        } finally {
            ws.send(JSON.stringify({
                "payload": {
                    "state": "Connecting"
                },
                "name": "StatusUpdate"
            }));
        }
    }
    setTimeout(WsSend, 600);
}
function Waiting(ws) {
    function WsSend() {
        ws.send(JSON.stringify({
            "payload": {
                totalPlayers: players,
                connectedPlayers: players,
                state: "Waiting",
            },
            "name": "StatusUpdate"
        }))
    }
    setTimeout(WsSend, 1000);
}
function Queued(ws, ticketId, sessionId, matchId) {
    console.log('2: ' + online);
    if (online == true) {
        this.SessionAssignment(ws, matchId);
        this.Join(ws, matchId, sessionId);
    } else {
        setTimeout(function () {
            ws.send(JSON.stringify({
                "payload": {
                    ticketId: ticketId,
                    queuedPlayers: parseInt(players),
                    estimatedWaitSec: 3,
                    status: {},
                    state: "Queued",
                },
                "name": "StatusUpdate"
            }))
        }, 2000);
    }
}

/*function Queued(ws, ticketId, sessionId, matchId) {
    function WsSend() {
        ws.send(JSON.stringify({
            "payload": {
                ticketId: ticketId,
                queuedPlayers: parseInt(players),
                estimatedWaitSec: 3,
                status: {},
                state: "Queued",
            },
            "name": "StatusUpdate"
        }))
    }
    setTimeout(WsSend, 2000);
}*/

function SessionAssignment(ws, matchId) {
    function WsSend() {
        ws.send(JSON.stringify({
            "payload": {
                "matchId": matchId,
                "state": "SessionAssignment"
            },
            "name": "StatusUpdate"
        }))
    }
    WsSend();
}

function Join(ws, matchId, sessionId) {
    function WsSend() {
        ws.send(JSON.stringify({
            "payload": {
                "matchId": matchId,
                "sessionId": sessionId,
                "joinDelaySec": 1
            },
            "name": "Play"
        }))
    }
    online = false;
    WsSend();
}

async function WatchNA(ws, ticketId, sessionId, matchId) {
    var isValid = true;
    const gameServer = await GameServer.findOne({ name: "NA" });
    if (!gameServer) {
        console.error("Game server not found!");
        return;
    }

    const changeStream = GameServer.watch([], {
        fullDocument: 'updateLookup',
        pipeline: [
            { $match: { _id: gameServer._id } }
        ]
    });

    changeStream.on("change", async (change) => {
        console.log('WOOO: ' + change.operationType);
        if (change.operationType === "update" || change.operationType === "replace") {
            console.log(change.updateDescription);
            if (change.fullDocument.playerCount != players) {
                players = change.fullDocument.playerCount;
            }
            if (change.fullDocument.online == true) {
                online = true;
                console.log('new online status: ' + online);
                //await ILikeBigBootyHoles(); // Wait for online variable to be set
                SessionAssignment(ws, matchId);
                Join(ws, matchId, sessionId);
            }
            if (change.fullDocument.online == false) {
                online = false;
                console.log('new online status: ' + online);
            }
            console.log(`Set players to ${players}`);
            setTimeout(function () {
                Queued(ws, ticketId);
            }, 1000);
        }
    });

    setInterval(async () => {
        const updatedGameServer = await GameServer.findOne({ name: "NA" });

        if (!updatedGameServer) {
            console.error("Game server not found!");
            return;
        }

        if (updatedGameServer.online && !online) {
            online = true;
            console.log("new online status: " + online);
            SessionAssignment(ws, matchId);
            Join(ws, matchId, sessionId);

        } else if (!updatedGameServer.online && online) {
            online = false;
            console.log("new online status: " + online);
        }

        if (updatedGameServer.playerCount != players) {
            players = updatedGameServer.playerCount;
            console.log(`Set players to ${players}`);
            setTimeout(() => {
                ws.send(
                    JSON.stringify({
                        payload: {
                            ticketId: ticketId,
                            queuedPlayers: parseInt(players),
                            estimatedWaitSec: 3,
                            status: {},
                            state: "Queued"
                        },
                        name: "StatusUpdate"
                    })
                );
            }, 2000);
        }
    }, 3000);
}

class Matchmaker {
    constructor() {
        // ids maybe need to be changed...
        this.ticketId = crypto.createHash('md5').update(`1${Date.now()}`).digest('hex');
        this.matchId = crypto.createHash('md5').update(`2${Date.now()}`).digest('hex');
        this.sessionId = crypto.createHash('md5').update(`3${Date.now()}`).digest('hex');

        wss.on('connection', async (ws) => {
            console.log('Connected!');
            ws.on('close', async () => {
                players--;
                console.log('new player count: ' + players);
                await GameServer.updateOne({ name: "NA" }, { $set: { playerCount: players } });
            });
            ws.on('message', (message) => {
                console.log('mm-message: ' + message);
            });
            if (ws.protocol.toLowerCase() == "xmpp") return;
            // patch
            await Connecting(ws, this.ticketId, this.sessionId, this.matchId)
            Waiting(ws)
            Queued(ws, this.ticketId, this.sessionId, this.matchId)
            //await ILikeBigBootyHoles();
            //await WatchNA(ws, this.ticketId, this.sessionId, this.matchId);
            //await this.Connecting(ws, this.ticketId, this.sessionId, this.matchId);
            //this.Waiting(ws);
            //this.Queued(ws, this.ticketId, this.sessionId, this.matchId);

            if (online == true) {
                SessionAssignment(ws, this.matchId);
                Join(ws, this.matchId, this.sessionId);
            }
        });
    }
}

module.exports = {
    Matchmaker: new Matchmaker,
}