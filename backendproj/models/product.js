const mongoose= require("mongoose");
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 3200
    },
    price: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },
    //Destruct mongoose
    category: {
        type: ObjectId,
        ref: "Category", //Schema name used in exports
        required: true
    },
    stock: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    }

},{
    timestamps: true
});


module.exports = mongoose.model("Product", productSchema);