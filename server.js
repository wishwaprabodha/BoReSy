const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const apiRouter = require('./app/api.router');
const viewRouter = require('./view.router');

const dbConfig = require('./app/config/db.config');

const app = express();

//middleware integration
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//routes define
app.use('/api', apiRouter);
app.use('/', viewRouter);

//database
dbConfig();

//start server
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'http://localhost';

app.listen(PORT, function () {
    console.log(`server started on ${HOST}:${PORT}`);
})