const { createPostServices,
     getAllPostsService,
     getPostByIdService } = require('../services/postServices');

const getAllPostsController = async (req, res) => {
    const posts = await getAllPostsService();
    return res.status(200).json(posts);
};

const getPostByIdController = async (req, res) => {
    const { id } = req.params;
    const [post] = await getPostByIdService(id);
    if (post) {
        return res.status(200).json(post);
    }
    return res.status(404).json({ message: 'Post does not exist' });
};

const createPostController = async (req, res) => {
    try {
        const { title, content, categoryIds } = req.body;
        const token = req.headers.authorization;
        const newPost = await createPostServices({ title, content, categoryIds, token });
        return res.status(newPost.type).json(newPost.message);
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

module.exports = { 
    createPostController,
     getAllPostsController,
     getPostByIdController };