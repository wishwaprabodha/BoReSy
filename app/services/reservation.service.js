const BoardingModel = require('./../models/boarding.model');
const ReservationModel = require('./../models/reservation.model');
const Sequelize = require('sequelize');

var addBoarding = function (boarding) {
    const Boarding = BoardingModel.get();
    return new Promise((resolve, reject) => {
        Boarding.create(boarding, {
            isNewRecord: true
        })
            .then(result => {
                resolve(result.id);
            })
            .catch(err => {
                reject(err);
            });
    });
}

var searchBoarding = function (gender, minRental, maxRental) {
    const Boarding = BoardingModel.get();
    return Boarding.findAll({
        where: {
            gender: gender,
            rental: {
                [Sequelize.Op.between]: [minRental, maxRental]
            }
        }
    })
}

var makeReservation = function (reservation) {
    const Reservation = ReservationModel.get();
    return new Promise((resolve, reject) => {
        Reservation.create(reservation, {
            isNewRecord: true
        })
            .then(result => {
                resolve(result.id);
            })
            .catch(err => {
                reject(err);
            });
    });
}

module.exports = {
    addBoarding: addBoarding,
    searchBoarding: searchBoarding,
    makeReservation: makeReservation
}