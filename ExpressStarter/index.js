const express=require('express')
const path=require('path')

const router=express.Router();

//importing express handlebars dependency
var exphbs  = require('express-handlebars');

const members=require('./datasource')

//create express application
const app=express();

//setting the handlebars middleware
//the two lines needed for handle bars to work
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Body parser middleware
app.use(express.json())//handle raw json
app.use(express.urlencoded({extended:true}))//handles url encoded data or form data

const logger=(req,res,next)=>{
    console.log("I am the beast")
    next()
}

app.use(logger)



//using the templating engine
app.get('/home', function (req, res) {

    res.render('home',{
        title:'I am the users Home page',
        members
    });

});



app.get('/forms', function (req, res) {
    res.render('forms');
});


//......................


app.get('/',(req,res)=>{

    //res.send("<h1>I am the Home page</h1>")
    console.log("directory name ="+path.join(__dirname,'public','index.html'))
    res.sendFile(path.join(__dirname,'public','index.html'))

})


app.get('/about',(req,res)=>{

    console.log("directory name ="+path.join(__dirname,'public','about.html'))
    res.sendFile(path.join(__dirname,'public','about.html'))

})

app.get('/contacts',(req,res)=>{

    res.sendFile(path.join(__dirname,'public','contacts.html'))
})

app.use('/api/users',require('./routes/api/members'))

app.post('/api/formdata', function (req, res) {

    console.log(req.body)
    res.json(req.body)
   // res.render('forms');
});


//app.use(express.static(path.join(__dirname,'public')))
const PORT_NO=process.env.PORT||5800;
app.listen(PORT_NO,()=>{
    console.log(`Server started successfully at port ${PORT_NO} .....`)
})


