const express = require('express')
const bodyParser = require("body-parser");
const router = express.Router();
const Product = require('../models/product')

router.get('/', async (req,res)=>{
try{
  const productlist = await Product.aggregate([
    {
      $lookup:{
        from:"categories",
        localField:"catid",
        foreignField:"_id",
        as:"category"

      }
    },{
      $lookup:{
        from:'types',
        localField:"typeid",
        foreignField:"_id",
        as:"type"
      }
    },{
    $unwind:"$category"
    },{
      $unwind:"$type"
    },{
     
        $project: {
          _id: 1,
          productname: 1,
          price: 1,
          status: 1,
          catname: '$category.catname', 
          type:'$type.method'
        }
      
    }
  ])

  res.send(productlist)
}catch(error){
  res.send(error)
}
})



router.post('/', async (req,res)=>{
  try{
    const newproduct = new Product(req.body);
    await newproduct.save()
    res.status(201).send(newproduct)
     
  }catch(error){
    res.status(500).send(error)
  }
})


router.delete('/:id', async (req,res)=>{
  try{
    const deleteproduct = await Product.findByIdAndDelete(req.params.id)
    if(!deleteproduct){
      res.status(404).send("not found")
    }
    else{
      res.send(deleteproduct)
    }
  }
  catch(error){
    res.status(404).send(error)
  }
} )

router.patch('/:id', async (req,res)=>{
  try{
    const updatestatus = await Product.findByIdAndUpdate(req.params.id,{status:req.body.status})
    if(!updatestatus){
      res.status(404).send('product not found')
    }else{
      res.status(200).send("updated")
    }
    
  }catch(error){
    res.status(500).send('internal server error')
  }
})

   module.exports = router