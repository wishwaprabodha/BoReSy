const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'RAnd12!@',
    database: 'boresy'
});

const apiRouter = express.Router();

apiRouter.post('/login', function (req, res) {
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

apiRouter.post('/signup', function (req, res) {
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

module.exports = apiRouter;