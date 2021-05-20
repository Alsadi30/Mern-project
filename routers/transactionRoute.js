const router = require('express').Router()
const {create,getAll,getSingleTransaction,remove,update} = require('../controllers/transactionController')
const authenticate = require('../authenticate')


router.get('/', authenticate, getAll)

router.post('/', authenticate,create)



router.get('/:transactionId', authenticate,getSingleTransaction)



router.post('/:transactionId', authenticate,update)


router.delete('/:transactionId', authenticate,remove)


module.exports = router