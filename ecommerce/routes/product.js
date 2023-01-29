const router = require('express').Router()
const productController = require('../controllers/productController')

router.get('/', productController.getProduct)
router.post('/', productController.addProduct)
router.post('/:id', productController.addToChart)
router.post('/:id/payment', productController.paymentProduct)

module.exports = router