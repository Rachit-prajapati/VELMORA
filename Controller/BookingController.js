let { Booking } = require("../Model/Booking");
let { User } = require("../Model/User");
let { transporter } = require("../Transporter");
let Rayzor=require("razorpay");

let createRecord = async (req, res) => {
  try {
    let data = new Booking(req.body);
    let userdata = await User.findOne({ _id: data.userid });
    await data.save();
    mailOption = {
      from: process.env.EMAIL_SENDER,
      to: userdata.email,
      subject: "Booking Confirmed – Team: Airbnb Stays",
        html: `
    <div style="font-family: Arial, sans-serif; background-color: #fff7f0; padding: 20px;">
      
      <div style="max-width: 520px; margin: auto; background: #ffffff; padding: 25px; border-radius: 10px; border-top: 5px solid #ff7a00;">
        
        <h2 style="text-align: center; color: #ff7a00; margin-bottom: 20px;">
          Booking Confirmed ✅
        </h2>

        <p>Hello <strong>${userdata.name}</strong>,</p>

        <p>
          Your hotel booking has been <strong>successfully confirmed</strong> 🎉
        </p>

        <!-- Highlight Box -->
        <div style="
          background: #fff3e6;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #ff7a00;
          margin: 20px 0;
        ">
          <p style="margin: 0;">
            You can view and manage your booking anytime from your <strong>profile section</strong>.
          </p>
        </div>

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
            View Booking
          </a>
        </div>

        <p style="text-align: center;">
          Thank you for choosing <strong style="color:#ff7a00;">Airbnb Stays</strong> 🧡
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

        <p style="text-align: center;">
          Regards,<br/>
          <strong style="color: #ff7a00;">Team Airbnb</strong>
        </p>

      </div>

    </div>
  `
    };
    transporter.sendMail(mailOption, (err) => {
      if (err) {
        console.log("Send mail error", err);
      }
    });
    return res.status(200).json({
      status: 200,
      result: "Done",
      msg: "Data Insert Successfully",
      data:data
    });
  } catch (err) {
    if (err.errors.userid) {
      return res.status(400).json({
        result: "Fail",
        msg: err.errors.userid.message,
        Error: err.message,
      });
    } else if (err.errors.hotel) {
      return res.status(400).json({
        result: "Fail",
        msg: err.errors.hotel.message,
        Error: err.message,
      });
    } else if (err.errors.checkoutdate) {
      return res.status(400).json({
        result: "Fail",
        msg: err.errors.checkoutdate.message,
        Error: err.message,
      });
    } 
    else if (err.errors.checkindate) {
      return res.status(400).json({
        result: "Fail",
        msg: err.errors.checkindate.message,
        Error: err.message,
      });
    } 
    else if (err.errors.subtotal) {
      return res.status(400).json({
        result: "Fail",
        msg: err.errors.subtotal.message,
        Error: err.message,
      });
    } else if (err.errors.total) {
      return res.status(400).json({
        result: "Fail",
        msg: err.errors.total.message,
        Error: err.message,
      });
    } else if (err.errors.servicefees) {
      return res.status(400).json({
        result: "Fail",
        msg: err.errors.servicefees.message,
        Error: err.message,
      });
    }
    return res.status(500).json({
      result: "Fail",
      msg: "Internal Server error",
      Error: err.message,
    });
  }
};

let getSingleRecord = async (req, res) => {
  try {
    let data = await Booking.findOne({ _id: req.params._id }).populate(
        "hotel",
        "title price discount finalprice pic[0] city state category subcategory rooms _id"
      )
      .populate("checkinid","checkindate checkoutdate")
      .populate("userid", "_id name email phone");;
    return res.status(200).json({
      result: "Done",
      msg: "Data Find Successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      result: "Fail",
      msg: "Internal Server Error",
      Error: err.message,
    });
  }
};

let getUserRecord = async (req, res) => {
  try {
    let data = await Booking.find({ userid: req.params.userid })
      .populate("checkinid","checkindate checkoutdate")
      .populate(
        "hotel",
        "title price discount finalprice pic1 city state category subcategory rooms _id _id"
      )
      .populate("userid", "_id name email phone");
    return res.status(200).json({
      result: "Done",
      msg: "Data Find Successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      result: "Fail",
      msg: "Internal Server error",
      Error: err.message,
    });
  }
};

let getRecord = async (req, res) => {
  try {
    let data = await Booking.find().sort({ _id: -1 }).populate(
        "hotel",
        "title price discount finalprice pic city state category subcategory rooms _id"
      )
      .populate("userid", "_id name email phone");;
    return res.status(200).json({
      result: "Done",
      msg: "Data Find Successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      result: "Fail",
      msg: "Internal Server error",
      Error: err.message,
    });
  }
};

let updateRecord = async (req, res) => {
  try {
    let data = await Booking.findOne({ _id: req.params._id });
    if (data) {
      data.status = req.body.status ?? data.status;
      data.bookingstatus = req.body.bookingstatus ?? data.bookingstatus;
      data.paymentstatus = req.body.paymentstatus ?? data.orderstatus;
      data.rppid = req.body.rppid ?? data.rppid;
      await data.save();
      return res.status(200).json({
        result: "Done",
        data: data,
        msg: "Record updated",
      });
    } else {
      return res.status(404).json({
        result: "fail",
        msg: "invalid id",
      });
    }
  } catch (err) {
    return res.status(500).send({
      Error: err.message,
      result: "Fail",
      Msg: "Internal server error",
    });
  }
};

let deleteRecord = async (req, res) => {
  try {
    let data = await Booking.findOne({ _id: req.params._id });
    if (data) {
      await data.deleteOne();
      return res.status(200).json({
        result: "Record delete",
        data: data,
      });
    } else {
      return res.status(404).json({
        result: "fail",
        msg: "invalid id",
      });
    }
  } catch (err) {
    return res.status(500).send({
      Error: err,
      result: "Fail",
      Msg: "Internal server error",
    });
  }
};

async function Order(req,res) {
  try{
      let instance=new Rayzor({
          key_id:process.env.RPKEYID,
          key_secret:process.env.RPSECRETKEY
      })
      let options={
          amount:req.body.amount*100,
          currency:"INR",
      }

      instance.orders.create(options,function(err,order){
          if(err){
              return res.status(500).json({
                  result:"Fail",
                  msg:"Internal Server Error",
                  Error:err.message
              })
          }
          return res.status(200).json({
              result:"Done",
              msg:"Order Created",
              data:order
          })
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

async function verifyPayment(req,res){
  try{
      let booking=await Booking.findOne({_id:req.body.bookingid})
      booking.rppid = req.body.razorpay_payment_id;
      booking.paymentmode="Net Banking"
      booking.paymentstatus="paid"
      booking.bookingstatus="completed"
      await booking.save()
      return res.status(200).json({
          result:"Done",
          msg:"Payment Successfull",
          data:booking
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


module.exports = {
  createRecord,
  getUserRecord,
  getRecord,
  getSingleRecord,
  updateRecord,
  deleteRecord,
  Order,
  verifyPayment
};
