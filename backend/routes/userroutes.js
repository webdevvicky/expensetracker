const express = require('express')
const bodyParser = require("body-parser");
const router = express.Router();
const User = require('../models/user')


router.get('/', async (req,res)=>{
  try{
    const  userdata = await User.find()
    res.send(userdata)
  }catch(error){
    res.send(error)
  }
}) 

router.post('/', async (req, res) => {
    try {
        const receivedData = new User(req.body)
        const existingData = await User.findOne({ username: req.body.username });

        if (existingData) {
            res.status(409).send('user already exists');
        } else {
            await receivedData.save();
            res.status(201).send(receivedData);
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router