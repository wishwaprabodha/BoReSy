const Sequelize = require('sequelize');

let Boarding;

const init = function (connection, User) {
    Boarding = connection.define ('boarding', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        ownerId: {type: Sequelize.INTEGER, allowNull: false, references: {
            model: User,
            key: 'id'
        }},
        capacity: {type: Sequelize.INTEGER, allowNull: false},
        rental: {type: Sequelize.DECIMAL, allowNull: false},
        advance: {type: Sequelize.DECIMAL},
        address: {type: Sequelize.STRING, allowNull: false},
        gender: {type: Sequelize.STRING(1), allowNull: false}
    });
}

const get = function() {
    return Boarding;
}

module.exports = {
    init: init,
    get: get
}