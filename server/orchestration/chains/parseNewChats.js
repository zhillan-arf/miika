import getMentionedEntities from "../retrievers/getMentionedEntities.js";

const parseNewChats = (inferred, user) => {
    const texts = inferred.split('\n');
    console.log(`Texts: ${texts}`);  // debug

    const newChats = texts.map(text => ({
        userID: user._id,
        date: new Date(),
        role: 'secretary',
        text: text,
        autoFocus: false,
        readOnly: true,
        lastRecalled: new Date(),
        timesRecalled: 1,
        mentionedEntities: getMentionedEntities(inferred)
    }));

    return newChats;
}

export default parseNewChats;