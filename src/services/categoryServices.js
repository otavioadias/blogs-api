const { Category } = require('../models');

const getCategoryByName = (name) => Category.findAll({
    where: { name },
});

const createCategoryServices = async ({ name }) => {
    const category = await getCategoryByName(name);
    if (category.length > 0) {
        return ({ type: 409, message: { message: 'Category already registered' } });
    }
    const newUser = await Category.create({
        name,
    });
    return ({ type: 201, message: newUser });
};

module.exports = { createCategoryServices, getCategoryByName };