import embed from "../embeds/embed";
import cossim from "./cossim";
import toText from "../functions/toText";
import rerank from "./rerank";
import curve from "./curve";

const retrieveEpisodes = async (episodes, hypoInfos) => {
    const embeddings = episodes.map(eps => eps.embedding);
    const infosEmbedding = await embed(hypoInfos);
    const minCosSim = 0.6;  // temp
    
    const cossimEpisodes = await cossim(episodes, embeddings, infosEmbedding, minCosSim);

    const curvedEpisodes = await curve(cossimEpisodes);

    const minLogit = 5;  // temp
    const contextEpisodes = rerank(hypoInfos, curvedEpisodes, minLogit);
    
    return toText(contextEpisodes);
}

export default retrieveEpisodes;