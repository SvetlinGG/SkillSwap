import { Router } from 'express';
import { login, register } from '../controllers/authController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.post('/register', (req, res) => {
    console.log('REGISTER ROUTE HIT');
    res.status(201).json({ message: 'register route works' });
  });

export default router;