import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('./api/auth', authRoutes);