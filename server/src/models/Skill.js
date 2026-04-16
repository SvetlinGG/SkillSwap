import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    level: String,
    owner: String,
    createdAt: { type: Date, default: Date.now }
});

 export default  mongoose.model('Skill', skillSchema);
