const mongoose = require('mongoose');

const gameServerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    playerCount: {
        type: Number,
        required: true
    },
    online: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('gameservers', gameServerSchema);

//module.exports = GameServer;