const mongoose=require("mongoose")

const ServiceDetailsSchema=new mongoose.Schema({
    
   service:{type:String},
   description:{type:String},
   

   image1:{type:String}, 
   image2:{type:String},  
 

   
  })
     const ServiceDetails=mongoose.model("servicedetails",ServiceDetailsSchema)
     module.exports=ServiceDetails