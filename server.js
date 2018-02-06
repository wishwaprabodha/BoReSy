const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const apiRouter = require('./app/api.router');
const viewRouter = require('./app/view.router');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'RAnd12!@',
    database: 'boresy'
});

connection.connect();

app.use('/api', apiRouter);
app.use('/view', viewRouter);

app.listen(3000, function () {
    console.log('server started on localhost:3000');
})