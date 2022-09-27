const express = require('express');
const userController = require('../controllers/userController');
const newUserValidation = require('../middlewares/newUserValidation');
const authMiddleware = require('../middlewares/authMiddleware');

const routers = express.Router();

routers.post('/', newUserValidation, userController.createNewUserController);
routers.get('/', authMiddleware, userController.getAllUsersController);
routers.get('/:id', authMiddleware, userController.getUserByIdController);
routers.delete('/me', authMiddleware, userController.deleteUserController);

module.exports = routers;