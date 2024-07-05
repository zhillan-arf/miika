import { model, Schema } from 'mongoose';

const episodeSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ["chat", "guide", "monologue", "convos", "dailys" ] },
  date: { type: Date, default: Date.now },
  data: [{
    role: { type: String },
    content: { type: String }
  }],
  summary: String,
  embedding: [Number]
});

const Episode = model('Episode', episodeSchema, 'episodes');

export default Episode;