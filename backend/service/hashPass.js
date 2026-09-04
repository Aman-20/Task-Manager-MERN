const bcrypt = require("bcrypt");

async function createHashPass(plainPass){
    const hashPass = await bcrypt.hash(plainPass, 10);
    return hashPass;
}

async function checkHashPass(plainPass, hashPass ){
    const isMatch = await bcrypt.compare(plainPass, hashPass);
    return isMatch;
}

module.exports = {createHashPass, checkHashPass};