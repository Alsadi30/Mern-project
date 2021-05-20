const  express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRouter = require('./routers/userRoute')
const TransactionRoute = require('./routers/transactionRoute')
const passport = require('passport')


const app = express()

const middleware = [
    morgan('dev'),cors(),bodyParser.urlencoded({extended:false}),bodyParser.json()
]

middleware.map(item => app.use(item))
app.use(passport.initialize())
require('./passport')(passport)

app.use('/api/users',userRouter)
app.use('/api/transactions',TransactionRoute)

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}



app.get('/',(req,res)=>{
    res.json({
        message:'Welcome to Our Application'
    })
})

const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`),
    mongoose.connect(`mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@blog-1.zkv8i.mongodb.net/BLOG-1?authSource=admin&replicaSet=atlas-vroaam-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`,{ useNewUrlParser: true,useUnifiedTopology: true , useFindAndModify: false },()=>{                                                                                
        console.log('moongooseEE')

    })
})