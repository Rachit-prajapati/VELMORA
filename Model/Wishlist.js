let mongoose=require("mongoose");

let WishlistSchema=mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Userid Must be required"]
    },
    hotelid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hotel",
        required:[true,"Hotel Must be required"],
    },
},{timestamps:true})
let Wishlist=mongoose.model("Wishlist",WishlistSchema);
module.exports={Wishlist}