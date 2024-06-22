const epsToText = (eps, userName, secName) => {
    if (!eps || eps.length === 0) return null;

    let formattedEps = '';

    eps.forEach(ep => {
        let name = userName;
        if (ep.rol === 'secretary') name = secName;
        formattedEps += `${name}: ${ep.text}\n\n`;
    });

    return formattedEps.trim();
}

export default epsToText;