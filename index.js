let express=require("express");
let app=express()
app.use(express.json());
require("dotenv").config()
let {Router}=require("./Route/Routes");
let {router} = require("./Route/InvoiceRouter");
let path=require("path");
let cors=require("cors");
app.use(cors());
require("./DBConnection")

app.use("/api",Router);
app.use(express.static("./public"));
app.use("/public",express.static("public"));
app.use("/api/invoice", router);

app.use(express.static(path.join(__dirname,"dist")));
app.use((req,res)=>{
    express.static(path.join(__dirname,"dist"))
})

app.listen(process.env.PORT || 3009,()=>{
    console.log(`http://localhost:${process.env.PORT}`)
})
