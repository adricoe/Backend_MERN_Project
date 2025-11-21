const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // obtain the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // The token is the second element of the array (Bearer [token])

    try {
        // Verify the token and decode the payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the user information to the request object (req)
        req.user = decoded; 
        
        // Continue with the next function (the controller or the next middleware)
        next(); 

    } catch (error) {
        // Invalid or expired token
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};