const bcrypt = require("bcrypt");
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const jwt = require("jsonwebtoken");

function getRawBody(req, res, next) {
    //const config = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "Config", "config.json")).toString());

    //if (!config.clientsettings.SaveFortniteSettings) return next();

    if (req.headers["content-length"]) {
        if (Number(req.headers["content-length"]) > 1000000) return res.status(403).json({ "error": "File size must be less than 1MB." });
    }

    // Get raw body in encoding latin1 for ClientSettings
    req.rawBody = "";
    req.setEncoding("latin1");

    req.on("data", (chunk) => req.rawBody += chunk);
    req.on("end", () => next());
}

class Cloudstorage {
    constructor() {
        this.application = require("express").Router()
        this.fs = require("fs")
        this.path = require("path")
        this.files = []
        this.endpoints(this.application, this.files, this.fs, this.path)
    }
    endpoints(application, files, fs, path) {
        // USER
        application.get("/fortnite/api/cloudstorage/user/:accountId/:file", async (req, res) => {
            //const config = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "Config", "config.json")).toString());
        
           // if (!config.clientsettings.SaveFortniteSettings) return res.status(200).end();
        
            if (!fs.existsSync(path.join(__dirname, "..", "ClientSettings", req.params.accountId))) {
                fs.mkdirSync(path.join(__dirname, "..", "ClientSettings", req.params.accountId));
            }
        
            if (req.params.file.toLowerCase() != "clientsettings.sav") return res.status(404).json({ "error": "file not found" });
            res.type("application/octet-stream");
        
            const memory = require('../services/modules/version').GetVersionInfo(req);
        
            if (memory.CL.length > 8) return res.status(403).json({ "error": "Build CL must be 8 figures or less."});
        
            let file = path.join(__dirname, "..", "ClientSettings", req.params.accountId, `ClientSettings-${memory.CL}.Sav`);
        
            if (fs.existsSync(file)) {
                const ParsedFile = fs.readFileSync(file);
        
                return res.status(200).send(ParsedFile).end();
            } else {
                res.status(200);
                res.end();
            }
        });

        application.put("/fortnite/api/cloudstorage/user/:accountId/:file", getRawBody, async (req, res) => {
            //const config = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "Config", "config.json")).toString());
        
            //if (!config.clientsettings.SaveFortniteSettings) return res.status(204).end();
        
            if (Buffer.byteLength(req.rawBody) > 1000000) return res.status(403).json({ "error": "File size must be less than 1MB." });
        
            if (!fs.existsSync(path.join(__dirname, "..", "ClientSettings", req.params.accountId))) {
                fs.mkdirSync(path.join(__dirname, "..", "ClientSettings", req.params.accountId));
            }
        
            if (req.params.file.toLowerCase() != "clientsettings.sav") return res.status(404).json({ "error": "file not found" });
        
            const memory = require('../services/modules/version').GetVersionInfo(req);
        
            if (memory.CL.length > 8) return res.status(403).json({ "error": "Build CL must be 8 figures or less."});
        
            let file = path.join(__dirname, "..", "ClientSettings", req.params.accountId, `ClientSettings-${memory.CL}.Sav`);
        
            fs.writeFileSync(file, req.rawBody, 'latin1');
            res.status(204).end();
        });

        application.get("/fortnite/api/cloudstorage/user/:accountId", async (req, res) => {
            //const config = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "Config", "config.json")).toString());
        
            //if (!config.clientsettings.SaveFortniteSettings) return res.json([]);
        
            if (!fs.existsSync(path.join(__dirname, "..", "ClientSettings", req.params.accountId))) {
                fs.mkdirSync(path.join(__dirname, "..", "ClientSettings", req.params.accountId));
            }
        
            const memory = require('../services/modules/version').GetVersionInfo(req);
        
            if (memory.CL.length > 8) return res.status(403).json({ "error": "Build CL must be 8 figures or less."});
            
            let file = path.join(__dirname, "..", "ClientSettings", req.params.accountId, `ClientSettings-${memory.CL}.Sav`);
        
            if (fs.existsSync(file)) {
                const ParsedFile = fs.readFileSync(file, 'latin1');
                const ParsedStats = fs.statSync(file);
        
                return res.json([{
                    "uniqueFilename": "ClientSettings.Sav",
                    "filename": "ClientSettings.Sav",
                    "hash": crypto.createHash('sha1').update(ParsedFile).digest('hex'),
                    "hash256": crypto.createHash('sha256').update(ParsedFile).digest('hex'),
                    "length": Buffer.byteLength(ParsedFile),
                    "contentType": "application/octet-stream",
                    "uploaded": ParsedStats.mtime,
                    "storageType": "S3",
                    "storageIds": {},
                    "accountId": req.params.accountId,
                    "doNotCache": false
                }]);
            } else {
                return res.json([]);
            }
        });

        // GLOBAL
        application.get("/fortnite/api/cloudstorage/system", (req, res) => {
            this.files = []
            res.setHeader('content-type', 'application/json');
            fs.readdirSync(path.join(__dirname, `../services/resources/ini`)).filter(async function (mainFiles) {
                if (mainFiles.endsWith(".ini")) {
                    files.push({
                        "uniqueFilename": mainFiles,
                        "filename": mainFiles,
                        "hash": "603E6907398C7E74E25C0AE8EC3A03FFAC7C9BB4",
                        "hash256": "973124FFC4A03E66D6A4458E587D5D6146F71FC57F359C8D516E0B12A50AB0D9",
                        "length": fs.readFileSync(path.join(__dirname, `../services/resources/ini/${mainFiles}`)).length,
                        "contentType": "text/plain",
                        "uploaded": "9999-9999-9999",
                        "storageType": "S3",
                        "doNotCache": false
                    })
                }
            })
            res.json(files).status(200);
        })

        application.all("/fortnite/api/cloudstorage/system/:file", (req, res) => {
            const file = req.params.file;
            try {
                res.sendFile(path.join(__dirname, `../services/resources/ini/${file}`));
                res.status(200);
            } catch (err) {
                console.log(err);
                res.status(200);
            }
        })
    }
}
module.exports = new Cloudstorage