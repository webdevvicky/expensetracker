const express = require('express')
const bodyParser = require("body-parser");
const cors = require('cors');
const session = require('express-session')
const { default: mongoose } = require('mongoose');
const app = express()
app.use(bodyParser.json());
app.use(cors())

const PORT = process.env.PORT || 3000

mongoose.connect('mongodb://127.0.0.1/dailyexpence');


app.use(session({
  secret: 'mission success',
  resave: false,
  saveUninitialized: true,
}));

const Category = mongoose.model('category',{
    catname:String ,
    status:Boolean
  });
  
  const Type = mongoose.model('type',{
    method:String,
    catid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categories'
  },
  })

const Product = mongoose.model('product',{
    productname:String,
    price:Number,
    status:Boolean,
    catname:String,
    catid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
    typeid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'types'
  },
})  

app.listen(PORT,()=>{
    console.log("app running sucesfully "+ PORT)
})














const categoryroutes = require('./routes/categoryroutes')
app.use('/helloworld', categoryroutes)









//// get all products ///////////////////////////////////////////////

app.get("/product", async (req,res)=>{

try{
    const cat = await Product.find()
    res.send(cat)

   
}
catch(error){
res.send(error)
console.log("er")
}
   
})


function authenticate(req,res,next){


  const {username,password}  = req.body
console.log(req.body)
 
  const validUsername = 'admin';
  const validPassword = 'admin';

  if(validUsername===username && validPassword===password){

    
    

    console.log("authenticated")

   next()
  }
  else{
    return res.status(401).send('Unauthorized');
  }
}



 app.post('/user' , async (req,res)=>{

  const {username,password}  = req.body

console.log(password)

  res.send('success')
 })

 app.get('/logout', authenticate,(req, res) => {
  // Implement logout logic here
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    } else {
      res.redirect('/productwithall'); // Redirect to the home page or another appropriate page
    }
  });
});
 



app.get("/productwithall" ,async (req,res)=>{
    let result = await Product.aggregate([
        {
            $lookup:{
                from: 'categories',
                localField: 'catid',
                foreignField: '_id',
                as: 'category'

            },
            
        },
      {
        $lookup:{
          from: 'types',
          localField: 'typeid',
          foreignField: '_id',
          as: 'type'

      },
      },
        {
            $unwind: '$category'
           
        },
        {
          $unwind:'$type'
        },
        
           {
            $project: {
                _id: 1,
                productname: 1,
                price: 1,
                status: 1,
                catname: '$category.catname', 
                type:'$type.method'
              }
           }
    ]).catch((err,good)=>{
        if (err){
            console.log(err)
            return
        }
})

res.send(result)
})



//  create new catagory////////////////////////////////////////////////////

app.post('/catagory',async (req,res)=>{
    try{
      const catagory = new Category(req.body);
    
      await catagory.save();
      res.status(200).send(catagory)
    }
    catch(error){
  res.status(500).send(error)
    }
  })



  //////////////getting all type/////////////////////////

  app.get('/type',async (req,res)=>{
    try{
      const type = await Type.find()
      res.send(type)
  
      
  }
  catch(error){
  res.send(error)
  console.log("er")
  }
  })



  /////////////getting all catagory/////////////
  app.get('/catagory',async (req,res)=>{
    try{
      const cat = await Category.find()
      res.send(cat)
  
      
  }
  catch(error){
  res.send(error)
  console.log("er")
  }
  })


  /////posting new product////////////


  app.post('/product',async (req,res)=>{
    try{
      const product = new Product(req.body);
      console.log(req.body)
      await product.save();
      res.status(200).send(product)
    }
    catch(error){
  res.status(500).send(error)
    }
  })


  //////deleting old product ///////////


  app.delete('/product/:id', async (req,res)=>{
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