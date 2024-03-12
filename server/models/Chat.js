import { model, Schema } from 'mongoose';

const chatSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: String,
  vibe: String,
  text: String,
  autoFocus: Boolean,
  readOnly: Boolean,
  mentioned_entities: [String]
});

const Chat = model('Chats', chatSchema);

export default Chat;