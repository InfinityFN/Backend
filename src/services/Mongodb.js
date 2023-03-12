const mongoose = require('mongoose');

class MongoDB {
    Connect(mongodb, logger){

        mongoose.connect(mongodb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        }).then(() => {
            logger.log("[Mongoose] Connected")
        }).catch((err) => {
            logger.error(`[Mongoose] Failed -> ${err}`)
        })
    }
}

module.exports.MongoDB = new MongoDB;