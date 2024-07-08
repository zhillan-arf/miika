import Episode from '../../models/Episode.js';
import Assistant from '../../models/Assistant.js';
import User from '../../models/User.js';
import Guide from '../../models/Guide.js';
import initAssistants from './initAssistants.js';

const initDBs = async () => {
    const models = [Episode, Assistant, User, Guide];

    for (const model of models) {
        try {
            await model.createCollection();
        } catch (err) {
            if (err.code === 48) {
                console.error(`${model.modelName} already instantiated.`);
            } else throw err;
        }
    }
    
    await initAssistants();
}

export default initDBs;