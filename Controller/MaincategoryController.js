let {Maincategory}=require("../Model/Maincategory");

let getRecord=async(req,res)=>{
    try{
        let data=await Maincategory.find().sort({_id:-1});
        return res.status(200).json({
            status:200,
            result:"Done",
            msg:"Data Find Successfully",
            data:data,
            length:data.length
        })
    }
    catch(err){
        res.status(500).json({
            status:500,
            result:"Fail",
            msg:"Internal Server error",
            Error:err.message
        })
    }
}

let createRecord=async(req,res)=>{
    try{
        let data=new Maincategory(req.body);
        await data.save();
        res.status(200).json({
            status:200,
            msg:"Data insert Successfully",
            data:data,
            result:"Fail"
        })
    }
    catch(err){
        if(err.keyValue){
            res.status(409).json({
                result:"Fail",
                msg:`Duplicate value: ${Object.keys(err.keyValue)[0]} already exists.`,
                Error:err.message
            })
        }
        else if(err.errors.maincategory){
            res.status(400).json({
                result:"Fail",
                msg:err.errors.maincategory.message,
                Error:err.message
            })
        }
        else{
            return res.status(500).json({
            result:"Fail",
            msg:"Internal Server Error",
            Error:err.message
        })
        }
    }
}

let getSingleRecord=async(req,res)=>{
    try{
        let data=await Maincategory.findOne({_id:req.params._id});
            res.status(200).json({
            status:200,
            result:"Done",
            msg:"Single Data Find Successfully",
            data:data
        })
    }
    catch(err){
        res.status(500).json({
            result:"Fail",
            msg:"Internal Server Error",
            Error:err,message
        })
    }
}

let updateRecord=async(req,res)=>{
        try{
        let data=await Maincategory.findOne({_id:req.params._id});
        if(!data){
            return res.status(200).json({
                result:"Fail",
                msg:"Data Not Find",
                status:404
            })
        }
        data.maincategory=req.body.maincategory ?? data.maincategory
        await data.save();
        return res.status(200).json({
            result:"Done",
            msg:"Updated Record Successfully",
            data:data,
            status:"200"
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
        let data=await Maincategory.findOne({_id:req.params._id});
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
            msg:"deleted Record Successfully",
            data:data,
            status:200
        })
    }
    catch(err){

    }
}

module.exports={getRecord,createRecord,getSingleRecord,updateRecord,deleteRecord}