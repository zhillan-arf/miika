import { Router } from "express";
import Episode from "../models/Episode.js";
import User from "../models/User.js";
import Assistant from "../models/Assistant.js";
import verifyToken from "../functions/verifyToken.js";

const router = Router();
router.use(verifyToken);

const formatGetChats = (chats) => {
    let formattedChats = [];

    chats.forEach((chat) => {
        chat.data.forEach((datum) => {
            const texts = datum.content.split(/^\w+:\s*/gm).filter(text => text.trim());

            texts.forEach(text => {
                const formattedChat = {
                    role: datum.role,
                    content: text,
                    date: chat.date
                }

                formattedChats = formattedChats.concat(formattedChat);
            });
        });
    });

    return formattedChats;
}

router.get('/api/getchats', async (req, res) => {      
    try {
        const userID = req.userID;
        let user = await User.findOne({_id: userID}, 'email assistantID name gender profpic').lean();

        const assistant = await Assistant.findOne({_id: user.assistantID}, 'name gender profpic').lean();
        delete user.assistantID;

        const chats = await Episode.find({userID: userID, type:'chat'}).lean();
        const formattedChats = formatGetChats(chats);

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