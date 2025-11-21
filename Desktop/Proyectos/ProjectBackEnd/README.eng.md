### Project Backend (User and Post Management)

This is the Backend developed for my project, using the MERN stack architecture (MongoDB, Express, Node.js). 
The main objective is to manage a system for users and content (Posts), ensuring data integrity and security 
through token authentication.

### Requirements Compliance

[x] Creation of at least 2 models:The User and Post models have been created.
[x] At least 1 related data point:Relation 1: A Post belongs to a User (Author).Relation 2: A User has many Posts in Favorites.
[x] Different user roles + Auth Middleware:Roles implemented: user and admin.Middlewares: isAuth (verifies the Token) and checkRole (verifies if the user is an admin).
[x] File upload with Cloudinary + Deletion:Images can be uploaded when updating the profile (PUT /profile).Extra: If a user is deleted, their image is automatically deleted from Cloudinary.
[x] Seed for one collection:File src/seeders/postSeeder.js created. It generates an admin user and test posts.
[x] Avoid duplicates and data loss:Use of $addToSet in Favorites to prevent the same post from being added twice.Validations in the schema to ensure data integrity.
[x] Full CRUD for all collections:Routes for Read, Create, Edit, and Delete for both Users and Posts.


# How to Start the Project

# 1. Installation
Install all project dependencies
# Bash: npm install


# 2. Configuration (.env)
Create a .env file in the root directory with your keys:

PlaintextPORT=4000
MONGODB_URI=[YOUR_MONGO_URI]
JWT_SECRET=[YOUR_COMPLEX_SECRET_KEY]
CLOUDINARY_CLOUD_NAME=[YOUR_CLOUD_NAME]
CLOUDINARY_API_KEY=[YOUR_API_KEY]
CLOUDINARY_API_SECRET=[YOUR_API_SECRET]


# 3. Data Loading (Seed)
To create the Admin user and test data: 
## Bash: node src/seeders/postSeeder.js

# 4. Start the Server 
# Bash: npm run dev
------------------------------------------------------------------
### Main API Routes

## Users:

POST /api/auth/register - Sign up
POST /api/auth/login - Login
PUT /api/users/profile - Upload picture / edit profile
GET /api/users - See all (only admin)
DELETE /api/users/:id - Delete user

## Posts:

GET /api/posts - See posts
POST /api/posts - Create post
PUT /api/posts/:id - Edit post
DELETE /api/posts/:id - Deelte post