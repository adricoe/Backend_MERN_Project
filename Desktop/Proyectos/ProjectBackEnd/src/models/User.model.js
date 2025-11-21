const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'User name required.'],
            unique: true,
            trim: true,
            minlength: [3, 'User name must be at least 3 characters long.'],
        },
        email: {
            type: String,
            required: [true, 'Email required.'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please enter a valid email address.',
            ],
        },
        password: {
            type: String,
            required: [true, 'Password required.'],
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user', 
        },
        image: {
            type: String,
            default: 'https://res.cloudinary.com/dawktfzkfk/image/upload/v1600000000/default_profile.png', 
        },
        favorites: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post',
            }
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);