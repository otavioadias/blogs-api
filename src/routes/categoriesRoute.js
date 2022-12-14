const express = require('express');
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const newCategoryMiddleware = require('../middlewares/newCategoryMiddleware');

const routers = express.Router();

routers.post('/', authMiddleware, newCategoryMiddleware, categoryController.createCategory);
routers.get('/', authMiddleware, categoryController.getAllCategories);

module.exports = routers;