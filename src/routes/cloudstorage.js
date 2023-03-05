class Cloudstorage {
    constructor(){
        this.application = require("express").Router()
        this.fs = require("fs")
        this.path = require("path")
        this.files = []
        this.endpoints(this.application, this.files, this.fs, this.path)
    }
    endpoints(application, files, fs, path){
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
                        "length": fs.readFileSync(path.join(__dirname,`../services/resources/ini/${mainFiles}`)).length,
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