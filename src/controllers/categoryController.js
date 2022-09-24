const { createCategoryServices, 
    getAllCategoriesServices } = require('../services/categoryServices');

const getAllCategories = async (req, res) => {
    const categories = await getAllCategoriesServices();
    return res.status(200).json(categories);
};

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = await createCategoryServices({ name });
        return res.status(newCategory.type).json(newCategory.message);
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

module.exports = { createCategory, getAllCategories };