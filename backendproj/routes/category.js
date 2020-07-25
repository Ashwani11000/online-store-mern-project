const express= require("express");
const router = express.Router();

const{getCategoryById, createCategory,getCategory,getAllCategories,updateCategory,deleteCategory} = require("../controllers/category");
const{isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const{getUserById} = require("../controllers/user");

router.param("userId", getUserById);// populate our profile field
router.param("categoryId",getCategoryById);


router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin, createCategory);
router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllCategories);
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory);
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteCategory);


module.exports =router;