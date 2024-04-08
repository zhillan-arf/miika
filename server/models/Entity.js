import { model, Schema } from 'mongoose';

const entitySchema = new Schema({
    userID : {
        type: Schema.Type.ObjectID,
        ref: 'User'
    },
    entityName: String,
    description: String
});

const Entity = model('Entities', entitySchema);

export default Entity;