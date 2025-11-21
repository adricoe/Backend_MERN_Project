// charge environment variables
require('dotenv').config({ path: './.env' });

const express = require('express');
const connectDB = require('./src/config/db.config');

// Import the routes that define the endpoints
const authRoutes = require('./src/routes/auth.routes'); 
const userRoutes = require('./src/routes/user.routes'); 
const postRoutes = require('./src/routes/post.routes');

// Connect to the database
connectDB();

// Initialize the Express application
const app = express();

// Middleware: Allows Express to read requests in JSON
app.use(express.json());

// Connect Routes (Endpoints)
// All routes /api/....
app.use('/api/auth', authRoutes); //registration and login
app.use('/api/users', userRoutes); //user management and profiles
app.use('/api/posts', postRoutes); //CRUD operations on Posts


// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    console.log(`Environment mode: ${process.env.NODE_ENV || 'development'}`);
});