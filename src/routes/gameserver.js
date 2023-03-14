const User = require("../services/modules/User")

class Gameserver {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {
        application.get("/gameserver/skin/:name", async (req,res) => {
            const user = await User.findOne({ displayName: req.params.name }).lean();
            var AthenaCharacter = user.profile.character.items.split(':')[1];
            res.send(AthenaCharacter);
        });

        application.get("/gameserver/glider/:name", async (req,res) => {
            const user = await User.findOne({ displayName: req.params.name }).lean();
            var AthenaGlider = user.profile.glider.items.split(':')[1];
            res.send(AthenaGlider);
        });

        application.get("/gameserver/backbling/:name", async (req,res) => {
            const user = await User.findOne({ displayName: req.params.name }).lean();
            var AthenaBackpack = user.profile.backpack.items.split(':')[1];
            res.send(AthenaBackpack);
        });

        application.get("/gameserver/pickaxe/:name", async (req,res) => {
            const user = await User.findOne({ displayName: req.params.name }).lean();
            var AthenaPickaxe = user.profile.pickaxe.items.split(':')[1];
            res.send(AthenaPickaxe);
        });
    }
}

module.exports = new Gameserver