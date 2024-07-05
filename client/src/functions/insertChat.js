const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

const insertChat = async (user, chat) => {
    try {
        const payload = {
            chat: {
                role: chat.role,
                content: chat.content,
                date: chat.date
            },
            user: user
        }

        await fetch(`${REACT_APP_BACKEND_URI}/api/insertchat`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

    } catch (err) {
        console.error(`Failed to insert data to server: ${err.message} // ${err.stack}`);
    }
}

export default insertChat;