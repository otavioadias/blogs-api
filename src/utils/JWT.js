const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'secretJWT';

const jwtConfig = {
    expiresIn: '7d', 
    algorithm: 'HS256',
};

const generateToken = async (payload) => jwt.sign(payload, JWT_SECRET, jwtConfig);

module.exports = { generateToken };