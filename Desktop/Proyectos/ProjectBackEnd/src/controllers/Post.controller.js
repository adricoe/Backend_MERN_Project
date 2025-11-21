const Post = require('../models/Post.model');
const User = require('../models/User.model');

// ---------------------------------------------
// create a new Post //api/posts
// ---------------------------------------------
exports.createPost = async (req, res) => {
    // The ID of the user creating the post is obtained from the token (req.user.id)
    const authorId = req.user.id; 
    const { title, content } = req.body;

    try {
        const newPost = await Post.create({
            title,
            content,
            author: authorId // We use the 'author' field
        });

        res.status(201).json({
            message: 'Post creado con éxito.',
            post: newPost
        });

    } catch (error) {
        res.status(500).json({ 
            message: 'Error creating the post.', 
            error: error.message 
        });
    }
};

// ----------------------------------------------
// [GET] Get all Posts //api/posts
// ---------------------------------------------
exports.getAllPosts = async (req, res) => {
    try {
        // .populate('author', 'username email') to load author data
        const posts = await Post.find().populate('author', 'username email image');

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error getting all posts.' });
    }
};

// ---------------------------------------------
// [GET] Get a Post by ID //api/posts/:id
// ---------------------------------------------
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username email image');

        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        res.status(200).json(post);
    } catch (error) {
        // Handle error ifID is not in the correct ObjectId format
        res.status(500).json({ message: 'Error getting the post.' });
    }
};

// -------------------------------------------------------------
// [PUT] Update a Post //api/posts/:id --only author or admin
// -------------------------------------------------------------  
exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    const authUserId = req.user.id; 
    const authUserRole = req.user.role;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        // Logic: only the author or an admin
        const isOwner = post.author.toString() === authUserId;
        const isAdmin = authUserRole === 'admin';

        if (!isOwner && !isAdmin) {
             return res.status(403).json({ 
                message: 'You do not have permission to update this post.' 
            });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: 'Post updated successfully.',
            post: updatedPost
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error updating the post.', 
            error: error.message 
        });
    }
};

// --------------------------------------------------------------
// [DELETE] Delete a Post //api/posts/:id --only author or admin
// --------------------------------------------------------
exports.deletePost = async (req, res) => {
    const postId = req.params.id;
    const authUserId = req.user.id; 
    const authUserRole = req.user.role;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        // LLogic: only the author or an admin can delete
        const isOwner = post.author.toString() === authUserId;
        const isAdmin = authUserRole === 'admin';

        if (!isOwner && !isAdmin) {
             return res.status(403).json({ 
                message: 'You do not have permission to delete this post.' 
            });
        }
        
        await Post.deleteOne({ _id: postId });

        res.status(200).json({
            message: 'Post deleted successfully.'
        });

    } catch (error) {
        res.status(500).json({ 
            message: 'Error deleting the post.', 
            error: error.message 
        });
    }
};