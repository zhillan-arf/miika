import { model, Schema } from 'mongoose';

const chatSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  vibe: String,
  role: String,
  chat: String,
  mentioned_entities: [String]
}, { timestamps: true });

const Chat = model('Chats', chatSchema);

export default Chat;