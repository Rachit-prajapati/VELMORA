let {Hotel}=require("../Model/Hotel");
let fs=require("fs")

let getRecord=async(req,res)=>{
    try{
    let data=await Hotel.find().sort({_id:-1});
   return res.status(200).json({
        result:"Done",
        msg:"Data Find Successfully",
        data:data,
        length:data.length
    })
    }
    catch(err){
   return res.status(500).send({
            Error:err,
            result:"Fail",
            Msg:"Internal server error"
        })
    }
}

let getSingleRecord=async(req,res)=>{
    try{
    let data=await Hotel.findOne({_id:req.params._id});
   return res.status(200).json({
        result:"Done",
        msg:"Data find Successfully",
        data:data
    })
    }
    catch(err){
       return res.status(500).send({
            Error:err,
            result:"Fail",
            Msg:"Internal server error"
        })
    }
}

let createRecord=async(req,res)=>{
    try{
        let data=new Hotel(req.body);
        if (req.files && req.files.length > 0) {
            data.pic = req.files.map(file => file.path);
        }
        await data.save();
        return res.status(200).json({
            result:"Done",
            msg:"Data Insert Successfully",
            data:data,
            status:200
        })
    }
    catch(err){
    if(err.errors && err.errors.category){
        return res.status(400).json({
            result:"Fail",
            msg:err.errors.category.message,
            status:400
        })
    }
    else if(err.errors && err.errors.subcategory){
        return res.status(400).json({
            result:"Fail",
            msg:err.errors.subcategory.message,
            status:400
        })
    }
    else if(err.errors && err.errors.price){
        return res.status(400).json({
            result:"Fail",
            msg:err.errors.price.message,
            status:400
        })
    }
    else if(err.errors && err.errors.finalprice){
        return res.status(400).json({
            result:"Fail",
            msg:err.errors.finalprice.message,
            status:400
        })
    }
    else if(err.errors && err.errors.title){
        return res.status(400).json({
            result:"Fail",
            msg:err.errors.title.message,
            status:400
        })
    }
    else if(err.errors && err.errors.pic){
        return res.status(400).json({
            result:"Fail",
            msg:err.errors.pic.message,
            status:400
        })
    }
    else if(err.errors && err.errors.description){
        return res.status(400).json({
            result:"Fail",
            msg:err.errors.description.message,
            status:400
        })
    }
    else if(err.errors && err.errors.address){
        return res.status(400).json({
            result:"Fail",
            msg:err.errors.address.message,
            status:400
        })
    }
    return res.status(500).json({
        result:"Fail",
        msg:"Internal Server error",
        error:err.message
    })
}
}

let updateRecord=async(req,res)=>{
    try{
        let data=await Hotel.findOne({_id:req.params._id});
        if(!data){
        return res.status(404).json({
                result:"Fail",
                msg:"data not Found"
            })
        }
        if(req.body.option){
            data.rooms=req.body.rooms ?? data.rooms
            await data.save()
        }
        else{
            data.title=req.body.title ?? data.title
            data.description=req.body.description ?? data.description
            data.price=req.body.price ?? data.price
            data.discount=req.body.discount ?? data.discount
            data.finalprice=req.body.finalprice ?? data.finalprice
            data.address=req.body.address ?? data.address
            data.city=req.body.city ?? data.city
            data.country=req.body.country ?? data.country
            data.category=req.body.category ?? data.category
            data.subcategory=req.body.subcategory ?? data.subcategory
            data.state=req.body.state ?? data.state
            data.rooms=req.body.rooms ?? data.rooms
            data.map=req.body.map ?? data.map
            if (await data.save() && req.files) {
            data.pic.forEach(x => {
                if (!req.body.oldpic?.includes(x)) {
                    fs.unlink(x, (error) => { })
                }
            })
            if (typeof req.body.oldpic == "undefined")
                data.pic = Array.from(req.files).map(x => x.path)
            else
                data.pic = req.body.oldpic?.concat(Array.from(req.files).map(x => x.path))
            await data.save()
        }
        return res.status(200).json({
            result:"Done",
            msg:"Data Update Successfully",
            data:data,
            status:200
        })
        }
    }
    catch(err){
        if(err.keyValue){
           return res.status(409).json({
                result:"Fail",
                msg:err.keyValue,
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
        let data=await Hotel.findOne({_id:req.params._id});
        if(!data){
           return res.status(404).json({
                result:"Done",
                msg:"Data Not Found",
                status:404
            })
        }
        if(data.pic.length){
                data.pic.forEach(img => {
                  try {
                    if (fs.existsSync(img)) {
                      fs.unlinkSync(img);
                    }
                    } catch (err) {}
              });
            }
        await data.deleteOne()
       return res.status(200).json({
        result:"Done",
        msg:"data Deleted Successfully",
        data:data
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

let search=async(req,res)=>{
    let search=req.body.search
    try{
        let data=await Hotel.find({
            $or:[
                {title:{$regex:search}},
                {category:{$regex:search}},
                {subcategory:{$regex:search}},
                {country:{$regex:search}},
                {state:{$regex:search}},
                {city:{$regex:search}},
            ]
        })
        res.status(200).json({
            result:"Done",
            msg:"Data Find Successfully",
            data:data,
            status:200
        });
    }
    catch(err){
        res.status(500).json({
            result:"Fail",
            msg:"Internal Server Error",
            Error:err.message
        });
    }
}

module.exports={createRecord,getSingleRecord,getRecord,deleteRecord,updateRecord,search}