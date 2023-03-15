const nodemailer = require('nodemailer');
const path = require('path');

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

class Email {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {
        application.get("/infinity/confirm/emailver", (req,res) => {
            var email = req.query.email;
            var password = req.query.password;
            var username = req.query.username;
            var uuid = req.query.uuid;
            var canContinue = false;
            const code = require('../services/modules/vercodes');
            code.verificationcodes.forEach((id, index) => {
                if(uuid == id) {
                    canContinue = true;
                    //verificationcodes.splice(index, 1);
                }
            })

            if(canContinue == false) {
                return res.json({"message": "invalid verification code"});
            }

            res.redirect(`/infinity/register?email=${email}&username=${username}&password=${password}&uuid=${uuid}&terms=on`);
        });

        application.get("/infinity/email/verify", (req, res) => {
            var email = req.query.email;
            var password = req.query.password;
            var username = req.query.username;
            var uuid = generateUUID();
            const code = require('../services/modules/vercodes');
            code.verificationcodes.push(uuid);
            console.log(code.verificationcodes);

            if(email.includes("%40")) {
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
            // setup email data
            const mailOptions = {
                from: 'no-reply@nekuzi.cf',
                to: `${email}`,
                subject: '[InfinityFN]: Verification Email!',
                html: `
                <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
      <tr>
        <td align="center">
          <img src="https://media.discordapp.net/attachments/1073761699603165305/1085276441966547045/LogoTransparent_1.png?width=1440&height=458" alt="InfinityFN Logo" width="256px">
          <br>
          <br>
          <p>Thank you for using InfinityFN as your number 1 Fortnite Private Server. Please verify your email to complete your account setup.</p>
          <br>
          <p>To verify your email, please click the button below:</p>
          <br>
          <table border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td bgcolor="#4E9CAF" align="center" style="padding: 10px 20px 10px 20px; border-radius: 5px;">
                <a href="http://infinityapi.nekuzi.cf:43614/infinity/confirm/emailver?email=${email}&username=${username}&password=${password}&uuid=${uuid}&terms=on" target="_blank" style="color: #FFFFFF; font-size: 16px; text-decoration: none;">Verify Email</a>
              </td>
            </tr>
          </table>
          <br>
          <p>If you did not create an account with InfinityFN, please ignore this email.</p>
        </td>
      </tr>
    </table>
                `
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    res.sendFile(path.join(__dirname, '../public/verifyemail.html'));
                }
            });
        });
    }
}

module.exports = new Email