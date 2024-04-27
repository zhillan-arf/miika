import { Router } from "express";
import Chat from "../../models/Chat.js";
import verifyToken from "../../middlewares/verifyToken.js";

const router = Router();
router.use(verifyToken);

const strToDate = (dateStr) => {
    if (typeof dateStr === 'string') {
        return new Date(dateStr);
    } else return dateStr;
}

router.post('/api/insertchat', async (req, res) => {
    try {
        let chat = req.body;
        chat.date = strToDate(chat.date);
        chat.lastRecalled = strToDate(chat.lastRecalled);

        const newChat = await Chat.create(chat);
        res.status(201).json(newChat);
        
    } catch (err) {
        res.status(400).json({error: `Internal server error: ${err}`});
    }
});

export default router;