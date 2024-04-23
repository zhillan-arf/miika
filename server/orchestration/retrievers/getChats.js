import { Router } from "express";
import Chat from "../../models/Chat.js";
import User from "../../models/User.js";
import Secretary from "../../models/Secretary.js";
import jwt from "jsonwebtoken";
const { verify } = jwt; 

const router = Router();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

router.get('/api/getchats', async (req, res) => {
    const token = req.cookies ? req.cookies['token'] : null;
    try {
        const decoded = verify(token, JWT_SECRET_KEY);
        const userID = decoded.userID;
        
        try {
            const chats = await Chat.find({userID: userID}, {mentionedEntities: 0});
            const master = await User.findOne({_id: userID});
            const secretary = await Secretary.findOne({_id: master.secretaryID});
    
            res.status(200).json({
                master: master,
                secretary: secretary,
                chats: chats
            });

        } catch (err) {
            res.status(500).json({error: `Internal server error: ${err}`});
        }
    } catch (error) {
        res.status(401).send('Invalid token.');
    }
});

export default router;