import Entity from '../models/Entity.js';
import Episode from '../models/Episode.js';
import Assistant from '../models/Assistant.js';
import User from '../models/User.js';

const initDBs = async () => {
    const models = [Entity, Episode, Assistant, User];

    for (const model of models) {
        model.createCollection();
    }
}

export default initDBs;