// Infinity Admin Panel
const path = require('path');
const fs = require('fs');
const AdminMod = require("../services/modules/Admin")
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
        application.get("/infinity/dev/api/playlist/json", (req, res, next)=> {
            
            //const activeplaylists = AdminMod.find().lean().catch(e => next(e))
            //const omgyes = activeplaylists[0].playlists
            // enable once done testing (mongodb yay)
            return res.json(require('../services/resources/json/active-playlists.json'))
        });

        application.get("/infinity/dev/api/playlist/manage", (req, res) => {
            res.sendFile(path.join(__dirname, '../public/changeplaylist.html'));
        });

        application.get("/infinity/dev/api/playlist/remove", (req, res) => {
            // Shoot me :/
            const activePlaylists = require('../services/resources/json/active-playlists.json');

            const playlistIndexToRemove = activePlaylists.findIndex(server => server.playlist.toUpperCase() === req.query.playlist.toUpperCase());

            if (playlistIndexToRemove >= 0) {
                activePlaylists.splice(playlistIndexToRemove, 1);
            }

            fs.writeFileSync(path.join(__dirname, '../services/resources/json/active-playlists.json'), JSON.stringify(activePlaylists, null, 2));

            if (playlistIndexToRemove >= 0) {
                res.json({ message: 'Playlist removed successfully.' });
            } else {
                res.status(404).json({ message: 'Playlist not found.' });
            }
        });

        application.get("/infinity/dev/api/playlist/edit/enabled", (req, res) => {
            let Enabled = req.query.enabled;
            let Playlist = req.query.playlist;
            let isEnabled = false;

            if(Enabled == true || Enabled == "true") {
                isEnabled = true;
            }

            let servers = require('../services/resources/json/active-playlists.json');
            
            servers.forEach(server => {
                if(server.playlist.toUpperCase() == Playlist.toUpperCase()) {
                    server.enabled = isEnabled;
                }
            });

            fs.writeFileSync(path.join(__dirname, '../services/resources/json/active-playlists.json'), JSON.stringify(servers, null, 2));

            return res.json({message: 'changed enabled status successfully'});
        });

        application.get("/infinity/dev/api/playlist/add", (req, res) => {
            var servers = require('../services/resources/json/active-playlists.json');
            var isEnabled = false;
            if (req.query.enabled == "true") {
                isEnabled = true;
            }

            // EXAMPLE:
            // http://127.0.0.1:6969/add?playlist=Playlist_DefaultSquad&serverIP=127.0.0.1&serverPort=7777&enabled=false
            servers.push({ playlist: req.query.playlist, ServerIP: req.query.serverIP, ServerPort: parseInt(req.query.serverPort), enabled: isEnabled });
            fs.writeFileSync(path.join(__dirname, '../services/resources/json/active-playlists.json'), JSON.stringify(servers, null, 2), function (err) {
                if (err) {
                    return err;
                }
                console.log('playlist added!');
            });
            return res.json({ message: 'Playlist added successfully' });
        });
        // End of Playlists
    }
}

module.exports = new Admin
