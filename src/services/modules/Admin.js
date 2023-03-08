const mongoose = require('mongoose');
const admindata = mongoose.Schema({
   "key": {
      type: String,
      default: "yasssssss" // this is legit the only way imma grab the values
   }, 
   "playlists": {
      type: Array,
      default: []
   }
})

module.exports = mongoose.model("admin", admindata)
