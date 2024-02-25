const mongoose = require('mongoose');

const User = mongoose.model('Users', new mongoose.Schema({
    username : String,
    hash_password : String,
    name : String,
    profpic : Buffer,
    gender : Boolean,
    profile : String,
    personality : String,
    logkeeper : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Logkeeper'
    }
}));

module.exports = mongoose.model('User', userSchema);