const mongoose=require("mongoose")

const PromotionSchema=new mongoose.Schema({
    
   subject:{type:String},
   pro_text:{type:String},
   image:{type:String}, 
   publish:{type:String},  
 
  })
     const Promotion=mongoose.model("promotion",PromotionSchema)
     module.exports=Promotion