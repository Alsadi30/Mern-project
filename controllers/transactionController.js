const Transaction = require('../model/Transaction')
const User = require('../model/User')

module.exports = {
    create(req, res, next) {
        let {
            amount,
            note,
            type
        } = req.body
        let userId = req.user._id

        let transaction = new Transaction({
            amount,
            note,
            type,
            author: userId
        })
        transaction.save()
            .then(trans => {
                let updatedUser = {
                    ...req.user._doc
                }
                if (type === 'income') {
                    updatedUser.balance = updatedUser.balance + amount
                    updatedUser.income = updatedUser.income + amount
                } else {
                    updatedUser.balance = updatedUser.balance - amount
                    updatedUser.expense = updatedUser.expense + amount
                }

                console.log(updatedUser.transaction)
                updatedUser.transactions.push(trans._id)

                User.findByIdAndUpdate(updatedUser._id, {
                        $set: updatedUser
                    }, {
                        new: true
                    })
                    .then(result => {
                        res.status(201).json({
                            message: 'Transaction Created Successfully',
                            ...trans._doc,
                            user: result
                        })
                    })
                    .catch(e => {
                        console.log(e)
                    })

            })
            .catch(e => {
                console.log(e)
                next(e)
            })
    },


    getAll(req, res) {
        let _id = req.user
        Transaction.find({author:_id})
            .then(transactions => {
                if (transactions.length === 0) {
                    res.status(200).json({
                        message: 'No Transaction Found'
                    })
                } else {
                    res.status(200).json(transactions)
                }
            })
            .catch(e => {

                    console.log(e)
                    res.status(501).json({
                        message: 'server error occour in getall'
                    })
                }

            )
    },

    getSingleTransaction(req, res) {
        let {
            transactionId
        } = req.params

        Transaction.findById(transactionId)
            .then(transaction => {
                if (!transaction) {
                    res.json(200).json({
                        message: 'No Transaction Found'
                    })
                } else {
                    res.status(200).json(transaction)
                }
            })
            .catch(error => {
                console.log(error)
                res.status(505).json({
                    message: 'error found in the update server '
                })

            })

    },


    update(req, res) {
        let {
            transactionId
        } = req.params
        Transaction.findOneAndUpdate({_id:transactionId}, {
                $set: req.body
            },{new:true})
            .then(result => {
                res.status(200).json({
                    message: 'Updated Successfully',
                    transaction:result
                })
            })
            .catch(e => {
                console.log(e)
                res.status(500).json({
                    message: 'error in updating server'
                })
            })
    },

    remove(req, res) {
        let {
            transactionId
        } = req.params

        Transaction.findOneAndDelete({_id:transactionId})
            .then(result => {
                res.status(200).json({
                    message: 'Deleted Successfully',
                    ...result._doc
                })
            })
            .catch(e => {
                console.log(e)
                res.status(500).json({
                    message: 'Server error occour in delete'
                })
            })
    }

}