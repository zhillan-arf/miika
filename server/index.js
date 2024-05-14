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
import getChatsRouter from './orchestration/retrievers/getChats.js';
import insertChatRouter from './orchestration/retrievers/insertChat.js';

import initSecretaries from './functions/initSecretary.js';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// Middlewares
const CLIENT_URI = process.env.CLIENT_URI;
const REMOTE_URI = process.env.REMOTE_URI;
export const MICROSERVICE_URI = process.env.MICROSERVICE_URI;

const allowedOrigins = [REMOTE_URI, CLIENT_URI, MICROSERVICE_URI];

app.use((req, res, next) => {  // debug
  console.log('Incoming request from origin:', req.headers.origin);
  next();
});

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST']
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(cookieParser());
app.use(express.json());

const { connect, connection } = mongoosePkg;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = encodeURIComponent(process.env.MONGO_PASSWORD);
const MONGO_PATH = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@127.0.0.1:27017/miika`;
connect(MONGO_PATH);
const db = connection;
db.on('error', (error) => {
  console.error('Connection error:', error);
});
db.once('open', () => {
    console.log('Database connected successfully');
});

initSecretaries();
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