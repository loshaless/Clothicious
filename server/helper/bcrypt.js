const bcrypt = require('bcrypt');
const saltRounds = 10;

function hash(plainPassword) {
    return bcrypt.hashSync(plainPassword, saltRounds);
}

function compare(plainPassword, encryptedPassword) {
    return bcrypt.compareSync(plainPassword, encryptedPassword)
}

module.exports = { hash, compare }