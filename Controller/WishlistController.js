let {Wishlist}=require("../Model/Wishlist");

let getRecord=async(req,res)=>{
    try{
        let data=await Wishlist.find().sort({_id:-1}) .populate({
    path: "hotelid",
    select: "title price discount finalprice city state category subcategory rooms pic",
    options: { slice: { pic: 1 } }   // 👈 only first image
  })
  .populate("userid", "_id name");
        res.status(200).json({
            result:"Done",
            msg:"Data find successfully",
            data:data
        });
    }
    catch(err){
        res.status(500).json({
            result:"Fail",
            msg:"Internal Server Error",
            Error:err.message
        })
    }
}

let getSingleRecord=async(req,res)=>{
    try{
        let data=await Wishlist.find({userid:req.params.userid}).populate({
    path: "hotelid",
    select: "title price discount finalprice city state category subcategory rooms pic",
    options: { slice: { pic: 1 } }   // 👈 only first image
  })
  .populate("userid", "_id name");
        res.status(200).json({
            result:"Done",
            msg:"Data find Successfully",
            data:data,
            status:200,
            count:data.length
        });
    }
    catch(err){
        res.status(500).json({
            result:"Fail",
            msg:"Internal server error",
            status:500,
            Error:err.message
        })
    }
}

let createRecord=async(req,res)=>{
    try{
        let data=new Wishlist(req.body);
        await data.save();
        res.status(200).json({
            result:"200",
            msg:"Data Insert Successfully",
            status:200,
            data:data
        });
    }
    catch(err){
        if(err.errors.userid){
            res.status(400).json({
                result:"Fail",
                msg:err.errors.userid.message,
                Error:err.message
            })
        }
        else if(err.errors.hotelid){
            res.status(400).json({
                result:"Fail",
                msg:err.errors.hotelid.message,
                Error:err.message
            })
        }
        res.status(500).json({
            result:"Fail",
            msg:"Internal server Error",
            Error:err.message
        })
    }
}

let deleteRecord=async(req,res)=>{
    try{
        let data=await Wishlist.findOne({_id:req.params._id});
        if(!data){
            res.status(404).json({
                result:"Fail",
                msg:"Data Not Found"
            })
        }
        await data.deleteOne();
        res.status(200).json({
            result:"Done",
            msg:"Delete Data Successfully",
            data:data
        })
    }
    catch(err){
        res.status(500).json({
            result:"Fail",
            msg:"Internal Server error",
            Error:err.message
        })
    }
}

module.exports={createRecord,getRecord,getSingleRecord,deleteRecord}