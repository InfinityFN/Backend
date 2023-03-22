// Infinity Admin Panel
const path = require('path');
const fs = require('fs');
const AdminMod = require("../services/modules/Admin")
const UserMod = require("../services/modules/User")
const ObjectId = require('mongodb').ObjectId
const crypto = require("crypto")
const bcrypt = require("bcrypt")
const request = require('request-promise');

class Admin {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {

        application.get("/infinity/public/jquery", (req, res) => {
            res.sendFile(path.join(__dirname, '../public/jquery.js'));
        });

        application.get("/infinity/public/bootstrap", (req, res) => {
            res.sendFile(path.join(__dirname, '../public/bootstrap.css'));
        });

        // Playlists
        application.get("/infinity/dev/api/playlist/json", async (req, res, next) => {
            return res.json(require('../services/resources/json/active-playlists.json'));
        });

        application.get("/infinity/dev/api/news/json", async (req, res, next) => {
            //const newsalive =  await AdminMod.findOne({ _id: new ObjectId("640d1c48fe89a28d0bf5b7c6") }).lean().catch(e => next(e))
            //const content = newsalive.news

            // return res.json(content)
            //return res.json(require('../services/resources/json/active-playlists.json'))
        });

        application.get("/infinity/dev/api/emergencynotice/json", async (req, res, next) => {
            //const emergencynoticealive =  await AdminMod.findOne({ _id: new ObjectId("640d1c48fe89a28d0bf5b7c6") }).lean().catch(e => next(e))
            //const emergencynotice = emergencynoticealive.emergencynotice

            //return res.json(emergencynotice)
        });

        application.get("/infinity/dev/api/emergencynotice/edit/:edit", async (req, res) => {
            const emergencynoticealive = await AdminMod.findOne({ _id: new ObjectId("640d1c48fe89a28d0bf5b7c6") }).lean().catch(e => next(e))
            const sexymessage = req.query.message
            const Thingy = req.params.edit
            if (emergencynoticealive) {
                AdminMod.collection.updateOne({ id: req.query.id }, { $set: { [`emergencynotice.${Thingy}`]: sexymessage } })
                return res.json({ message: 'changed successfully' });
            }

            return res.status(404).json({ message: 'Account not found.' });
        })

        application.get("/infinity/dev/api/news/edit/:news/:edit", async (req, res) => {
            const emergencynoticealive = await AdminMod.findOne({ _id: new ObjectId("640d1c48fe89a28d0bf5b7c6") }).lean().catch(e => next(e))
            const sexymessage = req.query.message
            const Thingy = req.params.edit
            const NewsThingy = req.params.news
            if (emergencynoticealive) {
                AdminMod.collection.updateOne({ id: req.query.id }, { $set: { [`news.${NewsThingy}.${Thingy}`]: sexymessage } })
                return res.json({ message: 'changed successfully' });
            }

            return res.status(404).json({ message: 'Account not found.' });
        })


        application.get('/infinity/dev/ip/banned', (req, res) => {
            return res.sendFile(path.join(__dirname, '../public/ipban.html'));
        });

        application.get("/infinity/dev/api/players/json", async (req, res, next) => {
            const playersalive = await UserMod.find();
            let PlayersData = []

            playersalive.forEach(player => {
                PlayersData.push({
                    displayName: player.displayName,
                    discord: player.discord,
                    id: player.id,
                    banned: player.profile.banned
                })
            })

            return res.json(PlayersData)
            //return res.json(require('../services/resources/json/active-playlists.json'))
        });

        // ONLY REMOVE IF THERE NOT BANNED ELSE WHY BANNED :skull:
        /*application.get("/infinity/dev/api/players/remove", async (req, res, next) => {
            const playersalive = await UserMod.findOne({ id: req.query.id }).lean().catch(e => next(e)); // we save ids as id alr?

            if (playersalive) {
                UserMod.collection.findOneAndDelete({ id: req.query.id })
                return res.json({ message: 'Account removed successfully.' });
            }

            return res.status(404).json({ message: 'Account not found.' });
        });*/

        /*application.get("/infinity/dev/api/players/edit/banned", async (req, res) => {
            const playersalive = await UserMod.findOne({ id: req.query.id }).lean().catch(e => next(e)); // we save ids as id alr?
            let Banned = req.query.banned;

            if (playersalive) {
                UserMod.collection.updateOne({ id: req.query.id }, { $set: { ["profile.banned"]: Banned } })
                return res.json({ message: 'changed successfully' });
            }

            return res.status(404).json({ message: 'Account not found.' });
        })*/

        /*application.get("/infinity/dev/api/playlist/manage", (req, res) => {
            // unique id everytime we update
            if (req.headers['user-agent'] != require('../config.json').adminAppId) {
                return res.sendFile(path.join(__dirname, '../public/useragenterror.html'));
            }

            if (req.query.key != require('../config.json').apiKey) {
                return res.sendFile(path.join(__dirname, '../public/apikeyerror.html'));
            }

            res.sendFile(path.join(__dirname, '../public/changeplaylist.html'));
        });*/

        application.get('/cosmetics.json', (req,res) => {
            return res.sendFile(path.join(__dirname, '../public/itemshop/cosmetics.json'));
        });

        application.get('/view/itemshop', (req,res) => {
            return res.sendFile(path.join(__dirname, '../public/itemshop/index.html'));
        });


        application.get("/register", (req, res) => {
            res.sendFile(path.join(__dirname, '../public/sitereg.html'));
        })

        function isPotentialSpamEmail(email) {
            const regex = /^[a-f0-9]{32}@[a-z0-9]+\.[a-z]{2,}$/i;
            return regex.test(email);
        }

        

        application.get("/infinity/register", async (req, res) => {
            var Email = req.query.email
            var Password = req.query.password
            var Username = req.query.username
            var uuid = req.query.uuid
            console.log(req.query);
            console.log(Email)
            console.log(Password)
            console.log(Username)
            if (Email && Password && Username) {
                if (req.query.terms != "on") {
                    return res.json({ "message": "user hasn't agreed to terms of service" });
                }

                //if(username.toLowerCase().includes('[INFINITY]')) return res.json({"message": "please refrain from using the staff badge '[INFINITY]'"});

                var canContinue = false;
                const code = require('../services/modules/vercodes');
                code.verificationcodes.forEach((id, index) => {
                    if (uuid == id) {
                        canContinue = true;
                        console.log('Found! Deleting code');
                        code.verificationcodes.splice(index, 1);
                        console.log(code.verificationcodes);
                    }
                })

                if (canContinue == false) {
                    return res.json({ "message": "invalid verification code" });
                }

                /*const response = req.query['g-recaptcha-response'];
                console.log(response);
                const secretKey = '6LdQB_8kAAAAACk_Ay0SHhv26RMaRqfFSA9AF2Px';
                const options = {
                    uri: 'https://www.google.com/recaptcha/api/siteverify',
                    method: 'POST',
                    formData: {
                        secret: secretKey,
                        response: response
                    },
                    json: true
                };

                try {
                    const result = await request(options);
                    if (result.success) {
                        console.log("reCAPTCHA Passed!");
                    } else {
                        // reCAPTCHA failed, do something here
                        console.log("reCAPTCHA Failed!");
                        return res.json({"message": "reCAPTCHA was unsuccessful"});
                    }
                } catch (error) {
                    console.error(error);
                    console.log("reCAPTCHA Failed!");
                    return res.json({"message": "reCAPTCHA was unsuccessful"});
                }*/

                if (isPotentialSpamEmail(Email)) {
                    const ip = req.ip;
                    console.log(`Request from IP address: ${ip}`);
                    console.log("Spam email detected!");
                    return res.json({ "message": "potential spam email detected!" });
                }

                if (Email.includes("@test.com")) {
                    const ip = req.ip;
                    console.log(`Request from IP address: ${ip}`);
                    console.log("someone is using @test.com");
                    return res.json({ "message": "invalid email address" });
                }

                const email = await UserMod.findOne({ email: Email }).lean().catch(e => next(e))
                if (email) {
                    return res.json({ message: "Email Already In Use" })
                } else {
                    const username = await UserMod.findOne({ displayName: Username }).lean().catch(e => next(e))
                    if (username) {
                        return res.json({ message: "Username Already In Use" })
                    } else {
                        const RandomID = crypto.randomBytes(16).toString('hex')
                        const RandomID2 = crypto.randomBytes(16).toString('hex')


                        let User = await UserMod.create({
                            "id": RandomID,
                            "createdAt": new Date(),
                            "displayName": Username,
                            "email": Email,
                            "password": bcrypt.hashSync(Password, bcrypt.genSaltSync(10)),
                            "Authorization": RandomID2 // Auto Gen a token ig
                        })

                        User.save().catch(err => {
                            return res.json({ err: err })
                        })

                        console.log('Account Created!');
                        return res.json({ message: "Account Created!" })
                    }
                }
            } else {
                return res.json({ message: "Sorry There Is A Issue" })
            }
        })

        /*application.get("/infinity/dev/api/playlist/remove", async (req, res) => {
            // Shoot me :/ ok
            const activeplaylists = await AdminMod.findOne({ _id: new ObjectId("640d1c48fe89a28d0bf5b7c6") }).lean().catch(e => next(e))
            const servers = activeplaylists.playlists
            let ServersData = []
            let IsFound = false

            servers.forEach(server => {
                if (server.playlist.toUpperCase() === req.query.playlist.toUpperCase()) {
                    IsFound = true
                } else {
                    ServersData.push({ playlist: server.playlist, ServerIP: server.ServerIP, ServerPort: server.ServerPort, enabled: server.enabled })
                }
            })


            if (IsFound) {
                await AdminMod.updateOne({ _id: new ObjectId("640d1c48fe89a28d0bf5b7c6") }, { playlists: ServersData })
                res.json({ message: 'Playlist removed successfully.' });
            } else {
                res.status(404).json({ message: 'Playlist not found.' });
            }
        });

        application.get("/infinity/dev/api/playlist/edit/enabled", async (req, res) => {
            const activeplaylists = await AdminMod.findOne({ _id: new ObjectId("640d1c48fe89a28d0bf5b7c6") }).lean().catch(e => next(e))
            const servers = activeplaylists.playlists
            let Enabled = req.query.enabled;
            let Playlist = req.query.playlist;
            let isEnabled = false;
            let ServersData = []

            if (Enabled == true || Enabled == "true") {
                isEnabled = true;
            }

            servers.forEach(server => {
                if (server.playlist.toUpperCase() == Playlist.toUpperCase()) {
                    ServersData.push({ playlist: server.playlist, ServerIP: server.ServerIP, ServerPort: server.ServerPort, enabled: isEnabled })
                } else {
                    ServersData.push({ playlist: server.playlist, ServerIP: server.ServerIP, ServerPort: server.ServerPort, enabled: server.enabled })
                }
            })
            console.log(servers)
            await AdminMod.updateOne({ _id: new ObjectId("640d1c48fe89a28d0bf5b7c6") }, { playlists: ServersData })
            return res.json({ message: 'changed enabled status successfully' });
        });*/

        /*application.get("/infinity/dev/api/basic/config", (req, res) => {

            // unique id everytime we update
            if (req.headers['user-agent'] != require('../config.json').adminAppId) {
                return res.sendFile(path.join(__dirname, '../public/useragenterror.html'));
            }

            if (req.query.key != require('../config.json').apiKey) {
                return res.sendFile(path.join(__dirname, '../public/apikeyerror.html'));
            }

            res.sendFile(path.join(__dirname, '../public/newsconfig.html'));
        });

        application.get("/infinity/dev/api/accounts/manage", (req, res) => {
            // unique id everytime we update
            if (req.headers['user-agent'] != require('../config.json').adminAppId) {
                return res.sendFile(path.join(__dirname, '../public/useragenterror.html'));
            }

            if (req.query.key != require('../config.json').apiKey) {
                return res.sendFile(path.join(__dirname, '../public/apikeyerror.html'));
            }

            res.sendFile(path.join(__dirname, '../public/accountmanage.html'));
        });

        application.get("/infinity/dev/gen/password", async (req,res) => {
            return res.sendFile(path.join(__dirname, '../public/hashgen.html'));
        });*/

        // now I don't need to change my password!
        application.get("/infinity/dev/gen/password/hash", async (req,res) => {
            let password = req.query.password;
            let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            if(!hash) return res.json({status: 400});
            return res.json({status: 200, hash: hash});
        });

        /*application.get("/infinity/dev/api/playlist/add", async (req, res) => {
            const servers = require('../services/resources/json/active-playlists.json');
            var isEnabled = false;

            if (req.query.enabled == "true") {
                isEnabled = true;
            }

            servers.push({ playlist: req.query.playlist, ServerIP: req.query.serverIP, ServerPort: parseInt(req.query.serverPort), enabled: isEnabled });

            fs.writeFileSync(path.join(__dirname, '../services/resources/json/active-playlists.json'), JSON.stringify(servers, null, 2));
            return res.json({ message: 'Playlist added successfully' });
        });*/
        // End of Playlists
    }
}

module.exports = new Admin
