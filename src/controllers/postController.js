const { createPostServices,
     getAllPostsService,
     getPostByIdService, 
     updatePostServices,
     deletePostServices,
     getPostByTermService } = require('../services/postServices');

const getAllPostsController = async (req, res) => {
    const posts = await getAllPostsService();
    return res.status(200).json(posts);
};

const getPostByIdController = async (req, res) => {
    const { id } = req.params;
    const [post] = await getPostByIdService(id);
    console.log('POSTTTTTTTTTTTTTTTT -', post);
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

const updatePostController = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { id } = req.params;
        const token = req.headers.authorization;
        const updatePost = await updatePostServices({ title, content, token, id });
        return res.status(updatePost.type).json(updatePost.message);
    } catch (error) {
        return res.status(400).json({ message: error.message }); 
    }
};

const deletePostController = async (req, res) => {
    const token = req.headers.authorization;
    const { id } = req.params;
    const updatePost = await deletePostServices({ token, id });
    return res.status(updatePost.type).json(updatePost.message);
};

const getPostByTermController = async (req, res) => {
    const { q } = req.query;
    const term = q;
    const post = await getPostByTermService(term);
    return res.status(post.type).json(post.message);
};

module.exports = { 
    createPostController,
     getAllPostsController,
     getPostByIdController,
     updatePostController,
     deletePostController,
     getPostByTermController,
      };