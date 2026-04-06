let mongoose = require("mongoose");

let ContactUsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is must be required"],
    },
    email: {
      type: String,
      required: [true, "Email is must be required"],  
      unique:true
    },
    phone: {
      type: String,
      required: [true, "Mobile is must be required"],
    },
    subject:{
      type:String,
      required:[true,"Subject Must be required"],
    },
    message:{
      type:String,
      required:[true,"Message Must be required"],
    },
    date: {
    type: String,
    default: () => new Date().toISOString(),
    }
  },
  {
    timestamps: true,
  }
);

let ContactUs = mongoose.model("ContactUs", ContactUsSchema);

module.exports={ContactUs}