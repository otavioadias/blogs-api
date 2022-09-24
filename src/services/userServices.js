const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const getUserByEmail = async (email) => User.findAll({ 
    where: { email },
});

const getAllUsersServices = async () => User.findAll({
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

module.exports = { createNewUserServices, getAllUsersServices };