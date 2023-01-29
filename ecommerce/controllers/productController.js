const {Products, historypayment} = require("../models")
const redis = require("../helpers/configRedis")

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

    static async addToChart(req,res,next){
        try {
            const productId = +req.params.id;
            const userId = +req.user.id;
            const quantity = +req.body.quantity;

            //cari produk di database
            const findProduct = await Products.findByPk(productId);
            
            //jika produk tidak ditemukan
            if(!findProduct){
                throw ({name : 'notfound', message: `Product with id ${productId} is not found`})
            };

            if(findProduct.quantity == 0){
                throw ({name: 'notfound', message: 'Stock empty, stay tune for more updated stock!'})
            };

            //cek quantity
            if(findProduct.quantity < quantity){
                throw ({name : 'badrequest', message : `We only have ${findProduct.quantity}, please decrese your quantity input`})
            };

            //set data untuk redis
            findProduct.quantity = quantity
            findProduct.price = quantity * findProduct.price
            //input to cache redis
            await redis.set(`cartsuser${userId}product${productId}`, JSON.stringify(findProduct));

            res.status(200).json({message : `Product with id ${productId} hse been added to your cart`});
            
        } catch (err) {
            next(err)
        }
    }

    static async paymentProduct(req,res,next){
        try {
            const productId = +req.params.id;
            const userId = +req.user.id;
            const payment = +req.body.payment;

            const findProduct = await Products.findByPk(productId);

            const chartCache = await redis.get(`cartsuser${userId}product${productId}`);
            
            if(!chartCache){
                throw ({name: 'notfound', message: `There is no transaction with product number ${productId}`})
            }

            const getTransactionChart = JSON.parse(chartCache)
           
            if(getTransactionChart.price !== payment){
                throw({name:'badrequest', message: `Please compelete the payment with the exact amount`})
            };

            const result = await Products.update(
                {quantity : findProduct.quantity - getTransactionChart.quantity},
                {where: {id:productId}, returning : true}
            );

            await redis.del(`cartsuser${userId}product${productId}`)

            const history = await historypayment.create({
                userId,productId,quantity : getTransactionChart.quantity, totalAmount : payment
            });

            res.status(200).json({message : `Succes payment item with product id ${getTransactionChart.id}`});
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = Controller