import { model, Schema } from 'mongoose';

const secretarySchema = new Schema({
    name: String,
    gender: { enum: ["m", "f"] },
    profpic: String,  // b64
    coreGuides: String
});

const Secretary = model('Secretary', secretarySchema, 'secretaries');

export default Secretary;