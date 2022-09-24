const { createPostServices, getAllPostsService } = require('../services/postServices');

const getAllPostsController = async (req, res) => {
    const posts = await getAllPostsService();
    return res.status(200).json(posts);
};

const createPostController = async (req, res) => {
    try {
        const { title, content, categoryIds } = req.body;
        const newCategory = await createPostServices({ title, content, categoryIds });
        return res.status(newCategory.type).json(newCategory.message);
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

module.exports = { createPostController, getAllPostsController };