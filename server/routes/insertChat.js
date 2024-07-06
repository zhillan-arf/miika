import { Router } from "express";
import Episode from "../models/Episode.js";
import User from "../models/User.js";
import verifyToken from "../functions/verifyToken.js";

const router = Router();
router.use(verifyToken);

router.post('/api/insertchat', async (req, res) => {
    try {
        const response = req.body;
        const userEmail = response.userEmail;
        
        const userData = await User.findOne({email: userEmail}, '_id');
        const userID = userData._id;

        const newData = [{
            role: response.chat.role,
            content: `USER: ${response.chat.content}`
        }]

        const newEp = {
            userID: userID,
            type: 'chat',
            date: new Date(response.chat.date),
            data: newData,
            summary: null,
            embedding: null
        }

        await Episode.create(newEp);

        res.status(201).json({ message: 'Chat saved to memory' });
        
    } catch (err) {
        console.error(`ERROR insertChat: ${err.message} // ${err.stack}`);
        res.status(400);
    }
});

export default router;