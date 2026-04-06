let mongoose=require("mongoose")

let UserSchema=mongoose.Schema({
name:{
    type:String,
    required:[true,"Name is must be required"]
},
username:{
    type:String,
    required:[true,"Username is must be required"],
    unique:true
},
password:{
    type:String,
    required:[true,"Password is must be required"]
},
email:{
    type:String,
    required:[true,"Email is must be required"],
    unique:true
},
phone:{
    type:String,
    required:[true,"Mobile is must be required"]
},
role:{
    type:String,
    default:"Buyer"
},
status:{
    type:Boolean,
    default:true
},
otp:{
    type:String
}
},
{
    timestamps:true
})

let User=mongoose.model("User",UserSchema)

module.exports={User}