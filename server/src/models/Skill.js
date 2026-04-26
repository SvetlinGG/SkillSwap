import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    level: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            text: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 300
            },
            createdAt: { 
                type: Date, 
                default: Date.now 
            }
        }
    ]
},
{ timestamps: true}
);

 export default  mongoose.model('Skill', skillSchema);
