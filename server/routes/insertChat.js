import { Router } from "express";
import { ObjectId } from 'mongodb';
import Episode from "../models/Episode.js";
import verifyToken from "../functions/verifyToken.js";
import promptTextToEp from "../functions/promptTextToEp.js";

const router = Router();
router.use(verifyToken);

router.post('/api/insertchat', async (req, res) => {
    try {
        const response = req.body;
        const user = req.user;
        const chat = response.chat;

        const newEp = promptTextToEp(ObjectId(user._id), chat.role, chat.content);

        await Episode.create(newEp);
        res.status(201);
        
    } catch (err) {
        res.status(400).json({error: `ERROR insertChat: ${err}`});
    }
});

export default router;