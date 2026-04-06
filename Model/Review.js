let mongoose=require("mongoose");

let ReviewSchema=mongoose.Schema({
userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:[true,"Userid Must be required"]
},
hotelid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Hotel",
    required:[true,"Hotelid Must be required"]
},
rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
    required: [true,"Rating must be required"]
},
comment:{
    type:String,
}

},{
    timestamps:true
})

let Review=mongoose.model("Review",ReviewSchema)
module.exports={Review}