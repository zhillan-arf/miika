import embed from "../embeds/embed";
import cossim from "./cossim";
import toText from "../functions/toText";

const retrieveGuides = async (guides, hypoInfos) => {
    const embeddings = guides.map(episode => episode.embedding);
    const infosEmbedding = await embed(hypoInfos);
    const minCosSim = 0.75;  // temp
    
    const contextGuides = await cossim(guides, embeddings, infosEmbedding, minCosSim);
    
    return toText(contextGuides);
}

export default retrieveGuides;