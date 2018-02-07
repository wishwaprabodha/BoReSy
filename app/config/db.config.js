const Sequelize = require('sequelize');

const UserModel = require('./../models/user.model');
const BoardingModel = require('./../models/boarding.model');
const ReservationModel = require('./../models/reservation.model');

module.exports = function () {
    const connection = new Sequelize('null', 'null', 'null', {
        dialect: 'sqlite',
        storage: 'db/boresy-db.sqlite',
        operatorsAliases: false
    })

    UserModel.init(connection);
    BoardingModel.init(connection, UserModel.get());
    ReservationModel.init(connection, UserModel.get(), BoardingModel.get());

    connection.sync();
}