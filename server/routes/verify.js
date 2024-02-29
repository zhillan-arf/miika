import jwt from "jsonwebtoken";
const { verify } = jwt;
import { Router } from 'express';

const router = Router();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

router.get('/api/verify', (req, res) => {
    const token = req.cookies['token'];

    if (!token) return res.status(401).send("No token provided!");
    
    verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).send('Failed to authenticate token');
        return res.status(200).send('Token authenticated successfully');
    })
})

export default router;