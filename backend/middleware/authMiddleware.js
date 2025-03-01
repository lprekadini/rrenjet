const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sekreti_i_forte';

// Verifikimi i JWT-së dhe rolit
const authMiddleware = (roles = []) => (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Akses i paautorizuar!' });

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
        req.user = decoded;

        if (roles.length && !roles.includes(decoded.role)) {
            return res.status(403).json({ error: 'Akses i ndaluar!' });
        }

        next();
    } catch (error) {
        res.status(401).json({ error: 'Token i pavlefshëm!' });
    }
};

module.exports = authMiddleware;
