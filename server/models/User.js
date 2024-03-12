import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    require: true
  },
  hash: {
    type: String,
    require: true
  },
  name: String,
  profpic: Buffer,
  gender: Boolean,
  profile: String,
  personality: String,
  logkeeperID: {
    type: Schema.Types.ObjectId,
    ref: 'Secretary'
  }
});

const User = model('User', userSchema, 'users');

export default User;