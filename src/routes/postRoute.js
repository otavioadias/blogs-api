const express = require('express');
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');
const postMiddleware = require('../middlewares/postMiddleware');
const updatePostMiddleware = require('../middlewares/updatePostMiddleware');

const routers = express.Router();

routers.post('/', authMiddleware, postMiddleware, postController.createPostController);
routers.get('/', authMiddleware, postController.getAllPostsController);
routers.get('/:id', authMiddleware, postController.getPostByIdController);
routers.put('/:id', authMiddleware, updatePostMiddleware, postController.updatePostController);

module.exports = routers;
