const mongoose = require("mongoose");

const categorySchema= new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: true,
        unique: true
    }
}, {timestamps: true}); //whenever a new category is added to the schema it records the timestamp in the database
module.exports = mongoose.model("Category", categorySchema);
