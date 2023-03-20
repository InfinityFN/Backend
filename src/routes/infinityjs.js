const User = require("../services/modules/User")
const axios = require('axios');
class InfinityJS {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {
        application.get("/infinity/dev/api/search/player", async (req, res) => {
            var Player = await User.findOne({ displayName: req.query.username }).lean();
            if (Player == null) {
                return res.send('invalid profile!');
            }
            const response = await axios.get(`https://fortnite-api.com/v2/cosmetics/br/${Player.profile.character.items.split(':')[1]}`);
            const data = response.data;
            var JsonString = JSON.stringify(data, null, 2);
            var CosmeticsJSON = JSON.parse(JsonString, null, 2);

            // get friend name(s)
            /*var friendarray = Player.Friends.accepted;

            var friendnames = [];

            Player.Friends.accepted.forEach(async (m, index) => {
                //console.log(m);
                var friend = await User.findOne({id: m.id}).lean();
                console.log(friend);
                setTimeout(function() {
                    friendnames.push(friend.displayName);
                }, 500);
            });*/

            //console.log(friendnames);


            //console.log(CosmeticsJSON);

            return res.json({ displayName: Player.displayName, CreatedAt: Player.createdAt, Banned: Player.profile.banned, Cosmeticsicon: CosmeticsJSON.data.images.icon, vbucks: Player.profile.vbucks});
        });

        application.get("/infinity/dev/api/search/player/wins", async (req, res) => {
            var Player = await User.findOne({ displayName: req.query.username }).lean();
            return res.json({ displayName: Player.displayName });
        });
    }
}

module.exports = new InfinityJS

