import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const generateToken = (user) => {
    return jwt.sign(
        { 
            _id: user._id, 
            email: user.email,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: '2h'}
    );
};

export const register = async (req, res) => {
    try {
        console.log('REGISTER BODY:', req.body);


        const { username, email, password } = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({ message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        console.log('HASHED PASSWORD CREATED');

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        console.log('USER CREATED:', user);


        const token = generateToken(user);
    
        res.status(201).json({ 
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: createToken(user)
        });
    } catch (error) {
        console.error('REGISTER ERROR:', error);
        res.status(500).json({ message: error.message || 'Register failed'})
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

        const token = generateToken(user);

        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token
        });
    } catch (error) {
        console.error('LOGIN ERROR:', error);
        res.status(500).json({ message: error.message || 'Login failed'});
    }
};