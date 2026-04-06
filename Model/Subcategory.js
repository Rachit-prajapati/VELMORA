let mongoose=require("mongoose");

let SubcategorySchema=mongoose.Schema({
subcategory:{
    type:String,
    required:[true,"Subcategory Must be required"],
}
},{timestamps:true});

let Subcategory=mongoose.model("Subcategory",SubcategorySchema)

module.exports={Subcategory}