let express=require("express");
let Router=express.Router();
const { HotelRouter } = require("./HotelRouter");
const { ReviewRouter } = require("./ReviewRouter");
const { UserRouter } = require("./UserRouter");
const { WishlistRouter } = require("./WishlistRouter");
const { BookingRouter } = require("./BookingRouter");
const { ContactRouter } = require("./ContactRouter");
const { SubcategoryRouter } = require("./SubcategoryRouter");
const { MaincategoryRoute } = require("./MaincategoryRoute");
const { FeatureRouter } = require("./FeatureRouter");
const { SettingRouter } = require("./SettingRouter");

Router.use("/hotel",HotelRouter);
Router.use("/review",ReviewRouter);
Router.use("/user",UserRouter);
Router.use("/wishlist",WishlistRouter);
Router.use("/booking",BookingRouter);
Router.use("/contactus",ContactRouter);
Router.use("/subcategory",SubcategoryRouter);
Router.use("/maincategory",MaincategoryRoute);
Router.use("/feature",FeatureRouter);
Router.use("/setting",SettingRouter);

module.exports={Router}