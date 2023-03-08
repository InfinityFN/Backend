const mongoose = require('mongoose');
const data101 = mongoose.Schema({
   "playlists": {
      type: Array,
      default: []
   }
})

module.exports = mongoose.model("playlists", data101
