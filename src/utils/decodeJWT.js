const jwt = require('jsonwebtoken');
require('dotenv').config();
const { getUserByEmail } = require('../services/userServices');

const JWT_SECRET = process.env.JWT_SECRET || 'secretJWT';

const userJWT = async (token) => {
    const decoded = await jwt.decode(token, JWT_SECRET);
    const { email } = decoded;
    return getUserByEmail(email);
};

module.exports = {
    userJWT,
};