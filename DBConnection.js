require("mongoose").connect(process.env.URL).then(()=>{
    console.log("mongoose is Connected")
}).catch((err)=>{
    console.log("Mongoose connection fail"+err.message)
})