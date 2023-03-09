const User = require("../services/modules/User")

const { WebhookClient, MessageEmbed } = require('discord.js');
class Api {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }
    endpoints(application) {

        application.use((req, res, next) => {
            // Ip Ban check
            var isIpBanned = false;
            var bannedIps = require('../services/resources/json/bannedIps.json');
            const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
          
            // bannedIp.json Example: ["127.0.0.1"]
            console.log(ipAddress);
          
            bannedIps.forEach(ip => {
              if(ipAddress == ip) {
                isIpBanned = true;
              }
            });
          
            console.log(isIpBanned)
          
            if(isIpBanned == true) {
              if(req.url != "/infinity/dev/ip/banned") {
                return res.redirect('/infinity/dev/ip/banned')
              }
            }

            // Log Requests
            if(require('../config.json').logRequests == true) {
                console.log(`Incoming request: ${req.method} ${req.url}`)
            }
            
            next()
        })



        // JUST to test to see how the embed looked. will delete later
        application.post('/report/test', (req, res) => {
            // report webhook
            const webhook = new WebhookClient('1083247535575015455', '32LrEwxSdBBevi82lbHuQm0bzluWgtGzs1IVnC-nNf4OBeVecBK9RmP1nTCUrMi-XBnE');
            const embed = new MessageEmbed()
                .setTitle('New Report Recieved!')
                .setColor('#ff1100')
                .setDescription('A new report has been recieved!')
                .addFields(
                    { name: 'Reporter', value: "Kohl" },
                    { name: 'Offender', value: "zinx" },
                    { name: 'Category', value: "CommunicationsAbuse" },
                    { name: 'Playlist', value: "Playlist_DefaultDuo" },
                    { name: 'Details', value: "he being meanie" }
                );

            // Send the embed to the webhook
            webhook.send(embed)
                .then(() => console.log('Embed sent successfully!'))
                .catch(console.error);

        });

        // No stealing <3 (Ingame Report)
        application.post("/fortnite/api/game/v2/toxicity/account/:accountId/report/:offenderAccountId", async (req, res) => {
            var Reporter = await User.findOne({ id: req.params.accountId }).lean();
            var Offender = await User.findOne({ id: req.params.offenderAccountId }).lean();
            console.log(Offender);

            if(Offender.displayName == null || Offender.displayName == "" || Offender.displayName == undefined) {
                return console.log("Offender isn't found");
            }

            // report webhook
            const webhook = new WebhookClient('1083247535575015455', '32LrEwxSdBBevi82lbHuQm0bzluWgtGzs1IVnC-nNf4OBeVecBK9RmP1nTCUrMi-XBnE');

            /*
            {
  reason: 'CommunicationsAbuse',
  details: '',
  gameSessionId: 'REPLAY-96a1b17c400bdd44f7d04898b43fa43c',
  creativeIslandSharingLink: '',
  creativeIslandGuid: '',
  creativeIslandOwnerAccountId: '',
  playlistName: 'Playlist_DefaultDuo',
  bIsCompetitiveEvent: false,
  reporterPlatform: 'Windows',
  offenderPlatform: '',
  bBlockUserRequested: false,
  bUserMarkedAsKnown: false
}
             */
            console.log(Reporter.displayName);

            // Create a new MessageEmbed object
            const embed = new MessageEmbed()
                .setTitle('New Report Recieved!')
                .setColor('#ff1100')
                .setDescription('A new report has been recieved!')
                .addFields(
                    { name: 'Reporter', value: Reporter.displayName },
                    { name: 'Offender', value: Offender.displayName },
                    { name: 'Category', value: req.body.reason },
                    { name: 'Playlist', value: req.body.playlistName },
                    { name: 'Details', value: req.body.details }
                );

            // Send the embed to the webhook
            webhook.send({ embeds: [embed] })
                .then(() => console.log('Embed sent successfully!'))
                .catch(console.error);


            console.log('ReportTest');

            res.status(204);
            res.json({});
        });

        // Feedback for Comment (not done *lemme do it zinx*)
        application.all("/fortnite/api/feedback/Comment", (req, res) => {
            console.log("Comment!");
            console.log(req);
            res.status(200);
            res.json({});
        });

        // Feedback for Bug (not done *lemme do it zinx*)
        application.all("/fortnite/api/feedback/Bug", (req, res) => {
            console.log("BUG!");
            res.status(200);
            res.json({});
        });

        application.get("/fortnite/api/v2/versioncheck/*", (req, res) => {
            res.json({
                "type": "NO_UPDATE"
            })
        })

        application.get("/account/api/public/account/:accountId", async (req, res) => {
            var Eh = await User.findOne({ id: req.params.accountId }).lean();
            if (Eh) {
                res.json({
                    "id": Eh.id,
                    "displayName": Eh.displayName,
                    "name": Eh.displayName,
                    "email": Eh.email,
                    "failedLoginAttempts": 0,
                    "lastLogin": new Date().toISOString(),
                    "numberOfDisplayNameChanges": 0,
                    "ageGroup": "UNKNOWN",
                    "headless": false,
                    "country": "US",
                    "lastName": "User",
                    "links": {},
                    "preferredLanguage": "en",
                    "canUpdateDisplayName": false,
                    "tfaEnabled": true,
                    "emailVerified": true,
                    "minorVerified": true,
                    "minorExpected": true,
                    "minorStatus": "UNKNOWN"
                })
            } else {
                res.json({ "err": "CUM ON MAN!" })
            }
        })

        application.all("/account/api/public/account", async (req, res) => {
            const accountId = req.query.accountId

            var Data = []
            if(Array.isArray(accountId)) {
                for(const index of accountId){
                    var Accounts = await User.findOne({ id: index }).lean();
                    if(Accounts){
                        Data.push({
                            "id": index,
                            "displayName": Accounts.displayName,
                            "externalAuths": {}
                        })
                    }else{

                    }
                }
            }else{
                var Accounts = await User.findOne({ id: accountId}).lean();
                if(Accounts){
                    Data.push({
                        "id": Accounts.id,
                        "links": {},
                        "displayName": Accounts.displayName,
                        "cabinedMode": false,
                        "externalAuths": {}
                    })
                }
            }

            res.json(Data)
        })

        application.all('/fortnite/api/game/v2/tryPlayOnPlatform/account/*', (req, res) => {
            res.setHeader('Content-Type', 'text/plain').send(true).end();
        })

        application.get("/fortnite/api/game/v2/enabled_features", (req, res) => {
            res.json([])
        })

        application.post("/fortnite/api/game/v2/grant_access/*", (req, res) => {
            res.json({}).status(204).end();
        })

        application.get("/fortnite/api/storefront/v2/keychain", (req, res) => {
            // when your lazy
            res.json(require("../services/resources/json/keychain.json"))
            res.status(200);
        })
    }
}

module.exports = new Api