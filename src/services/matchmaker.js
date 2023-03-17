const crypto = require("crypto");
const WebSocket = require("ws").Server;
const express = require("express")
const { createServer } = require('http')
class Matchmaker{
    constructor(){
        // ids maybe need to be changed...
        this.ticketId = crypto.createHash('md5').update(`1${Date.now()}`).digest('hex');
        this.matchId = crypto.createHash('md5').update(`2${Date.now()}`).digest('hex');
        this.sessionId = crypto.createHash('md5').update(`3${Date.now()}`).digest('hex');
        this.application = express()


        const wss = new WebSocket({ server: this.application.listen(442, () => console.log(`Matchmaker started listening on port 442`)) });

        wss.on('connection', async (ws) => {
            console.log('Connected!');
            if (ws.protocol.toLowerCase() == "xmpp") return;
            this.Connecting(ws);
            this.Waiting(ws);
            this.Queued(ws, this.ticketId);
            this.SessionAssignment(ws, this.matchId);
            this.Join(ws, this.matchId, this.sessionId);
        })
    }
    Connecting(ws){
        function WsSend(){
            ws.send(JSON.stringify({
                "payload": {
                    "state": "Connecting"
                },
                "name": "StatusUpdate"
            }))
        }
        setTimeout(WsSend, 200);
    }
    Waiting(ws){
        function WsSend(){
            ws.send(JSON.stringify({
                "payload": {
                    "totalPlayers": 1,
                    "connectedPlayers": 1,
                    "state": "Waiting"
                },
                "name": "StatusUpdate"
            }))
        }
        setTimeout(WsSend, 1000);
    }
    Queued(ws, ticketId){
        function WsSend(){
            ws.send(JSON.stringify({
                "payload": {
                    "ticketId": ticketId,
                    "queuedPlayers": 0,
                    "estimatedWaitSec": 0,
                    "status": {},
                    "state": "Queued"
                },
                "name": "StatusUpdate"
            }))
        }
        setTimeout(WsSend, 2000);
       
    }
    SessionAssignment(ws, matchId){
        function WsSend(){
            ws.send(JSON.stringify({
                "payload": {
                    "matchId": matchId,
                    "state": "SessionAssignment"
                },
                "name": "StatusUpdate"
            }))
        }
        setTimeout(WsSend, 8000);
    }
    Join(ws, matchId, sessionId){
        function WsSend(){
            ws.send(JSON.stringify({
                "payload": {
                    "matchId": matchId,
                    "sessionId": sessionId,
                    "joinDelaySec": 1
                },
                "name": "Play"
            }))
        }
        setTimeout(WsSend, 8000);
    }
}

module.exports = {
    Matchmaker: new Matchmaker,
}