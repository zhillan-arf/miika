import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoosePkg from 'mongoose';
const { connect, connection } = mongoosePkg;
import cors from 'cors';

const app = express();

// Middlewares
const CLIENT_URI = process.env.CLIENT_URI;
const corsOption = { 
  origin: CLIENT_URI,
  credentials: true
};
app.use(cors(corsOption));
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', CLIENT_URI);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// MongoDB connection
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

// Routes
import registerRouter from './routes/register.js';
app.use(registerRouter);
import loginRouter from './routes/login.js';
app.use(loginRouter);
import verifyRouter from './routes/verify.js';
app.use(verifyRouter);
import getChats from './retrievers/getChats.js';
app.use(getChats);
import insertChat from './retrievers/insertChat.js';
app.use(insertChat);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);});
