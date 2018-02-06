const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

connection.connect();
const apiRouter = require('./app/api.router');
const viewRouter = require('./app/view.router');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use('/view', viewRouter);

app.listen(3000, function () {
    console.log('server started on localhost:3000');
})