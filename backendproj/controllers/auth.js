const User = require("../models/user");
const {body, validationResult} = require("express-validator");

exports.signout= (req,res) =>
{
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

