const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function for generating JWT
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '1d', 
        // * The token expires in 1 day
    });
};

// [POST] /api/auth/register
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body; 
    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
               return res.status(400).json({ message: 'User already exists.' });
     }

        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user (default role is 'user')
        user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        //JWT Token
        const token = generateToken(user._id, user.role);

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        // manage error
        res.status(500).json({ message: 'Error user registration', error: error.message });
    }
};

// [POST] /api/auth/login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });

        }

        //Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        //Generate JWT Token
        const token = generateToken(user._id, user.role);

        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error en el login', error: error.message });
    }
};