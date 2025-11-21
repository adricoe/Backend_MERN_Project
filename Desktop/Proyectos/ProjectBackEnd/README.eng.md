# 🚀 Backend Project (User and Post Management)

This is the Backend developed for the project, using the **MERN stack** architecture (MongoDB, Express, Node.js). The main goal is to manage a system for users and content (**Posts**), ensuring data integrity and security through token authentication.

---

## ✅ Requirements Compliance

- **Creation of at least 2 models**: User and Post models created.
- **At least 1 related data point**: Authorship relation (Post belongs to User) and Favorites (User has an array of Posts).
- **Different user roles + Auth Middleware**: User and admin roles implemented using isAuth (JWT) and checkRole Middlewares.
- **File Upload with Cloudinary + Deletion**: Profile image upload functionality. The image is automatically deleted from Cloudinary when the account is removed.
- **Seed for one collection**: The src/seeders/postSeeder.js file generates the initial admin user and test data.
- **Prevent duplicates and data loss**: $addToSet is used to prevent Posts from being duplicated in the Favorites array.
- **Full CRUD for all collections**: Create, Read, Update, and Delete routes for both Users and Posts.

---

## 🛠️ How to Start the Project

### 1. Installation
Install all project dependencies:
npm install

### 2. Configuration (.env)
You must create a .env file in the project root with the following keys, replacing the brackets with the corresponding credentials:

PORT=4000
MONGODB_URI=[YOUR_MONGO_ATLAS_URI]
JWT_SECRET=[A_LONG_SECRET_KEY]
CLOUDINARY_CLOUD_NAME=[YOUR_CLOUD_NAME]
CLOUDINARY_API_KEY=[YOUR_API_KEY]
CLOUDINARY_API_SECRET=[YOUR_API_SECRET]

### 3. Data Loading (Seed)
To create the Admin user and test data:
node src/seeders/postSeeder.js

### 4. Start the Server
npm run dev

---

## 🗺️ Main API Routes

All routes start with the /api prefix.

**Users and Authentication**

- POST /api/auth/register - Register
- POST /api/auth/login - Log In
- PUT /api/users/profile - Update Profile (supports image upload)
- GET /api/users - List all users (Admin Only)
- DELETE /api/users/:id - Delete account (Owner/Admin)

**Posts**

- GET /api/posts - List all posts
- POST /api/posts - Create a new post
- PUT /api/posts/:id - Edit a post
- DELETE /api/posts/:id - Delete a post
