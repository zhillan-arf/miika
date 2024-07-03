import { Router } from "express";
import Episode from "../models/Episode.js";
import User from "../models/User.js";
import Assistant from "../models/Assistant.js";
import verifyToken from "../functions/verifyToken.js";

const router = Router();
router.use(verifyToken);

router.get('/api/getchats', async (req, res) => {      
    try {
        const userID = req.userID;
        const user = await User.findOne({_id: userID}).lean();
        const assistant = await Assistant.findOne({_id: user.assistantID}).lean();
        const chats = await Episode.find({userID: userID, type:'chat'}).lean();

        const formattedChats = chats.map(chat => {
            return {
                role: chat.role,
                content: chat.text,
                date: chat.date
            }
        })
        
        res.status(200).json({
            user: user,
            assistant: assistant,
            chats: formattedChats
        });

    } catch (err) {
        res.status(500).json({error: `Internal server error: ${err}`});
    }
});

export default router;