import User from '../models/User.js';
import { compare }  from 'bcrypt';
import { Router } from 'express';
import sign from 'jsonwebtoken';

const router = Router();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

router.post('/login', async (req, res) => {
    // Authenticate user
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user.email);
    if (user) {
        const isMatch = await compare(password, user.hash);
        console.log(isMatch);
        // JWT
        if (isMatch) {
            const accessToken = sign(
                {username: user.username},
                JWT_SECRET_KEY,
                { expiresIn: '3h' }
            )
            res.cookie('token', accessToken), {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 3600000
            }
            .status(200)
            .send(`${user.email} is logged in.`);
        }
        else {
            res.status(401).send('Wrong credentials!');
        }
    } else {
        res.status(404).send('Wrong credentials');
    }
});

export default router;