const express=require('express')
const router=express.Router()
const Sequelize = require('sequelize');
const bodyParser = require('body-parser')

const app=express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//importing express handlebars dependency
const exphbs  = require('express-handlebars');

//setting the handlebars middleware
//the two lines needed for handle bars to work
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');




// Option 1: Passing parameters separately
const sequelize = new Sequelize('clubs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });


  //used to ckeck whether connection is successful or not
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


  const User = sequelize.define('user_clubs', {
    // attributes
    clubName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    managerName: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    points: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    // options
  });
  

  app.get('/',(req,res)=>{
 
    res.send("<h1>I am working very fine</h1>")

  })

  app.post('/clubs',(req,res)=>{

    var club_name=req.body.name;
    var club_manager=req.body.manager;
    var club_points=req.body.points;

   // console.log("clubs man = "+clublist)

    // Note: using `force: true` will drop the table if it already exists
      User.sync({ force: false }).then(() => {
        // Now the `users` table in the database corresponds to the model definition
        return User.create({
          clubName: club_name,
          managerName: club_manager,
          points:club_points
        }).then((clubs)=>{

          res.json({
            message:'data saved successfully',
            clubName: clubs.clubName,
            managerName: clubs.managerName,
            points:clubs.points
          })


        })
      })

  })



  
  app.get('/clubs',(req,res)=>{

    var club_name=req.body.name;
    var club_manager=req.body.manager;
    var club_points=req.body.points;

   // console.log("clubs man = "+clublist)

    // Note: using `force: true` will drop the table if it already exists
      User.sync({ force: false }).then(() => {
        // Now the `users` table in the database corresponds to the model definition
        return User.findAll({
          order: [
            ['points', 'DESC'],
            
        ],
        attributes: ['clubName', 'points','managerName']
        }).then(users => {

          console.log("All users:", JSON.stringify(users, null, 4));

           res.json(users);
        
        });
      })

  })

  const PORT_NO=process.env.PORT||5400;
  app.listen(PORT_NO,()=>{
      console.log("server running successfully.....")
  })