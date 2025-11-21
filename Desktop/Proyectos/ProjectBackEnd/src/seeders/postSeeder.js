require('dotenv').config({ path: './.env' });
const connectDB = require('../config/db.config');
const User = require('../models/User.model');
const Post = require('../models/Post.model');
const bcrypt = require('bcryptjs');

//data we want to create
const userAdminData = {
    username: 'admin',
    email: 'admin@example.com',
    password: 'password',
    role: 'admin',
};

const postData = [
    { title: 'First Post', content: 'Content of the first test post. Welcome!', category: 'Technology' },
    { title: 'Second Post', content: 'This post is to fill and test the GET /api/posts route.', category: 'Marketing' },
];

const seedDB = async () => {
    try {
        // 1. Connect to the database
        await connectDB();
        console.log('Connected to MongoDB Atlas for seeding.');

        // 2. Clear the DB before seeding
        await User.deleteMany({});
        await Post.deleteMany({});
        console.log('Old data deleted (Users and Posts).');

        // 3. Create the admin user
        
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userAdminData.password, salt);

        const adminUser = await User.create({
            username: userAdminData.username,
            email: userAdminData.email,
            password: hashedPassword,
            role: userAdminData.role,
        });
        console.log(`Admin user created: ${adminUser.email}`);

        // 4. Create the posts and assign them to the admin user
        const postsWithAdmin = postData.map(post => ({
            ...post,
            author: adminUser._id,
        }));

        await Post.insertMany(postsWithAdmin);
        console.log(`Test posts created: ${postData.length}`);

        // 5. Finish
        console.log('✅ Data seeding completed successfully.');
        process.exit();

    } catch (error) {
        console.error('❌ Error during seeding:', error);
        process.exit(1);
    }
};

seedDB();