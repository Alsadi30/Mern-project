const passport = require('passport')

 module.exports = (req,res,next)=>{
     passport.authenticate('jwt',(err,user,info)=>{
         if(err){
             console.log(err)
             console.log(info)
             return next(err)
         }

         if(!user){
            console.log(info,err,user)
             return res.status(401).json({
                message:'Authentication Failed'
             })
         }

         req.user = user 
         return next()
     })(req,res,next)
 }