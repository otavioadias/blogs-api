const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../services/userServices');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'secretJWT';

const jwtConfig = {
    expiresIn: '7d', 
    algorithm: 'HS256',
};

const generateToken = async (payload) => jwt.sign(payload, JWT_SECRET, jwtConfig);

const authTokenValidation = async (token) => {
        if (!token) {
            const err = new Error('Token not found');
            err.status = 401; 
            throw err;
        }
        try {
            const introspection = await jwt.verify(token, JWT_SECRET);
            return introspection;
        } catch (error) {
            console.log('Error JWT', error);
            const e = new Error('Expired or invalid token');
            e.status = 401; 
            throw e;
        }
};

const userJWT = async (token) => {
    const decoded = await jwt.decode(token, JWT_SECRET);
    const { email } = decoded;
    const user = await getUserByEmail(email);
    return user;
};

module.exports = {
    generateToken,
    authTokenValidation,
    userJWT,
};