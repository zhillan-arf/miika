import io from 'socket.io-client';

const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
const socket = io(REACT_APP_BACKEND_URI, {
    'transports': ['websocket']
});

export default socket;