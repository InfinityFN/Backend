const User = require("../services/modules/User")

class Oauth {
    constructor() {
        this.application = require("express").Router()
        this.bcrypt = require("bcrypt")
        this.accountid = ""
        this.token = ""
        this.displayName = ""
        this.access_token = ""
        this.grantType = ""
        this.endpoints(this.application)
    }
    endpoints(application) {

        // At Somepoint need to make this more secure
        application.get("/account/api/oauth/verify", (req, res) => {
            // find displayname
            this.accountid = "4235345643fdsg"
            this.token = "4235345643fdsg"
            res.json({
                "token": this.token,
                "session_id": "3c3662bcc661d6de659c636744c66b62",
                "token_type": "bearer",
                "client_id": "ec684b8c687f479fadea3cb2ad83f5c6",
                "internal_client": true,
                "client_service": "fortnite",
                "account_id": this.accountid,
                "expires_in": 28800,
                "expires_at": "9999-12-02T01:12:01.100Z",
                "auth_method": "exchange_code",
                "display_name": req.displayname,
                "app": "fortnite",
                "in_app_id": "sfsdsdgfdsghdsgdsfgsdgsdg",
                "device_id": "5dcab5dbe86a7344b061ba57cdb33c4f"
            }).status(204).end()
        })

        this.application.all("/account/api/oauth/token", async (req, res) => {

            try{
                var displayName = req.body.username
                var accountid = ""
                this.access_token = ""
                this.grantType = req.body.grant_type

                console.log("grant type: " + this.grantType);
    
               // console.log(this.grantType)
                if (this.grantType == "password") {
                    console.log('Checking password')
                    try {
                        
                        var UsernameCheck = await User.findOne({ email: req.body.username }).lean();
                       // console.log("sd!")
                      //  console.log(UsernameCheck)
                     //   console.log(req.body.username)
                        if (UsernameCheck) {
                            if (this.bcrypt.compareSync(req.body.password, UsernameCheck.password)) {
                                displayName = UsernameCheck.displayName
                                accountid = UsernameCheck.id
                                console.log(accountid);
                                console.log("Checked!")
                            }
                        }else{
                            console.log("failed")
                            return res.status(400).json({
                                "errorCode": "errors.com.epicgames.account_token.not_found",
                                "message": "The Account Isn't Found on our data base."
                            })
                        }
                    } catch (err) {
                        console.log(err)
                        return res.status(400).json({
                            "errorCode": "errors.com.epicgames.account_token.not_found",
                            "message": "The Account Isn't Found on our data base."
                        })
                    }
                }
    
                if(this.grantType == "client_credentials"){
                    displayName = undefined
                    accountid = undefined
                }
    
                if (this.grantType == "exchange_code") {
                    displayName = req.body.exchange_code;
                    accountid = req.body.exchange_code
                }
    
              //  console.log(displayName, accountid, "TEST")
                // need real token..
                console.log({ "access_token": displayName + "NEEDD",
                "expires_in": 28800,
                "expires_at": "9999-12-31T23:59:59.999Z",
                "token_type": "bearer",
                "account_id": accountid,
                "client_id": "ec684b8c687f479fadea3cb2ad83f5c6",
                "internal_client": true,
                "client_service": "fortnite",
                "refresh_token": "eyJ0IjoiZXBpY19pZCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiV01TN0Vua0lHcGNIOURHWnN2MldjWTl4c3VGblpDdHhaamo0QWhiLV84RSJ9.eyJzdWIiOiJlMjE0ODYyMjgzMjA0YjE5OTcyODU3ZjU2MGJhZDhlMCIsInBmc2lkIjoiZm4iLCJpc3MiOiJodHRwczpcL1wvYXBpLmVwaWNnYW1lcy5kZXZcL2VwaWNcL29hdXRoXC92MSIsImRuIjoiUyDOlCBNIFUiLCJwZnBpZCI6InByb2QtZm4iLCJhdWQiOiJlYzY4NGI4YzY4N2Y0NzlmYWRlYTNjYjJhZDgzZjVjNiIsInBmZGlkIjoiNjJhOTQ3M2EyZGNhNDZiMjljY2YxNzU3N2ZjZjQyZDciLCJ0IjoiZXBpY19pZCIsImFwcGlkIjoiZmdoaTQ1NjdGTkZCS0Z6M0U0VFJPYjBibVBTOGgxR1ciLCJzY29wZSI6ImJhc2ljX3Byb2ZpbGUgZnJpZW5kc19saXN0IG9wZW5pZCBwcmVzZW5jZSIsImV4cCI6MTY2ODU1NjkzOSwiaWF0IjoxNjY4NTI4MTM5LCJqdGkiOiI1YzI1ODVkZDZmYzE0MTQ3ODRhNmJjNzM1MDg1YjJjMiJ9.k6n-oFrrQF2x5eNn1BWO7-buauGWSlCcDnc6m-p_-1KK2WZv1cjSFQbfdC3rPPKtABGhfyvy7TNkgZGmCr7W4Kh2PgXT_zJMnRIZ49ibZqKzsCcg-AU3MrNgPz4lqfwwi7uU5oLc6LdgXym2KUADLYygMQn0tM5oYJHGM2FzHhFvgdjigdFIxp94wNG7DiWKpYHB5XkvOJfcctF20RtCufuy9VswvmIXSe443RvWJFsfO0pZZ4vlxbz3FUV9b3Dc-0UQRdg-RaSMLebT7GoaQL7uajYglXEL6WEYQEJccopitAJtjqAvr_5F-7w2fbVyBLWD4xByTcAzLa3KGrWrLQ",
                "refresh_expires": 115200,
                "refresh_expires_at": "9999-12-31T23:59:59.999Z",
                "displayName": displayName,
                "app": "fortnite",
                "in_app_id": "sfsdsdgfdsghdsgdsfgsdgsdg",
                "device_id": "5dcab5dbe86a7344b061ba57cdb33c4f"})
                res.json({
                    "access_token": displayName + "NEEDD",
                    "expires_in": 28800,
                    "expires_at": "9999-12-31T23:59:59.999Z",
                    "token_type": "bearer",
                    "account_id": accountid,
                    "client_id": "ec684b8c687f479fadea3cb2ad83f5c6",
                    "internal_client": true,
                    "client_service": "fortnite",
                    "refresh_token": "eyJ0IjoiZXBpY19pZCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiV01TN0Vua0lHcGNIOURHWnN2MldjWTl4c3VGblpDdHhaamo0QWhiLV84RSJ9.eyJzdWIiOiJlMjE0ODYyMjgzMjA0YjE5OTcyODU3ZjU2MGJhZDhlMCIsInBmc2lkIjoiZm4iLCJpc3MiOiJodHRwczpcL1wvYXBpLmVwaWNnYW1lcy5kZXZcL2VwaWNcL29hdXRoXC92MSIsImRuIjoiUyDOlCBNIFUiLCJwZnBpZCI6InByb2QtZm4iLCJhdWQiOiJlYzY4NGI4YzY4N2Y0NzlmYWRlYTNjYjJhZDgzZjVjNiIsInBmZGlkIjoiNjJhOTQ3M2EyZGNhNDZiMjljY2YxNzU3N2ZjZjQyZDciLCJ0IjoiZXBpY19pZCIsImFwcGlkIjoiZmdoaTQ1NjdGTkZCS0Z6M0U0VFJPYjBibVBTOGgxR1ciLCJzY29wZSI6ImJhc2ljX3Byb2ZpbGUgZnJpZW5kc19saXN0IG9wZW5pZCBwcmVzZW5jZSIsImV4cCI6MTY2ODU1NjkzOSwiaWF0IjoxNjY4NTI4MTM5LCJqdGkiOiI1YzI1ODVkZDZmYzE0MTQ3ODRhNmJjNzM1MDg1YjJjMiJ9.k6n-oFrrQF2x5eNn1BWO7-buauGWSlCcDnc6m-p_-1KK2WZv1cjSFQbfdC3rPPKtABGhfyvy7TNkgZGmCr7W4Kh2PgXT_zJMnRIZ49ibZqKzsCcg-AU3MrNgPz4lqfwwi7uU5oLc6LdgXym2KUADLYygMQn0tM5oYJHGM2FzHhFvgdjigdFIxp94wNG7DiWKpYHB5XkvOJfcctF20RtCufuy9VswvmIXSe443RvWJFsfO0pZZ4vlxbz3FUV9b3Dc-0UQRdg-RaSMLebT7GoaQL7uajYglXEL6WEYQEJccopitAJtjqAvr_5F-7w2fbVyBLWD4xByTcAzLa3KGrWrLQ",
                    "refresh_expires": 115200,
                    "refresh_expires_at": "9999-12-31T23:59:59.999Z",
                    "displayName": displayName,
                    "app": "fortnite",
                    "in_app_id": "sfsdsdgfdsghdsgdsfgsdgsdg",
                    "device_id": "5dcab5dbe86a7344b061ba57cdb33c4f"
                 });
            }
            catch (err){
                console.log(err)
                res.json({"error": "sad"})
            }
        })

        application.delete("/account/api/oauth/sessions/kill/*", (req, res) => {
            res.status(204).end()
        });
        application.delete("/account/api/oauth/sessions/kill", (req, res) => res.status(204).end())
    }
}


module.exports = new Oauth