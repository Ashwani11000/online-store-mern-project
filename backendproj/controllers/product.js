const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById= (req,res,next,id)=>{

    Product.findById(id)
    .populate("category")//populate on the basis of category
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"No product found"
            })
        }
        req.product= product ;
        next();
    });
};

exports.createProduct = (req,res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true; // To store the extensions jpeg png etc
    form.parse(req, (err, fields, file)=>{
        if(err){
            return res.status(400).json({
                error: "Problem with image"
            });
        }

        //destructure the fields to validate
        const {name, description, price, category, stock} = fields;
        // Some restrictions 
        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({
                error:"Please include all fields"
            });

        }
        
        let product = new Product(fields);


        // handle file here
        if(file.photo){
            if(file.photo.size > 3000000)
            {
                return res.status(400).json({
                    error:"File size is too big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        //save to DB
            product.save((err,product)=>{
                if(err){
                    return res.status(400).json({
                        error:" File not saved"
                    });
                }
                res.json(product);
            });
        
    });

};

exports.getProduct = (req,res)=>{
    // bigger files shouldnt be sent along with get requests so remove the image
    req.product.photo=undefined;
    return res.json(req.product);

};
// middleware for photo loading in the background
exports.photo = (req,res,next)=>{
    if(req.product.photo.data){//safe chaining
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();

};

exports.deleteProduct = (req,res)=>{
    let product = req.product;
    product.remove((err, deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete the product"
            });
        }
        res.json({
            message:"Deletion was a success",
            deletedProduct
        });
    });
};


exports.updateProduct = (req,res)=>{

    let form = new formidable.IncomingForm();
    form.keepExtensions = true; // To store the extensions jpeg png etc
    form.parse(req, (err, fields, file)=>{
        if(err){
            return res.status(400).json({
                error: "Problem with image"
            });
        }        
        //updation code
        //instead of a new product here we are taking the current product
        let product = req.product;
        product = _.extend(product, fields);// product here is the current product and the fields (from formidable ) define the changes to be made


        // handle file here
        if(file.photo){
            if(file.photo.size > 3000000)
            {
                return res.status(400).json({
                    error:"File size is too big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        //save to DB
            product.save((err,product)=>{
                if(err){
                    return res.status(400).json({
                        error:"Product updation failed"
                    });
                }
                res.json(product);
            });
        
    });

};


exports.getAllProducts =(req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8; // either take req.query.limit as limit if present or 8
    let sortBy= req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
    .select("-photo")// - removes the field mentioned
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"No product found"
            });
        }
        res.json(products);
    });
};

exports.getAllUniqueCategories=(req,res)=>{
    Product.distinct("category",{},(err,categories)=>{
        if(err){
            return res.status(400).json({
                error:"Error in getting categories"
            });
        }
        res.json(categories);
    });
};

exports.updateStock =(req,res,next)=>{
    let myOperations = req.body.order.products.map(product => {
        return {
            updateOne :{
                filter: {_id: product._id},
                update: {$inc: {stock: -product.count,sold: +product.count}}
            }
        }
    });

    Product.bulkWrite(myOperations,{}, (err,products)=>{
        if(err){
            return res.status(400).json({
                error: "Bulk operation failed"
            });
        }
        next();
    });
};

