import embed from "../embeds/embed";
import cossim from "./cossim";
import toText from "../functions/toText";
import rerank from "./rerank";
import curve from "./curve";

const retrieveEpisodes = async (episodes, query, hypoInfos) => {
    const embeddings = episodes.map(eps => eps.embedding);
    const infosEmbedding = await embed(hypoInfos);
    const minCossim = 0.6;  // temp
    
    const cossimEpisodes = await cossim(episodes, embeddings, infosEmbedding, minCossim);
    const curvedEpisodes = await curve(cossimEpisodes);
    const rerankedEpisodes = rerank(query, curvedEpisodes);
    
    return toText(rerankedEpisodes);
}

export default retrieveEpisodes;