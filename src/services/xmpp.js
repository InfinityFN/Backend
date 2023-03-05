const WebSocket = require("ws").Server;
const XMLBuilder = require("xmlbuilder");
const XMLParser = require("xml-parser");
const uuid = require("uuid");
const express = require("express");
const application = express();
const User = require("./modules/User")

global.Clients = [];
global.MUCs = [];

class xmpp {
    constructor() {
        this.port = 433
        this.setup(this.port)
        this.accountId = ""
    }
    setup(port) {
        const wss = new WebSocket({ server: application.listen(port, () => console.log(`XMPP and Matchmaker started listening on port ${port}`)) });

        application.get("/clients", (req, res) => {
            res.set("Content-Type", "text/plain");

            var data = JSON.stringify({
                "amount": global.Clients.length,
                "clients": global.Clients.map(i => i.displayName)
            }, null, 2);

            res.send(data);
        })
        wss.on('connection', async (ws) => {
            var accountId = "";
            var displayName = "";
            var token = "";
            var jid = "";
            var resource = "";
            var ID = uuid.v4();
            var Authenticated = false;

            ws.on('message', async (message) => {
                if (Buffer.isBuffer(message)) message = message.toString();
                const msg = XMLParser(message);
                if (!msg || !msg.root || !msg.root.name) return Error(ws);
                console.log(msg.root.name)
                switch (msg.root.name) {
                    case "open":
                        ws.send(XMLBuilder.create("open")
                            .attribute("xmlns", "urn:ietf:params:xml:ns:xmpp-framing")
                            .attribute("from", "prod.ol.epicgames.com")
                            .attribute("id", ID)
                            .attribute("version", "1.0")
                            .attribute("xml:lang", "en").toString())

                        if (Authenticated == true) {
                            ws.send(XMLBuilder.create("stream:features").attribute("xmlns:stream", "http://etherx.jabber.org/streams")
                                .element("ver").attribute("xmlns", "urn:xmpp:features:rosterver").up()
                                .element("starttls").attribute("xmlns", "urn:ietf:params:xml:ns:xmpp-tls").up()
                                .element("bind").attribute("xmlns", "urn:ietf:params:xml:ns:xmpp-bind").up()
                                .element("compression").attribute("xmlns", "http://jabber.org/features/compress")
                                .element("method", "zlib").up().up()
                                .element("session").attribute("xmlns", "urn:ietf:params:xml:ns:xmpp-session").up().toString())
                        } else {
                            ws.send(XMLBuilder.create("stream:features").attribute("xmlns:stream", "http://etherx.jabber.org/streams")
                                .element("mechanisms").attribute("xmlns", "urn:ietf:params:xml:ns:xmpp-sasl")
                                .element("mechanism", "PLAIN").up().up()
                                .element("ver").attribute("xmlns", "urn:xmpp:features:rosterver").up()
                                .element("starttls").attribute("xmlns", "urn:ietf:params:xml:ns:xmpp-tls").up()
                                .element("compression").attribute("xmlns", "http://jabber.org/features/compress")
                                .element("method", "zlib").up().up()
                                .element("auth").attribute("xmlns", "http://jabber.org/features/iq-auth").up().toString())
                        }
                        break;

                        case "auth":
                        if (global.Clients.find(i => i.client == ws) || accountId) return;
                        if (!msg.root.content) return Error(ws);
                        var auth = Buffer.from(msg.root.content, 'base64').toString().split('\u0000').splice(1)
                        var decodedBase64 = Buffer.from(msg.root.content, 'base64').toString().split('\u0000');
                        if (!auth) {
                            ws.send(XMLBuilder.create('failure')
                                .att('xmlns', 'urn:ietf:params:xml:ns:xmpp-sasl')
                                .ele("not-authorized")
                                .up()
                                .toString()
                            )
                            return;
                        }


                        console.log(auth[0])

                        var user = await User.findOne({ id: auth[0] });

                        console.log(user)
                        if (user) {
                            console.log(0)
                            displayName = user.displayName
                        }

                        accountId = auth[0]
                        token = auth[1]

                        if (decodedBase64 && accountId && displayName && token && decodedBase64.length == 3) {
                            Authenticated = true;
                            console.log(`An xmpp client with the displayName ${displayName} has logged in.`);

                            ws.send(XMLBuilder.create("success")
                                .att("xmlns", "urn:ietf:params:xml:ns:xmpp-sasl")
                                .toString()
                            )
                        } else {
                            return Error(ws);
                        }



                        break;

                    case "iq":
                        console.log(msg.root.attributes.id)
                        switch (msg.root.attributes.id) {
                           
                            case "_xmpp_bind1":
                                if (global.Clients.find(i => i.client == ws) || resource || !accountId) return;
                                if (!msg.root.children.find(i => i.name == "bind")) return;
                                if (!msg.root.children.find(i => i.name == "bind").children.find(i => i.name == "resource")) return;
                                if (!msg.root.children.find(i => i.name == "bind").children.find(i => i.name == "resource").content) return;

                                console.log("TEST")

                                resource = msg.root.children.find(i => i.name == "bind").children.find(i => i.name == "resource").content;
                                jid = `${accountId}@prod.ol.epicgames.com/${resource}`;

                                ws.send(XMLBuilder.create("iq")
                                    .attribute("to", jid)
                                    .attribute("id", "_xmpp_bind1")
                                    .attribute("xmlns", "jabber:client")
                                    .attribute("type", "result")
                                    .element("bind")
                                    .attribute("xmlns", "urn:ietf:params:xml:ns:xmpp-bind")
                                    .element("jid", jid).up().up().toString())
                                break;

                            case "_xmpp_session1":
                                console.log(global.Clients)
                                if (!global.Clients.find(i => i.client == ws)) return Error(ws);

                                console.log("TEST")
                                var xml = XMLBuilder.create("iq")
                                    .attribute("to", jid)
                                    .attribute("from", "prod.ol.epicgames.com")
                                    .attribute("id", "_xmpp_session1")
                                    .attribute("xmlns", "jabber:client")
                                    .attribute("type", "result");

                                ws.send(xml.toString());
                                await getPresenceFromFriends(ws)
                                break;


                            default:
                                console.log("TESTSTS")
                                if (!global.Clients.find(i => i.client == ws)) return Error(ws);
                                var xml = XMLBuilder.create("iq")
                                    .attribute("to", jid)
                                    .attribute("from", "prod.ol.epicgames.com")
                                    .attribute("id", msg.root.attributes.id)
                                    .attribute("xmlns", "jabber:client")
                                    .attribute("type", "result");

                                ws.send(xml.toString());
                        }
                        break;

                    

                        case "message":
                            if (!global.Clients.find(i => i.client == ws)) return Error(ws);
                            if (!msg.root.children.find(i => i.name == "body") || !msg.root.children.find(i => i.name == "body").content) return;

                            var body = msg.root.children.find(i => i.name == "body").content;
                            console.log(msg.root.attributes)
                            switch (msg.root.attributes.type) {
                                case "chat":
                                    if (!msg.root.attributes.to) return;
                                    var receiver = global.Clients.find(i => i.jid.split("/")[0] == msg.root.attributes.to);
                                    var sender = global.Clients.find(i => i.client == ws);
                                    if (!receiver || !sender) return;
                                    if (receiver == sender) return;
            
                                    receiver.client.send(XMLBuilder.create("message")
                                    .attribute("to", receiver.jid)
                                    .attribute("from", sender.jid)
                                    .attribute("xmlns", "jabber:client")
                                    .attribute("type", "chat")
                                    .element("body", body).up().toString())
                                    return;
                                break;
            
                                case "groupchat":
                                    console.log("GROUPCVHAT")
                                    if (!msg.root.attributes.to) return;
                                    var sender = global.Clients.find(i => i.client == ws);
                                    if (!sender) return;
            
                                    var MUC = global.MUCs.find(i => i.roomName == msg.root.attributes.to.split("@")[0]);
                                    if (!MUC) return;
                                 
                                    MUC.members.forEach(member => {
                                        var ClientData = global.Clients.find(i => i.accountId == member.accountId);
                                        if (!ClientData) return;
            
                                        ClientData.client.send(XMLBuilder.create("message")
                                        .attribute("to", ClientData.jid)
                                        .attribute("from", getMUCmember(MUC.roomName, sender.accountId))
                                        .attribute("xmlns", "jabber:client")
                                        .attribute("type", "groupchat")
                                        .element("body", body).up().toString())
                                    })
                                    return;
                                break;
                            }
            
                            try{
                                if (JSON.parse(body)) {
                                    var object = JSON.parse(body);
                                    if (!object.hasOwnProperty("type") || typeof object.type != "string") return;
                                    if (!msg.root.attributes.to) return;
                                    if (!msg.root.attributes.id) return;
                
                                    sendXmppMessageToClient(ws, msg, body);
                                }
                            }catch(err){

                            }
                            
                        break;
            
                        case "presence":
                            if (!global.Clients.find(i => i.client == ws)) return Error(ws);
                            console.log("pre", msg.root.attributes.type)
                            if (msg.root.attributes.type == "unavailable") {
                                if (!msg.root.attributes.to) return;
            
                                if (msg.root.attributes.to.endsWith("@muc.prod.ol.epicgames.com") || msg.root.attributes.to.split("/")[0].endsWith("@muc.prod.ol.epicgames.com")) {
                                    if (msg.root.attributes.to.toLowerCase().startsWith("party-")) {
                                        var MUC = global.MUCs.find(i => i.roomName == msg.root.attributes.to.split("@")[0]);
                                        if (!MUC) return;
                
                                        var MUCIndex = global.MUCs.findIndex(i => i.roomName == msg.root.attributes.to.split("@")[0]);
                
                                        const client = global.Clients.find(i => i.client == ws);
                                        if (global.MUCs[MUCIndex].members.find(i => i.accountId == client.accountId)) {
                                            console.log("AH", global.MUCs[MUCIndex].members.find(i => (i.accountId)))
                                            console.log("dsfs", client.accountId)
                                            global.MUCs[MUCIndex].members.splice(global.MUCs[MUCIndex].members.findIndex(i => i.accountId == client.accountId), 1);
                                        }
            
                                        ws.send(XMLBuilder.create("presence")
                                        .attribute("to", client.jid)
                                        .attribute("from", getMUCmember(global.MUCs[MUCIndex].roomName, client.accountId))
                                        .attribute("xmlns", "jabber:client")
                                        .attribute("type", "unavailable")
                                        .element("x").attribute("xmlns", "http://jabber.org/protocol/muc#user")
                                        .element("item")
                                        .attribute("nick", getMUCmember(global.MUCs[MUCIndex].roomName, client.accountId).replace(`${global.MUCs[MUCIndex].roomName}@muc.prod.ol.epicgames.com/`, ""))
                                        .attribute("jid", client.jid)
                                        .attribute("role", "none").up()
                                        .element("status").attribute("code", "110").up()
                                        .element("status").attribute("code", "100").up()
                                        .element("status").attribute("code", "170").up().up().toString())
                                        return;
                                    }
                                }
                            }
                            console.log("child", msg.root.children)
                            if (msg.root.children.find(i => i.name == "x")) {
                                if (msg.root.children.find(i => i.name == "x").children.find(i => i.name == "history")) {
                                    if (!msg.root.attributes.to) return;
            
                                    var MUC = global.MUCs.find(i => i.roomName == msg.root.attributes.to.split("@")[0]);
                                    if (!MUC) global.MUCs.push({
                                        "roomName": msg.root.attributes.to.split("@")[0],
                                        "members": [],
                                    });
            
                                    var MUCIndex = global.MUCs.findIndex(i => i.roomName == msg.root.attributes.to.split("@")[0]);
            
                                    const client = global.Clients.find(i => i.client == ws);
                                    global.MUCs[MUCIndex].members.push({ accountId: client.accountId });
            
                                    console.log("e", client.accountId)
                                    ws.send(XMLBuilder.create("presence")
                                    .attribute("to", client.jid)
                                    .attribute("from", getMUCmember(global.MUCs[MUCIndex].roomName, client.accountId))
                                    .attribute("xmlns", "jabber:client")
                                    .element("x").attribute("xmlns", "http://jabber.org/protocol/muc#user")
                                    .element("item")
                                    .attribute("nick", getMUCmember(global.MUCs[MUCIndex].roomName, client.accountId).replace(`${global.MUCs[MUCIndex].roomName}@muc.prod.ol.epicgames.com/`, ""))
                                    .attribute("jid", client.jid)
                                    .attribute("role", "participant")
                                    .attribute("affiliation", "none").up()
                                    .element("status").attribute("code", "110").up()
                                    .element("status").attribute("code", "100").up()
                                    .element("status").attribute("code", "170").up()
                                    .element("status").attribute("code", "201").up().up().toString())
            
                                    global.MUCs[MUCIndex].members.forEach(member => {
                                        var ClientData = global.Clients.find(i => i.accountId == member.accountId);
                                        if (!ClientData) return;
            
                                        ws.send(XMLBuilder.create("presence")
                                        .attribute("from", getMUCmember(global.MUCs[MUCIndex].roomName, ClientData.accountId))
                                        .attribute("to", client.jid)
                                        .attribute("xmlns", "jabber:client")
                                        .element("x")
                                        .attribute("xmlns", "http://jabber.org/protocol/muc#user")
                                        .element("item")
                                        .attribute("nick", getMUCmember(global.MUCs[MUCIndex].roomName, ClientData.accountId).replace(`${global.MUCs[MUCIndex].roomName}@muc.prod.ol.epicgames.com/`, ""))
                                        .attribute("jid", ClientData.jid)
                                        .attribute("role", "participant")
                                        .attribute("affiliation", "none").up().up().toString())
                                    })
            
                                    global.MUCs[MUCIndex].members.forEach(member => {
                                        var ClientData = global.Clients.find(i => i.accountId == member.accountId);
                                        if (!ClientData) return;
            
                                        if (client.accountId.toLowerCase() != ClientData.accountId.toLowerCase()) {
                                            ClientData.client.send(XMLBuilder.create("presence")
                                            .attribute("from", getMUCmember(global.MUCs[MUCIndex].roomName, client.accountId))
                                            .attribute("to", ClientData.jid)
                                            .attribute("xmlns", "jabber:client")
                                            .element("x")
                                            .attribute("xmlns", "http://jabber.org/protocol/muc#user")
                                            .element("item")
                                            .attribute("nick", getMUCmember(global.MUCs[MUCIndex].roomName, client.accountId).replace(`${global.MUCs[MUCIndex].roomName}@muc.prod.ol.epicgames.com/`, ""))
                                            .attribute("jid", client.jid)
                                            .attribute("role", "participant")
                                            .attribute("affiliation", "none").up().up().toString())
                                        }
                                    })
                                    return;
                                }
                            }
            
                            if (!msg.root.children.find(i => i.name == "status") || !msg.root.children.find(i => i.name == "status").content) return;
                            try{
                                if(!JSON.parse(msg.root.children.find(i => i.name == "status").content)) return;
                            }catch(err){
                                return false;
                            }
                          
                            if (Array.isArray(JSON.parse(msg.root.children.find(i => i.name == "status").content))) return;
            
                            var body = msg.root.children.find(i => i.name == "status").content;
                            var away = false;
                            if (msg.root.children.find(i => i.name == "show")) away = true;
                       
                            await updatePresenceForFriends(ws, body, away, false);
                            getPresenceFromUser(accountId, accountId, false);
                        break;
                    }
            
                    if (!global.Clients.find(i => i.client == ws)) {
                        if (accountId && displayName && token && jid && ID && resource && Authenticated == true) {
                            global.Clients.push({
                                client: ws,
                                accountId: accountId,
                                displayName: displayName,
                                token: token,
                                jid: jid,
                                resource: resource,
                                lastPresenceUpdate: {
                                    away: false,
                                    status: "{}" 
                                } 
                            });
                        }
                    }
                   ws.on('close', () => RemoveClient(ws))
            })
        })
    }
}


function getPresenceFromUser(fromId, toId, unavailable) {
    if (!global.Clients) return;
    var SenderData = global.Clients.find(i => i.accountId == fromId);
    var ClientData = global.Clients.find(i => i.accountId == toId);
    var availability = unavailable == true ? "unavailable" : "available";
    if (!SenderData || !ClientData) return;

    var xml = XMLBuilder.create("presence")
        .attribute("to", ClientData.jid)
        .attribute("xmlns", "jabber:client")
        .attribute("from", SenderData.jid)

    if (SenderData.lastPresenceUpdate.away == true) xml = xml.attribute("type", availability).element("show", "away").up().element("status", SenderData.lastPresenceUpdate.status).up();
    else xml = xml.attribute("type", availability).element("status", SenderData.lastPresenceUpdate.status).up();

    ClientData.client.send(xml.toString())
}

async function updatePresenceForFriends(ws, body, away, offline) {
    var SenderData = global.Clients.find(i => i.client == ws);
    if (!SenderData) return;

    var SenderIndex = global.Clients.findIndex(i => i.client == ws);
    global.Clients[SenderIndex].lastPresenceUpdate.away = away;
    global.Clients[SenderIndex].lastPresenceUpdate.status = body;

    var friends = await User.findOne({ id: SenderData.accountId });
    var accepted = friends["Friends"]["accepted"];
    //console.log(accepted)
    accepted.forEach(friend => {
        var ClientData = global.Clients.find(i => i.accountId == friend.id);
        if (!ClientData) return;
        console.log("ds")
        var xml = XMLBuilder.create("presence")
            .attribute("to", ClientData.jid)
            .attribute("xmlns", "jabber:client")
            .attribute("from", SenderData.jid)
        console.log("dsa")
        if (offline == true) xml = xml.attribute("type", "unavailable");
        else xml = xml.attribute("type", "available")

        if (away == true) xml = xml.element("show", "away").up().element("status", body).up();
        else xml = xml.element("status", body).up();
        console.log("TESTSTSTSTSTWSSTST")
        ClientData.client.send(xml.toString())
    })
}

async function getPresenceFromFriends(ws) {
    var SenderData = global.Clients.find(i => i.client == ws);
    if (!SenderData) return;

    var friends = await User.findOne({ id: SenderData.accountId });
    console.log(friends)
    var accepted = friends["Friends"]["accepted"];

    accepted.forEach(friend => {
        var ClientData = global.Clients.find(i => i.accountId == friend.id);
        if (!ClientData) return

        var xml = XMLBuilder.create("presence")
            .attribute("to", SenderData.jid)
            .attribute("xmlns", "jabber:client")
            .attribute("from", ClientData.jid)

        if (ClientData.lastPresenceUpdate.away == true) xml = xml.attribute("type", "available").element("show", "away").up().element("status", ClientData.lastPresenceUpdate.status).up();
        else xml = xml.attribute("type", "available").element("status", ClientData.lastPresenceUpdate.status).up();

        SenderData.client.send(xml.toString())
    })
}

function sendXmppMessageToClient(ws, msg, body) {
    if (!global.Clients) return;
    if (typeof body == "object") body = JSON.stringify(body);

    var sender = global.Clients.find(i => i.client == ws);
    var receiver = global.Clients.find(i => i.jid.split("/")[0] == msg.root.attributes.to || i.jid == msg.root.attributes.to);
    if (!receiver || !sender) return;

    receiver.client.send(XMLBuilder.create("message")
        .attribute("from", sender.jid)
        .attribute("id", msg.root.attributes.id)
        .attribute("to", receiver.jid)
        .attribute("xmlns", "jabber:client")
        .element("body", body).up().toString());
}

function getMUCmember(roomName, accountId) {
    let client = global.Clients.find(i => i.accountId == accountId);
    if (!client) return `${roomName}@muc.prod.ol.epicgames.com`;

    return `${roomName}@muc.prod.ol.epicgames.com/${encodeURI(client.displayName)}:${client.accountId}:${client.resource}`
}

function RemoveClient(ws) {
    var client = global.Clients.find(i => i.client == ws);
    if (!client) return;

    var ClientStatus = JSON.parse(client.lastPresenceUpdate.status);
    var partyId = "";

    try {
        switch (true) {
            case (!ClientStatus.Properties): break;
            case (JSON.parse(ClientStatus.Properties)): {
                for (var key in ClientStatus.Properties) {
                    if (key.toLowerCase().startsWith("party")) {
                        if (ClientStatus.Properties[key] && JSON.parse(ClientStatus.Properties[key])) partyId = ClientStatus.Properties[key].partyId;
                    }
                }
            }
        }

    } catch (err) {

    }

    global.Clients.forEach(ClientData => {
        if (client.accountId.toLowerCase() != ClientData.accountId.toLowerCase()) {
            ClientData.client.send(XMLBuilder.create("message")
                .attribute("id", functions.MakeID().replace(/-/ig, "").toUpperCase())
                .attribute("from", client.jid)
                .attribute("xmlns", "jabber:client")
                .attribute("to", ClientData.jid)
                .element("body", JSON.stringify({
                    "type": "com.epicgames.party.memberexited",
                    "payload": {
                        "partyId": partyId,
                        "memberId": client.accountId,
                        "wasKicked": false
                    },
                    "timestamp": new Date().toISOString()
                })).up().toString());
        }
    });

    updatePresenceForFriends(ws, "{}", false, true);

    console.log(`An xmpp client with the displayName ${global.Clients.find(i => i.client == ws).displayName} has logged out.`);

    global.Clients.splice(global.Clients.findIndex(i => i.client == ws), 1);
}
module.exports = {
    xmpp: new xmpp,
    getPresenceFromUser: getPresenceFromUser,
    updatePresenceForFriends: updatePresenceForFriends,
    getPresenceFromFriends: getPresenceFromFriends
}