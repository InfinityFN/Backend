const User = require('../services/modules/User');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
//const path = require('path');

function isUnder13(birthdate) {
    const today = new Date();
    const birthdateObj = new Date(birthdate);
    const diffInMilliseconds = today.getTime() - birthdateObj.getTime();
    const ageDate = new Date(diffInMilliseconds);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age < 13;
}

function containsSwearWords(str) {
    const swearWords = ['discord.gg', '.gg', 'nigger', 'nigga', 'penis', 'vagina', 'bitch', 'whore', 'slut', 'cum dumpster', 'cunt', 'fuck', 'shit', 'hitler', 'skid']; // Add your list of swear words here
    for (let i = 0; i < swearWords.length; i++) {
        if (str.toLowerCase().includes(swearWords[i].toLowerCase())) {
            return true;
        }
    }
    return false;
}


class SAC {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {

        application.get('/apply/sac', (req, res) => {
            /*
            {
  email: 'a@gmail.com',
  'social-url': 'b',
  username: 'c',
  'creator-code': 'd',
  password: 'e',
  birthdate: '2023-03-30',
  terms: 'on'
}
            */

            if (req.query.terms != 'on') return res.json({ "message": "You have not accepted our terms of service, please make sure to click the I agree button aswell!" });
            if (isUnder13(req.query.birthdate)) return res.json({ "message": "You must be 13 years or older to apply for a Infinity Support a Creator" });
            if (containsSwearWords(req.query['creator-code'])) return res.json({ "message": "Please do not include profanity in your creator code" });
            if (req.query.password == "" || req.query.password == undefined) return res.json({ "message": "The password field is empty!" });

            const requests = require('../services/resources/json/sacrequests.json');

            requests.push({code: req.query['creator-code'], username: req.query.username, social: req.query['social-url'], password: req.query.password, email: req.query.email, birthdate: req.query.birthdate});
            fs.writeFileSync(path.join(__dirname, '../services/resources/json/sacrequests.json'), JSON.stringify(requests, null, 2));
            console.log('new sac request!');

            return res.send(`<!DOCTYPE html>
            <html>
              <head>
                <title>Thank You for Applying!</title>
                <!-- Bootstrap CSS -->
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                <style>
            body {
              margin: 0;
              padding: 0;
            }
            
            #background {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
              z-index: -1;
            }
            
            .shape {
              position: absolute;
              width: 50px;
              height: 50px;
              background-color: rgba(255, 255, 255, 0.2);
              animation: fall 5s infinite linear;
              transform: translate(-50%, -50%);
            }
            
            @keyframes fall {
              0% {
                top: -10%;
                opacity: 1;
              }
              100% {
                top: 110%;
                opacity: 0;
              }
            }
            
            .container {
              position: relative; /* add this line */
              z-index: 1; /* add this line */
            }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="row">
                    <div class="col-md-12 text-center">
                      <h1 class="mb-4">Thank You for Applying!</h1>
                      <p class="lead">We appreciate your interest in becoming a creator for the Infinity Community.</p>
                    </div>
                  </div>
                </div>
                <!-- Background -->
                <div id="background">
                  <div class="shape"></div>
                  <div class="shape"></div>
                  <div class="shape"></div>
                  <div class="shape"></div>
                  <div class="shape"></div>
                  <div class="shape"></div>
                  <div class="shape"></div>
                  <div class="shape"></div>
                  <div class="shape"></div>
                  <div class="shape"></div>
                  <div class="shape"></div>
                </div>
                <!-- Bootstrap JS -->
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
                <script>
                  // Generate shapes
            for (var i = 0; i < 30; i++) {
              var shape = document.createElement("div");
              shape.className = "shape";
              shape.style.left = Math.random() * 100 + "%";
              shape.style.animationDelay = Math.random() * 5 + "s";
              document.getElementById("background").appendChild(shape);
            }
                </script>
              </body>
            </html>
            `);
        });

        application.get('/supportacreator', (req, res) => {
            return res.sendFile(path.join(__dirname, '../public/sac/index.html'));
        });

        application.get('/sac/config', (req, res) => {
            return res.json({ isaccepting: true });
        });
        application.get("/affiliate/api/public/affiliates/slug/:slug", async (req, res) => {
            const creators = require('../services/resources/json/sac.json');
            creators.forEach(async (creator) => {
                if (req.params.slug == creator.id) {
                    // coded in notepad :ik:
                    console.log(req.headers.cookie);
                    var Account = User.findOne({ "displayName": req.headers.cookie.split('=')[1] });

                    console.log(Account);

                    if (Account) {
                        //Account.updateOne({ $set: { "profile.mtx_affiliate": creator }});
                        await Account.updateOne(
                            { displayName: req.headers.cookie.split('=')[1] },
                            {
                                "profile.mtx_affiliate": creator.id,
                                "profile.mtx_affiliate_set_time": new Date().toISOString()
                            }
                        );
                        //await Account.updateOne({ displayName: req.headers.cookie.split('=')[1] }, { "profile.mtx_affiliate": creator });
                        //await Account.updateOne({ displayName: req.headers.cookie.split('=')[1] }, { "profile.mtx_affiliate_set_time": new Date().toISOString() });
                        return res.json({ "id": creator.id, "slug": creator.id, "displayName": creator.id, "status": "ACTIVE", "verified": false });

                    } else {
                        //res.json({});
                    }
                }
            });
            //res.json({});
        });
    }
}

module.exports = new SAC;


// OLD
/*class SAC { 
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {
        application.get("/affiliate/api/public/affiliates/slug/:slug", async (req,res) => {
            const creators = require('../services/resources/json/sac.json');
            console.log(req.body);
            console.log(req.headers);
            creators.forEach(creator => {
                if(req.params.slug == creator) {
                    return res.json({"id": creator, "slug": creator, "displayName": creator, "status": "ACTIVE", "verified": false});
                }
            });
            //res.json({});
        });
    }
}

module.exports = new SAC;*/