import { model, Schema } from 'mongoose';

const secretarySchema = new Schema({
    name : String,
    gender : Boolean,
    profpic : Buffer,
    profile : String,
    chat_examples : String
});

const Secretary = model('Secretaries', secretarySchema)

export default Secretary;