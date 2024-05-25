import makeResponse from "../self/makeResponse.js";
import delay from "./delay.js";

const socketEvents = (io) => {
    io.on('connection', (socket) => {
        socket.on('requestResponse', async (user, secretary) => {
            socket.emit('waitingResponse', true);
            await delay(1.5);
            socket.emit('nowTyping', true);
            await delay(1.5)

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
            socket.emit('waitingResponse', false);
            socket.emit('nowTyping', false);
        });
    });
}

export default socketEvents;