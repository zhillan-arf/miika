import { Router } from "express";
import Episode from "../models/Episode.js";
import User from "../models/User.js";
import Secretary from "../models/Secretary.js";
import verifyToken from "../functions/verifyToken.js";

const router = Router();
router.use(verifyToken);

router.get('/api/getchats', async (req, res) => {      
    try {
        const userID = req.userID;
        const chats = await Episode.find({userID: userID, type:'chat'}, {mentionedEntities: 0}).lean();
        const master = await User.findOne({_id: userID}).lean();
        const secretary = await Secretary.findOne({_id: master.secretaryID}).lean();

        res.status(200).json({
            master: master,
            secretary: secretary,
            chats: chats
        });

    } catch (err) {
        res.status(500).json({error: `Internal server error: ${err}`});
    }
});

export default router;