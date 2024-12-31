const category = require("../models/categorySchema")
const fs = require('fs')
module.exports.addCtegoryPage = (req,res)=>{
    res.render('./pages/addcategory')
}

module.exports.addCategory =async (req,res) => {
    try {
        console.log(req.file);
        console.log(req.body);
        if (req.file) {
            req.body.image = req.file.path
        }
        let data = await category.create(req.body);
        console.log(data);
        return res.redirect(req.get('Referrer'||'/'));
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer'||'/'));
    }
}

module.exports.viewCategoriesPage = async(req,res)=>{
    try {
        let Category = await category.find({});
        console.log(Category);
        return res.render('./pages/viewCategories',{Category})
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer'||'/'));
    }
}
module.exports.editCategoryPage = async(req,res)=>{
    try {
        let {id} = req.params
        let Category = await category.findById(id);
        console.log(category);
        return res.render('./pages/editCategory',{Category})
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer')||'/');
    }
}
module.exports.editCategory = async(req,res)=>{
    try {
        let {id} = req.params;
        if (req.file) {
            req.body.image = req.file.path;
            fs.unlinkSync(req.body.oldImage)
        }
        console.log(req.file);
        
        let Category = await category.findByIdAndUpdate(id,req.body); 
        console.log(Category);
        console.log(req.file);
        return res.redirect('/category/viewcategories') 
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer')||'/');
    }
}
module.exports.deleteCategory = async(req,res)=>{
    try {
        let {id} = req.params;
        let Category = await category.findByIdAndDelete(id); 
        fs.unlinkSync(Category.image);
        return res.redirect('/category/viewcategories') 
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer')||'/');
    }
}