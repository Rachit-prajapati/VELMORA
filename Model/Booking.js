const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserId must be required"]
  },

  hotel:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: [true, "Hotel must be required"]
  }],

  checkindate: {
    type: Date,
    required: [true, "Check-in date is required"]
  },

  checkoutdate: {
    type: Date,
    required: [true, "Check-out date is required"],
    validate: {
      validator: function (value) {
        return value > this.checkindate;
      },
      message: "Checkout date must be greater than check-in date"
    }
  },

  paymentstatus: {
    type: String,
    enum: ["pending", "paid", "cancelled"],
    default: "pending"
  },

  paymentmode: {
    type: String,
    default: "COD"
  },

  rppid: {
    type: String,
    default: ""
  },

  bookingstatus: {
    type: String,
    enum: ["upcoming", "completed", "cancelled"],
    default: "upcoming"
  },
  servicefees: {
    type: Number,
    required: [true, "Service fees is required"],
    min: 0
  },

  night: {
    type: Number,
    default: 1,
    min: 1
  },
  rooms:{
    type:Number,
    default:1,
    min:1
  },
  total: {
    type: Number,
    required: [true, "Total is required"],
    min: 0
  }

}, {
  timestamps: true
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = { Booking };
