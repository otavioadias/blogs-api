const { BlogPost, User, Category } = require('../models');
const { getAllCategoriesServices } = require('./categoryServices');

const getAllPostsService = async () => BlogPost.findAll({
    attributes: {
        exclude: ['user_id'],
    },
    include: [
        {
            model: User,
            as: 'user',
            attributes: { exclude: ['password'] },
        },
        {
            model: Category,
            as: 'categories',
        },
    ],
});

const createPostServices = async ({ title, content, categoryIds }) => {
    const categories = await getAllCategoriesServices();
    const arrayCategories = categories.map((i) => i.dataValues.id);
    const categoryExist = categoryIds.some((id) => arrayCategories.includes(id));
    if (categoryExist === false) {
        return ({ type: 400, message: { message: '"categoryIds" not found"' } });
    }
    // Requisito 11 falta verificar o userId e adicionar ele no corpo da resposta
    const newPost = await BlogPost.create({
        title,
        content,
        include: [
            {
                model: User,
                as: 'userId',
                attributes: { exclude: ['password'] },
        },
    ],
    });
    return ({ type: 201, message: newPost });
};

module.exports = { createPostServices, getAllPostsService };