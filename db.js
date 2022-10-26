const bcrypt = require('bcryptjs');

function createUser(username, password, email, profile, callback) {
    const crytoPassword = bcrypt.hashSync(password, 12);
    global.db.collection("users").insertOne({ username, password: crytoPassword, email, profile }, callback);
}

function resetPassword(email, callback) {
    const utils = require('./utils');
    const newPassword = utils.generatePassword();
    const cryptoPassword = bcrypt.hashSync(newPassword, 10);
    global.db.collection("users").updateOne({ email: email }, { $set: { password: cryptoPassword } }, (err, res) => {
        callback(err, res, newPassword);
    });
}

function countAll(callback) {
    global.db.collection("users").countDocuments(callback);
}

const TAMANHO_PAGINA = 5;
function findAllUsers(pagina, callback) {
    const totalSkip = (pagina - 1) * TAMANHO_PAGINA
    global.db.collection("users").find().skip(totalSkip).limit(TAMANHO_PAGINA).toArray(callback);
}

module.exports = {
    createUser,
    resetPassword,
    findAllUsers,
    TAMANHO_PAGINA,
    countAll
}