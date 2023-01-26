const {Products} = require("../models")

class Controller{
    static async getProduct(req,res,next){
        try {
            const result = await Products.findAll()
            res.status(200).json(result)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static addToChart(req,res,next){

    }
}

module.exports = Controller