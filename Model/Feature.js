let mongoose=require("mongoose");

let FeatureSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name Must be required"],
        unique:true
    },
    icon:{
        type:String,
        required:[true,"Icon Must be required"],
    },
    shortdescription:{
        type:String,
        required:[true,"Description Must be required"],
    },
    status:{
        type:String,
        default:true
    }
},{timestamps:true})

let Feature=mongoose.model("Feature",FeatureSchema);
module.exports={Feature}