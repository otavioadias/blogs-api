const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
// ...

const app = express();
app.use(bodyParser.json());

app.use(express.json());

app.use('/login', routes.loginRoute);
app.use('/user', routes.userRoute);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
