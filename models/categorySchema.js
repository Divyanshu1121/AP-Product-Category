const { default: mongoose} = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryTitle:{
        type:String,
        required:true
    },
    image:String,

},{
    timestamps:true,
});

const category = mongoose.model('categoryTbl',categorySchema);

module.exports = category;
