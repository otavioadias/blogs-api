const { createNewUserServices } = require('../services/userServices');

const createNewUserController = async (req, res) => {
    try {
        const { displayName, email, password, image } = req.body;
        const newUser = await createNewUserServices({ displayName, email, password, image });
        return res.status(newUser.type).json(newUser.message);
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

module.exports = { createNewUserController };