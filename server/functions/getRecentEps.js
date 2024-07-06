const getRecentEps = (eps, tokenCap) => {
    if (!eps || eps.length === 0) return null;

    let i = eps.length - 1;
    let tokensLength = 0;
    
    for (i; i >= 0; i--) {
        let dataLength = 0;

        eps[i].data.forEach(datum => {
            dataLength += datum.content.split(/\s+/).filter(Boolean).length;
        });

        if (tokensLength + dataLength >= tokenCap) break;
        tokensLength += dataLength;
    }

    const recentEps = eps.slice(i + 1, eps.length);
    return recentEps;
}

export default getRecentEps;