const express = require('express');
const path = require('path');

const viewRouter = express.Router();

viewRouter.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'login', 'login.html'));
})

viewRouter.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'register', 'register.html'));
})

viewRouter.get('/portal', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'portal', 'portal.html'));
})

viewRouter.get('/add-boarding', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'add-boarding', 'add-boarding.html'));
})

viewRouter.get('/search-boarding', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'search-boarding', 'search-boarding.html'));
})

module.exports = viewRouter;