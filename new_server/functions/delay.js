const delay = async (input) => {
    let s;
    if (typeof input === 'number') {
        s = input;
    } else if (typeof input === 'string') {
        const wordCount = input.split(/\s+/).filter(Boolean).length;
        s = wordCount * 0.3;  // cracked WPS
    } else {
        throw new Error('Input must be a number or a string');
    }

    const ms = (Math.floor(Math.random() * s) + 1) * 1000;
    return new Promise(resolve => setTimeout(resolve, ms));
}


export default delay;