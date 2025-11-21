/**
 * Middleware to check if the user has one of the allowed roles.
 * @param {string[]} allowedRoles - Array of allowed roles (e.g., ['admin', 'manager'])
 */



module.exports = (allowedRoles) => {
    return (req, res, next) => {
      // check if user and role exist
        if (!req.user || !req.user.role) {
            // in case user or role is missing
            return res.status(403).json({ message: 'Access denied. Insufficient rights.' });
        }

        const userRole = req.user.role;

        // 2. Check if the user's role is included in the allowed roles
        if (allowedRoles.includes(userRole)) {
            // Role allowed, continue
            next();
        } else {
            // Role not allowed
            return res.status(403).json({ message: 'Access denied. Insufficient rights.' });
        }
    };
};