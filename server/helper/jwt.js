var jwt = require('jsonwebtoken');
let JWT_PASSWORD = process.env.JWT_PASSWORD

function generateToken(payload) {
    return jwt.sign(payload, JWT_PASSWORD);
}

function verivyToken(access_token) {
    return jwt.verify(access_token, JWT_PASSWORD);
}

module.exports = { generateToken, verivyToken }