const { BlogPost, User, Category, PostCategory } = require('../models');
const { userJWT } = require('../utils/decodeJWT');
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

const getPostByIdService = async (id) => BlogPost.findAll({
    where: { id },
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

const categoryExists = async (cat) => {
    const categories = await getAllCategoriesServices();
    const arrayCategories = categories.map((i) => i.dataValues.id);
    return cat.some((id) => arrayCategories.includes(id));
};

const createPostServices = async ({ title, content, categoryIds, token }) => {
    const result = await categoryExists(categoryIds);
    if (result === false) {
        return ({ type: 400, message: { message: '"categoryIds" not found' } });
    }
    const [user] = await userJWT(token);
    const { dataValues } = user;
    const newPost = await BlogPost.create({
        title,
        content,
        userId: dataValues.id,
        updated: new Date(),
        published: new Date(),
    });
    categoryIds.forEach(async (cat) =>
        PostCategory.create({
            postId: newPost.id, 
            categoryId: cat }));
    return ({ type: 201, message: newPost });
};

module.exports = { createPostServices,
     getAllPostsService,
     getPostByIdService };