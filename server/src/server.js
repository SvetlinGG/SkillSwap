import './config/env.js';
import { app } from './app.js';
import { connectDB } from './config/db.js';

connectDB();

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
