import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import skillRoutes from './routes/skillRoutes.js';

export const app = express();

app.use(cors({ origin:
    'http://localhost:4200'}));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/skillswap');

app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);