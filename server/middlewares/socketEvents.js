import makeResponse from "../orchestration/makeResponse.js";

const socketEvents = (io) => {
    io.on('connection', (socket) => {
        console.log("A client is connected");
        socket.on('requestResponse', async (user) => {
            const response = await makeResponse(user);
            if (response) socket.emit('receiveResponse', response);
        });
    });
}

export default socketEvents;