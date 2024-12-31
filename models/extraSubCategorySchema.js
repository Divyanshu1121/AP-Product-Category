const { default: mongoose} = require("mongoose");

const exterSubCategorySchema = new mongoose.Schema({
    extraSubCategoryTitle:{
        type:String,
        required:true
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categoryTbl'
    },
    subCategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subCategoryTbl'
    },
    image:String,

},{
    timestamps:true,
});

const exterSubCategory = mongoose.model('exterSubCategoryTbl',exterSubCategorySchema);

module.exports = exterSubCategory;
