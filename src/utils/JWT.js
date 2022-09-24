const jwt = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'secretJWT';

const jwtConfig = {
    expiresIn: '7d', 
    algorithm: 'HS256',
};

const generateToken = async (payload) => jwt.sign(payload, JWT_SECRET, jwtConfig);

const authTokenValidation = async (token) => {
        if (!token) {
            const err = new Error('Missing token');
            err.status = 401; 
            throw err;
        }
        const introspection = jwt.verify(token, JWT_SECRET);
        return introspection;
};

module.exports = {
    generateToken,
    authTokenValidation,
};