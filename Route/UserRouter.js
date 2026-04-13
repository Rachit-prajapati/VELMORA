let express=require("express");
const { getRecord, getSingleRecord, createRecord, updateRecord, deleteRecord, loginIn, forgetPassword1, forgetPassword2, forgetPassword3 } = require("../Controller/UserController");
const { verifyPublic,verifyAdmin,verifySuperAdmin,verifyBuyer } = require("../Verification");
let UserRouter=express.Router();

UserRouter.get("/",verifyPublic,getRecord);
UserRouter.get("/:_id",verifyPublic,getSingleRecord);
UserRouter.post("/",verifyPublic,createRecord);
UserRouter.post("/login",verifyPublic,loginIn);
UserRouter.post("/forget-password-1",verifyPublic,forgetPassword1);
UserRouter.post("/forget-password-2",verifyPublic,forgetPassword2);
UserRouter.post("/forget-password-3",verifyPublic,forgetPassword3);
UserRouter.put("/:_id",verifyBuyer,updateRecord);
UserRouter.delete("/:_id",verifySuperAdmin,deleteRecord);

module.exports={UserRouter}