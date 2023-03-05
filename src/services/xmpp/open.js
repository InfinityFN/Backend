const XMLBuilder = require("xmlbuilder");
const XMLParser = require("xml-parser");

module.exports = class open {
    constructor(ws, ID, Authenticated){
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
    }
}