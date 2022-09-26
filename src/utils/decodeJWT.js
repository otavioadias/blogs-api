const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../services/userServices');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'secretJWT';

const userJWT = async (token) => {
    const decoded = await jwt.decode(token, JWT_SECRET);
    const { email } = decoded;
    const user = await getUserByEmail(email);
    return user;
};

module.exports = {
    userJWT,
};