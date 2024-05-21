import embed from "../embeds/embed";
import cossim from "./cossim";
import toText from "../functions/toText";
import rerank from "./rerank";

const retrieveGuides = async (guides, query, hypoInfos) => {
    const embeddings = guides.map(episode => episode.embedding);
    const infosEmbedding = await embed(hypoInfos);
    const minCosSim = 0.75;  // temp
    
    const cossimGuides = await cossim(guides, embeddings, infosEmbedding, minCosSim);
    const rerankedGuides = await rerank(query, cossimGuides);
    
    return toText(rerankedGuides);
}

export default retrieveGuides;