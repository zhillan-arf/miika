const getRecentEps = (eps, tokenCap) => {
    let i = eps.length - 1;
    let tokensLength = 0;
    
    for (i; i >= 0; i--) {
        const tokenLength = eps[i].text.split(' ').length;
        if (tokensLength + tokenLength >= tokenCap) break;
        tokensLength += tokenLength;
    }

    return eps.slice(i + 1, eps.length);
}

export default getRecentEps;