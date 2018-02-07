const Sequelize = require('sequelize');

let Reservation;

const init = function (connection, User, Boarding) {
    Reservation = connection.define ('reservation', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        boardingId: {type: Sequelize.INTEGER, allowNull: false, references: {
            model: Boarding,
            key: 'id'
        }},
        seekerId: {type: Sequelize.INTEGER, allowNull: false, references: {
            model: User,
            key: 'id'
        }}
    });
}

const get = function() {
    return Reservation;
}

module.exports = {
    init: init,
    get: get
}