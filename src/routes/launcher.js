const User = require("../services/modules/User")
const crypto = require("crypto")
const bcrypt = require("bcrypt")

var online = 0;

class Launcher {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {
        application.get("/infinity/dev/players/online", (req, res) => {
            return res.send(`${online}`);
        })

        application.get("/infinity/launcher/api/login/:email/:password", async (req, res) => {
            const Acct = await User.findOne({ email: req.params.email }).lean();

            if (Acct == null) {
                return res.send('Err:404');
            }
            //console.log(Acct);
            const isMatch = bcrypt.compareSync(req.params.password, Acct.password);

            if (isMatch) {
                console.log('Player logged in!');
                online++;
                return res.json(Acct);
            } else {
                return res.send('Err:401');
            }
        });

        application.get('/infinity/launcher/api/get/friends/:displayName', async (req, res) => {
            const user = await User.findOne({ displayName: req.params.displayName }).lean();
            console.log(user);

            if (!user) return res.send('Err:404');

            var friends = user.Friends.accepted;

            var friendNames = [];

            await Promise.all(friends.map(async (friend) => {
                var friendName = await User.findOne({ id: friend.id }).lean();
                console.log(friendName);
                if (friendName != null) {
                    if (friendName.displayName != undefined && friendName.displayName != null) {
                        var name = friendName.displayName;
                        friendNames.push(name);
                    }
                }
            }));

            console.log(friendNames);

            return res.json(friendNames);
        });

        application.get("/infinity/launcher/kill", (req, res) => {
            console.log('Player logged out!');
            if (online != 0) {
                online--;
            }
            return res.send('done!');
        });
    }
}

module.exports = new Launcher