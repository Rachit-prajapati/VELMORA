let mongoose=require("mongoose");

const SettingSchema = new mongoose.Schema({
sitename: { 
    type: String, 
    default:""
},
phone:{ 
    type: Number,
    default:""
},
address:{ 
    type: String, 
    default:""
},
email:{ 
    type: String, 
    default:""
},
map1:{
    type:String,
    default:""
},
map2:{
    type:String,
    default:""
},
facebook:{ 
    type: String, 
    default:""
},
instagram:{ 
    type: String, 
    default:""
},
twitter:{ 
    type: String, 
    default:""
},
linkedin:{
    type:String,
    default:""
},
whatsapp:{
    type:String,
    default:""

},
youtube:{
    type:String,
    default:""  
},
privacypolicy: {
    type: String,
    default:""
},
termsandconditions: {
    type: String,
    default:""
}
}, { timestamps: true });

let Setting=mongoose.model("Setting",SettingSchema);
module.exports={Setting}