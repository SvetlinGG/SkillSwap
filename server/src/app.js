import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import skillRoutes from './routes/skillRoutes.js';

export const app = express();

app.use(cors({ origin:
    'http://localhost:4200'}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);
app.get('/', (req, res) => {
    res.send('SkillSwap API is running')
})