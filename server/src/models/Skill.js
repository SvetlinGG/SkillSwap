import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    category: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now }
},
{ timestamps: true}
);

 export default  mongoose.model('Skill', skillSchema);
