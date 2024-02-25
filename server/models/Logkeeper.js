const mongoose = require('mongoose');

const Logkeeper = mongoose.model('Logkeepers', new mongoose.Schema({
    name : String,
    gender : Boolean,
    profpic : Buffer,
    profile : String,
    chat_examples : String
}))

module.exports = mongoose.model('Logkeeper', logkeeperSchema);