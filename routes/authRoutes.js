const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

router.post('/signup', authController.register)
router.post('/login', authController.login)
router.get('/user/:userId', authController.getUserInformation)
router.get('/addmoney/:userId', authController.addMoneyToUser)
module.exports = router