import makeResponse from "../orchestration/makeResponse.js";
import delay from "../orchestration/chains/delay.js";

const socketEvents = (io) => {
    io.on('connection', (socket) => {
        socket.on('requestResponse', async (user) => {
            socket.emit('waitingResponse', true);
            await delay(1.5);
            socket.emit('nowTyping', true);
            await delay(1.5)
            const newChats = await makeResponse(user);
            if (newChats) {
                for (const newChat of newChats) {
                    await delay(newChat.text);
                    socket.emit('receiveResponse', newChat);
                    socket.emit('nowTyping', false);
                    await delay(1);
                    socket.emit('nowTyping', true);
                }
            }
            socket.emit('waitingResponse', false);
            socket.emit('nowTyping', false);
        });
    });
}

export default socketEvents;