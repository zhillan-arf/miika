import { config } from 'dotenv';
config();

import { Server } from 'socket.io';
import mongoosePkg from 'mongoose';
import express from 'express';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';

import socketEvents from './functions/socketEvents.js';
import registerRouter from './routes/register.js';
import loginRouter from './routes/login.js';
import verifyRouter from './routes/verify.js';
import getChatsRouter from './routes/getChats.js';
import insertChatRouter from './routes/insertChat.js';
import initDBs from './functions/init/initDBs.js';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
const { connect, connection } = mongoosePkg;

// Resources
const SERVICE_URI = process.env.SERVICE_URI;
const CLIENT_URI = process.env.CLIENT_URI;
const REMOTE_CLIENT_URI = process.env.REMOTE_CLIENT_URI;
const REMOTE_SERVER_URI = process.env.REMOTE_SERVER_URI;

const allowedOrigins = [REMOTE_CLIENT_URI, REMOTE_SERVER_URI, CLIENT_URI, SERVICE_URI];

app.use((req, res, next) => {  // debug
  console.log('Incoming request from origin:', req.headers.origin);  // debug
  next();
});

app.use(cors({
  origin: (origin, callback) => {
    if (true) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(cookieParser());
app.use(express.json());

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = encodeURIComponent(process.env.MONGO_PASSWORD);
const MONGO_PATH = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@127.0.0.1:27017/miika`;

connect(MONGO_PATH);

const db = connection;
db.on('error', (err) => {
  console.error(`ERROR indecxt connect: ${err.message} // ${err.stack}`);
});

db.once('open', () => {
    console.log('Database connected successfully');
});

await initDBs();

socketEvents(io);

// Routes
app.use(registerRouter);
app.use(loginRouter);
app.use(verifyRouter);
app.use(getChatsRouter);
app.use(insertChatRouter);

app.get('/', (req, res) => {
    res.send('MIIKA engine 2 connected.');
});

// Start server
const PORT = process.env.PORT || 3002;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;