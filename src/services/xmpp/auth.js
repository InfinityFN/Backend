const User = require("../modules/User")
const XMLBuilder = require("xmlbuilder");
const XMLParser = require("xml-parser");

module.exports = class auth {
    constructor(ws, msg, accountId, displayName, token, Authenticated) {
        this.accountId = accountId
        this.displayName = displayName
        this.token = token
        this.Authenticated = Authenticated
        this.start(ws, msg, Authenticated)
    }
    async start(ws, msg, Authenticated) {
        Authenticated = true;
        if (global.Clients.find(i => i.client == ws) || this.accountId) return;
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
            this.displayName = user.displayName
        }

        this.accountId = auth[0]
        this.token = auth[1]

        if (decodedBase64 && this.accountId && this.displayName && this.token && decodedBase64.length == 3) {
            this.Authenticated = true;
            console.log(`An xmpp client with the displayName ${this.displayName} has logged in.`);

            ws.send(XMLBuilder.create("success")
                .att("xmlns", "urn:ietf:params:xml:ns:xmpp-sasl")
                .toString()
            )
        } else {
            return Error(ws);
        }


    }
}