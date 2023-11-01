const mongoose = require('mongoose')

const Product = mongoose.model('product',{
    productname:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20,
    },
    price:{
      type:Number,
        required:true,
        minlength:1,
        maxlength:10,
    },
    status:{
      type:Boolean,
      default:true
    },
    catid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
    typeid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'types'
  },
})  

module.exports = Product