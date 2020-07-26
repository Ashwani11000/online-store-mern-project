require("dotenv").config();

const mongoose = require("mongoose");
const express= require("express");
const app= express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
// auth.js can be named as auth also

const userRoutes = require("./routes/user");
// user routes

const categoryRoutes = require("./routes/category");

const productRoutes = require("./routes/product");

const orderRoutes = require("./routes/order");


//Use this as cmd "C:\Program File,s\MongoDB\Server\4.2\bin\mongo.exe"

//DB CONNECTION
mongoose.connect(process.env.DATABASE,
{ useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex : true}).then(()=>{
    console.log("DB CONNECTED");
}).catch((err) => {
     console.log("DB Error"+err)});
// run().then().catch()

// body-parser --Parse incoming request bodies in a middleware before your handlers, available under the req.body property
// cookie-parser
// cors - Cross Origin Resource Sharing
//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//ROUTES
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);


// PORT
const port = process.env.PORT || 8000;

//Starting the server
app.listen (port, () => {
    console.log(`app is running at ${port}`);
});