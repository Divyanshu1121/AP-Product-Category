const { default: mongoose} = require("mongoose");

const productSchema = new mongoose.Schema({
    productTitle:String,
    productPrice:String,
    productDescription:String,
    image:String,
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categoryTbl'
    },
    subCategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subCategoryTbl'
    },
    extraSubCategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subCategoryTbl'
    },

},{
    timestamps:true,
});

const product = mongoose.model('ProductTbl',productSchema);

module.exports = product;
