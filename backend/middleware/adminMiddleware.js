const admin = (req, res, next) => {
    // We rely on the 'protect' middleware running first, which attaches req.user
    if (req.user && req.user.isAdmin) {
        next(); // User is authenticated and is an Admin, proceed
    } else {
        res.status(403); // Forbidden
        throw new Error('Not authorized as an admin');
    }
};

module.exports = { admin };