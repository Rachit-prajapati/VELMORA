let jwt=require("jsonwebtoken");

function verifySuperAdmin(req,res,next){
    try{
        let token=req.headers.authorization;
        let decoded=jwt.verify(token,process.env.JWT_SALT_KEY_PRIVATE);
        if(["SuperAdmin"].includes(decoded.data.role)){
            next();
        }
        else{
            res.status(401).json({
                message:"You Are Not Authorized to Access this Api"
            })
        }
    }
    catch(err){
        res.status(401).json({
            message:"You Are Not Authorized to Access this Api",
            error:err.message
        })
    }
}


function verifyAdmin(req,res,next){
    try{
        let token=req.headers.authorization;
        let decoded=jwt.verify(token,process.env.JWT_SALT_KEY_PRIVATE);
        if(["SuperAdmin","Admin"].includes(decoded.data.role)){
            next();
        }
        else{
            res.status(401).json({
                message:"You Are Not Authorized to Access this Api"
            })
        }
    }
    catch(err){
        res.status(401).json({
            message:"You Are Not Authorized to Access this Api",
            error:err.message
        })
    }
}


function verifyBuyer(req,res,next){
    try{
        let token=req.headers.authorization;
        let decoded=jwt.verify(token,process.env.JWT_SALT_KEY_PRIVATE);
        if(["SuperAdmin","Admin","Buyer"].includes(decoded.data.role)){
            next();
        }
        else{
            res.status(401).json({
                message:"You Are Not Authorized to Access this Api"
            })
        }
    }
    catch(err){
        res.status(401).json({
            message:"You Are Not Authorized to Access this Api",
            error:err.message
        })
    }
}


function verifyPublic(req,res,next){
    try{
        let token=req.headers.authorization;
        jwt.verify(token,process.env.JWT_SALT_KEY_PUBLIC);
            next();
    }
    catch(err){
        try{
        let token=req.headers.authorization;
        jwt.verify(token,process.env.JWT_SALT_KEY_PRIVATE);
            next();
    }
    catch(err){
        res.status(401).json({
            message:"You Are Not Authorized to Access this Api",
            error:err.message
        })
    }
    }
}

module.exports={verifyAdmin, verifySuperAdmin, verifyBuyer,verifyPublic}