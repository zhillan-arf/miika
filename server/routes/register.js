import { Router } from 'express';
import User from '../models/User.js';
import { hash }  from 'bcrypt';
import { getDefaultProfpic, getTempAssistantID } from '../functions/getDefaultProfpic.js';
import getOriIntent from '../functions/getOriIntent.js';

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

            const asName = 'mist';  // temp debug
            const asID = await getTempAssistantID(asName);  // temp debug
            const userName = req.body.email.substring(0, req.body.email.indexOf('@'));  // temp debug
            const gender = 'm';  // temp debug
            const profpicB64 = await getDefaultProfpic(gender);  // temp debug
            
            const user = new User({
                email: req.body.email, 
                hash: hashedPassword,
                name: userName,
                profpic: profpicB64,
                gender: gender,
                assistantID: asID,
                asIntent: await getOriIntent(asName)
            });

            const registeredUser = await user.save();

            const userResponse = {
                _id: registeredUser._id,
                username: registeredUser.email,
            };

            res.status(201).json(userResponse);
            
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    } else {
        res.status(400).send('Not an email!')
    }
});

export default router;