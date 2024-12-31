const { Router } = require("express");
const categoryCtrl = require('../controllers/categoryControllers');
const uploadImage = require("../middlewares/uploadImage");

const CategoryRouter = Router();
CategoryRouter.get('/addcategories',categoryCtrl.addCtegoryPage)
CategoryRouter.post('/addcategories',uploadImage,categoryCtrl.addCategory)
CategoryRouter.get('/viewcategories',categoryCtrl.viewCategoriesPage)
CategoryRouter.get('/editcategory/:id',categoryCtrl.editCategoryPage)
CategoryRouter.post('/editcategory/:id',uploadImage,categoryCtrl.editCategory)
CategoryRouter.get('/deletecategory/:id',categoryCtrl.deleteCategory)

module.exports = CategoryRouter;