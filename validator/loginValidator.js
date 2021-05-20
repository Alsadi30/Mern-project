const {body} = require('express-validator')

exports.loginValidator = [
    body('email')
     .not()
     .isEmpty()
     .withMessage("Email Can Not be Empty")
     .isEmail()
     .withMessage('Please Provide a Valid Email'),

    body('password')
         .not()
         .isEmpty()
         .withMessage("password Can Not be Empty") 
         .isLength({min:6})
         .withMessage('password cannot be less than 6 chars ')
         
] 
