import { Router } from "express";
import Chat from "../../models/Chat.js";
import jwt from "jsonwebtoken";
const { verify } = jwt;

const router = Router();

router.post('api/insertchat', async (req, res) => {
    // All chats goes to one bucket
    const token = req.cookies.token;
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    const chat = new Chat(req.body);

    try {
        const decoded = verify(token, JWT_SECRET_KEY);
        try {
            const newChat = await chat.save();
            res.status(201).json(newChat);
        } catch (error) {
            res.status(400).json({error: 'Internal server error'});
        }

    } catch (err) {
        res.status(401).send('Invalid token.');
    }
});

export default router;