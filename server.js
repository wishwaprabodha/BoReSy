const express = require('express');
var session = require('express-session');
var fileStore = require('session-file-store')(session);

const path = require('path');
const bodyParser = require('body-parser');

const apiRouter = require('./app/api.router');
const viewRouter = require('./app/view.router');

const app = express();

app.use(session({
    name: 'server-session-cookie-id',
    secret: 'my express secret',
    saveUninitialized: true,
    resave: true,
    store: new fileStore()
}));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use('/view', viewRouter);

app.listen(3000, function () {
    console.log('server started on localhost:3000');
})