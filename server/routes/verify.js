import { Router } from 'express';
import verifyToken from '../functions/verifyToken.js';

const router = Router();
router.use(verifyToken);

router.get('/api/verify', verifyToken, (req, res) => {
    console.log('verify kontol');  // debug
    return res.status(200).send('Token authenticated successfully');
})

export default router;