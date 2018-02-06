const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'RAnd12!@',
    database: 'boresy'
});

connection.connect();

const apiRouter = express.Router();

apiRouter.post('/login', function (req, res) {
    connection.query('SELECT userid FROM user WHERE email=? AND password=?', [
        req.body['email'],
        req.body['password']
    ], function (error, results, fields) {
        res.status(200);
        if (error) {
            res.send({
                success: false
            })
        } else {
            res.send({
                success: results[0] ? true : false
            })
        }
    });
})

apiRouter.post('/signup', function (req, res) {
    connection.query('INSERT INTO user (fullname, address, contact, nic, email, username, password, type, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        req.body['fullname'],
        req.body['address'],
        req.body['contact'],
        req.body['nic'],
        req.body['email'],
        req.body['username'],
        req.body['password'],
        req.body['type'],
        req.body['gender']
    ], function (error, results, fields) {
        res.status(200);
        if (error) {
            console.error(error);
            res.send({
                success: false
            })
        } else {
            res.send({
                success: true
            })
        }
    });
})

apiRouter.post('/add-boarding', function (req, res) {
    connection.query('INSERT INTO place (capacity, rental, advance, address, gender) VALUES (?, ?, ?, ?, ?)', [
        req.body['capacity'],
        req.body['rental'],
        req.body['advance'],
        req.body['address'],
        req.body['gender']
    ], function (error, results, fields) {
        res.status(200);
        if (error) {
            console.error(error);
            res.send({
                success: false
            })
        } else {
            res.send({
                success: true
            })
        }
    });
})

module.exports = apiRouter;