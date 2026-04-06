let mongoose=require("mongoose");

let MaincategorySchema=mongoose.Schema({
    maincategory:{
        type:String,
        required:[true,"Maincategory Must be required"],
        unique:true
    }
},{timestamps:true})

let Maincategory=mongoose.model("Maincategory",MaincategorySchema);
module.exports={Maincategory}