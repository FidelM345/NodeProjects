const express=require('express');
const router=express.Router();
const mongoose=require('mongoose')

const Product=require('../models/product')




router.get('/',(req,res,next)=>{

    res.status(200).json({
        message:'Handling GET request to /products'
    })

})


router.get('/:productID',(req,res,next)=>{

    const product_id=req.params.productID;

    // if(product_id==="beast"){
    //     res.status(200).json({
    //         message:'You are the Real BEast Man',
    //         id:product_id
    //     })

    // }else{
    //     res.status(200).json({
    //         message:'You have passed a get parameter id'
    //     })
    // }

    Product.findById(product_id).exec()
    .then((doc)=>{

        console.log(doc)
        res.status(200).json(doc)

    })
    .catch((error)=>{

        console.log(error)
        res.status(500).json({err:{error}} )

    })

  

})



// router.post('*',(req,res,next)=>{

//     var productInfo={
//         name:req.query.name,
//         price:req.query.price
//     }

//     res.status(201).json({
//         message:'Handling POST request to /products',
//         productInfo:productInfo
//     })

// })


router.post('/',(req,res,next)=>{

    // var productInfo={
    //     name:req.body.name,
    //     price:req.body.price
    // }

    const productM=new Product(
        {
            _id:new mongoose.Types.ObjectId(),
            name:req.body.name,
            price:req.body.price
        }
    )
//save data inthe database
    productM.save().then((result)=>{
        console.log(result)
        res.status(201).json({
            message:'Handling POST request to /products',
            productInfo:productM
        })
    }).catch((err)=>{
        console.log(err)
    });

   

})



router.patch('/:productID',(req,res,next)=>{

    const product_id=req.params.productID;

    res.status(200).json({
        message:'You have updated the product',
        id:product_id
    })
    
  
})


router.delete('/:productID',(req,res,next)=>{

    const product_id=req.params.productID;

    res.status(200).json({
        message:'You have deleted the product',
        id:product_id
    })
    
  
})




module.exports=router;

