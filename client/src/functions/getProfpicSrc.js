export const getUserProfpic = (user) => {
    return `data:image/png;base64,${user.profpic}`;
}

export const getAsProfpic = (assistant) => {
    return `data:image/png;base64,${assistant.profpic}`;
}