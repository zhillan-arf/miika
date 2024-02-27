import { Router } from 'express';
const router = Router();
import User from '../models/User.js';
import { hash }  from 'bcrypt';

const saltRounds = 10;

function isValidEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

router.post('/register', async (req, res) => {
    if (isValidEmail(req.body.email)) {
        try {
            const hashedPassword = await hash(req.body.password, saltRounds);
            const user = new User({email:req.body.email, hash:hashedPassword});
            const registeredUser = await user.save();
            const userResponse = {
                _id: registeredUser._id,
                username: registeredUser.email,
            };
            res.status(500).json(userResponse);
        } catch (error) {
            res.status(400).send(error)
        }
    } else {
        res.status(400).send('Not an email!')
    }
})

export default router;