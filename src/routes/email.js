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
                    //code.verificationcodes.splice(index, 1);
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
                <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>InfinityFN Email Verification</title>
</head>
<body style="font-family: sans-serif; margin: 0; padding: 0;">
  <table style="width: 100%; background-color: #f5f5f5;">
    <tr>
      <td style="text-align: center; padding: 20px;">
        <img src="https://media.discordapp.net/attachments/1073761699603165305/1085276441966547045/LogoTransparent_1.png?width=1440&height=458" alt="InfinityFN Logo" style="height: auto; width: 256px;">
        <h1 style="font-size: 24px; margin-top: 20px;">Verify Your Email Address</h1>
        <p style="font-size: 16px; margin-top: 20px;">Thank you for choosing InfinityFN as your Fortnite Private Server. To complete your account setup, please verify your email address by clicking the button below:</p>
        <a href="http://infinityapi.nekuzi.cf:43614/infinity/confirm/emailver?email=${email}&username=${username}&password=${password}&uuid=${uuid}&terms=on" style="display: block; text-align: center; background-color: #007bff; color: #fff; font-size: 16px; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 5px; margin-top: 20px;">Verify Email Address</a>
        <p style="font-size: 16px; margin-top: 20px;">Having issues? copy this url and paste it in your browser: http://infinityapi.nekuzi.cf:43614/infinity/confirm/emailver?email=${email}&username=${username}&password=${password}&uuid=${uuid}&terms=on</p>
        <p style="font-size: 16px; margin-top: 20px;">If you did not create an account with InfinityFN, please ignore this email.</p>
      </td>
    </tr>
  </table>
</body>
</html>`
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