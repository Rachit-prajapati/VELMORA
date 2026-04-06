let express=require("express");
const { getUserRecord, getRecord, getSingleRecord, createRecord, updateRecord, deleteRecord, Order, verifyPayment } = require("../Controller/BookingController");
const { verifySuperAdmin, verifyAdmin, verifyBuyer } = require("../Verification");
let BookingRouter=express.Router();

BookingRouter.get("/:userid",verifyBuyer,getUserRecord)
BookingRouter.get("/",verifyBuyer,getRecord)
BookingRouter.get("/:_id",verifyBuyer,getSingleRecord)
BookingRouter.post("/",verifyBuyer,createRecord)
BookingRouter.put("/:_id",verifyAdmin,updateRecord)
BookingRouter.delete("/:_id",verifySuperAdmin,deleteRecord)
BookingRouter.post("/order",verifyBuyer,Order)
BookingRouter.post("/verify-payment",verifyBuyer,verifyPayment)


module.exports={BookingRouter}