import User from '../models/User.js';
import { compare }  from 'bcrypt';
import { Router } from 'express';
const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const isMatch = compare(password, user.hash);
        if (isMatch) {
            res.redirect('/test');
        }
        else {
            res.status(400).send('Wrong credentials!');
        }
    } else {
        res.status(400).send('Wrong credentials!');
    }
});

export default router;