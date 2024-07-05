import encode from "../encoders/encode.js";
import Episode from "../models/Episode.js";

const saveNewEp = async (ep) => {
    if (ep.embedding) return;

    let text = '';
    ep.data.forEach(datum => {
        text += datum.content;
    })

    const summary = await inferSummary(text);
    
    const embedding = await JSON.parse(encode(text));
    
    const newEp = {
        ...ep,
        summary: summary,
        embedding: embedding
    }

    Episode.create(newEp);
}

export default saveNewEp;