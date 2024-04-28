import makeResponse from "../orchestration/makeResponse.js";

const socketEvents = (io) => {
    io.on('connection', (socket) => {
        socket.on('requestResponse', async (user) => {
            const newChats = await makeResponse(user);
            if (newChats) socket.emit('receiveResponse', newChats);
        });
    });
}

export default socketEvents;