const router = require('express').Router()
const historyController = require('../controllers/historyController')

router.get('/', historyController.getHistoryPayment)

module.exports = router