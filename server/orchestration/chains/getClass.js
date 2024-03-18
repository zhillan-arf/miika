import { Router } from "express";

const router = Router();

router.get('api/getclass', async (req, res) => {
    try {
        const chats = req.body;
        if (!chats) throw new Error("Empty!"); // temp
        const chatClass = 'standard';  // temp
        res.status(200).json({chatClass: chatClass});
    } catch (err) {
        res.status(500).json({error: 'Internal server error'});
    } 
});

export default router;