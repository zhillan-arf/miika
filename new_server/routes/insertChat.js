import { Router } from "express";
import Episode from "../models/Episode.js";
import verifyToken from "../functions/verifyToken.js";

const router = Router();
router.use(verifyToken);

router.post('/api/insertchat', async (req, res) => {
    try {
        let chat = req.body;
        chat.date = Date.now();
        chat.lastRetrieved = Date.now();
        chat.timesRetrieved = 1;

        const newChat = await Episode.create(chat);
        res.status(201).json(newChat);
        
    } catch (err) {
        res.status(400).json({error: `ERROR insertChat: ${err}`});
    }
});

export default router;