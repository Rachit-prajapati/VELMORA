let express=require("express");
const { getRecord, getSingleRecord, createRecord, updateRecord, deleteRecord } = require("../Controller/SubcategoryController");
const { verifyPublic, verifyAdmin,verifySuperAdmin } = require("../Verification");
let SubcategoryRouter=express.Router();

SubcategoryRouter.get("/",verifyPublic,getRecord);
SubcategoryRouter.get("/:_id",verifyPublic,getSingleRecord);
SubcategoryRouter.post("/",verifyAdmin,createRecord);
SubcategoryRouter.put("/:_id",verifyAdmin,updateRecord);
SubcategoryRouter.delete("/:_id",verifySuperAdmin,deleteRecord);

module.exports={SubcategoryRouter}
