import makeResponse from "../orchestration/makeResponse.js";

const socketEvents = (io) => {
    io.on('connection', (socket) => {
        socket.on('requestResponse', async (user) => {
            console.log("LLM response requested");  //debug
            const response = await makeResponse(user);
            if (response) socket.emit('receiveResponse', response);
        });
    });
}

export default socketEvents;