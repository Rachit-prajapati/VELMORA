let {ContactUs}=require("../Model/ContactUs");

let createRecord=async(req,res)=>{
    try{
        let data=new ContactUs(req.body);
        await data.save();
        return res.status(200).json({
            result:"200",
            msg:"Data Insert Successfully",
            data:data
        })
    }
    catch(err){
        if(err.keyValue){
            return res.status(409).json({
                result:"Fail",
                msg:`Duplicate value: ${Object.keys(err.keyValue)[0]} already exists.`,
                Error:err.message
            })
        }
        else if(err.errors.name){
            return res.status(400).json({
                result:"Fail",
                msg:err.errors.name.message,
                Error:err.message
            })
        }
        else if(err.errors.email){
            return res.status(400).json({
                result:"Fail",
                msg:err.errors.email.message,
                Error:err.message
            })
        }
        else if(err.errors.mobile){
            return res.status(400).json({
                result:"Fail",
                msg:err.errors.mobile.message,
                Error:err.message
            })
        }
           else if(err.errors.message){
            return res.status(400).json({
                result:"Fail",
                msg:err.errors.message.message,
                Error:err.message
            })
        }
           else if(err.errors.subject){
            return res.status(400).json({
                result:"Fail",
                msg:err.errors.subject.message,
                Error:err.message
            })
        }
        return res.status(400).json({
            result:"Fail",
            msg:"Internal Server Error",
            Error:err.message
        })
    }
}

let getRecord=async(req,res)=>{
    try{
        let data=await ContactUs.find().sort({_id:-1});
        return res.status(200).json({
            result:"Done",
            msg:"data find Successfully",
            data:data
        })
    }
    catch(err){
        return res.status(500).json({
            result:"Fail",
            Error:err.message,
            msg:"Internal Server error"
        })
    }
}

let getSingleRecord=async(req,res)=>{
    try{
        let data=await ContactUs.findOne({_id:req.params._id});
        return res.status(200).json({
            result:"Done",
            msg:"Data Find Successfully",
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

let updateRecord=async(req,res)=>{
    try{
        let data=await ContactUs.findOne({_id:req.params._id});
        if(!data){
            return res.status(404).json({
                result:"Fail",
                msg:"Data Not Find"
            })
        }
        data.name=req.body.name??data.name;
        data.email=req.body.email??data.email;
        data.phone=req.body.phone??data.phone;
        data.subject=req.body.subject??data.subject;
        data.message=req.body.message??data.message;
        await data.save();
        return res.status(200).json({
            result:"Done",
            msg:"Record Updated",
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

let deleteRecord=async(req,res)=>{
    try{
    let data=await ContactUs.findOne({_id:req.params._id});
        if(!data){
            return res.status(404).json({
                result:"Fail",
                msg:"Data Not Find"
            })
        }
        await data.deleteOne();
        return res.status(200).json({
            result:"Done",
            msg:"Data Deleted Successfully",
            data:data
        });
    }
    catch(err){
        return res.status(500).json({
            result:"Fail",
            msg:"Internal Server error",
            Error:err.message
        })
    }
}

module.exports={createRecord,getRecord,getSingleRecord,updateRecord,deleteRecord}