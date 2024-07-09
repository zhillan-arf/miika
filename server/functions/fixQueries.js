import getFormat from "./getFormat.js";

const fixQueries = async (queries) => {
    // Fix array
    if (typeof queries === 'string') {
        console.log(`fQ queries: ${queries} END OF QUERY`);
        const queriesMatch = queries.match(/\[.*?\]/);
        if (!queriesMatch) throw Error('fQ: No queries inferred'); 

        queries = JSON.parse(queriesMatch[0]);
    }
    
    // Fix array content
    const formats = getFormat('assistant');

    const trimQueries = queries.map(elmt => {
        const pattern = new RegExp(`${formats.start}|${formats.end}`, 'g');
        const newElmt = elmt.replace(pattern, '').trim();

        return newElmt;
        
    }).filter(elmt => elmt !== '');

    return trimQueries;
}

export default fixQueries;