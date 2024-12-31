const { Router } = require("express");
const extraSubCategoryCtrl = require('../controllers/ExtraSubCategoryControllers');
const uploadImage = require("../middlewares/uploadImage");

const SubCategoryRouter = Router();

SubCategoryRouter.get('/addExtraSubCategories',extraSubCategoryCtrl.addExtraSubCtegoryPage)
SubCategoryRouter.post('/addExtraSubCategories',uploadImage,extraSubCategoryCtrl.addExtraSubCategory)
SubCategoryRouter.get('/viewExtraSubCategories',extraSubCategoryCtrl.viewExtraSubCategoriesPage)
SubCategoryRouter.get('/editExtraSubCategory/:id',extraSubCategoryCtrl.editExtraSubCategoryPage)
SubCategoryRouter.post('/editExtraSubCategory/:id',uploadImage,extraSubCategoryCtrl.editExtraSubCategory)
SubCategoryRouter.get('/deleteExtraSubCategory/:id',extraSubCategoryCtrl.deleteExtraSubCategory)

module.exports = SubCategoryRouter;