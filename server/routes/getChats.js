import { Router } from "express";
import Chat from "../models/Chat";
import User from "../models/User";
import Secretary from "../models/Secretary";
import { verify } from "jsonwebtoken";

const router = Router();

router.get('/api/getchats', async (req, res) => {
    const token = req.cookies.token;
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    
    try {
        const decoded = verify(token, JWT_SECRET_KEY);
        const userID = decoded.userID;
        
        try {
            const mastersChats = await Chat.find({userID: userID});
            const master = await User.findById(userID);
            const secretary = await Secretary.findById(masterName.logkeeperID);
    
            res.json({
                master: master,
                secretary: secretary,
                chats: mastersChats
            });
        } catch (error) {
            res.status(500).json({error: 'Internal server error'});
        }
    } catch (error) {
        res.status(401).send('Invalid token.');
    }
});

export default router;