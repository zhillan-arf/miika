const mongoose = require('mongoose');

const Chat = mongoose.model('Chats', new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp : Date,
    last_access: Date,
    vibe: String,
    role: String,
    chat: String,
    mentioned_entities: [String]
}))

module.exports = mongoose.model('Chat', chatSchema);