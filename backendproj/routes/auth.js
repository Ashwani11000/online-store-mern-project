const express= require('express');
const router = express.Router();

const {signout , signup} = require("../controllers/auth.js")

const { body, validationResult} = require("express-validator");


router.get("/signout" , signout);

router.post("/signup", [
    body("name", "Name should be minimum 3 characters").isLength({min:3}),
    body("email", "Email is invalid").isEmail(),
    body("password", "Password should be minimum 8 characters").isLength({min:8})

], signup);

module.exports = router;