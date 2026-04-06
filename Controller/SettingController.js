let { Setting } = require("../Model/Setting");

let createRecord = async (req, res) => {
  try {
    let data = await Setting.findOne();
    if(data){
      data.sitename=req.body.sitename;
      data.phone=req.body.phone;
      data.address=req.body.address;
      data.email=req.body.email;
      data.map1=req.body.map1;
      data.map2=req.body.map2;
      data.facebook=req.body.facebook;
      data.instagram=req.body.instagram;
      data.twitter=req.body.twitter;
      data.linkedin=req.body.linkedin;
      data.whatsapp=req.body.whatsapp;
      data.youtube=req.body.youtube;
      data.privacypolicy=req.body.privacypolicy;
      data.termsandconditions=req.body.termsandconditions;
    }
    else{
        data = new Setting(req.body);
    }
    await data.save();
    return res.status(200).json({
      status: 200,
      result: "Done",
      msg: "Data Updated Successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      result: "Fail",
      msg: "Internal Server error",
      Error: err.message,
    });
  }
};

let getRecord = async (req, res) => {
  try {
    let data = await Setting.findOne();
    if(!data){
      return res.status(404).json({
        result: "Failed",
        msg: "Data Not Found",
      });
    }
    return res.status(200).json({
      result: "Done",
      msg: "Data Find Successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      result: "Fail",
      msg: "Internal Server error",
      Error: err.message,
    });
  }
};

module.exports = {
  createRecord,
  getRecord,
};
