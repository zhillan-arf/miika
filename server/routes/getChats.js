import { Router } from "express";
import Episode from "../models/Episode.js";
import User from "../models/User.js";
import Assistant from "../models/Assistant.js";
import verifyToken from "../functions/verifyToken.js";

const router = Router();
router.use(verifyToken);

const formatChats = (chats) => {
    return chats.flatMap((chat) => {

        return chat.data.flatMap((datum) => {
            const texts = datum.content.split(/ASSISTANT: /).filter(text => text.trim());

            return texts.map(text => {

                return {
                    role: datum.role,
                    content: text,
                    date: chat.date
                }
            });
        });
    });
}

router.get('/api/getchats', async (req, res) => {      
    try {
        const userID = req.userID;
        let user = await User.findOne({_id: userID}, 'email assistantID name gender profpic').lean();

        const assistant = await Assistant.findOne({_id: user.assistantID}).lean();
        delete user.assistantID;

        const chats = await Episode.find({userID: userID, type:'chat'}).lean();

        const formattedChats = formatChats(chats)

        const payload = {
            user: user,
            assistant: assistant,
            chats: formattedChats
        }
        
        res.status(200).json(payload);

    } catch (err) {
        res.status(500).json({error: `Internal server error: ${err}`});
    }
});

export default router;