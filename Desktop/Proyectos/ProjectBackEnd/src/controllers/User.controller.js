const User = require('../models/User.model');
const Post = require('../models/Post.model');
const cloudinary = require('cloudinary').v2; 

// ----------------------------------------------------
// [GET] Get all Users //api/users (ONLY ADMIN)
// ----------------------------------------------------
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error getting users.', error: error.message });
    }
};

// [PUT] /api/users/role/:id (admin can change user roles)
exports.changeUserRole = async (req, res) => {
    const userIdToUpdate = req.params.id;
    const { newRole } = req.body; 

    if (!['user', 'admin'].includes(newRole)) {
        return res.status(400).json({ message: 'Invalid role. Must be "user" or "admin".' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userIdToUpdate,
            { role: newRole },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ 
            message: `User ${updatedUser.email}'s role updated to ${updatedUser.role}.`,
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({ message: 'Error changing role.', error: error.message });
    }
};

// [DELETE] /api/users/:id
exports.deleteUser = async (req, res) => {
    const userIdToDelete = req.params.id;
    const authUserId = req.user.id; 
    const authUserRole = req.user.role; 
    
    const isOwner = userIdToDelete.toString() === authUserId;
    const isAdmin = authUserRole === 'admin';

    if (!isOwner && !isAdmin) {
        return res.status(403).json({ 
            message: 'You do not have permission to delete other users\' accounts.' 
        });
    }

    try {
        const user = await User.findById(userIdToDelete);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        if (user.image && !user.image.includes('default_profile')) {
            const startIndex = user.image.lastIndexOf('upload/') + 7; 
            const publicIdWithExt = user.image.substring(startIndex);
            const publicId = publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.'));
            
            await cloudinary.uploader.destroy(publicId);
        }

        await User.deleteOne({ _id: userIdToDelete });

        res.status(200).json({ message: `User deleted successfully.` });

    } catch (error) {
        res.status(500).json({ message: 'Error deleting account.', error: error.message });
    }
};

exports.addFavoritePost = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.id;

    try {
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found.' });

        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { favorites: postId } },
            { new: true }
        ).populate('favorites', 'title content');

        res.status(200).json({ message: 'Post added to favorites.', favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: 'Error adding favorite.', error: error.message });
    }
};

// [PUT] /api/users/profile (Update profile with image)
exports.updateUserProfile = async (req, res) => {
    const userId = req.user.id; 
    
    // provisional: added to avoid error when no body is sent
    const username = req.body ? req.body.username : undefined;
    
    try {
        const updateData = {};

        if (username) updateData.username = username;

        if (req.file && req.file.path) {
            updateData.image = req.file.path;
        }

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true } 
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({
            message: 'Profile updated successfully.',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating profile.', error: error.message });
    }
};