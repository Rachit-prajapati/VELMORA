let express=require("express");
let HotelRouter=express.Router();
const { getRecord, getSingleRecord, createRecord, updateRecord, deleteRecord, search } = require("../Controller/HotelController");

//multer middleware
let multer=require("multer");
const { verifyPublic, verifyAdmin,verifySuperAdmin } = require("../Verification");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload/hotel')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})
const upload = multer({ storage: storage })

HotelRouter.get("/",verifyPublic,getRecord); 
HotelRouter.get("/:_id",verifyPublic,getSingleRecord); 
HotelRouter.post("/search",search);
HotelRouter.post("/",verifyAdmin,upload.array("pic"),createRecord);
HotelRouter.put("/:_id",verifyAdmin,upload.array("pic"),updateRecord);
HotelRouter.delete("/:_id",verifySuperAdmin,deleteRecord);

module.exports={HotelRouter}