import embed from "../embeds/embed";
import cossim from "./cossim";
import toText from "../functions/toText";

const retrieveEpisodes = async (episodes, hypoInfos) => {
    const embeddings = episodes.map(eps => eps.embedding);
    const infosEmbedding = await embed(hypoInfos);
    const threshold = 0.75;
    
    const indexes = await cossim(embeddings, infosEmbedding, threshold);
    const newEpisodes = await guides.filter((elmt, idx) => indexes.includes(idx));
    
    return toText(newEpisodes);
}

export default retrieveEpisodes;