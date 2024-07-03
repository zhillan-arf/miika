const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

const insertChat = async (chat) => {
    try {
        await fetch(`${REACT_APP_BACKEND_URI}/api/insertchat`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                role: chat.role,
                content: chat.content,
                date: chat.date
            })
        });

    } catch (err) {
        console.error(`Failed to insert data to server: ${err}`);
    }
}

export default insertChat;