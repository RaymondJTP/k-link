const {Users} = require('../models')
const {verifyToken} = require('../helpers/jwt')

const authentication = async(req,res,next) => {
    try {
        const{access_token} = req.headers
        console.log(access_token, "ASUUUUUUUUUP");
        if(!access_token){
            throw {name: 'Unauthorized'}
        }

        const tokenPayLoad = verifyToken(access_token)
        console.log(tokenPayLoad, '<<<<<<<< ASUUUUUP PISAAAAN');
        const getUser = await User.findOne({where:{email:tokenPayLoad.email}})
        
        if(!getUser){
            throw{name: 'Unauthorized'}
        }

        req.user = {
            id: getUser.id,
            email: getUser.email,
            role: getUser.role
        }
        next()

    } catch (err) {
        next(err)
    }
}

module.exports = authentication