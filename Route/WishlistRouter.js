let express=require("express");
const { getRecord, getSingleRecord, createRecord, deleteRecord } = require("../Controller/WishlistController");
const { verifyBuyer } = require("../Verification");
let WishlistRouter=express.Router();

WishlistRouter.get("/",verifyBuyer,getRecord);
WishlistRouter.get("/:userid",verifyBuyer,getSingleRecord);
WishlistRouter.post("/",verifyBuyer,createRecord);
WishlistRouter.delete("/:_id",verifyBuyer,deleteRecord);

module.exports={WishlistRouter}