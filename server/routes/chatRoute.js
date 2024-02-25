const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

router.get('/chats', async (req, res) => {
//   const chats = await Chat.find({});
//   res.json(chats);
});

module.exports = router;