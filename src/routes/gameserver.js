const User = require("../services/modules/User")
const Gameserver = require('../services/modules/Gameserver');
const axios = require('axios');

class Gameserver2 {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {
        application.get('/gameserver/game/win/:name', async (req, res) => {
            console.log(req.params.name);
            const user = await User.findOne({ displayName: req.params.name }).lean();
            if (!user) return res.send('failure, no user found.');

            var newNum = user.stats.solos.matchplayed + 1;

            await User.updateOne({ displayName: req.params.name }, { 'stats.solos.matchplayed': newNum });

            return res.send('success!');
        });

        application.get('/gameserver/status/na', async (req, res) => {
            const gameServer = await Gameserver.findOne({ name: "NA" });
            if (!gameServer) {
                console.error("Game server not found!");
                return;
            }

            res.send(gameServer.online);
        });

        application.get('/gameserver/status/:status', async (req, res) => {
            if (req.params.status == "Online") {
                const gameServer = await Gameserver.findOne({ name: "NA" });
                if (!gameServer) {
                    console.error("Game server not found!");
                    return;
                }
                await Gameserver.updateOne({ name: "NA" }, { $set: { online: true } });
            } else if (req.params.status == "Bus") {
                const gameServer = await Gameserver.findOne({ name: "NA" });
                if (!gameServer) {
                    console.error("Game server not found!");
                    return;
                }
                await Gameserver.updateOne({ name: "NA" }, { $set: { online: false } });
            }else if (req.params.status == "Offline") {
                const gameServer = await Gameserver.findOne({ name: "NA" });
                if (!gameServer) {
                    console.error("Game server not found!");
                    return;
                }
                await Gameserver.updateOne({ name: "NA" }, { $set: { online: false } });
            }

            res.send('finished!');
        });


        application.get('/gameserver/game/playing/:name', async (req, res) => {
            console.log(req.params.name);
            const user = await User.findOne({ displayName: req.params.name }).lean();
            if (!user) return res.send('failure, no user found.');

            var newNum = user.stats.solos.matchplayed + 1;

            await User.updateOne({ displayName: req.params.name }, { 'stats.solos.matchplayed': newNum });

            return res.send('success!');
        });

        application.get("/gameserver/skin/:name", async (req, res) => {
            console.log(req.params.name);
            const user = await User.findOne({ displayName: req.params.name }).lean();
            var AthenaCharacter = user.profile.character.items.split(':')[1];
            try {
                var CID = (await axios.get(`https://fortnite-api.com/v2/cosmetics/br/${AthenaCharacter}`)).data;
                //console.log(CID);
                var jsons = JSON.stringify(CID, null, 2);
                var jsonp = JSON.parse(jsons, null, 2);

                res.send(jsonp.data.id);
            } catch {
                console.log('Cosmetic not found');
            }
        });

        application.get("/gameserver/skin/path/:name", async (req, res) => {
            const user = await User.findOne({ displayName: req.params.name }).lean();
            var AthenaCharacter = user.profile.character.items.split(':')[1];
            try {
                var CID = (await axios.get(`https://fortnite-api.com/v2/cosmetics/br/${AthenaCharacter}`)).data;
                //console.log(CID);
                var jsons = JSON.stringify(CID, null, 2);
                var jsonp = JSON.parse(jsons, null, 2);

                res.send("AthenaCharacterItemDefinition " + jsonp.data.path.replace("FortniteGame/Content/", '/Game/') + "." + jsonp.data.id);
            } catch {
                console.log('Cosmetic not found');
            }
        });

        application.get("/gameserver/glider/:name", async (req, res) => {
            console.log(req.params.name);
            const user = await User.findOne({ displayName: req.params.name }).lean();
            var AthenaGlider = user.profile.glider.items.split(':')[1];
            try {
                var CID = (await axios.get(`https://fortnite-api.com/v2/cosmetics/br/${AthenaGlider}`)).data;
                //console.log(CID);
                var jsons = JSON.stringify(CID, null, 2);
                var jsonp = JSON.parse(jsons, null, 2);
                res.send(jsonp.data.id);
            } catch {
                console.log('Cosmetic not found');
            }
        });

        application.get("/gameserver/backbling/:name", async (req, res) => {
            console.log(req.params.name);
            const user = await User.findOne({ displayName: req.params.name }).lean();
            var AthenaBackpack = user.profile.backpack.items.split(':')[1];
            try {
                var CID = (await axios.get(`https://fortnite-api.com/v2/cosmetics/br/${AthenaBackpack}`)).data;
                //console.log(CID);
                var jsons = JSON.stringify(CID, null, 2);
                var jsonp = JSON.parse(jsons, null, 2);
                res.send(jsonp.data.id);
            } catch {
                console.log('Cosmetic not found');
            }

        });

        application.get("/gameserver/onwin/:name", async (req, res) => {
            console.log(req.params.name);
            const user = await User.findOne({ displayName: req.params.name }).lean();

            if (user) {
                var newWin = user.stats.solos.wins + 1;
                var newVbucks = user.profile.vbucks + 100;

                await User.updateOne({ displayName: req.params.name }, { 'stats.solos.wins': newWin });
                await User.updateOne({ displayName: req.params.name }, { 'profile.vbucks': newVbucks });
                res.send('success');
            } else {
                console.log('not a player! cheater');
                res.send('failure');
            }

        });

        application.get("/gameserver/onkill/:name", async (req, res) => {
            console.log(req.params.name);
            const user = await User.findOne({ displayName: req.params.name }).lean();

            if (user) {
                var newKill = user.stats.solos.kills + 1;
                var newVbucks = user.profile.vbucks + 50;

                await User.updateOne({ displayName: req.params.name }, { 'stats.solos.kills': newKill });
                await User.updateOne({ displayName: req.params.name }, { 'profile.vbucks': newVbucks });
                res.send('success');
            } else {
                console.log('not a player! cheater');
                res.send('failure');
            }

        });

        application.get("/gameserver/pickaxe/:name", async (req, res) => {
            console.log(req.params.name);
            const user = await User.findOne({ displayName: req.params.name }).lean();
            if (!user) {
                return res.send('failure');
            }

            var AthenaPickaxe = user.profile.pickaxe.items.split(':')[1];

            if (user.profile.pickaxe.items == "" || user.profile.pickaxe.items == " ") {
                return res.send('DefaultPickaxe');
            }

            var CID = (await axios.get(`https://fortnite-api.com/v2/cosmetics/br/${AthenaPickaxe}`)).data;
            //console.log(CID);
            var jsons = JSON.stringify(CID, null, 2);
            var jsonp = JSON.parse(jsons, null, 2);
            res.send(jsonp.data.id);
        });

        /*application.get("/gameserver/pickaxe/:name", async (req, res) => {
            try {
              const user = await User.findOne({ displayName: req.params.name }).lean();
              if (!user) {
                return res.status(404).send("User not found");
              }
              const AthenaPickaxe = user.profile?.pickaxe?.items?.split(":")[1];
              if (!AthenaPickaxe) {
                return res.status(400).send("Invalid user data");
              }
              const CID = (await axios.get(`https://fortnite-api.com/v2/cosmetics/br/${AthenaPickaxe}`)).data;
              const jsons = JSON.stringify(CID, null, 2);
              const jsonp = JSON.parse(jsons, null, 2);
              res.send(jsonp.data.id);
            } catch (error) {
              console.log(error);
              res.status(500).send("Server error");
            }
          });*/

        /*application.get("/gameserver/pickaxe/:name", async (req, res) => {
            console.log(req.params.name);
            const user = await User.findOne({ displayName: req.params.name }).lean();
            var AthenaPickaxe = user.profile.pickaxe.items.split(':')[1];
            try {
                var CID = (await axios.get(`https://fortnite-api.com/v2/cosmetics/br/${AthenaPickaxe}`)).data;
                //console.log(CID);
                var jsons = JSON.stringify(CID, null, 2);
                var jsonp = JSON.parse(jsons, null, 2);
                res.send(jsonp.data.id);
            } catch {
                console.log('cosmetic not found!');
            }
        });*/
    }
}

module.exports = new Gameserver2