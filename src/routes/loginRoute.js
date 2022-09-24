const express = require('express');
const loginController = require('../controllers/loginController');
const loginValidation = require('../middlewares/loginValidation');

const routers = express.Router();

routers.post('/', loginValidation, loginController.getUserController);

module.exports = routers;