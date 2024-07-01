import { model, Schema } from 'mongoose';

const entitySchema = new Schema({
    userID : { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    description: String
});

const Entity = model('Entity', entitySchema, 'entities');

export default Entity;