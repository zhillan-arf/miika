import User from '../models/User.js';
import { compare }  from 'bcrypt';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const { sign } = jwt;
dotenv.config();

const router = Router();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    const user = await User.findOne({ email });
    if (user) {
        const isMatch = await compare(password, user.hash);
        console.log(isMatch);
        if (isMatch) {
            const tokenPayload = {
                userID : user._id
            }
            const token = sign(tokenPayload, JWT_SECRET_KEY,{ expiresIn: '3h' });
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 10800000  // 3h
            })
            .status(200)
            .send(`${user.email} is logged in.`);
        }
        else {
            res.status(401).send('Wrong credentials!');
        }
    } else {
        res.status(401).send('Not registered!');
    }
});

export default router;