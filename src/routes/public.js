const path = require('path');
const User = require("../services/modules/User");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const axios = require('axios');

async function getCosmeticJson(cosmetic) {
    const response = await axios.get(`https://fortnite-api.com/v2/cosmetics/br/${cosmetic}`);
    const data = response.data;
    var JsonString = JSON.stringify(data, null, 2);
    return JSON.parse(JsonString, null, 2);
}

class Public {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {
        application.get("/infinity/public/locker/json/:username", async (req, res) => {
            if (req.params.username == "") return res.json({ "message": "you did not put a username (example: /infinity/public/locker/json/ctrlkohl)" });

            const user = await User.findOne({ displayName: req.params.username }).lean();

            if (!user) return res.json({ "message": "account does not exist" });

            try {
                var JSON = {
                    character: user.profile.character.items,
                    backpack: user.profile.backpack.items,
                    dance: user.profile.dance.items,
                    glider: user.profile.glider.items,
                    pickaxe: user.profile.pickaxe.items
                }


                return res.json(JSON);
            } catch {
                return res.json({ "message": "there was an error! make sure you have a skin, backbling, dance, glider and a pickaxe equipped" });
            }
        });

        application.get("/infinity/public/user/:username", async (req, res) => {
            if (req.params.username == "") return res.json({ "message": "you did not put a username (example: /infinity/public/locker/json/ctrlkohl)" });
            const user = await User.findOne({ displayName: req.params.username }).lean();
            if (!user) return res.json({ "message": "account does not exist" });

            // get profile character icon

            var character = await getCosmeticJson(user.profile.character.items.split(':')[1]);
            var pickaxe = await getCosmeticJson(user.profile.pickaxe.items.split(':')[1]);
            var backpack = await getCosmeticJson(user.profile.backpack.items.split(':')[1]);
            var glider = await getCosmeticJson(user.profile.glider.items.split(':')[1]);
            var loadingscreen = await getCosmeticJson(user.profile.loadingscreen.items.split(':')[1]);
           

            var JSON = {
                username: user.displayName,
                vbucks: user.profile.vbucks,
                equipped: {
                    character: {
                        cid: user.profile.character.items.split(':')[1],
                        cidicon: character.data.images.icon
                    },
                    pickaxe: {
                        pickaxeid: user.profile.pickaxe.items.split(':')[1],
                        pickaxeicon: pickaxe.data.images.icon
                    },
                    backpack: {
                        bid: user.profile.backpack.items.split(':')[1],
                        bidicon: backpack.data.images.icon
                    },
                    dances: {
                        eids: user.profile.dance.items
                    },
                    glider: {
                        gliderid: user.profile.glider.items.split(':')[1],
                        glidericon: glider.data.images.icon
                    },
                    loadingscreen: {
                        lsid: user.profile.loadingscreen.items.split(':')[1],
                        lsidicon: loadingscreen.data.images.icon
                    },
                    wraps: {
                        wrap: user.profile.itemwrap.items
                    }
                }

            };

            return res.json(JSON);
        });
    }
}

module.exports = new Public