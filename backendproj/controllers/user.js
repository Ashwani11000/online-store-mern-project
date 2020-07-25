const User = require("../models/user");

exports.getUserById = (req,res,next,id) => {
    User.findById(id).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            });
        }
        req.profile = user;
        next();
      
    });
};

// exports.getAllUsers = (req,res,next) => {
//     User.find().exec((err, users) =>{
//         if(!users || err){
//             return res.status(400).json({
//                 error: "No user found"
//             });
//         }
//         res.json(users);
//     });
      
    
// };

exports.getUser = (req,res) => {
    //TODO: password remaining
    req.profile.salt =""; //can be set as undefined
    req.profile.encrypt_password=undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
}
