const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');

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

//view routes
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'login', 'login.html'));
})

app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'register', 'register.html'));
})

app.get('/portal', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'dashboard', 'dashboard.html'));
})

//api routes
app.post('/api/login', function (req, res) {
    connection.query('SELECT userid FROM user WHERE email=? AND password=?', [
        req.body['email'],
        req.body['password']
    ], function (error, results, fields) {
        if (error) throw error;

        res.status(200);
        res.send({
            success: results[0] ? true : false
        })
    });
})

app.post('/api/signup', function (req, res) {
    connection.query('INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        req.body['nic'],
        req.body['fullname'],
        req.body['address'],
        req.body['contact'],
        req.body['nic'],
        req.body['email'],
        req.body['username'],
        req.body['password'],
        'owner',
        'M'
    ], function (error, results, fields) {
        if (error) throw error;

        res.status(200);
        res.send({
            success: true
        })
    });
})

app.listen(3000, function () {
    console.log('server started on localhost:3000');
})