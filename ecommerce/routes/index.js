const router = require('express').Router()
const userRouter = require("./user")
const productRouter = require("./product")
const authentication = require('../middlewares/authentication')
const errorHandler = require('../middlewares/erroHandler')

router.use('/', userRouter)
router.use('/products', authentication ,productRouter)
router.use(errorHandler)

module.exports = router