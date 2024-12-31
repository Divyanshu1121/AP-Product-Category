const subCategory = require("../models/subCategorySchema")
const category = require("../models/categorySchema")
const fs = require('fs')


module.exports.addSubCtegoryPage = async(req,res)=>{
    try {
        let Category = await category.find({});
        res.render('./pages/addSubCategory',{Category})
    } catch (error) {
        
    }
}

module.exports.addSubCategory =async (req,res) => {
    try {
        console.log(req.file);
        console.log(req.body);
        if (req.file) {
            req.body.image = req.file.path
        }
        let data = await subCategory.create(req.body);
        console.log(data);
        return res.redirect(req.get('Referrer'||'/'));
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer'||'/'));
    }
}

module.exports.viewSubCategoriesPage = async(req,res)=>{
    try {
        let Category = await subCategory.find({}).populate('categoryId');
        console.log(Category);
        return res.render('./pages/viewSubCategories',{Category})
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer'||'/'));
    }
}
module.exports.editSubCategoryPage = async(req,res)=>{
    try {
        let {id} = req.params
        let Subcategory = await subCategory.findById(id);
        let Category = await category.find();
        console.log(Category);
        return res.render('./pages/editSubCategory',{Subcategory,Category})
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer')||'/');
    }
}
module.exports.editSubCategory = async(req,res)=>{
    try {
        let {id} = req.params;
        if (req.file) {
            req.body.image = req.file.path;
            fs.unlinkSync(req.body.oldImage)
        }
        console.log(req.file);
        
        let Subcategory = await subCategory.findByIdAndUpdate(id,req.body); 
        // console.log(Category);
        console.log(req.file);
        return res.redirect('/category/viewSubCategories') 
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer')||'/');
    }
}
module.exports.deleteSubCategory = async(req,res)=>{
    try {
        let {id} = req.params;
        let Category = await subCategory.findByIdAndDelete(id); 
        fs.unlinkSync(Category.image);
        return res.redirect('/category/viewSubCategories') 
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer')||'/');
    }
}