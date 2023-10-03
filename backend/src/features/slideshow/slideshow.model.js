const mongoose=require("mongoose")

const SlideShowSchema=new mongoose.Schema({
    

   title:{type:String},
   description:{type:String},

   image:{type:String},  

   
  })
     const Slider=mongoose.model("slideshow",SlideShowSchema)
     module.exports=Slider