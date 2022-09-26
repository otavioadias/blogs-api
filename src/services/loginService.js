const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const getUser = async ({ email, password }) => {
    const user = await User.findOne({
        where: { email, password },
    });
    if (!user) {
        return ({ type: 400, message: { message: 'Invalid fields' } });
    }
    try {
        const { data } = user.dataValues;
        const payload = { email: data.email };
        const token = await generateToken(payload);
        console.log(token);
        return ({ type: 200, message: { token } });
    } catch (error) {
        const err = new Error();
        err.status = 401;
        return ({ type: 400, message: err.message });   
    }
};

module.exports = { getUser };