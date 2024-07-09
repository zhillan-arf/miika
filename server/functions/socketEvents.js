import makeResponse from "../self/makeResponse.js";
import delay from "./delay.js";
import User from "../models/User.js";
import Assistant from "../models/Assistant.js";

const socketEvents = (io) => {
    io.on('connection', (socket) => {
        socket.on('requestResponse', async (userEmail, asName) => {
            socket.emit('waitingResponse', true);
            socket.emit('nowTyping', true);

            const userData = await User.findOne({email: userEmail});
            const asData = await Assistant.findOne({name: asName});

            const newChats = await makeResponse(userData, asData);

            if (newChats) {
                for (const newChat of newChats) {
                    await delay(newChat.content);
                    socket.emit('receiveResponse', newChat);
                }

                await delay(1);
                
            } else {
                console.log("sE No response");  // debug
                await delay(2);
            }

                        
            socket.emit('nowTyping', false);
            socket.emit('waitingResponse', false);
        });
    });
}

export default socketEvents;