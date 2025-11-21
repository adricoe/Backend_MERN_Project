const router = require('express').Router();
const postController = require('../controllers/Post.controller');
const isAuth = require('../middlewares/isAuth'); 

// ----------------------------------------------------
// POSTS ROUTES (CRUD)
// ----------------------------------------------------

// [POST] Create new post (Requires authentication)
router.post('/', isAuth, postController.createPost);

// [GET] Get all posts (Public access)
router.get('/', postController.getAllPosts);

// [GET] Get a post by ID (Public access)
router.get('/:id', postController.getPostById);

// [PUT] Update a post (Requires authentication and permission validation)
router.put('/:id', isAuth, postController.updatePost);

// [DELETE] Delete a post (Requires authentication and permission validation)
router.delete('/:id', isAuth, postController.deletePost);

module.exports = router;