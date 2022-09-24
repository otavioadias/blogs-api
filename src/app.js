const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/errorMiddleware');
// ...

const app = express();
app.use(bodyParser.json());

app.use(express.json());

app.use('/login', routes.loginRoute);
app.use('/user', routes.userRoute);
app.use(errorMiddleware);

// ...
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
