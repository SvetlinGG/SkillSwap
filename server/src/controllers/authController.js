import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const generateToken = (user) => {
    return jwt.sign(
        { _id: user._id, email: user.email},
        process.env.JWT_SECRET,
        { expiresIn: '2h'}
    );
};

export const register = async (req, res) => {
    try {
        const { email, password } =req.body;

        const existing = await User.findOne({email});
        if(existing){
            return res.status(400).json({ message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword
        });

        const token = generateToken(user);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid credentials.'})
        }

        const token = ({ _id: user._id, email: user.email, token});
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};