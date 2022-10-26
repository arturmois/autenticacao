const bcrypt = require('bcryptjs');

function createUser(username, password, email, callback) {

    const crytoPassword = bcrypt.hashSync(password, 12);
    global.db.collection("users").insertOne({ username, password: crytoPassword, email }, callback);

}

module.exports = { createUser }