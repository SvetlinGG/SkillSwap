import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import skillRoutes from './routes/skillRoutes.js';

export const app = express();

app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://https://skillswapapplication.netlify.app'
  ],
  credentials: true,
}));
app.use(express.json());

app.use((req, res, next) => {
    console.log('REQ:', req.method, req.url);
    next();
});

app.get('/', (req, res) => {
    res.send('ROOT OK');
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'API works' });
});

app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);



