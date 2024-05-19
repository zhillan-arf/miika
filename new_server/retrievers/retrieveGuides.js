import embed from "../embeds/embed";
import cossim from "./cossim";
import toText from "../functions/toText";

const retrieveGuides = async (guides, hypoInfos) => {
    const embeddings = guides.map(episode => episode.embedding);
    const infosEmbedding = await embed(hypoInfos);
    const threshold = 0.75;
    
    const indexes = await cossim(embeddings, infosEmbedding, threshold);
    const newGuides = await guides.filter((elmt, idx) => indexes.includes(idx));
    
    return toText(newGuides);
}

export default retrieveGuides;