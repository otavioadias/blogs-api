const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { generateToken } = require('../utils/JWT');
// const { userJWT } = require('../utils/decodeJWT');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'secretJWT';

const getUserByEmail = async (email) => User.findAll({ 
    where: { email },
});

const getAllUsersServices = async () => User.findAll({
    attributes: {
        exclude: ['password'],
    },
});

const getUserByIdServices = async (id) => User.findAll({
    where: { id },
    attributes: {
        exclude: ['password'],
    },
});

const createNewUserServices = async ({ displayName, email, password, image }) => {
    const user = await getUserByEmail(email);
    if (user.length > 0) {
        return ({ type: 409, message: { message: 'User already registered' } });
    }
    const newUser = await User.create({
        displayName,
        email, 
        password, 
        image,
    });
    const token = await generateToken({ email: newUser.dataValues.email });
    return ({ type: 201, message: { token } });
};

const deleteUserServices = async (token) => {
    const decoded = await jwt.decode(token, JWT_SECRET);
    const { email } = decoded;
    const [user] = await getUserByEmail(email);
    await User.destroy({ where: { id: user.dataValues.id } });
    return ({ type: 204, message: '' });
};

module.exports = { 
    createNewUserServices, 
    getAllUsersServices, 
    getUserByIdServices,
    getUserByEmail,
    deleteUserServices };