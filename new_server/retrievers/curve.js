const curve = (episodes) => {
    let selectors = []; 

    episodes.forEach((episode, idx) => {
        const t = Date.now() - episode.lastRetrieved;
        const S = episodes.timesRetrieved;
        const R = Math.exp(-t / S);
        selectors.push({idx: idx, R: R});
    });

    selectors = selectors.sort((a, b) => b.R - a.R).slice(0, 3);
    const indexes = selectors.map(item => item.idx);
    
    return episodes.filter((elmt, idx) => indexes.includes(idx));
}

export default curve;