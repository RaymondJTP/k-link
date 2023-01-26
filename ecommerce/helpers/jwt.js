const jwt = require('jsonwebtoken');


function signToken(tokenPayLoad){
    return jwt.sign(tokenPayLoad, "klink");
}

function verifyToken(access_token){
    return jwt.verify(access_token, "klink" );
}


module.exports = {
    signToken,
    verifyToken
}