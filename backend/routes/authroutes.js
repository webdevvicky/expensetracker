const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
    try {
        const existinguser = await User.findOne({ username: req.body.username });
        
        if (existinguser) {
            const validpassword = existinguser.password === req.body.password;
            
            if (validpassword) {
                res.status(200).send('Login success');
            } else {
                res.status(401).send('Incorrect password');
            }
        } else {
            res.status(404).send('User does not exist');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
