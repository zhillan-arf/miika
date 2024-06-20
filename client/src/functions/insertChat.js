const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

const insertChat = async (chat) => {
    try {
        delete chat._id;
        const response = await fetch(`${REACT_APP_BACKEND_URI}/api/insertchat`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(chat)
        });
        const newChat = await response.json();
        return newChat._id;

    } catch (err) {
        console.error(`Failed to insert data to server: ${err}`);
    }
}

export default insertChat;