import { Router } from "express";
import Chat from "../models/Chat";
import { verify } from "jsonwebtoken";

const router = Router();

router.post('api/insertchat', async (req, res) => {
    // All chats goes to one bucket
    const chat = new Chat(req.body);

    try {
        const newChat = await chat.save();
        res.status(201).json(newChat);
    } catch (error) {
        res.status(400).json({error: 'Internal server error'});
    }
});

export default router;