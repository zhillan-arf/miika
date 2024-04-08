import { model, Schema } from 'mongoose';

const secretarySchema = new Schema({
    name: String,
    gender: Boolean,
    profpic: Buffer,
    lore: String,
    chatExamples: String,
    protocol: String
});

const Secretary = model('Secretaries', secretarySchema)

export default Secretary;