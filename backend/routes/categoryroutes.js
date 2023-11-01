const express = require('express')
const bodyParser = require("body-parser");
const router = express.Router();
const Category = require('../models/category')


router.get('/',async (req,res)=>{
    try{
        const categories = await Category.find()

        res.send(categories)
    }catch(err){
        res.status(500).send(err)   
    }
})

router.post('/', async (req, res) => {
    try {
        const receivedData = new Category(req.body);
        console.log(req.body);
        
        const existingData = await Category.findOne({ catname: req.body.catname });

        if (existingData) {
            res.status(409).send('Data already exists');
        } else {
            await receivedData.save();
            res.status(201).send(receivedData);
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});


module.exports = router