const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary.config');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'project_users_images', 
        allowed_formats: ['jpg', 'png', 'jpeg'],
        public_id: (req, file) => `user-${req.user ? req.user.id : 'unknown'}-${Date.now()}`
    },
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit tot est if it works w
});

module.exports = upload;