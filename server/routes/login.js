import User from '../models/User.js';
import { compare }  from 'bcrypt';
import { Router } from 'express';
const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user.email);
    if (user) {
        const isMatch = await compare(password, user.hash);
        console.log(isMatch);
        if (isMatch) {
            console.log("Match!");
            res.status(200).send("Match found");
        }
        else {
            console.log("Wrong creds!");
            res.status(401).send('Wrong credentials!');
        }
    } else {
        console.log("No user!");
        res.status(404).send('No user!');
    }
});

export default router;