import embed from "../embeds/embed.js";
import cossim from "./cossim.js";
import toText from "../functions/toText.js";
import rerank from "./rerank.js";

const retrieveGuides = async (guides, query, hypoInfos) => {
    const embeddings = guides.map(episode => episode.embedding);
    const infosEmbedding = await embed(hypoInfos);
    const minCosSim = 0.75;  // temp
    
    const cossimGuides = await cossim(guides, embeddings, infosEmbedding, minCosSim);
    const rerankedGuides = await rerank(query, cossimGuides);
    
    return toText(rerankedGuides);
}

export default retrieveGuides;