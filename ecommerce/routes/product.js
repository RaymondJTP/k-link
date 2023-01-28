const router = require('express').Router()
const productController = require('../controllers/productController')

router.get('/', productController.getProduct)
router.post('/', productController.addProduct)

module.exports = router