const registerValidator = require('../validator/registerValidator')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const errorFormater = require('../utils/errorFormater')

const {
    validationResult
} = require('express-validator')
const jwt = require('jsonwebtoken');


exports.register = (req, res) => {
    let {
        name,
        email,
        password,
        confirmPassword
    } = req.body

    let validate = registerValidator({
        name,
        email,
        password,
        confirmPassword
    })

    if (!validate.isValid) {
        res.status(400).json(validate.error)
    } else {

        User.findOne({
                email
            })
            .then(user => {
                if (user) {
                    return res.status(400).json({
                        message: "Email Already Exist"
                    })
                }


                bcrypt.hash(password, 11, (err, hash) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            message: "Server Error Occurred pass problem"
                        })
                    }



                    let user = new User({
                        name,
                        email,
                        password: hash,
                       
                        expense:0,
                        income:0,
                        balance:0,
                        
                        transactions:[]
                    })

                    user.save()
                        .then(user => {

                            res.status(200).json({
                                message: "User Created Successfully",
                                user
                            })
                        })
                        .catch(e => {
                            console.log(e)
                            res.status(500).json({
                                message: 'Server Error Occurredd saving problem'
                            })
                        })
                })
            })
            .catch(e => {
                console.log(e)
                res.status(500).json({
                    message: 'Server Error Occurred server not found'
                })
            })


    }

}



exports.login = async (req, res) => {

    let {
        email,
        password
    } = req.body


    let errors = validationResult(req).formatWith(errorFormater)

    if (!errors.isEmpty()) {
        res.status(404).json({
            error:errors.mapped(),
            message: "user not found"
        })
    }

    try {
        let user = await User.findOne({
            email
        })

        if (!user) {
            res.status(400).json({
                message: "users not found"
            })
        }

        let match = await bcrypt.compare(password, user.password)

        if (!match) {
            res.status(402).json({
                message: "password doesnot match"
            })
        }
        if (match) {
            let token = jwt.sign({
                _id: user._id,
                name: user.name,
                email: user.email,
                balance:user.balance,
                income: user.income,
                expense: user.expense,
                transactions: user.transactions,
            }, 'SECRET', {
                expiresIn: '2h'
            })

            res.status(200).json({
                    message: "Successfully login",
                    token: `Bearer ${token}`

                })

            


        }

    } catch (e) {
        res.status(500).json({
            message: e.message
        })
        console.log(e)
        next(e)
    }



}

exports.GetallUser = async (req,res,next)=>{
   let users = await User.find()
    try{
        res.status(200).json(users)
    }catch(e){
        console.log(e)
        res.status(503).json('error at getting all user')
    }
}