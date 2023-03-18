const path = require('path');
const nodemailer = require('nodemailer');
const User = require("../services/modules/User")
const crypto = require("crypto")
const bcrypt = require("bcrypt")

function generateUUID() {
    let uuid = '';
    const chars = '0123456789abcdef';

    // Generate random hex digits for each segment of the UUID
    for (let i = 0; i < 8; i++) {
        uuid += chars[Math.floor(Math.random() * 16)];
    }
    uuid += '-';
    for (let i = 0; i < 4; i++) {
        uuid += chars[Math.floor(Math.random() * 16)];
    }
    uuid += '-4';
    for (let i = 0; i < 3; i++) {
        uuid += chars[Math.floor(Math.random() * 16)];
    }
    uuid += '-';
    uuid += chars[Math.floor(Math.random() * 4) + 8];
    for (let i = 0; i < 3; i++) {
        uuid += chars[Math.floor(Math.random() * 16)];
    }
    uuid += '-';
    for (let i = 0; i < 12; i++) {
        uuid += chars[Math.floor(Math.random() * 16)];
    }

    return uuid;
}

class Password {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {
        application.get("/forgotpassword", (req, res) => {
            return res.sendFile(path.join(__dirname, '../public/forgotpassword.html'));
        });

        application.get("/infinity/api/send/passwordreset", async (req, res) => {
            console.log(req.query.emil);
            var email = req.query.email;
            var uuid = generateUUID();
            const code = require('../services/modules/vercodes');
            code.passwordresetcodes.push(uuid);
            console.log(code.passwordresetcodes);

            var user = await User.findOne({ email: email }).lean();

            if (!user) return res.json({ "status": 404 });

            if (email.includes("%40")) {
                var user = email.split('%40');
                email = user[0] + "@" + user[1];
            }

            // create reusable transporter object using SMTP transport
            const transporter = nodemailer.createTransport({
                host: 's1.ct8.pl',
                port: 587,
                secure: false,
                auth: {
                    user: 'no-reply@nekuzi.cf',
                    pass: 'Starlight06!'
                }
            });

            const mailOptions = {
                from: 'no-reply@nekuzi.cf',
                to: `${email}`,
                subject: '[InfinityFN]: Password Verification Email!',
                html: `
                <!DOCTYPE html>
                <html>
                <head>
                  <title>Password Reset Request</title>
                  <!-- Bootstrap CSS -->
                  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                </head>
                <body>
                
                <div class="container">
                  <h1>Password Reset Request</h1>
                  <p>Dear ${user.displayName},</p>
                  <p>We received a request to reset the password associated with your account. If you did not request this change, please contact us immediately on our <a href="https://discord.gg/infinitymp">Discord</a>.</p>
                  <p>If you did request the password reset, please click the button below to reset your password:</p>
                  
                  <a href="http://infinityapi.nekuzi.cf:43614/password/reset?uuid=${uuid}&username=${user.displayName}" class="btn btn-primary">Reset Password</a>
                </div>
                
                <!-- Bootstrap JS -->
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
                
                </body>
                </html>
                `
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.json({ "status": 200 });
                }
            });
        });

        application.get('/password/final/reset', async (req, res) => {
            let uuid = req.query.uuid;
            let username = req.query.username;
            let password = req.query.password;
            var canContinue = false;

            // check if uuid exists
            const code = require('../services/modules/vercodes');
            code.passwordresetcodes.forEach((id, index) => {
                if (uuid == id) {
                    canContinue = true;
                    code.passwordresetcodes.splice(index, 1);
                }
            });

            if (!canContinue) return res.json({ "status": 400, "message": "invalid uuid" });
            var user = await User.findOne({ displayName: username }).lean();
            if (!user) return res.json({ "status": 400, "message": "user doesn't exist" });

            // handle password reset here
            await User.updateOne({ displayName: username }, { password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)) });

            return res.json({"status": 200, "message": "password changed successfully"});
        });

        application.get('/password/reset', async (req, res) => {
            let uuid = req.query.uuid;
            let username = req.query.username;
            var canContinue = false;
            // check if uuid exists
            const code = require('../services/modules/vercodes');
            code.passwordresetcodes.forEach((id, index) => {
                if (uuid == id) {
                    canContinue = true;
                    //code.passwordresetcodes.splice(index, 1); // why did I put this here?
                }
            });

            if (!canContinue) return res.json({ "status": 400, "message": "invalid uuid" });

            var user = await User.findOne({ displayName: username }).lean();

            if (!user) return res.json({ "status": 400, "message": "user doesn't exist" });

            return res.send(`
            <!DOCTYPE html>
<html>
<head>
  <title>Change Password</title>
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</head>
<body>

<div class="container">
  <h1>Change Password</h1>
  
  <form>
    <div class="form-group">
      <label for="password">New Password</label>
      <input type="password" class="form-control" id="password" placeholder="Enter new password">
    </div>
    
    <button type="submit" class="btn btn-primary" onclick="changePassword()">Change Password</button>
  </form>
</div>

<!-- Bootstrap JS -->
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

<script>
function changePassword() {
  const password = document.getElementById("password").value;
  window.location.href = "/password/final/reset?uuid=${uuid}&username=${user.displayName}&password=" + password;
  alert("Password changed successfully!");
}
</script>

</body>
</html>
            `);
        });
    }

    ///forgotpassword
}

module.exports = new Password