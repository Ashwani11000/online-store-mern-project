
exports.signout= (req,res) =>
{
    res.json({
        message : "user signed out successfully."
    });
};

exports.signup = (req, res) =>{
    console.log("REQUEST BODY:", req.body);
    res.json({
        message : "user signed up successfully."
    });
};
