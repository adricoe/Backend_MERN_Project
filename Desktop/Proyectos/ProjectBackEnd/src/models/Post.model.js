const mongoose = require('mongoose');
const { Schema } = mongoose;
    
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title required.'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters.']
    },
    content: {
        type: String,
        required: [true, 'Content required.'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);