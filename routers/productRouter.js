const { Router } = require("express");
const productCtrl = require('../controllers/productControllers');
const uploadImage = require("../middlewares/uploadImage");

const productRouter = Router();
productRouter.get('/addProducts',productCtrl.addProductPage)
productRouter.post('/addProducts',uploadImage,productCtrl.addProduct)
productRouter.get('/viewProducts',productCtrl.viewProductPage)
productRouter.get('/editProduct/:id',productCtrl.editProductPage)
productRouter.post('/editProduct/:id',uploadImage,productCtrl.editProduct)
productRouter.get('/deleteProduct/:id',productCtrl.deleteProduct)

module.exports = productRouter;