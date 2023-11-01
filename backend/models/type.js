const mongoose = require('mongoose')

const Type = mongoose.model('type',{
    method:{
       type:String,
        required:true,
        minlength:2,
        maxlength:10,
    },
    catid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categories'
  },
  })

  module.exports = Type