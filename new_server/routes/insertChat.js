import { Router } from "express";
import Chat from "../models/Chat.js";
import verifyToken from "../functions/verifyToken.js";

const router = Router();
router.use(verifyToken);

router.post('/api/insertchat', async (req, res) => {
    try {
        let chat = req.body;
        chat.date = Date.now();
        chat.lastRetrieved = Date.now();
        chat.timesRetrieved = 1;

        const newChat = await Chat.create(chat);
        res.status(201).json(newChat);
        
    } catch (err) {
        res.status(400).json({error: `ERROR insertChat: ${err}`});
    }
});

export default router;