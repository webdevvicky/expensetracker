const mongoose = require('mongoose')


const Category = mongoose.model('category',{
    catname:{
        type:String,
        required:true,
        minlength:2,
        maxlength:10,
    } ,
    status:{
      type:Boolean,
      default:true
    }
  });

module.exports = Category