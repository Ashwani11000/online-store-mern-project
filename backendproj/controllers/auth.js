const User = require("../models/user");
const {body, validationResult} = require("express-validator");
var jwt = require("jsonwebtoken");
var expJwt = require("express-jwt");

exports.signout= (req,res) =>
{
    res.clearCookie("token");
    res.json({
        message : "user signed out successfully."
    });

};

exports.signup = (req, res) =>{
    
    const errors= validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(422).json({
            error : errors.array()[0].msg,
            param : errors.array()[0].params
        })
    }
    
    const user = new User(req.body);
    user.save((err, user)=>{
        if(err)
        {
            console.log(err);
            return res.status(400).json({
                err: "Not able to save user in the database"
            });
        }
      res.json({
          name: user.name,
          email: user.email,
          id: user._id
      });
    });
    
};


exports.signin = (req, res) =>{
    const errors= validationResult(req);
    const {email, password} = req.body; // Destructuring of data later email is passed to findOne and password is passed to authenticate
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            error : errors.array()[0].msg,
            param : errors.array()[0].params
        })
    }
    User.findOne({email}, (err, user)=>{ //  It finds the very firstv occurence of the property passed i.e. Email
        if(err || !user)
        {
            return res.status(400).json({
                error: "User email does not exist."
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error : "Email and password do not match"
            })
        }
        //make a token and put it in a cookie while sign up
        const token = jwt.sign({_id: user._id}, process.env.SECRET);
        // cookie making ;)
        res.cookie("token", token, {expire: new Date()+9999});

        // send response on front end
        const {_id, name, email, role} = user;
        return res.json({
            token, 
            user: {_id, name, email, role}
        });

    });
   
        
};

