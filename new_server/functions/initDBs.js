import Entity from '../models/Entity.js';
import Episode from '../models/Episode.js';
import Secretary from '../models/Secretary.js';
import User from '../models/User.js';

const initDBs = async () => {
    const models = [Entity, Episode, Secretary, User];

    for (const model of models) {
        model.createCollection();
    }
}

export default initDBs;