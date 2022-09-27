const jwt = require('jsonwebtoken');
require('dotenv').config();
const userServices = require('../services/userServices');

const JWT_SECRET = process.env.JWT_SECRET || 'secretJWT';

const userJWT = async (token) => {
    const decoded = await jwt.decode(token, JWT_SECRET);
    const { email } = decoded;
    return userServices.getUserByEmail(email);
};

module.exports = {
    userJWT,
};