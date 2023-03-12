// Infinity Admin Panel
const path = require('path');
const fs = require('fs');
const AdminMod = require("../services/modules/Admin")
const UserMod = require("../services/modules/User")
const ObjectId = require('mongodb').ObjectId

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

            const activeplaylists =  await AdminMod.findOne({ _id: new ObjectId("640d1c48fe89a28d0bf5b7c6") }).lean().catch(e => next(e))
            const omgyes = activeplaylists.playlists


            return res.json(omgyes)
            //return res.json(require('../services/resources/json/active-playlists.json'))
        });

        application.get("/infinity/dev/api/news/json", async (req, res, next) => {
            const newsalive =  await AdminMod.findOne({ _id: new ObjectId("640d1c48fe89a28d0bf5b7c6") }).lean().catch(e => next(e))
            const content = newsalive.news

            return res.json(content)
            //return res.json(require('../services/resources/json/active-playlists.json'))
        });

        application.get("/infinity/dev/api/emergencynotice/json", async (req, res, next) => {
            const emergencynoticealive =  await AdminMod.findOne({ _id: new ObjectId("640d1c48fe89a28d0bf5b7c6") }).lean().catch(e => next(e))
            const emergencynotice = emergencynoticealive.emergencynotice

            return res.json(emergencynotice)
        });

        application.get("/infinity/dev/api/emergencynotice/edit/:edit", async (req, res) => {
            const emergencynoticealive =  await AdminMod.findOne({ _id: new ObjectId("640d1c48fe89a28d0bf5b7c6") }).lean().catch(e => next(e))
            const sexymessage = req.query.message
            const Thingy = req.params.edit
            if (emergencynoticealive) {
                AdminMod.collection.updateOne({ id: req.query.id }, { $set: { [`emergencynotice.${Thingy}`]: sexymessage } })
                return res.json({ message: 'changed successfully' });
            }

            return res.status(404).json({ message: 'Account not found.' });
        })

        application.get("/infinity/dev/api/news/edit/:news/:edit", async (req, res) => {
            const emergencynoticealive =  await AdminMod.findOne({ _id: new ObjectId("640d1c48fe89a28d0bf5b7c6") }).lean().catch(e => next(e))
            const sexymessage = req.query.message
            const Thingy = req.params.edit
            const NewsThingy = req.params.news
            if (emergencynoticealive) {
                AdminMod.collection.updateOne({ id: req.query.id }, { $set: { [`news.${NewsThingy}.${Thingy}`]: sexymessage } })
                return res.json({ message: 'changed successfully' });
            }

            return res.status(404).json({ message: 'Account not found.' });
        })


        application.get('/infinity/dev/ip/banned', (req,res) => {
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
        application.get("/infinity/dev/api/players/remove", async (req, res, next) => {
            const playersalive = await UserMod.findOne({ id: req.query.id }).lean().catch(e => next(e)); // we save ids as id alr?

            if (playersalive) {
                UserMod.collection.findOneAndDelete({ id: req.query.id })
                return res.json({ message: 'Account removed successfully.' });
            }

            return res.status(404).json({ message: 'Account not found.' });
        });

        application.get("/infinity/dev/api/players/edit/banned", async (req, res) => {
            const playersalive = await UserMod.findOne({ id: req.query.id }).lean().catch(e => next(e)); // we save ids as id alr?
            let Banned = req.query.banned;

            if (playersalive) {
                UserMod.collection.updateOne({ id: req.query.id }, { $set: { ["profile.banned"]: Banned } })
                return res.json({ message: 'changed successfully' });
            }

            return res.status(404).json({ message: 'Account not found.' });
        })

        application.get("/infinity/dev/api/playlist/manage", (req, res) => {
            // unique id everytime we update
            if(req.headers['user-agent'] != require('../config.json').adminAppId) {
                return res.sendFile(path.join(__dirname, '../public/useragenterror.html'));
            }

            if(req.query.key != require('../config.json').apiKey) {
                return res.sendFile(path.join(__dirname, '../public/apikeyerror.html'));
            }

            res.sendFile(path.join(__dirname, '../public/changeplaylist.html'));
        });

        application.get("/infinity/dev/api/playlist/remove", async (req, res) => {
            // Shoot me :/ ok
            const activeplaylists =  await AdminMod.findOne({ _id: new ObjectId("640d1c48fe89a28d0bf5b7c6") }).lean().catch(e => next(e))
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
        });

        application.get("/infinity/dev/api/basic/config", (req, res) => {

            // unique id everytime we update
            if(req.headers['user-agent'] != require('../config.json').adminAppId) {
                return res.sendFile(path.join(__dirname, '../public/useragenterror.html'));
            }

            if(req.query.key != require('../config.json').apiKey) {
                return res.sendFile(path.join(__dirname, '../public/apikeyerror.html'));
            }

            res.sendFile(path.join(__dirname, '../public/newsconfig.html'));
        });

        application.get("/infinity/dev/api/accounts/manage", (req, res) => {

            // unique id everytime we update
            if(req.headers['user-agent'] != require('../config.json').adminAppId) {
                return res.sendFile(path.join(__dirname, '../public/useragenterror.html'));
            }

            if(req.query.key != require('../config.json').apiKey) {
                return res.sendFile(path.join(__dirname, '../public/apikeyerror.html'));
            }

            res.sendFile(path.join(__dirname, '../public/accountmanage.html'));
        });

        application.get("/infinity/dev/api/playlist/add", async (req, res) => {
            const activeplaylists = await AdminMod.findOne({ _id: new ObjectId("640d1c48fe89a28d0bf5b7c6") }).lean().catch(e => next(e))
            const servers = activeplaylists.playlists
            var isEnabled = false;
            let ServersData = []
            if (req.query.enabled == "true") {
                isEnabled = true;
            }

            servers.forEach(server => {
                console.log("test")
                ServersData.push({ playlist: server.playlist, ServerIP: server.ServerIP, ServerPort: server.ServerPort, enabled: server.enabled })
            })
            ServersData.push({ playlist: req.query.playlist, ServerIP: req.query.serverIP, ServerPort: parseInt(req.query.serverPort), enabled: isEnabled });

            await AdminMod.updateOne({ _id: new ObjectId("640d1c48fe89a28d0bf5b7c6") }, { playlists: ServersData })
            return res.json({ message: 'Playlist added successfully' });
        });
        // End of Playlists
    }
}

module.exports = new Admin
