import { model, Schema } from 'mongoose';

const assistantSchema = new Schema({
    name: String,
    gender: { enum: ["m", "f"] },
    profpic: String,  // b64
    coreGuides: String
});

const Assistant = model('Assistant', assistantSchema, 'assistants');

export default Assistant;