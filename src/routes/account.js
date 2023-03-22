const path = require('path');
const User = require("../services/modules/User");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const axios = require('axios');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

var sessions = [];

function generateUniqueId() {
    return crypto.randomBytes(16).toString('hex');
}

function getCurrentDateInUTC() {
    const currentDate = new Date();
    const utcDate = new Date(currentDate.getTime() + (currentDate.getTimezoneOffset() * 60000));
    return utcDate.toUTCString();
}

async function getCosmeticJSON(cosmetic) {
    const response = await axios.get(`https://fortnite-api.com/v2/cosmetics/br/${cosmetic}`);
    const data = response.data;
    var JsonString = JSON.stringify(data, null, 2);

    return JSON.parse(JsonString, null, 2);
}

class Account {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }
    endpoints(application) {
        application.get("/infinity/acct/locker/view/gui", async (req, res) => {
            let sessionID = req.query.sessionid;
            var username = "";

            sessions.forEach(session => {
                if (sessionID == session.sessionId) {
                    username = session.username;
                }
            });

            console.log(username);

            if (username == "") {
                return res.json({ "message": "invalid sessionId" });
            }

            return res.sendFile(path.join(__dirname, '../public/locker/lockerv2.html'));
        });

        application.get('/locker/cosmetics.json', (req, res) => {
            return res.sendFile(path.join(__dirname, '../public/locker/cosmetics.json'));
        });

        application.get('/vbuck.png', (req, res) => {
            return res.sendFile(path.join(__dirname, '../public/locker/vbuck.png'));
        });

        application.get('/infinity/api/v2/cosmetics/user', async (req, res) => {
            let sessionID = req.query.sessionid;
            var username = "";

            sessions.forEach(session => {
                if (sessionID == session.sessionId) {
                    username = session.username;
                }
            });

            console.log(username);

            if (username == "") {
                return res.json({ "message": "invalid sessionId" });
            }

            const user = await User.findOne({ displayName: username }).lean();
            if (!user) return res.json({ "message": "account does not exist" });

            // get profile character icon

            var character = await getCosmeticJSON(user.profile.character.items.split(':')[1]);
            var pickaxe = await getCosmeticJSON(user.profile.pickaxe.items.split(':')[1]);
            var backpack = await getCosmeticJSON(user.profile.backpack.items.split(':')[1]);
            var glider = await getCosmeticJSON(user.profile.glider.items.split(':')[1]);
            var loadingscreen = await getCosmeticJSON(user.profile.loadingscreen.items.split(':')[1]);


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

        application.get('/lockerjs', (req, res) => {
            console.log('e');
            return res.sendFile(path.join(__dirname, '../public/locker/locker.js'));
        });
        application.get("/login", (req, res) => {
            return res.sendFile(path.join(__dirname, '../public/login.html'));
        })

        application.get("/infinity/acct/login", async (req, res) => {
            let email = req.query.email;
            let password = req.query.password;

            const user = await User.findOne({ email: email }).lean(); // find the user

            if (user) {
                const isMatch = bcrypt.compareSync(password, user.password);

                if (isMatch != true) {
                    return res.json({ "message": "wow" });
                }

                var sessionID = generateUniqueId(); // create a brand new session ID

                sessions.push({ sessionId: sessionID, username: user.displayName, createdAt: getCurrentDateInUTC() });

                res.redirect(`/acct/dashboard?sessionid=${sessionID}`);
            } else {
                res.json({ "message": "user does not exist" });
            }
        });

        application.get("/infinity/acct/login/sessiononly", async (req, res) => {
            let email = req.query.email;
            let password = req.query.password;

            const user = await User.findOne({ email: email }).lean(); // find the user

            if (user) {
                const isMatch = bcrypt.compareSync(password, user.password);

                if (isMatch != true) {
                    return res.json({ "message": "wow" });
                }

                var sessionID = generateUniqueId(); // create a brand new session ID

                sessions.push({ sessionId: sessionID, username: user.displayName, createdAt: getCurrentDateInUTC() });

                res.json({ "sessionId": sessionID });
            } else {
                res.json({ "message": "user does not exist" });
            }
        });

        application.get("/infinity/api/name/change", async (req, res) => {
            let sessionID = req.query.sessionid;
            var newName = req.query.newName;
            var username = "";

            sessions.forEach(session => {
                if (sessionID == session.sessionId) {
                    username = session.username;
                    session.username = newName;
                }
            });

            console.log(username);

            if (username == "") {
                return res.json({ "message": "invalid sessionId" });
            }

            await User.updateOne({ displayName: username }, { displayName: newName });

            return res.json({ "message": "username successfully changed!" });
        });

        application.get("/infinity/api/password/change", async (req, res) => {
            let sessionID = req.query.sessionid;
            var newPassword = req.query.newPassword;
            var username = "";

            sessions.forEach(session => {
                if (sessionID == session.sessionId) {
                    username = session.username;
                    //session.username = newName;  
                }
            });

            console.log(username);

            if (username == "") {
                return res.json({ "message": "invalid sessionId" });
            }

            await User.updateOne({ displayName: username }, { password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10)) });

            return res.json({ "message": "password successfully changed!" });
        });

        application.get("/infinity/api/dump/lockerjson", async (req, res) => {
            let sessionID = req.query.sessionid;
            var username = "";

            sessions.forEach(session => {
                if (sessionID == session.sessionId) {
                    username = session.username;
                }
            });

            console.log(username);

            if (username == "") {
                return res.json({ "message": "invalid sessionId" });
            }

            const user = await User.findOne({ displayName: username }).lean();

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

        application.get("/infinity/api/delete/acct", async (req, res) => {
            let sessionID = req.query.sessionid;
            var username = "";

            sessions.forEach(session => {
                if (sessionID == session.sessionId) {
                    username = session.username;
                    //session.username = newName;  
                }
            });

            if (username == "") {
                return res.json({ "message": "invalid sessionId" });
            }

            const isAccount = await User.findOne({ displayName: username }).lean().catch(e => next(e));

            if (isAccount) {
                User.collection.findOneAndDelete({ id: isAccount.id }); // Delete Account
                return res.redirect('/login');
            }

            return res.json({ "message": "account does not exist :/" });
        });

        application.get("/infinity/api/reset/sessionid", async (req, res) => {
            let sessionID = req.query.sessionid;
            var username = "";
            var index = -1;

            sessions.forEach(async (session, index1) => {
                if (sessionID == session.sessionId) {
                    username = session.username;
                    console.log(index1);
                    index = index1;
                    //session.username = newName;  
                }
            });

            if (username == "") return res.json({ "message": "invalid sessionId" });

            if (index == -1) return res.json({ "message": "invalid index!" });

            var newSessionId = generateUniqueId();

            sessions[index].sessionId = newSessionId;

            return res.redirect(`/acct/dashboard?sessionid=${newSessionId}`);
        });

        application.get('/infinity/update/all', async (req,res) => {
            await User.updateMany(
                { 'BattlePass.battlePassPurchased': { $exists: false } }, 
                { $set: { 'BattlePass.battlePassPurchased': false} }
            );

            await User.updateMany(
                { 'BattlePass.battlePassTier': { $exists: false } }, 
                { $set: { 'BattlePass.battlePassTier': 1} }
            );

            await User.updateMany(
                { 'BattlePass.battlePassXPBoost': { $exists: false } }, 
                { $set: { 'BattlePass.battlePassXPBoost': 0} }
            );

            await User.updateMany(
                { 'BattlePass.battlePassXPFriendBoost': { $exists: false } }, 
                { $set: { 'BattlePass.battlePassXPFriendBoost': 0} }
            );
        });

        application.get("/infinity/api/dash/logout", async (req, res) => {
            let sessionID = req.query.sessionid;
            var username = "";
            var index = -1;

            sessions.forEach(async (session, index1) => {
                if (sessionID == session.sessionId) {
                    username = session.username;
                    console.log(index1);
                    index = index1;
                    //session.username = newName;  
                }
            });

            if (username == "") return res.json({ "message": "invalid sessionId" });
            if (index == -1) return res.json({ "message": "invalid index!" });

            sessions.splice(index, 1); // delete sessionid to prevent stealing

            console.log(sessions);

            return res.redirect('/login');
        });

        application.get("/infinity/dev/custom/lobbybg", async (req, res) => {
            let sessionID = req.query.sessionid;
            var lobbyid = req.query.lobbybg;
            var lobbyurl = req.query.lobbyurl;
            console.log(lobbyid);
            var username = "";

            sessions.forEach(session => {
                if (sessionID == session.sessionId) {
                    username = session.username;
                }
            });

            console.log(username);

            if (username == "") return res.json({ "message": "invalid sessionId" });

            if (lobbyurl == "none") {
                await User.updateMany(
                    { background: { $exists: false } },
                    { $set: { background: "seasonx" } }
                );

                await User.updateOne({ displayName: username }, { background: lobbyid });

                return res.json({ "message": "lobby background successfully changed!" });
            } else {
                await User.updateMany(
                    { backgroundurl: { $exists: false } },
                    { $set: { backgroundurl: "none" } }
                );

                await User.updateOne({ displayName: username }, { background: lobbyid });

                await User.updateOne({ displayName: username }, { backgroundurl: lobbyurl });

                return res.json({ "message": "lobby background successfully changed!" });
            }


        });

        application.get("/credits", (req, res) => {
            return res.sendFile(path.join(__dirname, '../public/credits.html'));
        });

        application.get('/acct/dashboard', async (req, res) => {
            let sessionID = req.query.sessionid;

            var username = "";

            sessions.forEach(session => {
                if (sessionID == session.sessionId) {
                    username = session.username;
                }
            });

            if (username == "") {
                return res.json({ "message": "invalid sessionId" });
            }

            const window = new JSDOM('').window;
            const DOMPurify = createDOMPurify(window);

            const user = await User.findOne({ displayName: username }).lean(); // find the user
            const safeDisplayName = DOMPurify.sanitize(user.displayName);

            res.send(`
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Dashboard</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous">
          <style>
        body {
            background-color: #F0F2F5;
        }

        h1 {
            text-align: center;
            margin-bottom: 2rem;
        }

        label {
            font-weight: 600;
        }

        input[type="email"],
        input[type="password"] {
            border-radius: 5px;
            border: 1px solid #BDC1C6;
            padding: 0.5rem;
            font-size: 1rem;
        }

        input[type="email"]:focus,
        input[type="password"]:focus {
            border-color: #0366D6;
            box-shadow: 0px 0px 5px #0366D6;
        }

        button[type="submit"] {
            margin-top: 2rem;
            width: 100%;
            border-radius: 5px;
            background-color: #0366D6;
            color: #fff;
            font-size: 1rem;
            font-weight: 600;
            padding: 0.75rem;
            border: none;
            cursor: pointer;
        }

        button[type="submit"]:hover {
            background-color: #054EA4;
        }

        @media (max-width: 576px) {
            .container {
                margin-top: 2rem;
                padding: 1rem;
            }
        }
    </style>
</head>
<body>
<div class="container mt-5">
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header">
                    <h3 class="text-center">My Account</h3>
                </div>
                <div class="card-body">
                    <h5>Username: <span id="username">${safeDisplayName}</span></h5>
                    <h5>Email Address: <span id="email">*******</span> <a href="#" id="revealEmail">Reveal</a></h5>
                    <hr>
                    <button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#changeNameModal">Change Name</button>
                    <button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#changePasswordModal">Change Password</button>
                    <button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#dumpLockerJSON">View Locker</button>
                    <!-- <button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#add2FAModal">Add 2FA</button> -->
                    <hr>
                    <p>Game Features</p>
                    <button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#changelobbyBackgroundModal">Change Lobby Background</button>
                    <button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#changenewslocalModal">Change News Locally</button>
                    <hr>
                    <button type="button" class="btn btn-danger btn-block" data-toggle="modal" data-target="#resetSessionModal">Reset Session ID</button>
                    <button type="button" class="btn btn-danger btn-block" data-toggle="modal" data-target="#deleteAccountModal">Delete Account</button>
                    <button type="button" class="btn btn-danger btn-block" data-toggle="modal" data-target="#logOutModal">Log out</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Change News Locally Modal-->
<div class="modal fade" id="changenewslocalModal" tabindex="-1" role="dialog" aria-labelledby="changenewslocalModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="changenewslocalModalLabel">Change News Locally</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body"> 
                <p>This feature is not released to the public yet! Stay tuned for updates on our <a href="https://discord.gg/infinitymp">Discord</a></p>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Ok</button>
            <!-- <button type="button" class="btn btn-danger" id="deleteAccountBtn">Delete Account</button>-->
            </div>
        </div>
    </div>
</div>

<!-- Change Name Modal -->
<div class="modal fade" id="changeNameModal" tabindex="-1" role="dialog" aria-labelledby="changeNameModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="changeNameModalLabel">Change Name</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="newName">New Name</label>
                    <input type="text" class="form-control" id="newName">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="changeNameBtn">Save changes</button>
            </div>
        </div>
    </div>
</div>

<!-- Change Lobby Background Modal -->
<div class="modal fade" id="changelobbyBackgroundModal" tabindex="-1" role="dialog" aria-labelledby="changelobbyBackgroundModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="changelobbyBackgroundModalLabel">Change Lobby Background</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            <p>If you don't know how to use this, please refer to our <a href="https://infinity-8.gitbook.io/infinity/">documentation</a> for custom lobby background switching</p>
                <div class="form-group">
                    <label for="lobbybg">Lobby Background Id</label>
                    <input type="text" class="form-control" id="lobbybg">
                    <label for="lobbyurl">URL (must be .png or .jpg)</label>
                    <input type="text" class="form-control" id="lobbyurl">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="changeLobbyBackgroundBtn">Save changes</button>
            </div>
        </div>
    </div>
</div>

<!-- Change Password Modal -->
<div class="modal fade" id="changePasswordModal" tabindex="-1" role="dialog" aria-labelledby="changePasswordModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="changePasswordModalLabel">Change Password</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="newPassword">New Password</label>
                    <input type="text" class="form-control" id="newPassword">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="changePasswordBtn">Save changes</button>
            </div>
        </div>
    </div>
</div>

  <div class="modal fade" id="add2FAModal" tabindex="-1" role="dialog" aria-labelledby="add2FAModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="add2FAModalLabel">Add 2FA</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>
            <div class="modal-body">
                <p>To enable two-factor authentication, please scan the following QR code using an authenticator app:</p>
                <div class="text-center">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/My%20Account:myusername?secret=1234567890" alt="QR Code">
                </div>
                <div class="form-group mt-3">
                    <label for="code">Enter the code from the authenticator app</label>
                    <input type="text" class="form-control" id="code">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="enable2FABtn">Enable</button>
            </div>
        </div>
    </div>
</div>

<!-- Delete Account Modal -->
<div class="modal fade" id="deleteAccountModal" tabindex="-1" role="dialog" aria-labelledby="deleteAccountModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteAccountModalLabel">Delete Account</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete your account?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-danger" id="deleteAccountBtn">Delete Account</button>
            </div>
        </div>
    </div>
</div>

<!-- Log out Modal -->
<div class="modal fade" id="logOutModal" tabindex="-1" role="dialog" aria-labelledby="logOutModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="logOutModalLabel">Log out</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to logout?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-danger" id="logOutBtn">Log out</button>
            </div>
        </div>
    </div>
</div>

<!-- Reset SessionID Modal -->
<div class="modal fade" id="resetSessionModal" tabindex="-1" role="dialog" aria-labelledby="resetSessionIdModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="resetSessionIdModalLabel">Reset Session ID</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to reset your Session ID, This will log everyone out of the dashboard besides you. Proceed?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-danger" id="resetSessionBtn">Reset Session ID</button>
            </div>
        </div>
    </div>
</div>

<!-- Dump Locker JSON Modal -->
<div class="modal fade" id="dumpLockerJSON" tabindex="-1" role="dialog" aria-labelledby="deleteAccountModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteAccountModalLabel">Dump Locker JSON</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>How do you wanna see your Locker?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="dumpLockerBtn">JSON</button>
                <button type="button" class="btn btn-primary" id="dumpLockerWebBtn">Web GUI</button>
            </div>
        </div>
    </div>
</div>

  <!-- Bootstrap JavaScript (jQuery) -->
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>

<script>
    $(document).ready(function () {
        // Reveal email address when "Reveal" button is clicked
        $('#revealEmail').click(function () {
            var email = '${user.email}';
            $('#email').text(email);
        });

        // Handle "Change Name" button click
        $('#changeNameBtn').click(function () {
            var newName = $('#newName').val();
            if (newName) {
                window.location.href = "/infinity/api/name/change?sessionid=${sessionID}&newName=" + newName;
                console.log(newName); 
            }
        });

        // Handle "Lobby BG" button click
        $('#changeLobbyBackgroundBtn').click(function () {
            var lobbybg2 = $('#lobbybg').val();
            var lobbyurl2 = $('#lobbyurl').val();
            console.log('bg: ' + lobbybg2);
            console.log('ur: ' + lobbyurl2);
            if (lobbybg2) {
                if(lobbyurl2 == "" || lobbyurl2 == undefined || lobbyurl2 == null) {
                    window.location.href = "/infinity/dev/custom/lobbybg?sessionid=${sessionID}&lobbybg=" + lobbybg2 + "&lobbyurl=none";
                } else {
                    window.location.href = "/infinity/dev/custom/lobbybg?sessionid=${sessionID}&lobbybg=" + lobbybg2 + "&lobbyurl=" + lobbyurl2;
                }
            }
        });

        $('#changePasswordBtn').click(function () {
            var newPassword = $('#newPassword').val();
            if (newPassword) {
                window.location.href = "/infinity/api/password/change?sessionid=${sessionID}&newPassword=" + newPassword;
                console.log(newPassword); 
            }
        });

        // Handle "Delete Account" button click
        $('#deleteAccountBtn').click(function () {
            window.location.href = "/infinity/api/delete/acct?sessionid=${sessionID}";
        });

        // Handle "DumpJSON" button click
        $('#dumpLockerBtn').click(function () {
            window.location.href = "/infinity/api/dump/lockerjson?sessionid=${sessionID}";
        });

        // Handle "resetSessionID" button click
        $('#resetSessionBtn').click(function () {
            window.location.href = "/infinity/api/reset/sessionid?sessionid=${sessionID}";
        });

        // Handle "resetSessionID" button click
        $('#logOutBtn').click(function () {
            window.location.href = "/infinity/api/dash/logout?sessionid=${sessionID}";
        });

        $('#dumpLockerWebBtn').click(function () {
            window.location.href = "/infinity/acct/locker/view/gui?sessionid=${sessionID}";
        });
    });
</script>
            `);
        });
    }
}

module.exports = new Account