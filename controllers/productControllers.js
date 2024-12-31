const product = require("../models/ProductSchema")
const category = require("../models/categorySchema")
const subCategory = require("../models/subCategorySchema")
const extraSubCategory = require("../models/extraSubCategorySchema")
const fs = require('fs')
module.exports.addProductPage = async(req,res)=>{
    try {
        let Category = await category.find({});
        let Subcategory = await subCategory.find({})
        let ExtraSubcategory = await extraSubCategory.find({})
        console.log(ExtraSubcategory);
        
        res.render('./pages/addProducts',{
            Category,Subcategory,ExtraSubcategory
        })
    } catch (error) {
        
    }
}

module.exports.addProduct =async (req,res) => {
    try {

        console.log(req.file);
        console.log(req.body);
        if (req.file) {
            req.body.image = req.file.path
        }
        let data = await product.create(req.body);
        console.log(data);
        return res.redirect(req.get('Referrer'||'/'));
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer'||'/'));
    }
}

module.exports.viewProductPage = async(req,res)=>{
    try {
        let Product = await product.find({}).populate('categoryId').populate('subCategoryId').populate('extraSubCategoryId');
        console.log(Product);
        // return res.json(Product)
        return res.render('./pages/viewProducts',{Product})
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer'||'/'));
    }
}
module.exports.editProductPage = async(req,res)=>{
    try {
        let {id} = req.params
        let Product = await product.findById(id);
        console.log(Product);
        return res.render('./pages/editProduct',{Product})
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer')||'/');
    }
}
module.exports.editProduct = async(req,res)=>{
    try {
        let {id} = req.params;
        if (req.file) {
            req.body.image = req.file.path;
            fs.unlinkSync(req.body.oldImage)
        }
        console.log(req.file);
        
        let Product = await product.findByIdAndUpdate(id,req.body); 
        console.log(Product);
        console.log(req.file);
        return res.redirect('/product/viewProducts') 
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer')||'/');
    }
}
module.exports.deleteProduct = async(req,res)=>{
    try {
        let {id} = req.params;
               
        let Product = await product.findByIdAndDelete(id); 
        fs.unlinkSync(Product.image);
        return res.redirect('/product/viewProducts') 
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer')||'/');
    }
}