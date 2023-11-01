const express = require('express')
const bodyParser = require("body-parser");
const router = express.Router();
const Type = require('../models/type')

router.get('/', async (req,res)=>{
    try{
        const type = await Type.find()
        res.send(type)
    }catch(error){
        res.send(error)
    }
})

module.exports = router