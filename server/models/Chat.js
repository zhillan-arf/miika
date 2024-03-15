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
  chatClass: String,
  text: String,
  autoFocus: Boolean,
  readOnly: Boolean,
  lastRecalled: Date,
  timesRecalled: Number,
  mentionedEntities: [String]
});

const Chat = model('Chats', chatSchema);

export default Chat;