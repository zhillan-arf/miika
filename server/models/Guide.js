import { model, Schema } from "mongoose";

const guideSchema = new Schema({
    asID:{ type: Schema.Types.ObjectId, ref: 'Assistant' },
    type: { type: String, enum: ['core', 'context']},
    data: [{
        role: { type: String, default: 'assistant' },
        content: { type: String }
    }],
    summary: { type: String, default: null },
    embedding: { type: [Number], default: null }
});

const Guide = model('Guide', guideSchema, 'guides');

export default Guide;