let {Review}=require("../Model/Review")

let createRecord=async(req,res)=>{
    try{
        let data=new Review(req.body);
        await data.save();
        return res.status(200).json({
            result:"Done",
            msg:"Insert Data Successfully",
            data:data
        })
    }
    catch(err){
        if(err.errors.userid){
            return res.status(400).json({
                result:"fail",
                msg:err.errors.userid.message,
                Error:err.message
            })
        }
        if(err.errors.hotelid){
            return res.status(400).json({
                result:"fail",
                msg:err.errors.hotelid.message,
                Error:err.message
            })
        }
        else if(err.errors.rating){
            return res.status(400).json({
                result:"fail",
                msg:err.errors.rating.message,
                Error:err.message
            })
        }
        return res.status(500).json({
            result:"Fail",
            msg:"Internal Server Error",
            Error:err.message
        })
    }
}

let getRecord=async(req,res)=>{
    try{
        let data=await Review.find().sort({_id:-1}).populate("hotelid","title").populate("userid", "name email");
        return res.status(200).json({
            result:'Done',
            msg:"Data Find Successfully",
            data:data,
            length:data.length,
            status:200
        })
    }
    catch(err){
        return res.status(500).json({
            result:"Fail",
            msg:"Internal Server Error",
            Error:err.message
        })
    }
}

let getSingleRecord=async(req,res)=>{
    try{
        let data=await Review.find({hotelid:req.params.hotelid}).populate("hotelid","title").populate("userid", "name email")
;
        if(!data){
            return res.status(404).json({
                result:"Fail",
                msg:"Data not Found",
                status:404
            })
        }
        return res.status(200).json({
            result:"Done",
            status:200,
            msg:"Hotel review find successfully",
            data:data
        })
    }
    catch(err){
        return res.status(500).json({
            result:"Fail",
            status:500,
            Error:err.message,
            msg:"Internal Server Error"
        })
    }
}

let updateRecord=async(req,res)=>{
   try{
    let data=await Review.findOne({_id:req.params._id})
    if(!data){
        return res.status(404).json({
                result:"Fail",
                msg:"data not Found"
        })
    }
    data.rating= req.body.rating ?? data.rating
    data.comment= req.body.comment ?? data.comment
    await data.save();
    return res.status(200).json({
        result:"Done",
        status:"200",
        data:data,
        msg:"Review Updated Successfully"
    })
   }
   catch(err){
        return res.status(500).json({
            result:"Fail",
            msg:"Internal Server error",
            status:500,
            Error:err.message
        })
   }
}

let deleteRecord=async(req,res)=>{
    try{
        let data=await Review.findOne({_id:req.params._id});
        if(!data){
            return res.status(404).json({
                result:"Fail",
                msg:"data not Found"
            })
        }
        await data.deleteOne();
        res.status(200).json({
            result:"200",
            msg:"Review Delete Successfully",
            data:data,
            status:200
        })
    }
    catch(err){
        return res.status(500).json({
            result:"Fail",
            msg:"Internal Server error",
            status:500,
            Error:err.message
        })
    }
}

module.exports={getRecord,getSingleRecord,createRecord,updateRecord,deleteRecord}