let express=require("express");
const {getRecord,createRecord,} = require("../Controller/SettingController");
const { verify } = require("jsonwebtoken");
const { verifyPublic, verifySuperAdmin } = require("../Verification");
let SettingRouter=express.Router();

SettingRouter.get("/",verifyPublic,getRecord)
SettingRouter.post("/",verifySuperAdmin,createRecord)

module.exports={SettingRouter}