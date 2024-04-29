import makeResponse from "../orchestration/makeResponse.js";
import delay from "../orchestration/chains/delay.js";

const socketEvents = (io) => {
    io.on('connection', (socket) => {
        socket.on('requestResponse', async (user) => {
            socket.emit('waitingResponse', true);
            await delay(5);
            socket.emit('nowTyping', true);
            const newChats = await makeResponse(user);
            if (newChats) socket.emit('receiveResponse', newChats);
            socket.emit('nowTyping', false);
            socket.emit('waitingResponse', false);
        });
    });
}

export default socketEvents;