const { createCategoryServices } = require('../services/categoryServices');

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = await createCategoryServices({ name });
        return res.status(newCategory.type).json(newCategory.message);
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

module.exports = { createCategory };