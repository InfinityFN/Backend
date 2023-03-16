const User = require("../services/modules/User")
const axios = require('axios');

class Gameserver {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {
        /*application.get("/gameserver/skin/:name", async (req, res) => {
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

                res.send(jsonp.data.path.replace("FortniteGame/Content/", '/Game/') + "." + jsonp.data.id);
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

        application.get("/gameserver/pickaxe/:name", async (req, res) => {
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

        application.get("/gameserver/pickaxe/:name", async (req, res) => {
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
          });

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

module.exports = new Gameserver