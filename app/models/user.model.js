const Sequelize = require('sequelize');

let User;

const init = function (connection) {
    User = connection.define ('user', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        fullName: {type: Sequelize.STRING, allowNull: false},
        contact: {type: Sequelize.STRING(10), allowNull: false},
        nic: {type: Sequelize.STRING(10)},
        address: {type: Sequelize.STRING},
        type: {type: Sequelize.STRING(1), allowNull: false},
        gender: {type: Sequelize.STRING(1), allowNull: false},
        email: {type: Sequelize.STRING, allowNull: false, unique: true},
        username: {type: Sequelize.STRING(20), allowNull: false, unique: true},
        password: {type: Sequelize.STRING}
    });
}

const get = function() {
    return User;
}

module.exports = {
    init: init,
    get: get
}