import embed from "../embeds/embed.js";
import cossim from "./cossim.js";
import toText from "../functions/toText.js";
import rerank from "./rerank.js";
import curve from "./curve.js";

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