const { createNewUserServices, 
    getAllUsersServices, 
    getUserByIdServices, 
    deleteUserServices } = require('../services/userServices');

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
    const users = await getAllUsersServices();
    return res.status(200).json(users);
};

const getUserByIdController = async (req, res) => {
    const { id } = req.params;
    const [user] = await getUserByIdServices(id);
    if (!user) {
        return res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(200).json(user);
};

const deleteUserController = async (req, res) => {
    const token = req.headers.authorization;
    const deleteUser = await deleteUserServices(token);
    return res.status(deleteUser.type).json(deleteUser.message);
};

module.exports = { 
    createNewUserController,
    getAllUsersController, 
    getUserByIdController,
    deleteUserController,
 };