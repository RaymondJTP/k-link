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

    static async addProduct(req,res,next){
        try {
            const {productName,quantity,price,description} = req.body;
            
            const findProduct = await Products.findOne({
                where : {productName}
            });

            if(findProduct){
                throw ({name: 'productused', message : 'Please input product with different name'})
            };

            const result = await Products.create({
                productName,quantity,price,description
            });

            res.status(201).json(result)
        } catch (err) {
            next(err);
        }
    }

    static addToChart(req,res,next){

    }
}

module.exports = Controller