const Sequelize = require('sequelize');

const { BlogPost, User, Category, PostCategory } = require('../models');
const { userJWT } = require('../utils/decodeJWT');
const { getAllCategoriesServices } = require('./categoryServices');

const { Op } = Sequelize;

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

const updatePostServices = async ({ title, content, token, id }) => {
    const [post] = await getPostByIdService(id);
    const [user] = await userJWT(token);
    if (!post || !user || post.dataValues.userId !== user.dataValues.id) {
        return ({ type: 401, message: { message: 'Unauthorized user' } });
    }
    await BlogPost.update(
        { title, content, updated: new Date() },
        { where: { id } },
         );
         const [updatedPost] = await getPostByIdService(id);
        return ({ type: 200, message: updatedPost.dataValues });
};

const deletePostServices = async ({ token, id }) => {
    const [post] = await getPostByIdService(id);
    const [user] = await userJWT(token);
    if (!post) {
        return ({ type: 404, message: { message: 'Post does not exist' } });
    }
    if (!user || post.dataValues.userId !== user.dataValues.id) {
        return ({ type: 401, message: { message: 'Unauthorized user' } });
    }
    await BlogPost.destroy({ where: { userId: post.dataValues.userId } });
    return ({ type: 204, message: '' });
};

const getPostByTermService = async (term) => {
    if (term === '') {
        const allPosts = await getAllPostsService();
        return ({ type: 200, message: allPosts });
    }
    const post = await BlogPost.findAll({
        where: { 
            [Op.or]: [{ title: { [Op.like]: `%${term}%` } }, 
            { content: { [Op.like]: `%${term}%` } }] },
            include: [
                { model: User, as: 'user', attributes: { exclude: ['password'] } },
                { model: Category, as: 'categories' },
            ],
    });
    if (!post) {
        return ({ type: 200, message: '' });
    }
    return ({ type: 200, message: post });
};

module.exports = { createPostServices,
     getAllPostsService,
     getPostByIdService,
     updatePostServices,
     deletePostServices,
     getPostByTermService,
 };