var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
const crypto = require('crypto');
const uuidv1= require('uuid/v1');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true
  },
  lastname: {
    type: String,
    maxlength: 32,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  userinfo: {
    type: String,
    trim: true
  },
  encrypt_password: {
    type: String,
    required: true
  },
  salt: {
    type: String
  },
  role :{
    type: Number,
    default: 0
  },
  purchases: {
    type: Array,
    default: []
  }

},{
  timestamps: true
}
);
userSchema.virtual("password")
  .set(function(password){
    this._password = password
    this.salt = uuidv1();
    this.encrypt_password = this.getSecurePass(password);
  })
  .get(function(){
    return this._password;
  });


userSchema.methods = {
  authenticate: function(plainpassword){
    return this.getSecurePass(plainpassword) === this.encrypt_password;
  },

  getSecurePass: function(plainpassword){
    if(!plainpassword) return "";
    try {
        return crypto.createHmac('sha256', this.salt)
        .update(plainpassword)
        .digest('hex');
    }
    catch(err) {
      return "";
    }
  }
};



module.exports = mongoose.model("User", userSchema);
