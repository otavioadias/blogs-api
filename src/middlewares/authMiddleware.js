const jwt = require('jsonwebtoken');
require('dotenv').config();
const { getUserByEmail } = require('../services/userServices');

const JWT_SECRET = process.env.JWT_SECRET || 'secretJWT';

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    try {
        const decoded = await jwt.verify(token, JWT_SECRET);
        await getUserByEmail(decoded.email);
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = authMiddleware;