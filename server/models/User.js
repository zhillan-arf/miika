import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, require: true },
  hash: { type: String, require: true },
  asID: { type: Schema.Types.ObjectId, ref: 'Assistant' },
  name: String,
  gender: { enum: ["m", "f"] },
  profpic: String,  // b64
  asIntent: [{
    role: { type: String },
    content: { type: String }
  }]
});

const User = model('User', userSchema, 'users');

export default User;