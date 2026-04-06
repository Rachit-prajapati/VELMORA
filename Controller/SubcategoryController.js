let {Subcategory}=require("../Model/Subcategory");

let createRecord=async(req,res)=>{
    try{
        let data=new Subcategory(req.body);
        await data.save();
        return res.status(200).json({
            result:"Done",
            msg:"Data Insert Successfully",
            data:data,
            status:200
        })
    }
    catch(err){
        if(err.keyValue){
            return res.status(409).json({
                result:"Fail",
                msg:`Duplicate value: ${Object.keys(err.keyValue)[0]} already exits`,
                Error:err.message
            })
        }
        else if(err.errors.subcategory){
            return res.status(400).json({
                result:"Fail",
                msg:err.errors.Subcategory.message,
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
        let data =await Subcategory.find().sort({_id:-1});
        return res.status(200).json({
            result:"Done",
            msg:"Data Find Successfully",
            data:data
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
        let data=await Subcategory.findOne({_id:req.params._id});
        if(!data){
            return res.status(200).json({
                result:"Fail",
                msg:"Data Not Find",
                status:404
            })
        }
        return res.status(200).json({
            result:"Done",
            msg:"Data Find Successfully",
            data:data
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

let updateRecord=async(req,res)=>{
    try{
        let data=await Subcategory.findOne({_id:req.params._id});
        if(!data){
            return res.status(200).json({
                result:"Fail",
                msg:"Data Not Find",
                status:404
            })
        }
        data.subcategory=req.body.subcategory ?? data.subcategory
        await data.save();
        return res.status(200).json({
            result:"Done",
            msg:"Updated Record Successfully",
            data:data
        })
    }
    catch(err){
        if(err.keyValue){
            return res.status(409).json({
                result:"Fail",
                msg:`Duplicate Value ${Object.keys(err.keyValue)[0]} already exits`,
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

let deleteRecord=async(req,res)=>{
    try{
        let data=await Subcategory.findOne({_id:req.params._id});
        if(!data){
            return res.status(200).json({
                result:"Fail",
                msg:"Data Not Find",
                status:404
            })
        }
        await data.deleteOne();
        return res.status(200).json({
            result:"Done",
            msg:"Record Deleted Successfully",
            data:data
        })
    }
    catch(err){
        return res.status(500).json({
            result:"Fail",
            msg:"Internal Server error",
            Error:err.message
        })
    }
}

module.exports={getRecord,getSingleRecord,updateRecord,deleteRecord,createRecord}