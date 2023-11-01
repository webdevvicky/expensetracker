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


app.listen(PORT,()=>{
    console.log("app running sucesfully "+ PORT)
})

const authroutes = require('./routes/authroutes')
const categoryroutes = require('./routes/categoryroutes')
const productroutes = require('./routes/productroutes')
const typeroutes = require('./routes/typeroutes')
const userroutes = require('./routes/userroutes')

app.use('/login', authroutes)
app.use('/category', categoryroutes)
app.use('/product',productroutes)
app.use('/type',typeroutes)
app.use('/user',userroutes)

