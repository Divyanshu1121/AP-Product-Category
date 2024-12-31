const { default: mongoose} = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    subCategoryTitle:{
        type:String,
        required:true
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categoryTbl'
    },
    image:String,

},{
    timestamps:true,
});

const subCategory = mongoose.model('subCategoryTbl',subCategorySchema);

module.exports = subCategory;
