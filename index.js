const express=require("express");
const dotEnv=require('dotenv');
const mongoose=require('mongoose');
const vendorRoute=require('./route/vendorRoute');
const bodyParser = require('body-parser');
const firmRoute=require('./route/firmRoute');
const productRoute= require('./route/productRoute');
const path=require('path');
const cors=require("cors");

const app=express()




const PORT=process.env.PORT||4000;

dotEnv.config();
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Successfully connected to database"))
.catch((error)=>console.log(error));



app.use(bodyParser.json());

app.use('/vendor',vendorRoute);
app.use('/firm',firmRoute);
app.use('/product',productRoute);
app.use('/uploads',express.static('uploads'));

app.listen(PORT,()=>{
    console.log(`server started and running at ${PORT}`)
})


app.use('/',(req,res)=>{
    res.send("<h1>welcome to zomat0");
})