import makeResponse from "../self/makeResponse.js";
import delay from "./delay.js";

const socketEvents = (io) => {
    io.on('connection', (socket) => {
        socket.on('requestResponse', async (user, secretary) => {
            socket.emit('waitingResponse', true);
            socket.emit('nowTyping', true);

            const newChats = await makeResponse(user, secretary);

            if (newChats) {
                for (const newChat of newChats) {
                    await delay(newChat.text);
                    socket.emit('receiveResponse', newChat);
                    socket.emit('nowTyping', false);
                    await delay(1);
                    socket.emit('nowTyping', true);
                }
            }
            
            socket.emit('nowTyping', false);
            socket.emit('waitingResponse', false);
        });
    });
}

export default socketEvents;