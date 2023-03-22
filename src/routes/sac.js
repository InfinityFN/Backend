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

      requests.push({ code: req.query['creator-code'], username: req.query.username, social: req.query['social-url'], password: req.query.password, email: req.query.email, birthdate: req.query.birthdate });
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

    application.get('/sac/json', async (req,res) => {
      var key = req.query.key;
      if(key != "ASDJKASDKJ29382sjhKJSHJKD281yasKJSj") return res.json({message: "invalid api key"});

      return res.json(require('../services/resources/json/sac.json'))
    });

    application.get('/supportacreator/payout', async (req, res) => {
      let code = req.query.code;
      let password = req.query.password;
      var codeindex = -1;
      var points = 0;
      var username = "";
      var a = false;
      // TODO: make custom popup to choose who to send it too! & custom amounts

      const codes = require('../services/resources/json/sac.json');

      codes.forEach(async (sac, index) => {
        if (code == sac.id && password == sac.password) {
          a = true;
          codeindex = index;
          points = sac.points;
          username = sac.username;
        }
      });

      if(a == false) return res.json({message: "code doesn't exist"});
      if(points == 0) return res.json({message: "you have 0 points to spend"});
      if(codeindex == -1) return res.json({message: "index error!"});
      if(username == "") return res.json({message: "there was no account linked to your sac, please contact ctrlkohl for more details"});

      const conversion = require('../services/modules/vercodes');

      // get conversion amount
      console.log('point: ' + points);
      var vbucks = await conversion.convertPointsToVbucks(points);
      console.log('v: ' + vbucks);
      if(vbucks == 0) return res.json({message: "you are gonna get no vbucks for this"});

      // get user
      const user = await User.findOne({ displayName: username }).lean();
      if(!user) return req.json({message: "user no longer exists."});

      // get vbucks and add ontop of it
      var toGive = user.profile.vbucks + parseInt(vbucks);

      // grant user the vbucks
      await User.updateOne({ displayName: username }, { "profile.vbucks": parseInt(toGive) });

      // set properties
      codes[codeindex].points = 0;
      
      fs.writeFileSync(path.join(__dirname, '../services/resources/json/sac.json'), JSON.stringify(codes, null, 2));

      return res.json({message: "vbucks successfully deposited to your account! have a great day :)"});
    });

    application.get('/supportacreator/dashboard', (req, res) => {
      let code = req.query['sac-code'];
      let password = req.query['unique-password'];
      const codes = require('../services/resources/json/sac.json');
      let points = 0;
      let a = false; // CONTINUE

      codes.forEach(sac => {
        if (code == sac.id && password == sac.password) {
          a = true;
          points = sac.points;
        }
      });

      if (!a) return res.json({ message: "Invalid SAC or Password" });

      return res.send(`
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Infinity Support a Creator Dashboard</title>
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.1/css/bootstrap.min.css">
  <!-- Custom CSS -->
  <style>
    body {
      background-color: #222;
      color: #fff;
      font-family: sans-serif;
    }
    .container {
      margin-top: 50px;
    }
    .modal-body {
      color: #000;
    }
  </style>
</head>
<body>
<div class="alert alert-danger" role="alert">
  <strong>Warning!</strong> This dashboard is currently under heavy construction. Please check back later for updates.
</div>
  <div class="container text-center">
    <h1>Welcome, <span id="code">${code}</span></h1>
    <h2>Points: <span id="points">${points}</span></h2>
    <button class="btn btn-primary" onclick="redirectToPayout()" id="payout-btn">Payout now</button>
    <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#settings-modal">Settings</button>
  </div>
   <!-- Settings Modal -->
  <div class="modal fade" id="settings-modal" tabindex="-1" aria-labelledby="settings-modal-label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="settings-modal-label">Settings</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <ul>
            <li><a href="#">Delete Account</a></li>
            <li><a href="#">Payout to other user</a></li>
            <li><a href="#">Request name change</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap JS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.1/js/bootstrap.bundle.min.js"></script>
  <!-- Custom JS -->
  <script>

  function redirectToPayout() {
    window.location.href = "/supportacreator/payout?password=${password}&code=${code}";
  }
  </script>
</body>
</html>
      `);
    });

    application.get('/supportacreator/login', (req, res) => {
      return res.send(`
          <!DOCTYPE html>
<html>
<head>
	<title>Login Page</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
	<style>
		body {
			background-color: #333333;
		}

		.form-login {
			background-color: #444444;
			padding: 20px;
			margin-top: 50px;
			border-radius: 10px;
			box-shadow: 0px 0px 10px 0px #000000;
			color: #ffffff;
		}

		.form-login input[type=text],
		.form-login input[type=password] {
			background-color: #555555;
			border: none;
			border-radius: 5px;
			color: #ffffff;
			margin-bottom: 20px;
			padding: 10px;
			width: 100%;
		}

		.form-login input[type=submit] {
			background-color: #007bff;
			border: none;
			border-radius: 5px;
			color: #ffffff;
			padding: 10px;
			width: 100%;
		}

		.logo {
			margin-bottom: 20px;
			text-align: center;
		}

		.logo img {
			width: 150px;
			height: auto;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-md-4 offset-md-4">
				<div class="form-login">
					<div class="logo">
						<img src="https://media.discordapp.net/attachments/1087581043218989089/1087927555262255244/Logov2_1.png?width=1440&height=283" alt="Your Logo" width="512px">
					</div>
					<form method="get" action="/supportacreator/dashboard">
						<label for="sac-code">SAC Code</label>
						<input type="text" id="sac-code" name="sac-code" required>

						<label for="unique-password">Unique Password</label>
						<input type="password" id="unique-password" name="unique-password" required>

						<input type="submit" value="Log In">
					</form>
				</div>
			</div>
		</div>
	</div>
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