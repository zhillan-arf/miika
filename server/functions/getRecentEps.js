const getRecentEps = (eps, tokenCap) => {
    if (!eps || eps.length === 0) return null;

    console.debug(`getRecentChats eps length: ${eps.length}`);

    let i = eps.length - 1;
    let tokensLength = 0;
    
    for (i; i >= 0; i--) {
        let dataLength = 0;

        eps[i].data.forEach(elmt => {
            console.debug(`getRecentEps data content: ${elmt.data.content}`)
            dataLength += elmt.data.content.split(/\s+/).filter(Boolean).length;
        });

        if (tokensLength + dataLength >= tokenCap) break;
        tokensLength += dataLength;
    }

    const recentEps = eps.slice(i + 1, eps.length);
    console.debug(`getRecentChats first index content: ${recentEps[0].data.content}`);
    return recentEps;
}

export default getRecentEps;