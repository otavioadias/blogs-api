const { createNewUserServices, getAllUsersServices } = require('../services/userServices');

const createNewUserController = async (req, res) => {
    try {
        const { displayName, email, password, image } = req.body;
        const newUser = await createNewUserServices({ displayName, email, password, image });
        return res.status(newUser.type).json(newUser.message);
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsersServices();
        return res.status(200).json(users);
    } catch (error) {
        console.log('oi');
        return res.status(401).json({ message: error.message });
    }
};

module.exports = { createNewUserController, getAllUsersController };