const express=require('express')
const router=express.Router();

var users=require('../../datasource')


router.get('/',(req,res)=>{

    res.json(users)

})


router.get('/:age',(req,res)=>{

    const found=users.message.some((user)=>{
        //some method will return true or false depending on whethr the resource is found or not
        return user.age===parseInt(req.params.age);
    })
    
    if(found){
        res.json(users.message.filter((user)=>{
            return user.age===parseInt(req.params.age);
        }))
    }else{
        res.status(400).json(
            {
                message:`The user with the age = ${req.params.age} has not been found`
            }
        )
    }


})

router.post('/',(req,res)=>{
    

    var user={
        name:req.body.name,
        age:req.body.age,
        profession:req.body.profession

    }

    console.log(`name = ${req.body.name}, age = ${user.age},profession = ${user.profession}`)
    if(user.name&&user.age&&user.profession){

        users.message.push(user)
        //res.send(req.body)

        res.json(users)

    }else{

        res.status(400).json(
            {
                message:"Invalid request",
                body:{
                    name:"required",
                    age:"required",
                    profession:"required"
                }
            }
        )
    }
    
  
})


router.put('/:age',(req,res)=>{

   const found=users.message.some((user)=>{
        //some method will return true or false depending on whethr the resource is found or not
        return user.age===parseInt(req.params.age);
    })
    
    if(found){

        var upUser=req.body;
        var mato=null;

        users.message.forEach(user=>{
            if(user.age===parseInt(req.params.age)){
                //mato=user.name;
                user.name=upUser.name ?upUser.name:user.name ;
                user.age=upUser.age ?upUser.age:user.age;
                user.profession=upUser.profession ?upUser.profession:user.profession

                res.json({
                    message:`Member updated`,
                    body:user
                })
        

            }
        })


    }else{
        res.status(400).json(
            {
                message:`The user with the age = ${req.params.age} has not been found`
            }
        )
    }

})





router.delete('/:age',(req,res)=>{

    const found=users.message.some((user)=>{
        //some method will return true or false depending on whethr the resource is found or not
        return user.age===parseInt(req.params.age);
    })
    
    if(found){

        res.json({

           message:"Message deleted successfully",
           body: users.message.filter((user)=>{
                return user.age!==parseInt(req.params.age);
            })

        })
        
    }else{
        res.status(400).json(
            {
                message:`The user with the age = ${req.params.age} has not been found`
            }
        )
    }


})




module.exports=router; 