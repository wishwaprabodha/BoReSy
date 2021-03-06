const express = require('express');
const httpService = require('./services/http.service');
const authService = require('./services/auth.service');
const reservationService = require('./services/reservation.service');

const apiRouter = express.Router();

apiRouter.post('/auth', function (req, res) {
    authService.login(req.body['email'], req.body['password'])
        .then(user => {
            if (user && user.id) {
                req.session['auth'] = {userId: user.id, email: user.email, type: user.type};
                httpService.sendResponse(res, 200, null, { userId: user.id });
            } else {
                httpService.sendResponse(res, 200, { message: 'username or password incorrect' }, null);
            }
        })
        .catch(err => {
            httpService.sendResponse(res, 500, err, null);
        });
});

apiRouter.delete('/auth', function (req, res) {
    req.session.auth = null;
});

apiRouter.post('/users', function (req, res) {
    authService.signUp(req.body)
        .then(userId => {
            req.session['auth'] = {userId: userId, email: req.body.email, type: req.body.type};
            httpService.sendResponse(res, 200, null, { userId: userId });
        })
        .catch(err => {
            httpService.sendResponse(res, 500, err, null);
        });
});

apiRouter.post('/boardings', function (req, res) {
    req.body['ownerId'] = req.session.auth.userId;
    reservationService.addBoarding(req.body)
        .then(boardingId => {
            httpService.sendResponse(res, 200, null, { boardingId: boardingId });
        })
        .catch(err => {
            httpService.sendResponse(res, 500, err, null);
        });
});

apiRouter.get('/boardings', function (req, res) {
    reservationService.searchBoarding(req.query['gender'], req.query['minRental'], req.query['maxRental'])
        .then(boardings => {
            httpService.sendResponse(res, 200, null, boardings);
        })
        .catch(err => {
            httpService.sendResponse(res, 500, err, null);
        });
});

apiRouter.post('/reservations', function (req, res) {
    req.body['seekerId'] = req.session.auth.userId;
    reservationService.makeReservation(req.body)
        .then(reservationId => {
            httpService.sendResponse(res, 200, null, { reservationId: reservationId });
        })
        .catch(err => {
            httpService.sendResponse(res, 500, err, null);
        });
});

module.exports = apiRouter;