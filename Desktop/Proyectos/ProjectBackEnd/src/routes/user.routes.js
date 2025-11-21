const router = require('express').Router();
const userController = require('../controllers/User.controller');
const isAuth = require('../middlewares/isAuth');
const checkRole = require('../middlewares/checkRole');
const upload = require('../middlewares/upload');

// ADMIN ROUTES (Requires isAuth + Admin)
// ----------------------------------------------------

// [GET] Get all users (ONLY ADMIN)
router.get('/', isAuth, checkRole(['admin']), userController.getAllUsers);

// [PUT] Change role (ONLY ADMIN)
router.put('/role/:id', isAuth, checkRole(['admin']), userController.changeUserRole);

// USER ROUTES (Requires isAuth)

router.delete('/:id', isAuth, userController.deleteUser); 

// [PUT] Update Profile (La función ya está confirmada como updateUserProfile)
router.put('/profile', isAuth, upload.single('image'), userController.updateUserProfile);

router.post('/favorites/:postId', isAuth, userController.addFavoritePost);

module.exports = router;