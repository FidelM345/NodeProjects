const express=require('express')

const router=express.Router();
 

router.get('/',(req,res,next)=>{

    res.status(200).json({
        message:'order lists will be displayed here'
    })

})

router.get('/:orderID',(req,res,next)=>{

    res.status(200).json({
        message:'This is my single order',
        productid:req.params.orderID
    })

})



router.post('/',(req,res,next)=>{

    res.status(201).json({
        message:'You have posted an order',
       
    })

})



router.patch('/:orderID',(req,res,next)=>{

    res.status(200).json({
        message:'you have updated the order',
        productid:req.params.orderID
    })

})


router.delete('/:orderID',(req,res,next)=>{

    res.status(200).json({
        message:'you have deleted the order',
        productid:req.params.orderID
    })

})

module.exports=router;