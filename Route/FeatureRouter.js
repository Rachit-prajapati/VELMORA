let express=require("express")
const { getRecord, getSingleRecord, createRecord, updateRecord, deleteRecord } = require("../Controller/FeatureController");
const { verifyPublic, verifyAdmin,verifySuperAdmin } = require("../Verification");
let FeatureRouter=express.Router()

FeatureRouter.get("/",verifyPublic,getRecord);
FeatureRouter.post("/",verifyAdmin,createRecord);
FeatureRouter.get("/:_id",verifyPublic,getSingleRecord);
FeatureRouter.put("/:_id",verifyAdmin,updateRecord);
FeatureRouter.delete("/:_id",verifySuperAdmin,deleteRecord);

module.exports={FeatureRouter}