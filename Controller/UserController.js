let {User}=require("../Model/User");
var passwordValidator = require('password-validator');
let bcrypt=require("bcrypt");
let fs=require("fs");
let {transporter}=require("../Transporter");
const { text } = require("stream/consumers");
const { hash } = require("crypto");
let jwt=require("jsonwebtoken");

// Create a schema
var schema = new passwordValidator();

// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(20)                                  // Maximum length 100
.has().uppercase(1)                              // Must have uppercase letters
.has().lowercase(1)                              // Must have lowercase letters
.has().digits(5)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123','User@123','User123']); // Blacklist these values


let getRecord=async(req,res)=>{
    try{
    let data=await User.find().sort({_id:-1})
    return res.status(200).json({
        result:"Done",
        msg:"Data find Successfully",
        data:data
    })
    }
    catch(err){
        return res.status(500).json({
            result:"Fail",
            msg:"Internal Server error",
            Error:err
        })
    }
}

let createRecord=async(req,res)=>{
    if(req.body.password && schema.validate(req.body.password)){
        bcrypt.hash(req.body.password,12,async(err,hash)=>{
            if(err){
                return res.status(500).json({
                    result:"Fail",
                    msg:"Internal Server Error",
                    status:500,
                    Error:err.message
                })
            }
            else{
                try{
                    let data=new User(req.body)
                    data.password=hash
                    await data.save();
                    let mailOption={
                        from:process.env.EMAIL_SENDER,
                        to:data.email,
                        subject: "Welcome to Airbnb Stays | Your Account is Ready",
                        html: `
            <div style="font-family: Arial, sans-serif; background-color: #fff7f0; padding: 20px;">
              
              <div style="max-width: 520px; margin: auto; background: #ffffff; padding: 25px; border-radius: 10px; border-top: 5px solid #ff7a00;">
                
                <h2 style="text-align: center; color: #ff7a00; margin-bottom: 20px;">
                  Welcome to Airbnb Stays 🎉
                </h2>
        
                <p>Hello <strong>${data.name}</strong>,</p>
        
                <p>
                  Your account has been <strong>successfully created</strong>.
                </p>
        
                <p>
                  Now you can explore beautiful homes 🏡, hotels 🏨, and unique stays at amazing prices.
                </p>
        
                <p>
                  We’re excited to be a part of your travel journey ✈️
                </p>
        
                <!-- CTA Button -->
                <div style="text-align: center; margin: 25px 0;">
                  <a href="#" style="
                    background-color: #ff7a00;
                    color: #ffffff;
                    padding: 12px 20px;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: bold;
                    display: inline-block;
                  ">
                    Explore Stays
                  </a>
                </div>
        
                <p style="text-align: center; font-weight: bold; color: #ff7a00;">
                  Happy Staying! 😊
                </p>
        
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        
                <p style="text-align: center;">
                  Regards,<br/>
                  <strong style="color: #ff7a00;">Team Airbnb Stays</strong><br/>
                  <span style="font-size: 12px; color: #777;">Rachit Prajapati</span>
                </p>
        
              </div>
        
            </div>
            `
                    }
                    transporter.sendMail(mailOption,(err)=>{
                        console.log("Send Mail Error",err);
                    })
                        return res.status(200).json({
                        result:"Done",
                        msg:"User SignUp Account successfully Created",
                        Data:data
                })
                }
                catch(err){
                if (err.code === 11000 && err.keyValue) {
                    return res.status(409).json({
                        result: "Fail",
                        msg: `Duplicate value: ${Object.keys(err.keyValue)[0]} already exists.`,
                        field: err.keyValue
                    });
                }
                else if (err.code === 11000 && err.keyValue) {
                    return res.status(409).json({
                        result: "Fail",
                        msg: `Duplicate value: ${Object.keys(err.keyValue)[1]} already exists.`,
                        field: err.keyValue
                    });
                }
                else if(err.errors.name){
                    return res.status(400).json({
                        result:"Fail",
                        msg:err.errors.name.message,
                        Error:err.message
                    })
                }
                else if(err.errors.password){
                    return res.status(400).json({
                        result:"Fail",
                        msg:err.errors.password.message,
                        Error:err.message
                    })
                }
                else if(err.errors.phone){
                    return res.status(400).json({
                        result:"Fail",
                        msg:err.errors.phone.message,
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
                else if(err.errors.username){
                    return res.status(400).json({
                        result:"Fail",
                        msg:err.errors.username.message,
                        Error:err.message
                    })
                }
            }
            }
        })
    }
    else{
        return res.status(400).json({
        result:"Fail",
        msg:` 
        password following 6 steps
        1. Minimum length 8
        2. Maximum length 20
        3. Must have 1 uppercase letters
        4. Must have 1 lowercase letters
        5. Must have at least 5 digits
        6. Should not have spaces`
        })
    }
}

let getSingleRecord=async(req,res)=>{
    try{
        let data=await User.findOne({_id:req.params._id})
        if(!data){
            return res.status(404).json({
                result:"fail",
                msg:"data not found"
            })
        }
        return res.status(200).json({
            result:"Done",
            msg:"Data find Successfully",
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
        let data=await User.findOne({_id:req.params._id});
        if(!data){
            return res.status(404).json({
                result:"Fail",
                msg:"Data not Found",
            })
        }
        data.name=req.body.name??data.name
        data.username=req.body.username??data.username
        data.phone=req.body.phone??data.phone
        data.email=req.body.email??data.email        
        data.role=req.body.role??data.role        
        data.status=req.body.status??data.status        
        await data.save()
        return res.status(200).json({
        msg:"Record updated",
        result:"Done",
        data:data,
        })
    }
    catch(err){
        if(err.keyValue){
        return res.status(400).json({
        Error:err,
        result:"Fail",
        Msg:"User Name Already exit"
    })
    }
        else{
        return res.status(500).send({
            Error:err,
            result:"Fail",
            Msg:"Internal server error"
        })
    }
    }
}

let deleteRecord=async(req,res)=>{
    try{
        let data=await User.findOne({_id:req.params._id});
        if(!data){
        return res.status(404).json({
                result:"Fail",
                msg:"Data not Found",
            })
        }
        try{
            fs.unlinkSync(data.pic)
        }
        catch(error){}
            await data.deleteOne()
            return res.status(200).json({
            result:"Record delete",
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

let loginIn =async(req,res)=>{
    try{
        let data=await User.findOne({
        $or:[
            {username:req.body.username},
            {email:req.body.username}
        ] 
        })
        if(!data){
            return res.status(404).json({
                result:"Fail",
                msg:"User Not login Found",
                status:404
            })
        }
        if(await bcrypt.compare(req.body.password,data.password)){
        jwt.sign({data},process.env.JWT_SALT_KEY_PRIVATE,{expiresIn:1296000},(error,token)=>{
            if(error){
                    return res.status(500).send({
                    Error:error.message,
                    result:"Fail",
                    Msg:"Internal server error"
                    })
            }
            else{
                return res.status(200).json({
                result:"Done",
                msg:"User LogIn Successfully",
                status:200,
                token:token,
                data:data
            })
            }
        }) 
        }
        else{
            return res.status(401).json({
                result:"fail",
                msg:"Invalid username and password"
            })
        }
    }
    catch(err){
        return res.status(500).json({
            result:"Fail",
            msg:"Internal Server error",
            status:500
        })
    }
}

let forgetPassword1=async(req,res)=>{
    try{
        let data=await User.findOne({
        $or:[
            {username:req.body.username},
            {email:req.body.username}
        ]
        });
        if(!data){
            return res.status(401).json({
            result: "Fail",
            msg: "User not found",
        });
       }
       let otp=Math.floor(Math.random()*1000000);
       data.otp=otp
       await data.save();
       let mailOption={
        from:process.env.EMAIL_SENDER,
        to:data.email,
        subject: "Send OTP for password reset",
        html: `
        <div style="font-family: Arial; padding:20px;">
          <h2 style="color:#ff7a00;">Password Reset OTP</h2>
          <p>Hello <b>${data.name}</b>,</p>
          <p>Your OTP is:</p>
          <h1 style="color:#ff7a00;">${otp}</h1>
          <p>This OTP is valid for 10 minutes.</p>
          <p style="color:red;">Do not share this OTP.</p>
        </div>
      `
       }
       transporter.sendMail(mailOption,(err)=>{
        if(err){
        console.log("Email Send Error",err)
        }
       })
       return res.status(200).json({
        result:"Done",
        msg:"OTP Send your email Successfully",
        status:200
       })
    }
    catch(err){
        return res.status(500).json({
            result:"fail",
            msg:"Internal Server error",
            Error:err.message
        })
    }
}

let forgetPassword2=async(req,res)=>{
    try{
        let data=await User.findOne({
            $or:[
                {username:req.body.username},
                {email:req.body.username}
            ]
        });
        if(!data){
            return res.status(401).json({
            result: "Fail",
            msg: "User not found",
        })
        }
        if(req.body.otp===data.otp){
            return res.status(200).json({
                result:"Done",
                status:200,
                msg:"Otp Matched Successfully",
            });
        }
        else{
            return res.status(403).json({
                result:"fail",
                msg:"Otp Not Matched"
            })
        }
}
    catch(err){
        return res.status(500).json({
            result:"Fail",
            msg:"Internal Server error"
        })
    }
}

let forgetPassword3=async(req,res)=>{
    try{
        let data=await User.findOne({
            $or:[
                {username:req.body.username},
                {email:req.body.username}
            ]
        })
        if(!data){
            return res.status(401).json({
                result:"Fail",
                msg:"Unauthorized Activety",
                status:404
            })
        }
        bcrypt.hash(req.body.password,12,async(err,hash)=>{
            if(err){
                return res.status(500).json({
                    result:"Fail",
                    msg:"Internal Server Error",
                    status:500,
                    Error:err.message
                })
            }
            else{
                data.password=hash
                await data.save();
                return res.status(200).json({
                    result:"Done",
                    msg:"Password Updated Successfully",
                    status:200
                })
            }
        })
    }
    catch(err){
        return res.status(500).json({
            result:"Fail",
            msg:"Internal Server Error",
            status:500,
            Error:err.message
        })
    }
}

module.exports={createRecord,getRecord,getSingleRecord,updateRecord,deleteRecord,loginIn,forgetPassword1,forgetPassword2,forgetPassword3}