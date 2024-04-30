import makeResponse from "../orchestration/makeResponse.js";
import delay from "../orchestration/chains/delay.js";

const socketEvents = (io) => {
    io.on('connection', (socket) => {
        socket.on('requestResponse', async (user) => {
            socket.emit('waitingResponse', true);
            await delay(2);
            socket.emit('nowTyping', true);
            await delay(2)
            const newChats = await makeResponse(user);
            if (newChats) {
                newChats.forEach((newChat) => {
                    delay(2);
                    socket.emit('receiveResponse', newChats);
                })
            }
            socket.emit('waitingResponse', false);
            socket.emit('nowTyping', false);
        });
    });
}

export default socketEvents;