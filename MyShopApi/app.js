const express=require('express')
const app=express();
const productsRequest=require('./api/routes/products')
const orderRequest=require('./api/routes/orders')
const morgan=require('morgan')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')

// app.use((req,res,next)=>{

//     res.status(200).json({
//         message:"It is working man"
//     })

// })
//ssss
mongoose.connect('mongodb+srv://fidelomolo:morris@cluster0-yackt.mongodb.net/test?retryWrites=true',{
      useNewUrlParser:true
    
})

// const MONGODB_URI = "mongodb://host-name:27017/productsdb?authSource=admin";
// const MONGODB_USER = "fidelomolo";
// const MONGODB_PASS = "#Morris345";

// mongoose.connect(MONGODB_URI, {
//     auth: {
//       user:'fidelomolo',
//       password:'#Morris345'
//     },
//     useNewUrlParser:true
//   }, function(err, client) {
//     if (err) {
//       console.log(err);
//     }
//     console.log('connect!!!');
//   });


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use((req,res,next)=>{
//prevents CORS Error, client and server being on different ports making it impossible to share resources
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","*")

    if(req.method==='OPTIONS'){

        res.header("Access-Control-Allow-Methods",'PUT,POST,PATCH,GET,DELETE')
        return res.status(200).json({});
    }
    next()//must be called to allow other routes to take over
});



app.use('/products',productsRequest)
app.use('/order',orderRequest)


app.use((req,res,next)=>{

    const error=new Error('Resource Not found')
    error.status=404
    next(error)

})


app.use((error,req,res,next)=>{

    res.status(error.status||500)
    res.json({
        error:{
            message:error.message
        }
    })
})



module.exports=app