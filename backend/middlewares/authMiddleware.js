const jwt = require('jsonwebtoken');

const authMiddleware = (role) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(403).json({ message: 'Access denied' });

        try {
            const decoded = jwt.verify(token, 'secretKey');
            if (role && decoded.role !== role) {
                return res.status(403).json({ message: 'Insufficient permissions' });
            }
            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({ message: 'Invalid token' });
        }
    };
};

module.exports = authMiddleware;
