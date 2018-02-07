const httpService = require('./../services/http.service');

var auth = function (req, res, next) {
    if (req.session.auth) {
        next();
    } else {
        res.redirect('/login');
    }
}

var access = function (userTypes) {
    return function (req, res, next) {
        let currentUserType = req.session.auth.type;
        let hasPermission = false;

        for (let userType of userTypes) {
            if (currentUserType === userType) {
                hasPermission = true;
                break;
            }
        }

        if (hasPermission) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}

module.exports = {
    auth: auth,
    access: access
}