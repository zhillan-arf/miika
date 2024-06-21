const epsToText = (eps) => {
    if (!eps || eps.length === 0) return null;

    let formattedEps = '';

    eps.forEach(ep => {
        const name = `[${ep.role.toUpperCase()}]`;
        formattedEps += `${name}: ${ep.text}\n`;
    });

    return formattedEps.trim();
}

export default epsToText;