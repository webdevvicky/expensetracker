const mongoose = require('mongoose')

const User = mongoose.model('user',{
    username:{
        type:String,
        required:true,
        minlength:5,
        maxlength:10,
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:10
    },
    status:{
        type:Boolean,
        default:true
    },
    created:{
        type:Date,
        default:Date.now
    }
})

module.exports = User