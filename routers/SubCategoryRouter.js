const { Router } = require("express");
const SubCategoryCtrl = require('../controllers/subCategoryControllers');
const uploadImage = require("../middlewares/uploadImage");

const SubCategoryRouter = Router();
SubCategoryRouter.get('/addSubCategories',SubCategoryCtrl.addSubCtegoryPage)
SubCategoryRouter.post('/addSubCategories',uploadImage,SubCategoryCtrl.addSubCategory)
SubCategoryRouter.get('/viewSubCategories',SubCategoryCtrl.viewSubCategoriesPage)
SubCategoryRouter.get('/editSubCategory/:id',SubCategoryCtrl.editSubCategoryPage)
SubCategoryRouter.post('/editSubCategory/:id',uploadImage,SubCategoryCtrl.editSubCategory)
SubCategoryRouter.get('/deleteSubCategory/:id',SubCategoryCtrl.deleteSubCategory)

module.exports = SubCategoryRouter;