const express = require('express');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/loginRoute');
// ...

const app = express();
app.use(bodyParser.json());

app.use(express.json());

app.use('/login', loginRoute);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
