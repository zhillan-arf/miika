import { Router } from 'express';
import User from '../models/User.js';
import { hash }  from 'bcrypt';
import { getDefaultProfpic, getTempSecretaryID } from '../middlewares/getDefaults.js';

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
                name: req.body.email,  // temp
                profpic: await getDefaultProfpic('m'),  // temp
                gender: true,  // temp
                secretaryID: await getTempSecretaryID('mistley')  // temp
            });
            const registeredUser = await user.save();
            console.log(`register new secid: ${registeredUser.secretaryID}`);  // debug
            const userResponse = {
                _id: registeredUser._id,
                username: registeredUser.email,
            };
            console.log(userResponse);
            res.status(201).json(userResponse);
        } catch (err) {
            console.log(`register error ${err}`);  // debug
            res.status(500).send(err);
        }
    } else {
        res.status(400).send('Not an email!')
    }
});

export default router;