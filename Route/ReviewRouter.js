let express=require("express");
const { getRecord, getSingleRecord, createRecord, updateRecord, deleteRecord } = require("../Controller/ReviewController");
const { verifyBuyer,verifySuperAdmin,verifyPublic } = require("../Verification");
let ReviewRouter=express.Router();

ReviewRouter.get("/",verifyPublic,getRecord);
ReviewRouter.get("/:hotelid",verifyPublic,getSingleRecord);
ReviewRouter.post("/",verifyBuyer,createRecord);
ReviewRouter.put("/:_id",verifyBuyer,updateRecord);
ReviewRouter.delete("/:_id",verifySuperAdmin,deleteRecord);

module.exports={ReviewRouter}