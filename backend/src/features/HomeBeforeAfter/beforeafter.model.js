const mongoose=require("mongoose")

const BeforeAfterSchema=new mongoose.Schema({
    image1:{type:String}, 
   image2:{type:String},  
 

   
  })
     const Beforeafter=mongoose.model("beforeafter",BeforeAfterSchema)
     module.exports=Beforeafter