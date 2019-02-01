'use strict'

var jwt = require('jsonwebtoken');
var moment = require('moment');
var secret = "utem2018";

exports.createToken = function(usuario) {
    var payload = {
        id: usuario.id,
        username: usuario.username,
        password: usuario.password,
        iat: moment().unix(),
        exp: moment().add(9, 'days').unix()

    };
    return jwt.encode(payload, secret);
}