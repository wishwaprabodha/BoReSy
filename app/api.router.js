const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'us-cdbr-gcp-east-01.cleardb.net',
    user: 'ba6d76c7ff6470',
    password: '8726bfc41272474',
    database: 'gcp_6e68adb1572222a6dd33'
});

connection.connect();

const apiRouter = express.Router();

apiRouter.post('/login', function (req, res) {
    connection.query('SELECT userid FROM user WHERE email=? AND password=?', [
        req.body['email'],
        req.body['password']
    ], function (error, results, fields) {
        results = JSON.parse(JSON.stringify(results));
        res.status(200);
        if (error || !results[0]) {
            res.send({
                success: false
            })
        } else {
            const userid = results[0].userid;
            req.session.userid = userid;
            res.send({
                success: true,
                data: {
                    userId: userid
                }
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
    ], function (error, result, fields) {
        res.status(200);
        if (error) {
            console.error(error);
            res.send({
                success: false
            })
        } else {
            const userid = result.insertId;
            req.session.userid = userid;
            res.send({
                success: true,
                data: {
                    userId: userid
                }
            })
        }
    });
})

apiRouter.post('/add-boarding', function (req, res) {
    connection.query('INSERT INTO place (ownerid, capacity, rental, advance, address, gender) VALUES (?, ?, ?, ?, ?, ?)', [
        req.session.userid,
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


apiRouter.post('/search-boarding', function (req, res) {
    connection.query('SELECT * FROM place WHERE rental BETWEEN ? AND ? AND gender=?', [
        req.body['min_rental'],
        req.body['max_rental'],
        req.body['gender'],
    ], function (error, results, fields) {
        results = JSON.parse(JSON.stringify(results));
        //console.log(results);
        res.status(200);
        if (error) {
            console.error(error);
            res.send({
                success: false
            })
        } else {
            res.send({
                success: true,
                data: results
            })
        }
    });
})

module.exports = apiRouter;