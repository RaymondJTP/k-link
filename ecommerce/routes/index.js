const router = require('express').Router()
const userRouter = require("./user")
const productRouter = require("./product")
const historyRouter = require('./history')
const authentication = require('../middlewares/authentication')
const errorHandler = require('../middlewares/erroHandler')

router.use('/', userRouter)
router.use(authentication)
router.use('/products', productRouter)
router.use('/history', historyRouter)
router.use(errorHandler)

module.exports = router