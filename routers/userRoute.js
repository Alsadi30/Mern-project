const router = require('express').Router()

const {register, login, GetallUser} = require('../controllers/useController')
const {loginValidator} = require('../validator/loginValidator')


router.post('/register',register)


router.post('/login',loginValidator,login)


router.get('/all',GetallUser)


module.exports = router