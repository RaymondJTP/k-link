const {Users,historypayment,Products} = require("../models")

class Controller{

    static async getHistoryPayment(req,res,next){
        try {
            console.log(+req.user.id);
            const userId = +req.user.id
            console.log(userId);
            //mencari history pembayaran berdasarkan userId
            const result = await historypayment.findAll({
                where : {
                    userId
                },
                include : [
                    {
                        model : Products
                    },
                    {
                        model : Users
                    }
                ]
            });

            //cek jika tidak history payment
            if(!result){
                throw ({name : 'notfound', message : `You have not history payment yet`})
            }

            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

}

module.exports = Controller