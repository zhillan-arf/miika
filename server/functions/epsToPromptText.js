const epsToPromptText = (eps) => {
    if (!eps || eps.length === 0) return null;
    
    let recentChats = '';
    
    eps.forEach(ep => {
        const chat = `<|im_start|>${ep.role}
        ${ep.text}<|im_end|>
        
        `;

        recentChats += chat;
    })

    return recentChats;
}

export default epsToPromptText;