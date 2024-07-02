import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, require: true },
  hash: { type: String, require: true },
  assistantID: { type: Schema.Types.ObjectId, ref: 'Assistant' },
  name: String,
  gender: { enum: ["m", "f"] },
  profpic: String,  // b64
  profile: String,
  asIntent: String
});

const User = model('User', userSchema, 'users');

export default User;