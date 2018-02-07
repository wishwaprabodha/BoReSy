const express = require('express');
const path = require('path');

const authMiddleware = require('./app/middlewares/auth.middleware');

const viewRouter = express.Router();

//these routes start with /view

viewRouter.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'login', 'login.html'));
})

viewRouter.get('/signup', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'register', 'register.html'));
})

viewRouter.get('/portal', authMiddleware.auth, function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'portal', 'portal.html'));
})

viewRouter.get('/add-boarding', authMiddleware.auth, authMiddleware.access(['O']), function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'add-boarding', 'add-boarding.html'));
})

viewRouter.get('/search-boarding', authMiddleware.auth, authMiddleware.access(['S']), function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'search-boarding', 'search-boarding.html'));
})

module.exports = viewRouter;