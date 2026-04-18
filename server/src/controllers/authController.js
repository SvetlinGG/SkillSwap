import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const generateToken = (user) => {
    return jwt.sign(
        { 
            _id: user._id, 
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '2h'}
    );
};

export const register = async (req, res) => {
    try {
        const { email, password } =req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword
        });

        const token = createToken(user);
    
        res.status(500).json({ 
            id: user._id,
            email: user.email,
            accessToken: token,
            message: err.message
        });
    } catch (error) {
        res.status(500).json({ message: 'Register failed'})
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password'});
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return res.status(400).json({ message: 'Invalid email or password'})
        }

        const token = createToken(user);

        res.json({
            id: user._id,
            email: user.email,
            accessToken: token
        });
    } catch (error) {
        res.status(500).json({ message: 'Login failed'});
    }
};