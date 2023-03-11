const User = require("../services/modules/User")

class InfinityJS { 
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {
        application.get("/infinity/dev/api/search/player", async (req,res) => {
            var Player = await User.findOne({ displayName: req.query.username }).lean();
            if(Player == null) {
                return res.send('invalid profile!');
            }
            return res.json({displayName: Player.displayName, CreatedAt: Player.createdAt, DiscordId: Player.discord, Banned: Player.profile.banned});
        });

        application.get("/infinity/dev/api/search/player/wins", async (req,res) => {
            var Player = await User.findOne({ displayName: req.query.username }).lean();
            return res.json({displayName: Player.displayName});
        });
    }
}

module.exports = new InfinityJS

