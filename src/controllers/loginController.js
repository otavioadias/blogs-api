const { getUser } = require('../services/loginService');

const getUserController = async (req, res) => {
    try {
        const result = await getUser(req.body);
        return res.status(result.type).json(result.message);
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

module.exports = { getUserController };
