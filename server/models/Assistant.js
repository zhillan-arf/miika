import { model, Schema } from 'mongoose';

const assistantSchema = new Schema({
    name: String,
    gender: { type: String, enum: ["m", "f"] },
    profpic: String,  // b64
});

const Assistant = model('Assistant', assistantSchema, 'assistants');

export default Assistant;