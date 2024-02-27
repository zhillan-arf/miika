import { model, Schema } from 'mongoose';

const logkeeperSchema = new Schema({
    name : String,
    gender : Boolean,
    profpic : Buffer,
    profile : String,
    chat_examples : String
});

const Logkeeper = model('Logkeepers', logkeeperSchema)

export default Logkeeper;