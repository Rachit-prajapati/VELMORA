let express=require("express");
let app=express()
app.use(express.json());
require("dotenv").config()
let mongoose=require("mongoose");
let {Router}=require("./Route/Routes");
let {router} = require("./Route/InvoiceRouter");
let path=require("path");
let cors=require("cors");
app.use(cors());

app.use("/api",Router);
app.use(express.static("./public"));
app.use("/public",express.static("public"));
app.use("/api/invoice", router);
app.use(express.static(path.join(__dirname,"dist")));
app.use((req,res)=>{
    express.static(path.join(__dirname,"dist"))
})

//Mongoose Connection
mongoose.connect(process.env.URL).then(()=>{
    console.log("Mongoose Is Connected");
    app.listen(process.env.PORT || 3003,()=>{
    console.log(`http://localhost:${process.env.PORT}`)
    })
})

