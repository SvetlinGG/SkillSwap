import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import skillRoutes from './routes/skillRoutes.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);

app.get('/', (req, res) => {
  console.log('HIT /');
  res.send('ROOT OK');
});

app.get('/api/test', (req, res) => {
  console.log('HIT /api/test');
  res.json({ message: 'API works' });
});