import jwt from "jsonwebtoken";
const { verify } = jwt;

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.cookies ? req.cookies['token'] : null;
    if (!token) return res.status(401).send("No token provided!");

    verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).send('Failed to authenticate token');
        req.userID = decoded.userID;
        next();
    });
}

export default verifyToken;