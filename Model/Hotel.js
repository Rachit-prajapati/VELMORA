let mongoose=require("mongoose");

const HotelSchema = new mongoose.Schema({
title: { 
    type: String, 
    required: [true,"Title is Must be required"],
    unique:true
},
description: { 
    type: String,
    required: [true,"Description is Must be required"] 
},
address:{ 
    type: String, 
    required: [true,"Address Must be required"] 
},
price:{ 
    type: Number, 
    required: [true,"Price Must be required"]
},
map:{
    type:String,
    default:""
},
finalprice:{ 
    type: Number, 
},
discount:{ 
    type: Number, default: 0 
},
city:{
type:String
},
state:{
type:String
},
country:{
    type:String
},
category: {
    type: String,
    required: [true,"Category Must be required"]
},
subcategory: {
    type: String,
    required: [true,"SubCategory Must be required"]
},
pic:{
    type:Array,
    required: [true,"Pic Must be required"]
},
rooms: {
    type:Number,
}
}, { timestamps: true });

let Hotel=mongoose.model("Hotel",HotelSchema);
module.exports={Hotel}

