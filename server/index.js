// Module imports
import express from 'express';
import mongoosePkg from 'mongoose';
const { connect, connection } = mongoosePkg;
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// Server app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

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

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);});
