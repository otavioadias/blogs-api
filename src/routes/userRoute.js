const express = require('express');
const userController = require('../controllers/userController');
const newUserValidation = require('../middlewares/newUserValidation');
const authMiddleware = require('../middlewares/authMiddleware');

const routers = express.Router();

routers.post('/', newUserValidation, userController.createNewUserController);

routers.get('/', authMiddleware, userController.getAllUsersController);

module.exports = routers;