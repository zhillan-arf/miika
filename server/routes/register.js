import { Router } from 'express';
import User from '../models/User.js';
import { hash }  from 'bcrypt';
import { getDefaultProfpic, getTempAssistantID } from '../functions/getDefaultProfpic.js';

const router = Router();
const saltRounds = 10;

const isValidEmail = (email) => {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

router.post('/register', async (req, res) => {
    if (isValidEmail(req.body.email)) {
        try {
            const hashedPassword = await hash(req.body.password, saltRounds);
            const user = new User({
                email: req.body.email, 
                hash: hashedPassword,
                name: req.body.email.substring(0, req.body.email.indexOf('@')),  // temp
                profpic: await getDefaultProfpic('m'),  // temp
                gender: 'm',  // temp
                assistantID: await getTempAssistantID('mist')  // temp
            });
            const registeredUser = await user.save();
            const userResponse = {
                _id: registeredUser._id,
                username: registeredUser.email,
            };
            console.log(userResponse);
            res.status(201).json(userResponse);
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        res.status(400).send('Not an email!')
    }
});

export default router;