import makeResponse from "../orchestration/makeResponse.js";

const socketEvents = (io) => {
    io.on('connection', (socket) => {
        socket.on('responseRequest', (user) => {
            makeResponse(user);
        })
    });
}

export default socketEvents;