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
        //Todo
    ], function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(200);
            res.send({
                success: false
            })
        }

        res.status(200);
        res.send({
            success: true
        })
    });
})


apiRouter.post('/search-places', function (req, res) {
    connection.query('SELECT * FROM place WHERE place=? AND gender=? AND rental BETWEEN ? AND ?', [
        req.body['place'],
        req.body['gender'],
        req.body['min_rental'],
        req.body['max_rental']

    ], function (error, results, fields) {

        console.log(result);

        res.status(200);
        res.send({
            success: true
        })
    });
})

module.exports = apiRouter;