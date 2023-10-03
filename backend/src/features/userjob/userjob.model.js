const mongoose=require("mongoose")

const userapplicationSchema=new mongoose.Schema({
    
    //image: String
   // data: Buffer
   name:{type:String},
   file:{type:String},  
    data: Buffer,
    user:{type:Object},
    userId:{type:String},
    user_email:{type:String},
    role:{type:String}

  

  })
     const useapplication=mongoose.model("application",userapplicationSchema)
     module.exports=useapplication