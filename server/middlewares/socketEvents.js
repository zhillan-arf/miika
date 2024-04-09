import makeResponse from "../orchestration/makeResponse.js";

const socketEvents = (io) => {
    io.on('connection', (socket) => {
        socket.on('responseRequest', async (user) => {
            const response = await makeResponse(user);
            if (response) socket.emit('receiveResponse', response);
        });
    });
}

export default socketEvents;