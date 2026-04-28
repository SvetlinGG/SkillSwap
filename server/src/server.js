import './config/env.js';
import { app } from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5050;

connectDB();

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
