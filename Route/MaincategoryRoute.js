let express=require("express");
const { getRecord, createRecord, deleteRecord, updateRecord, getSingleRecord } = require("../Controller/MaincategoryController");
let MaincategoryRoute=express.Router();
let { verifyAdmin,verifySuperAdmin,verifyPublic,verifyBuyer } = require("../Verification");

MaincategoryRoute.get("/",verifyPublic,getRecord);
MaincategoryRoute.get("/:_id",verifyPublic,getSingleRecord);
MaincategoryRoute.post("/",verifyAdmin,createRecord);
MaincategoryRoute.put("/:_id",verifyAdmin,updateRecord);
MaincategoryRoute.delete("/:_id",verifySuperAdmin,deleteRecord);

module.exports={MaincategoryRoute}