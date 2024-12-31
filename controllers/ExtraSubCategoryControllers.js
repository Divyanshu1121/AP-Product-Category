const extraSubCategory = require("../models/extraSubCategorySchema")
const subCategory = require("../models/subCategorySchema")
const category = require("../models/categorySchema")
const fs = require('fs');



module.exports.addExtraSubCtegoryPage = async(req,res)=>{
    try {
        let Category = await category.find({});
        let Subcategory = await subCategory.find({});
        res.render('./pages/addExtraSubCategory',{Category,Subcategory})
    } catch (error) {
        
    }
}

module.exports.addExtraSubCategory =async (req,res) => {
    try {
        console.log(req.file);
        console.log(req.body);
        if (req.file) {
            req.body.image = req.file.path
        }
        let data = await extraSubCategory.create(req.body);
        console.log(data);
        return res.redirect(req.get('Referrer'||'/'));
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer'||'/'));
    }
}

module.exports.viewExtraSubCategoriesPage = async(req,res)=>{
    try {
        let brand = await extraSubCategory.find({}).populate('categoryId').populate('subCategoryId');
        console.log(brand);
        return res.render('./pages/viewExtraSubCategories',{brand})
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer'||'/'));
    }
}
module.exports.editExtraSubCategoryPage = async(req,res)=>{
    try {
        let {id} = req.params
        let extraSubcategory = await extraSubCategory.findById(id);
        let Subcategory = await category.find();
        let Category = await category.find();
        console.log(Category);
        return res.render('./pages/editSubCategory',{Subcategory,Category,extraSubcategory})
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer')||'/');
    }
}
module.exports.editExtraSubCategory = async(req,res)=>{
    try {
        let {id} = req.params;
        if (req.file) {
            req.body.image = req.file.path;
            fs.unlinkSync(req.body.oldImage)
        }
        console.log(req.file);
        
        let extraSubcategory = await extraSubCategory.findByIdAndUpdate(id,req.body); 
        console.log(extraSubcategory);
        console.log(req.file);
        return res.redirect('/category/viewExtraSubCategories') 
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer')||'/');
    }
}
module.exports.deleteExtraSubCategory = async(req,res)=>{
    try {
        let {id} = req.params;
        let Category = await extraSubCategory.findByIdAndDelete(id); 
        fs.unlinkSync(Category.image);
        return res.redirect('/category/viewExtraSubCategories') 
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer')||'/');
    }
}