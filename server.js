const express = require('express');
var session = require('express-session');

const path = require('path');
const bodyParser = require('body-parser');

const apiRouter = require('./app/api.router');
const viewRouter = require('./app/view.router');

const app = express();

app.use(session({
    secret: '12345678',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use('/view', viewRouter);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'http://localhost';

app.listen(PORT, function () {
    console.log(`server started on ${HOST}:${PORT}`);
});