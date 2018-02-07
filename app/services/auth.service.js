const UserModel = require('./../models/user.model');

var signUp = function (user) {
    const User = UserModel.get();
    return new Promise((resolve, reject) => {
        User.create(user, {
            isNewRecord: true
        })
            .then(result => {
                resolve(result.id);
            })
            .catch(err => {
                reject(err);
            });
    });
};

var login = function (email, password) {
    const User = UserModel.get();
    return User.findOne({
        where: {
            email: email,
            password: password
        }
    });
};

module.exports = {
    signUp: signUp,
    login: login
}