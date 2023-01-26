const {Users} = require("../models")
const {comparePassword} = require('../helpers/bcrypt')
const {signToken} = require('../helpers/jwt')

class Controller{
    static async register(req,res,next){
        try {
            const{name,email,password,role,address} = req.body
            const findUser = await Users.findOne({
                where : {
                    email
                }
            })

            if(findUser){
                throw ({name: 'unique', message: 'email has been used, please try login'})
            }
            const result = await Users.create({name,email,password,role,address})
            res.status(201).json(result)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async login(req,res,next){
        try {
            console.log(26);
            const{email,password} = req.body

            //cek data user apakah ada di db
            const user = await Users.findOne({
                where: {email}
            })

            //jika data user tidak ada
            if(!user){
                throw ({name: 'invalidlogin'})
            }
            
            //jika ada, cek passwordnya
            let isValidPassword = comparePassword(password,user.password)
            
            //jika password tidak cocok
            if(!isValidPassword){
                throw ({name: 'invalidlogin'})
            }

            //jika email dan password cocok
            let tokenPayLoad = {id: user.id, email: user.email}
            let access_token = signToken(tokenPayLoad)
            res.status(200).json({message: 'Login Success', access_token, user})

        } catch (err) {
            console.log(err);
            next(err)
            
        }
    }
}

module.exports = Controller