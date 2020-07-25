const User = require("../models/user");
const Order = require("../models/order");


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
    
    req.profile.salt =""; //can be set as undefined
    req.profile.encrypt_password=undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
}

exports.updateUser =(req,res) =>{
    User.findByIdAndUpdate({_id:req.profile._id},
        {$set : req.body},
        {new : true, useFindAndModify: false},
        (err, user)=>{
            if(!user || err)
            {
                return res.status(400).json({
                    error:"Not able to update"
                })
            }
            user.salt =""; //can be set as undefined
            user.encrypt_password=undefined;
            res.json(user);
        }
        )
}

exports.userPurchaseList = (req,res) =>{
    Order.find({user: req.profile._id})
    .populate(
        "user", "_id name"
    ).exec((err,order)=>{
    if(err){
        return res.status(400).json({
            error:"No Order Present"
        });
    }
    return res.json(order);
    });
};


exports.pushOrderInPurchaseList = (req,res, next) =>{
    let purchases=[]
    req.body.order.products.forEach(product =>{
        purchases.push({
            _id : product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        });

    });

    //store this in DB
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases:purchases}},
        {new:true},
        (err, purchase)=>{
            if(err){
                return res.status(400).json({
                    error:"Unable to save purcchase list"
                });
            }
            next();
        }
    )
};
