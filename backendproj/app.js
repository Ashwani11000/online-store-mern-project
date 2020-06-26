require("dotenv").config();

const mongoose = require("mongoose");
const express= require("express");
const app= express();

mongoose.connect(process.env.DATABASE,
{ useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex : true}).then(()=>{
    console.log("DB CONNECTED");
}).catch((err) => {
     console.log("DB Error"+err)});

//Use this as cmd "C:\Program File,s\MongoDB\Server\4.2\bin\mongo.exe"


const port = process.env.PORT || 8000;

app.listen (port, () => {
    console.log(`app is running at ${port}`);
});