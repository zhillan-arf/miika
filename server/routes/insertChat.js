import { Router } from "express";
import Episode from "../models/Episode.js";
import verifyToken from "../functions/verifyToken.js";
import promptTextToEp from "../functions/promptTextToEp.js";

const router = Router();
router.use(verifyToken);

router.post('/api/insertchat', async (req, res) => {
    try {
        const response = req.body;
        const user = response.user;
        const chat = response.chat;

        const newEp = promptTextToEp(user._id, chat.role, chat.content);

        await Episode.create(newEp);
        res.status(201).json({ message: 'Chat saved to memory' });
        
    } catch (err) {
        console.error(`ERROR insertChat: ${err.message} // ${err.stack}`);
        res.status(400);
    }
});

export default router;