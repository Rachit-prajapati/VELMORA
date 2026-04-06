let express=require("express");
const { getRecord, getSingleRecord, createRecord, updateRecord, deleteRecord } = require("../Controller/ContactController");
const { verifyAdmin, verifyPublic, verifySuperAdmin } = require("../Verification");
let ContactRouter=express.Router();

ContactRouter.get("/",verifyAdmin,getRecord);
ContactRouter.get("/:_id",verifyAdmin,getSingleRecord);
ContactRouter.post("/",verifyPublic,createRecord);
ContactRouter.put("/:_id",verifyAdmin,updateRecord);
ContactRouter.delete("/:_id",verifySuperAdmin,deleteRecord);

module.exports={ContactRouter}