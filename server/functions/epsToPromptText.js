const epsToPromptText = (eps) => {
    if (!eps || eps.length === 0) return null;
    
    let recentChats = '';
    
    eps.forEach(ep => {
        const chat = `<|im_start|>${ep.role}\n${ep.text}<|im_end|>\n\n`;
        recentChats += chat;
    })

    return recentChats;
}

export default epsToPromptText;