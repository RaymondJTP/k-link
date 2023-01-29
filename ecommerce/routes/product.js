const router = require('express').Router()
const productController = require('../controllers/productController')
const authorization = require('../middlewares/authorization')

router.get('/', productController.getProduct)
router.post('/', authorization, productController.addProduct)
router.post('/:id', productController.addToChart)
router.post('/:id/payment', productController.paymentProduct)

module.exports = router