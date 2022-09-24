const express = require('express');
const userController = require('../controllers/userController');
const newUserValidation = require('../middlewares/newUserValidation');

const routers = express.Router();

routers.post('/', newUserValidation, userController.createNewUserController);

module.exports = routers;